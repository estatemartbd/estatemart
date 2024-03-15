const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const validatorAdminRegistration = require("../middlewares/requestData/admin-registration");


const userModel = require('../models/user');
const adminModel = require('../models/admin');
const roleModel = require('../models/role');
const propertyModel = require('../models/property');
const favouriteModel = require('../models/favourite');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');

const commonObject = require('../common/common');
const emailCommonObject = require('../common/email');
const fileUploaderCommonObject = require('../common/fileUploader');
const crypto = require('crypto');

// all  admin list
router.get('/list', [verifyToken, routeAccessChecker("adminList")], async (req, res) => {
    // let result = await adminModel.getDataByWhereCondition({
    //     "status": [1,2], "role_i"
    // });
    let result = await adminModel.getAllAdminList();

    for (let i = 0; i < result.length; i++) {

        if (req.decoded.userInfo.id === result[i].user_id) {
            result.splice(i, 1);
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "All Admin List",
        "count": result.length,
        "imageFolderPath": `${process.env.backend_url}${process.env.admin_image_path_name}`,
        "data": result
    });

});

router.post('/registration', [verifyToken, routeAccessChecker("adminRegistration"), validatorAdminRegistration], async (req, res) => {

    let reqData = req.registrationData;

    // Email already in use check
    let existingUserByEmail = await userModel.getUserByEmail(reqData.email);

    if (!isEmpty(existingUserByEmail)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Email already in Use."
        });
    }

    if (req.files && Object.keys(req.files).length > 0) {
        let fileUploadCode = {};

        if (req.files.image) {

            fileUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                "adminImage",
                "image"
            );

            if (fileUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: fileUploadCode.message,
                });
            }
            reqData.profile_image = fileUploadCode.fileName;
        }
    } else reqData.profile_image = "default_profile_image"

    reqData.password = bcrypt.hashSync(reqData.password, 10); // hashing Password


    let userInfo = {};
    let profileInfo = {};


    // data formatting
    userInfo = {
        // according to the DB Column name

        "email": reqData.email,
        "role_id": 2,
        "password": reqData.password,
        //"created_by": req.decoded.userInfo.id,
        "updated_by": req.decoded.userInfo.id
    };


    profileInfo = {
        // according to the DB Column name
        "name": reqData.name,
        "email": reqData.email,
        "address": reqData.address,
        "image": reqData.profile_image,
        "created_by": req.decoded.userInfo.id,
        "updated_by": req.decoded.userInfo.id
    };

    let result = await userModel.addNewUser(userInfo, profileInfo);

    // sent email
    emailCommonObject.sentEmailByHtmlFormate(profileInfo.email, "Welcome to Kratos as an Admin.", `User Credential: Email: ${profileInfo.email}
     Password: ${req.body.password}`, "Login", "http://localhost:3003/");


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
        "message": "Admin Registered Successfully."
    });


});


// reset password for Easifi Admin by Super Admin
router.post('/resetPassword', [verifyToken, routeAccessChecker("adminResetPassword")], async (req, res) => {


    let updateRequestData = {
        "id": req.body.id
    }

    updateRequestData.updated_by = req.decoded.userInfo.id;
    updateRequestData.updated_at = await commonObject.getGMT();

    let validateId = await commonObject.checkItsNumber(updateRequestData.id);


    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer."
        });
    } else {
        req.body.id = validateId.data;
        updateRequestData.id = validateId.data;
    }


    let existingUserInfo = await userModel.getUserById(updateRequestData.id);

    if (isEmpty(existingUserInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    if (existingUserInfo[0].role_id != 2) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "User should be admin"
        });
    }

    let existingAdminInfo = await adminModel.getAdminById(existingUserInfo[0].profile_id);

    if (isEmpty(existingAdminInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    // reset password

    existingUserInfo[0].password = bcrypt.hashSync("123456", 10); // hashing Password
    let result = await userModel.resetPasswordForUser(existingUserInfo[0].id, existingUserInfo[0].password, updateRequestData.updated_by, updateRequestData.updated_at);

    if (!isEmpty(result) && result.affectedRows == 0) {
        return res.status(500)
            .send({
                "success": false,
                "status": 500,
                "message": "Password change fail! Try again",
            });
    } else {
        return res.status(200)
            .send({
                "status": 200,
                "success": true,
                "message": "Password change successfully done"
            });
    }

});


router.post('/changeStatus', [verifyToken, routeAccessChecker("changeAdminStatus")], async (req, res) => {

    let reqData = {
        "id": req.body.id
    }

    reqData.updated_by = req.decoded.userInfo.id;
    reqData.updated_at = await commonObject.getGMT();

    let validateId = await commonObject.checkItsNumber(reqData.id);


    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer."
        });
    } else {
        req.body.id = validateId.data;
        reqData.id = validateId.data;
    }

    let existingUserInfo = await userModel.getUserDetailsById(reqData.id);


    if (isEmpty(existingUserInfo)) {

        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    if (existingUserInfo[0].role_id != 2) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "User should be admin"
        });
    }

    let existingAdminInfo = await adminModel.getAdminDetailsById(existingUserInfo[0].profile_id);

    if (isEmpty(existingAdminInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    let result = undefined;
    let newStatus = "";


    if (existingUserInfo[0].status === 1 && existingAdminInfo[0].status === 1) {

        result = await userModel.disableUserById(reqData.updated_by, reqData.updated_at, existingUserInfo[0].id, existingAdminInfo[0].id, existingUserInfo[0].role_id);
        newStatus = " Disable";

    } else if (existingUserInfo[0].status === 2 && existingAdminInfo[0].status === 2) {
        result = await userModel.enableUserById(reqData.updated_by, reqData.updated_at, existingUserInfo[0].id, existingAdminInfo[0].id, existingUserInfo[0].role_id);
        newStatus = " Enable";
    } else {
        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "User is already disable."
        });
    }

    if (result.affectedRows == undefined || result.affectedRows == 0) {
        return res.status(500).send({
            "success": false,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }

    // send mail
    // let receiverMail = existingUserInfo[0].email;

    // let sendEmail = await emailCommonObject.sentEmailByHtmlFormate(
    //     receiverMail,
    //     "Kratos admin account status change",
    //     "You have been made enable in Kratos Platform. Please Contact with admin for any queries", "Go to Kratos", 
    //     `${process.env.frontend_url}`
    // );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Admin account status  (" + newStatus + ") has successfully changed."
    });

});

/// profile update
router.put('/profile/update', [verifyToken, routeAccessChecker("adminPersonalProfileUpdate")], async (req, res) => {

    let updateRequestData = {
        "id": req.decoded.profileInfo.id,
        "name": req.body.name,
        // "email": req.body.email,
        "address": req.body.address,
    }

    // id validation
    let validateId = await commonObject.checkItsNumber(updateRequestData.id);

    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer."
        });
    } else {
        updateRequestData.id = validateId.data;
    }

    // user data validate
    let existingUserInfo = await userModel.getUserById(req.decoded.userInfo.id);

    if (isEmpty(existingUserInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    } else if (existingUserInfo[0].status !== 1) {

        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "User Deactivated."
            });

    }

    // admin details
    let existingAdminInfo = await adminModel.getAdminDetailsById(updateRequestData.id);

    if (isEmpty(existingAdminInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    } else if (existingAdminInfo[0].status !== 1) {

        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Admin Deactivated."
            });

    }

    let previousProfileImage = existingAdminInfo[0].profile_image;


    let updateData = {};
    let updateUserData = {};

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no
    let willWeUpdate = 0; // 1 = yes , 0 = no;

    //first name 
    if (existingAdminInfo[0].name !== updateRequestData.name) {


        // First name valid
        let validateFirstName = await commonObject.characterLimitCheck(updateRequestData.name, "Name");

        if (validateFirstName.success == false) {
            isError = 1;
            errorMessage += validateFirstName.message;
        } else {
            updateRequestData.name = validateFirstName.data;
            willWeUpdate = 1;
            updateData.name = updateRequestData.name;

        }

    }

    //last name 
    if (existingAdminInfo[0].last_name !== updateRequestData.last_name) {


        // last name valid
        let validateLastName = await commonObject.characterLimitCheck(updateRequestData.last_name, "Last Name");

        if (validateLastName.success == false) {
            isError = 1;
            errorMessage += validateLastName.message;
        } else {
            updateRequestData.last_name = validateLastName.data;
            willWeUpdate = 1;
            updateData.last_name = updateRequestData.last_name;

        }

    }

    //email
    // if (existingAdminInfo[0].email !== updateRequestData.email) {

    //     // email validation
    //     if (isEmpty(updateRequestData.email)) {

    //         isError = 1;
    //         errorMessage += "Email should not empty.";
    //     }

    //     let validateEmail = await commonObject.isValidEmail(updateRequestData.email);

    //     if (validateEmail == false) {

    //         isError = 1;
    //         errorMessage += "Email is not valid.";

    //     } else {
    //         // Email already in use check
    //         let existingUserByEmail = await userModel.getUserByEmail(updateRequestData.email);

    //         if (!isEmpty(existingUserByEmail)) {
    //             isError = 1;
    //             errorMessage += " Email already in Use.";
    //         } else {
    //             willWeUpdate = 1;
    //             updateData.email = updateRequestData.email;
    //             updateUserData.email = updateRequestData.email;
    //         }
    //     }
    // }



    //address 
    if (existingAdminInfo[0].address !== updateRequestData.address) {

        // address check
        let validateAddress = await commonObject.characterLimitCheck(updateRequestData.address, "Address");

        if (validateAddress.success == false) {
            isError = 1;
            errorMessage += validateAddress.message;
        } else {
            updateRequestData.address = validateAddress.data;
            willWeUpdate = 1;
            updateData.address = updateRequestData.address;
        }
    }

    // image code
    if (req.files && Object.keys(req.files).length > 0) {

        let fileUploadCode = await fileUploaderCommonObject.uploadFile(req, "adminImage", "image");

        if (fileUploadCode.success == false) {
            return res.status(200).send({
                "success": false,
                "status": 400,
                "message": fileUploadCode.message,
            });
        }

        willWeUpdate = 1;
        updateRequestData.image = fileUploadCode.fileName;
        updateData.image = updateRequestData.image;
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

        if (!isEmpty(updateUserData)) {
            updateUserData.id = req.decoded.userInfo.id;
            updateUserData.updated_by = req.decoded.userInfo.id;
            updateUserData.updated_at = await commonObject.getGMT();
        }

        let result = await adminModel.updateAdminProfileById(updateRequestData.id, req.decoded.userInfo.id, updateData, updateUserData);


        if (result.affectedRows == undefined || result.affectedRows < 1) {
            return res.status(500).send({
                "success": true,
                "status": 500,
                "message": "Something Wrong in system database."
            });
        }

        if (req.files && Object.keys(req.files).length > 0) {
            if (previousProfileImage != updateData.profile_image) {
                if (previousProfileImage != "default_profile_image.png") {
                    let fileDelete = await fileUploaderCommonObject.fileRemove(previousProfileImage, "adminImage");
                }
            }
        }

        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": "Profile successfully updated."
        });


    } else {
        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": "Nothing to update."
        });
    }



});

router.get("/adminProfileDetails/:user_id", [verifyToken, routeAccessChecker("adminProfileDetails")], async (req, res) => {

    let userId = req.params.user_id;
    let imageFolderPath = `${process.env.backend_url}${process.env.admin_image_path_name}`;

    let validateId = await commonObject.checkItsNumber(userId);

    if (validateId.success == false) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Value should be integer.",
        });
    } else {
        req.params.user_id = validateId.data;
        userId = validateId.data;
    }

    let existingUserInfo = await userModel.getUserById(userId);

    if (isEmpty(existingUserInfo)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "User not found.",
        });
    }


    if (existingUserInfo[0].hasOwnProperty("password"))
        delete existingUserInfo[0].password;
    if (existingUserInfo[0].hasOwnProperty("user_name"))
        delete existingUserInfo[0].user_name;
    if (existingUserInfo[0].hasOwnProperty("updated_by"))
        delete existingUserInfo[0].updated_by;
    if (existingUserInfo[0].hasOwnProperty("updated_at"))
        delete existingUserInfo[0].updated_at;
    if (existingUserInfo[0].hasOwnProperty("email"))
        delete existingUserInfo[0].email;
    if (existingUserInfo[0].hasOwnProperty("phone"))
        delete existingUserInfo[0].phone;

    if (existingUserInfo[0].role_id != 2) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "User should be  Admin.",
        });
    }

    let profileInfo = {};


    profileInfo = await await adminModel.getAdminById(existingUserInfo[0].profile_id);
    profileInfo[0].user_id = existingUserInfo[0].id;
    profileInfo[0].role_id = existingUserInfo[0].role_id;
    profileInfo[0].image_folder_path = imageFolderPath;

    if (isEmpty(profileInfo)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "User not exist.",
        });
    }

    if (profileInfo[0].hasOwnProperty("email"))
        delete profileInfo[0].email;
    if (profileInfo[0].hasOwnProperty("phone"))
        delete profileInfo[0].phone;


    return res.status(200).send({
        success: true,
        status: 200,
        data: profileInfo[0],
    });

}
);

router.get('/dashboard', [verifyToken,], async (req, res) => {

    let propertyCount = await propertyModel.getDataByWhereCondition({ "status": 1},
    undefined,undefined,undefined,["count(id) as total_property"]);

    let favouriteCount = await favouriteModel.getDataByWhereCondition({ "status": 1},
    undefined,undefined,undefined,["count(id) as total_favourite"]);

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Dashboard",
        "propertyCount": propertyCount[0].total_property,
        "favouriteCount": favouriteCount[0].total_favourite
    });

});



module.exports = router;