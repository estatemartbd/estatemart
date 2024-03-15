const express = require("express");
const isEmpty = require("is-empty");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const commonObject = require("../common/common");
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const systemUserModel = require("../models/system-user");
const loginTrackModel = require("../models/login-track");
const roleModel = require("../models/role");
const verifyToken = require("../middlewares/jwt_verify/verifyToken");

router.post("/login", async (req, res) => {
    let loginData = {
        password: req.body.password,
        userEmailOrPhone: req.body.user_email_or_phone, // or email
    };

    let errorMessage = "";
    let isError = 0;
    let tryToLoginBy = "email";

    // Check userName validation
    if (loginData.userEmailOrPhone === undefined || isEmpty(loginData.userEmailOrPhone)) {
        isError = 1;
        errorMessage += "Give valid email, phone no.";
    }


    // Check Email or phone number validation
    if (loginData.userEmailOrPhone === undefined || isEmpty(loginData.userEmailOrPhone)) {
        isError = 1;
        errorMessage += "Give valid phone number or email.";
    } else if (!isNaN(loginData.userEmailOrPhone)) {
        tryToLoginBy = "phone";
        if (loginData.userEmailOrPhone.length != 11) {
            isError = 1;
            errorMessage += "Give valid phone number.";
        }
    } else {
        const re = /\S+@\S+\.\S+/;
        tryToLoginBy = "email";
        if (!re.test(loginData.userEmailOrPhone)) {
            isError = 1;
            errorMessage += " Give a valid email.";
        }
    }

    // Check Password Validation
    if (loginData.password == undefined || loginData.password.length < 6) {
        isError = 1;
        errorMessage += "Give valid password.";
    } else if (typeof loginData.password === "number") {
        loginData.password = loginData.password.toString();
    }

    if (isError == 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: errorMessage,
        });
    }

    // Get User data from user table.

    let userData = tryToLoginBy === "email" ?
        await userModel.getDataByWhereCondition({ email: loginData.userEmailOrPhone, status: 1 }) :
        await userModel.getDataByWhereCondition({ phone: loginData.userEmailOrPhone, status: 1 });



    if (isEmpty(userData) || userData[0].status == 0 ) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user found.",
        });
    }


    // Check Password
    if (bcrypt.compareSync(loginData.password, userData[0].password)) {
        let profileData = {};

        //Check Role
        let roleData = await roleModel.getRoleById(userData[0].role_id);
        let imageFolderPath = `${process.env.backend_url}${process.env.user_profile_image_path_name}`;

        if (isEmpty(roleData)) {
            return res.status(404).send({
                success: false,
                status: 404,
                message: " Unknown User role.",
            });
        }

        if (userData[0].role_id == 1) {
            profileInfo = await adminModel.getDataByWhereCondition(
                { id: userData[0].profile_id }, undefined, undefined, undefined, ["id", "name", "email", "phone", "profile_image", "status"]
            );
            imageFolderPath = `${process.env.backend_url}${process.env.admin_image_path_name}`;
        } else if ([2,3,4,"2","3", "4"].includes(userData[0].role_id)) {
            profileInfo = await systemUserModel.getDataByWhereCondition(
                { id: userData[0].profile_id }, undefined, undefined, undefined, ["id", "name", "email", "phone", "profile_image", "status", "user_type"]
            );
            imageFolderPath = `${process.env.backend_url}${process.env.admin_image_path_name}`;
        } else {
            return res.status(404).send({
                success: false,
                status: 404,
                message: "No user found.",
            });
        }

        if (isEmpty(profileInfo)) {
            return res.status(404).send({
                success: false,
                status: 404,
                message: "Unknown User.",
            });
        } else {
            for (let index = 0; index < profileInfo.length; index++) {
                if(profileInfo[index].role_id == userData[0].role_id){
                    profileInfo = [profileInfo[index]];
                    delete profileInfo[0].role_id;
                    break;
                }
            }
        }

        // get device info
        let deviceInfo = await commonObject.getUserDeviceInfo(req);
        let uuid = uuidv4();
        delete profileInfo[0].id;

        // Generate profile data

        hashId = await commonObject.hashingUsingCrypto(userData[0].id.toString());
        profileData.api_token = hashId;

        // profileData.user_name = userData[0].user_name;
        profileData.email = userData[0].email;
        // profileData.phone = userData[0].phone;
        profileData.role = {
            role_id: roleData[0].id,
            role_name: roleData[0].title,
        };

        

        profileData.profile = profileInfo[0];
        profileData.time_period = Date.now() + 3600000;
        profileData.identity_id = uuid;

        if(roleData[0].id == 1){
            profileData.profile.user_role = "Admin"
        } else {

            console.log(profileData.profile)
            profileData.profile.user_role = (profileData.profile.user_type == 2) ? "Business Agent" : (profileData.profile.user_type == 3) ? "Personal Agent" : "General User";
            profileData.role.role_name = profileData.profile.user_role;
        }

        //  "Generate Token"
        let token = jwt.sign(profileData, global.config.secretKey, {
            algorithm: global.config.algorithm,
            expiresIn: global.config.expiresIn, // one day
        });

        delete profileData.api_token;
        delete profileData.time_period;
        delete profileData.identity_id; // device track id
        profileData.token = token;

        // Save user identity in login-tracker
        let dateTimeToday = await commonObject.getGMT();
        let dateToday = await commonObject.getCustomDate(dateTimeToday);

        let loginTrackerData = {
            user_id: userData[0].id,
            jwt_token: token,
            login_device_info: JSON.stringify(deviceInfo),
            uuid: uuid,
            created_at: dateTimeToday,
            updated_at: dateTimeToday,
            created_by: userData[0].id,
            updated_by: userData[0].id,
        };

        profileData.id = userData[0].id; //  frontend requested, we send user id in response.
        profileData.imageFolderPath = imageFolderPath;


        loginTrackModel.addNewLoggingTracker(loginTrackerData);

        return res.status(200).send({
            success: true,
            message: "Welcome to the system.",
            data: profileData,
        });
    } else {
        return res.status(401).send({
            status: 401,
            success: false,
            message: "Wrong Password",
        });
    }
});

router.get("/logout", verifyToken, async (req, res) => {
    let result = await loginTrackModel.deleteLoggingTrackerDataByUUID(
        req.decoded.uuid
    );

    if (result.affectedRows == undefined || result.affectedRows < 1) {
        return res.status(500).send({
            success: true,
            status: 500,
            message: "Something Wrong in system. Please try again.",
        });
    }

    return res.status(200).send({
        success: true,
        status: 200,
        message: "Logout successfully done. Thank you for using Kratos.",
    });
});

module.exports = router;
