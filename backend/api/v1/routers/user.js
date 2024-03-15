const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require('uuid');

const userModel = require("../models/user");
const forgetPasswordModel = require("../models/forget-password");
const adminModel = require("../models/admin");
const systemUserModel = require("../models/system-user");
const roleModel = require("../models/role");
const passwordChangeChecker = require("../middlewares/requestData/password-change-checker");
const verifyToken = require("../middlewares/jwt_verify/verifyToken");
const validatorUserRegistration = require("../middlewares/requestData/user-registration");
const { routeAccessChecker } = require("../middlewares/routeAccess");

const loginTrackModel = require("../models/login-track");
const commonObject = require("../common/common");
const emailCommonObject = require("../common/email");
const fileUploaderCommonObject = require("../common/fileUploader");

const crypto = require("crypto");
const moment = require("moment");
require("dotenv").config();

const verifyForgetPasswordToken = require("../middlewares/jwt_verify/verifyForgetPasswordToken");
const smsCommonObject = require("../common/sms");

router.post('/registration', [validatorUserRegistration], async (req, res) => {
    let reqData = req.registrationData;
    let errorMessage = "";
    let isError = 0;

    /*
        User role 
            1: ADMIN
            2: Company / Business Agent
            3: Personal Agent
            4: General Agent
    */

    // Email already in use check
    if (!isEmpty(reqData.email)) {
        if (!isEmpty(await userModel.getUserByEmail(reqData.email))) {
            isError = 1;
            errorMessage += " Email already in Use.";
        }
    } else {
        try {  
            delete reqData.email;
        } catch (error) { }
    }


    // Phone already in use check

    if (!isEmpty(reqData.phone)) {
        if (!isEmpty(await userModel.getDataByWhereCondition(
            { "phone": reqData.phone, "status": [1, 2] }
        ))) {
            isError = 1;
            errorMessage += " Phone already in Use.";
        }
    } else {
        try {
            delete reqData.phone;
        } catch (error) { }
    }

    if (isEmpty(reqData.email) && isEmpty(reqData.phone)) {
        isError = 1;
        errorMessage += "Please give email or phone no.";
    }

    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    reqData.password = bcrypt.hashSync(reqData.password, 10); // hashing Password

    let userInfo = {};
    let profileInfo = {};
    let currentTime = await commonObject.getGMT();

    // data formatting
    userInfo = {
        // according to the DB Column name
        "name": reqData.name,
        "email": reqData.email,
        "phone": reqData.phone,
        "role_id": reqData.userType,
        "password": reqData.password,
        "updated_by": 0,
        "updated_at": currentTime
    };

    profileInfo = {
        // according to the DB Column name
        "name": reqData.name,
        "email": reqData.email,
        "phone": reqData.phone,
        "user_type": reqData.userType,
        "created_by": 0,
        "updated_by": 0,
        "created_at": currentTime,
        "updated_at": currentTime
    };

    if (!isEmpty(reqData.email)) {
        userInfo.email = reqData.email;
        profileInfo.email = reqData.email;
    }

    if (!isEmpty(reqData.phone)) {
        userInfo.phone = reqData.phone;
        profileInfo.phone = reqData.phone
    }


    if(reqData.userType == 2){
        profileInfo.organization_name = reqData.organizationName;
        profileInfo.organization_details = reqData.organizationDetails;
    }

    
    let result = await userModel.addNewUser(userInfo, profileInfo);
    if (result.affectedRows == undefined || result.affectedRows < 1) {
        return res.status(500).send({
            "success": true,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }

    return res.status(201).send({
        "success": true,
        "status": 201,
        "message": `Registered Successfully.`
    });


});


router.post("/password-change", [verifyToken, passwordChangeChecker],
    async (req, res) => {
        // Get User data from user table.
        let old_password = req.body.old_password;
        let new_password = req.body.new_password;

        let userData = await userModel.getUserById(req.decoded.userInfo.id);

        if (isEmpty(userData)) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: "Unauthorize Request. User not found, please login again.",
            });
        }


        if (bcrypt.compareSync(old_password, userData[0].password)) {
            new_password = bcrypt.hashSync(new_password, 10); // hashing Password
            let result = await userModel.updateUserPasswordByUserId(
                req.decoded.userInfo.id,
                new_password
            );

            if (!isEmpty(result) && result.affectedRows == 0) {
                return res.status(500).send({
                    success: false,
                    status: 500,
                    message: "Password change fail! Try again",
                });
            } else {

                // send email

                let receiverMail = userData[0].email;

                let sendEmail = await emailCommonObject.sentEmailByHtmlFormate(
                    receiverMail,
                    "Estatemart User Password Change",
                    "Your Estatemart Password has been updated",
                    "Go to Estatemart",
                    `${process.env.frontend_url}`
                );

                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: "Password change successfully done",
                });
            }
        } else {
            return res.status(401).send({
                success: false,
                status: 402,
                message: "Old password not match.",
            });
        }
    }
);

router.put('/update-profile-picture', [verifyToken], async (req, res) => {


    let userDetails = await userModel.getDataByWhereCondition(
        { "id": req.decoded.userInfo.id, "status": 1 }
    );

    if (isEmpty(userDetails)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "User not found"
        });
    }

    let profileDetails;
    let fileTypeObjectName;
    if (userDetails[0].role_id == 1) { // admin
        profileDetails = await adminModel.getDataByWhereCondition(
            { "id": userDetails[0].profile_id, "status": 1 }
        );

        fileTypeObjectName = "adminImage";
    } else {
        profileDetails = await systemUserModel.getDataByWhereCondition(
            { "id": userDetails[0].profile_id, "status": 1 }
        );

        fileTypeObjectName = "image";
    }

    if (isEmpty(userDetails)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Profile not found"
        });
    }


    let previousProfileImage = profileDetails[0].profile_image;

    // return res.status(400).send({
    //     "success": false,
    //     "status": 400,
    //     "message": previousProfileImage
    // });

    let updateData = {};

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no
    let willWeUpdate = 0; // 1 = yes , 0 = no;

    //  image code
    if (req.files && Object.keys(req.files).length > 0) {
        let fileUploadCode = {};

        if (req.files.profile_image) {

            fileUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                fileTypeObjectName,
                "profile_image"
            );

            if (fileUploadCode.success == false) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: fileUploadCode.message,
                });
            }

            willWeUpdate = 1;
            updateData.profile_image = fileUploadCode.fileName;
        }

    } else {
        isError = 1;
        errorMessage += "Please Provide an Image";
    }

    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    if (willWeUpdate == 1) {

        updateData.updated_by = req.decoded.userInfo.id;
        updateData.updated_at = await commonObject.getGMT();

        let result;

        if (userDetails[0].role_id == 1) { // admin
            result = await adminModel.updateById(profileDetails[0].id, updateData);
        } else {
            result = await systemUserModel.updateById(profileDetails[0].id, updateData);
        }

        if (result.affectedRows == undefined || result.affectedRows < 1) {
            return res.status(500).send({
                success: true,
                status: 500,
                message: "Something Wrong in system database.",
            });
        }

        //existing image delete
        if (req.files && Object.keys(req.files).length > 0) {
            // profile image delete

            if (req.files.profile_image) {
                if (previousProfileImage != updateData.profile_image) {
                    if (previousProfileImage != "default_profile_image.png") {
                        let fileDelete = {};

                        fileDelete = await fileUploaderCommonObject.fileRemove(
                            previousProfileImage,
                            fileTypeObjectName
                        );

                    }
                }
            }

        }


        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": "User profile picture successfully updated."
        });


    }
});

//******

router.get("/me", verifyToken, async (req, res) => {

    let profileInfo = {};
    let dateTimeToday = await commonObject.getGMT();
    let dateToday = await commonObject.getCustomDate(dateTimeToday);

    let imageFolderPath = `${process.env.backend_url}${process.env.user_profile_image_path_name}`;
    // console.log(req.decoded.role.id);
    if (req.decoded.role.id == 1) {
        profileInfo = await adminModel.getDataByWhereCondition({
            "id": req.decoded.profileInfo.id
        });
        imageFolderPath = `${process.env.backend_url}${process.env.admin_image_path_name}`;
    } else if ([3, 4].includes(req.decoded.role.id)) {
        profileInfo = await systemUserModel.getDataByWhereCondition(
            { id: req.decoded.profileInfo.id }, undefined, undefined, undefined, ["id", "name", "email", "phone", "profile_image", "status", "user_type"]
        );
    } else if ([2].includes(req.decoded.role.id)) {
        profileInfo = await systemUserModel.getDataByWhereCondition(
            { id: req.decoded.profileInfo.id }, undefined, undefined, undefined, ["id", "name", "email", "phone", "profile_image", "organization_name", "organization_details", "status", "user_type"]
        );
    } else {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Unauthorize Request. User not found, please login again.",
        });
    }

    if (isEmpty(profileInfo)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "Unknown user.",
        });
    } else {
        profileInfo[0].role = {
            role_id: req.decoded.role.id,
            role_name: req.decoded.role.title,
        };

        profileInfo[0].imageFolderPath = imageFolderPath;
        profileInfo[0].user_name = req.decoded.userInfo.user_name;
        // profileInfo[0].user_id = req.decoded.userInfo.id;
        profileInfo[0].email = req.decoded.userInfo.email;
        profileInfo[0].phone = req.decoded.userInfo.phone;

        if (profileInfo[0].role.role_id == 1) {
            profileInfo[0].user_role = "Admin";
        } else {
            profileInfo[0].user_role = (profileInfo[0].user_type == 2) ? "Business Agent" : (profileInfo[0].user_type == 3) ? "Personal Agent" : "General User";
            delete profileInfo[0].user_type;
            profileInfo[0].role.role_name = profileInfo[0].user_role;
        }



        return res.status(200).send({
            success: true,
            status: 200,
            data: profileInfo[0],
        });
    }
});

/// Reset Password
router.post("/forget-password-request", async (req, res) => {
    let reqData = {
        email: req.body.email, //  email or phone
    };

    let errorMessage = "";
    let isError = 0;
    let recoverBy = "";

    // Check Email or phone number validation
    if (reqData.email === undefined || isEmpty(reqData.email)) {
        isError = 1;
        errorMessage += "Give valid phone number or email.";
    } else if (!isNaN(reqData.email)) {
        recoverBy = "phone";
        if (reqData.email.length != 11) {
            isError = 1;
            errorMessage += "Give valid phone number or email.";
        }
    } else {
        recoverBy = "email";
        let validateEmail = await commonObject.isValidEmail(reqData.email);

        if (validateEmail == false) {
            isError = 1;
            errorMessage += " Give a valid email.";
        }

    }



    if (isError == 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: errorMessage,
        });
    }

    // get existing user data
    let existingUserData = {};
    if (recoverBy == "email") {
        existingUserData = await userModel.getDataByWhereCondition(
            { "status": 1, "email": reqData.email }
        );


    } else if (recoverBy == "phone") {
        existingUserData = await userModel.getDataByWhereCondition(
            { "status": 1, "phone": reqData.email }
        );
    }

    if (isEmpty(existingUserData)) {
        return res.status(401).send({
            success: false,
            status: 401,
            message: "Invalid  request",
        });
    }


    crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            //console.log(err);
        }

        let otp = await commonObject.generateOTP(5);

        let payloadData = {};
        payloadData.id = existingUserData[0].id;
        payloadData.medium = recoverBy;
        payloadData.timePeriod = await commonObject.addFiveMinuteToGMT();
        payloadData.connectionType = await commonObject.hashingUsingCrypto(otp.toString());  // OTP for security     
        payloadData.deviceAnalysis = await commonObject.hashingUsingCrypto(reqData.email.toString());  //  for security    


        //  "Generate Token"
        let token = jwt.sign(payloadData, global.config.secretKey, {
            algorithm: global.config.algorithm,
            expiresIn: '5m', // one day
        });

        let requestData = {
            user_id: existingUserData[0].id,
            token: token,
            medium: recoverBy,
            otp: otp,
            created_at: await commonObject.getGMT()
        };




        let existingRequests = await forgetPasswordModel.getDataByWhereCondition(
            { "status": 1, "user_id": existingUserData[0].id }
        );


        if (existingRequests.length > 0) {
            for (let i = 0; i < existingRequests.length; i++) {

                let updateData = {};
                updateData.status = 0;

                let disableRequests = await forgetPasswordModel.updateById(existingRequests[i].id, updateData);
            }
        }

        let requestForgetPassword = await forgetPasswordModel.insertForgetPassword(requestData);

        if (requestForgetPassword.affectedRows == undefined || requestForgetPassword.affectedRows < 1) {
            return res.status(500).send({
                success: true,
                status: 500,
                message: "Something Wrong in system database.",
            });
        }


        let receiver = reqData.email;

        if (recoverBy == 'email') {

            let sendEmail = await emailCommonObject.sentEmailByHtmlFormate(
                receiver,
                "Forget Password",
                "We have received your request on forget password",
                `Your OTP is ${otp}`,
                "#"
            );

        } else if (recoverBy == 'phone') {

            let otpMessage = `Your forget password request OTP code is : ${otp} .`;
            let sendSMS = await smsCommonObject.sentSMS(receiver, otpMessage);
        }


        return res.status(200).send({
            success: true,
            status: 200,
            message: `Check your ${recoverBy}  for reset password.`,
            token: token,
            otp: otp
        });
    });
});

/// Verify Token (not need to use)
router.post("/verify-reset-token", async (req, res) => {
    let reqUserData = {
        resetToken: req.body.resetToken,
    };

    let existingData = await forgetPasswordModel.getUserByToken(
        reqUserData.resetToken
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "No User Found",
        });
    } else if (existingData[0].status !== 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Link Expired",
        });
    }

    let userData = await userModel.getUserById(existingData[0].user_id);

    if (userData[0].hasOwnProperty("password")) delete userData[0].password;
    if (userData[0].hasOwnProperty("updated_by")) delete userData[0].updated_by;
    if (userData[0].hasOwnProperty("updated_at")) delete userData[0].updated_at;

    let existingProfileInfo = [];


    return res.status(200).send({
        status: 200,
        success: true,
        message: "User found",
        data: userData[0],
    });
});

router.post("/reset-password-confirm", [verifyForgetPasswordToken], async (req, res) => {

    let reqUserData = {
        new_password: req.body.new_password,
        confirm_password: req.body.confirm_password,
        otp: req.body.otp
    };

    let payloadDecodedData = req.decoded;

    let systemGeneratedOTP = await commonObject.decodingUsingCrypto(payloadDecodedData.connectionType);
    let systemMedium = payloadDecodedData.medium;


    if (systemGeneratedOTP != reqUserData.otp) {
        return res.status(400).send({
            success: false,
            status: 401,
            message: "OTP not Match.",
        });
    }


    let existingData = await forgetPasswordModel.getDataByWhereCondition(
        { user_id: payloadDecodedData.id, medium: systemMedium, otp: systemGeneratedOTP, status: 1 });

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "No Data Found",
        });
    }


    let userData = await userModel.getDataByWhereCondition(
        { status: 1, id: payloadDecodedData.id }
    );

    if (isEmpty(userData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "No User Found",
        });
    }

    let errorMessage = "";
    let isError = 0;

    // password check
    let validatePassword = await commonObject.characterLimitCheck(
        reqUserData.new_password,
        "Password"
    );

    if (validatePassword.success == false) {
        isError = 1;
        errorMessage += validatePassword.message;
    }

    reqUserData.new_password = validatePassword.data;

    if (reqUserData.new_password !== reqUserData.confirm_password) {
        isError = 1;
        errorMessage += "New Password and Confirm password should be same.";
    }

    if (isError == 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: errorMessage,
        });
    }

    reqUserData.new_password = bcrypt.hashSync(reqUserData.new_password, 10); // hashing Password

    let result = await userModel.updateUserPasswordUsingForgetPassword(
        userData[0].id,
        reqUserData.new_password,
        existingData[0].id,
        userData[0].id,
        await commonObject.getGMT()
    );

    if (!isEmpty(result) && result.affectedRows == 0) {
        return res.status(500).send({
            success: false,
            status: 500,
            message: "Password change fail! Try again",
        });
    } else {
        return res.status(200).send({
            status: 200,
            success: true,
            message: "Password change successfully done",
        });
    }
});


module.exports = router;
