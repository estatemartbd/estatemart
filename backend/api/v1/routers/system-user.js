const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const systemUserModel = require('../models/system-user');
const userModel = require('../models/user');
const propertyModel = require('../models/property');

const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
const { route } = require("../middlewares/jwt_verify/verifyToken");
require('dotenv').config();
let imageFolderPath = `${process.env.backend_url}${process.env.user_profile_image_path_name}`;


router.get('/list', [verifyToken], async (req, res) => {

    let result = await systemUserModel.getAllSystemUserList();

    for (let index = 0; index < result.length; index++) {
        result[index].role_name = (result[index].user_type == 2) ? "Business Agent" : (result[index].user_type == 3) ? "Personal Agent" : "Buyer";

        try {
            let tempResult = await propertyModel.getDataByWhereCondition(
                { "post_owner_id": result[index].user_id, "status": 1 });
            result[index].total_active_post = tempResult.length;
        } catch (error) {
            result[index].total_active_post = 0;
        }
    }



    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "SystemUser List.",
        "image_folder_path": imageFolderPath,
        "count": result.length,
        "data": result
    });
});


router.get('/active-list', [verifyToken], async (req, res) => {

    let result = await systemUserModel.getListByStatus(1);

    for (let index = 0; index < result.length; index++) {
        result[index].role_name = (result[index].user_type == 2) ? "Business Agent" : (result[index].user_type == 3) ? "Personal Agent" : "Buyer";

        try {
            let tempResult = await propertyModel.getDataByWhereCondition(
                { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
            result[index].total_active_post = tempResult.length;
        } catch (error) {
            result[index].total_active_post = 0;
        }

    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "SystemUser active list.",
        "image_folder_path": imageFolderPath,
        "count": result.length,
        "data": result
    });
});


router.post('/list', [verifyToken], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }

    let searchData = {
        "status": { "not eq": 0 }
    }

    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 50;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    if (!isEmpty(req.body.user_type)) {
        if ([2, 3, 4, "2", "3", "4"].includes(req.body.user_type)) {
            searchData.user_type = req.body.user_type;
        }
    }

    if (!isEmpty(req.body.name)) {
        try {
            req.body.name = req.body.name.trim();
        } catch (error) { }

        searchData.name = { "like": req.body.name };
    }

    if (!isEmpty(req.body.email)) {
        try {
            req.body.email = req.body.email.trim();
        } catch (error) { }

        searchData.email = { "like": req.body.email };
    }

    if (!isEmpty(req.body.phone)) {
        try {
            req.body.phone = req.body.phone.trim();
        } catch (error) { }

        searchData.phone = { "like": req.body.phone };
    }

    let result = await systemUserModel.getDataByWhereCondition(
        searchData, { "id": "ASC" },
        reqData.limit,
        reqData.offset, ["id", "name", "email", "phone", "user_type", "profile_image", "organization_name", "organization_details", "status"]
    );

    for (let i = 0; i < result.length; i++) {

        result[i].role_name = (result[i].user_type == 2) ? "Business Agent" : (result[i].user_type == 3) ? "Personal Agent" : "Buyer";
        try {
            let tempResult = await propertyModel.getDataByWhereCondition(
                { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
            result[i].total_active_post = tempResult.length;
        } catch (error) {
            result[i].total_active_post = 0;
        }

        let userInfoList = await userModel.getDataByWhereCondition({ "profile_id": result[i].id, "role_id": result[i].user_type }, { "id": "ASC" });

        if (isEmpty(userInfoList)) {
            result.splice(i, 1);
            i--;
        } else result[i].user_id = userInfoList[0].id;
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "systemUser List.",
        "image_folder_path": imageFolderPath,
        "count": result.length,
        "data": result
    });
});

router.post('/update-profile', [verifyToken], async (req, res) => {

    let reqData = {
        "id": req.body.profile_id,
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "userType": req.body.user_type
    }

    if (req.decoded.userInfo.role_id != 1) {
        reqData.id = req.decoded.profileInfo.id;
    } else {

        if (isEmpty(reqData.id)) {

            return res.status(404).send({
                "success": false,
                "status": 400,
                "message": "Give valid profile_id."
            });
        }

        let validateId = await commonObject.checkItsNumber(reqData.id);
        if (validateId.success == false) {

            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Profile id value should be integer.",
                "id": reqData.id
            });
        } else {
            req.body.id = validateId.data;
            reqData.id = validateId.data;
        }
    }


    let existingDataById = await systemUserModel.getSystemUserById(reqData.id);

    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found"
        });
    }


    let updateUserData = {};
    let updateProfileData = {};

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no
    let willWeUpdate = 0; // 1 = yes , 0 = no;

    if (req.decoded.userInfo.role_id === 1 && !isEmpty(reqData.userType)) {
        if (existingDataById[0].user_type != reqData.userType) {

            // if (isEmpty(reqData.userType)) {
            //     return res.status(400).send({
            //         "success": false,
            //         "status": 400,
            //         "message": "Please give user_type"
            //     });
            // } else

            if (![2, 3, 4, "2", "3", "4"].includes(reqData.userType)) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Give valid user type. User type should be 2 / 3 / 4"
                });
            } else {
                updateProfileData.user_type = reqData.userType;
                willWeUpdate = 1;
            }
        }
    }

    console.log(req.body.organization_name);

    if (req.decoded.userInfo.role_id == 2 || req.decoded.userInfo.role_id == 1) {
        if (!isEmpty(req.body.organization_name)) {

            let validateOrganizationName = await commonObject.characterLimitCheck(req.body.organization_name, "organization name");
            if (validateOrganizationName.success == false) {


                return res.status(400)
                    .send({
                        "success": false,
                        "status": 400,
                        "message": validateOrganizationName.message
                    });

            }

            updateProfileData.organization_name = validateOrganizationName.data;
            willWeUpdate = 1;

        }

        if (!isEmpty(req.body.organization_details)) {

            let validateOrganizationDetails = await commonObject.characterLimitCheck(req.body.organization_details, "organization details");
            if (validateOrganizationDetails.success == false) {
                return res.status(400)
                    .send({
                        "success": false,
                        "status": 400,
                        "message": validateOrganizationDetails.message
                    });
            }

            updateProfileData.organization_details = validateOrganizationDetails.data;
            willWeUpdate = 1;
        }
    }



    // Name
    if (existingDataById[0].name !== reqData.name) {

        // name valid
        if (isEmpty(reqData.name)) {

            return res.status(400)
                .send({
                    "success": false,
                    "status": 400,
                    "message": "Please provide name."
                });
        }


        let validateName = await commonObject.characterLimitCheck(reqData.name, "Name");
        if (validateName.success == false) {
            isError = 1;
            errorMessage += validateName.message;
        } else {
            updateProfileData.name = validateName.data;
            willWeUpdate = 1;
        }
    }



    // if (isEmpty(reqData.email) && isEmpty(reqData.phone)) {
    // isError = 1;
    // errorMessage += "Please give email or phone no.";
    // } else {

    // Phone validate
    if (existingDataById[0].phone !== reqData.phone) {

        // let number = await commonObject.removePlusSpaceBracketsHifen(reqData.phone);

        // let validateNumber = await commonObject.checkItsNumber(number);
        // if (validateNumber.success == false) {
        //     isError = 1;
        //     errorMessage += "Number Value should be integer.";

        // }


        if (!isEmpty(reqData.phone)) {
            if (reqData.phone.length != 11) {
                isError = 1;
                errorMessage += "Please give valid phone no.";
            }
        }

        willWeUpdate = 1;
        updateProfileData.phone = reqData.phone;
        updateUserData.phone = reqData.phone;

        let tempUserInfo = await userModel.getUserByPhone(reqData.phone);

        if (!isEmpty(tempUserInfo) && tempUserInfo[0].id != reqData.id) {
            isError = 1;
            errorMessage += " Phone no already in use.";
        }


    }

    if (existingDataById[0].email !== reqData.email && !isEmpty(reqData.email)) {

        let validateEmail = await commonObject.isValidEmail(reqData.email);
        if (validateEmail == false) {
            isError = 1;
            errorMessage += "Email is not valid.";
        } else {
            willWeUpdate = 1;
            updateProfileData.email = reqData.email;
            updateUserData.email = reqData.email;
        }

        let tempUserInfo = await userModel.getUserByEmail(reqData.email);

        if (!isEmpty(tempUserInfo) && tempUserInfo[0].id != reqData.id) {
            isError = 1;
            errorMessage += " Email already in use.";
        }
    }


    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }
    // }


    if (willWeUpdate == 1) {

        updateProfileData.updated_by = req.decoded.userInfo.id;
        updateProfileData.updated_at = await commonObject.getGMT();

        updateUserData.updated_by = req.decoded.userInfo.id;
        updateUserData.updated_at = await commonObject.getGMT();


        let result = await systemUserModel.updateSystemUserProfileById(reqData.id, existingDataById[0].user_id, updateProfileData, updateUserData);


        if (result.affectedRows == undefined || result.affectedRows < 1) {
            return res.status(500).send({
                "success": true,
                "status": 500,
                "message": "Something Wrong in system database."
            });
        }


        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": `System user successfully updated.`
        });


    } else {
        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": "Nothing to update."
        });
    }

});

router.delete('/delete', [verifyToken], async (req, res) => {

    let userId = req.body.id;
    let time = await commonObject.getGMT();

    let validateId = await commonObject.checkItsNumber(userId);

    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer."
        });
    } else {
        userId = validateId.data;
    }

    let existingUserInfo = await userModel.getUserDetailsById(userId);

    if (isEmpty(existingUserInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    if (existingUserInfo[0].role_id != 3) {
        return res.status(400).send({
            "success": false,
            "status": 404,
            "message": "User not found"
        });
    }

    let existingSystemUserInfo = await systemUserModel.getDataByWhereCondition({ "id": existingUserInfo[0].profile_id, "status": [1, 2] });

    if (isEmpty(existingSystemUserInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }


    let result = await userModel.deleteUserById(req.decoded.userInfo.id, time, userId, existingUserInfo[0].profile_id, 3);

    if (result.affectedRows == undefined || result.affectedRows == 0) {
        return res.status(500).send({
            "success": false,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "SystemUser account has successfully deleted."
    });

});

router.put('/changeStatus', [verifyToken], async (req, res) => {

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

    if (existingUserInfo[0].role_id != 3) {
        return res.status(400).send({
            "success": false,
            "status": 404,
            "message": "User not found"
        });
    }

    let existingSystemUserInfo = await systemUserModel.getDataByWhereCondition({ "id": existingUserInfo[0].profile_id });

    if (isEmpty(existingSystemUserInfo)) {
        return res.status(404)
            .send({
                "success": false,
                "status": 404,
                "message": "Data not found."
            });
    }

    let result = undefined;
    let newStatus = "";

    if (existingUserInfo[0].status === 1 && existingSystemUserInfo[0].status === 1) {
        result = await userModel.disableUserById(reqData.updated_by, reqData.updated_at, existingUserInfo[0].id, existingSystemUserInfo[0].id, existingUserInfo[0].role_id);
        newStatus = " Disable";
    } else if (existingUserInfo[0].status === 2 && existingSystemUserInfo[0].status === 2) {
        result = await userModel.enableUserById(reqData.updated_by, reqData.updated_at, existingUserInfo[0].id, existingSystemUserInfo[0].id, existingUserInfo[0].role_id);
        newStatus = " Enable";
    } else {
        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "SystemUser account is already delete."
        });
    }

    if (result.affectedRows == undefined || result.affectedRows == 0) {
        return res.status(500).send({
            "success": false,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "SystemUser status (" + newStatus + ") has successfully changed."
    });

});

router.get("/details/:id", [verifyToken], async (req, res) => {

    // get user info, first check user table by id, then get SystemUser info from system user table by profile_id,

    let id = req.params.id;
    let validateId = await commonObject.checkItsNumber(id);

    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Id should be integer."
        });
    } else {
        id = validateId.data;
    }



    let userInfoList = await userModel.getDataByWhereCondition({ "id": id, "role_id": { "not eq": 1 } }, { "id": "DESC" });


    if (isEmpty(userInfoList)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user found",
        });
    }

    let result = await systemUserModel.getDataByWhereCondition({ "id": userInfoList[0].profile_id })

    if (isEmpty(result)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user found",
        });
    }

    result[0].user_id = userInfoList[0].id;
    result[0].description = isEmpty(userInfoList[0].organization_details) ? '' : userInfoList[0].organization_details;

    try {
        let tempResult = await propertyModel.getDataByWhereCondition(
            { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
        result[0].total_active_post = tempResult.length;
    } catch (error) {
        result[0].total_active_post = 0;
    }


    return res.status(200).send({
        success: true,
        status: 200,
        message: "SystemUser Details.",
        "image_folder_path": imageFolderPath,
        data: result[0],
    });

});

router.post('/agent-list', [verifyToken], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }

    let searchData = {
        "status": { "not eq": 0 },
        "user_type": { "in": [2, 3] }
    }

    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 50;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    // if(!isEmpty(req.body.user_type)){
    //     if([2, 3, 4, "2", "3", "4"].includes(req.body.user_type)){
    //         searchData.user_type = req.body.user_type;
    //     }
    // }

    if (!isEmpty(req.body.name)) {
        try {
            req.body.name = req.body.name.trim();
        } catch (error) { }

        searchData.name = { "like": req.body.name };
    }

    if (!isEmpty(req.body.email)) {
        try {
            req.body.email = req.body.email.trim();
        } catch (error) { }

        searchData.email = { "like": req.body.email };
    }

    if (!isEmpty(req.body.phone)) {
        try {
            req.body.phone = req.body.phone.trim();
        } catch (error) { }

        searchData.phone = { "like": req.body.phone };
    }

    let result = await systemUserModel.getDataByWhereCondition(
        searchData, { "id": "ASC" },
        reqData.limit,
        reqData.offset, ["id", "name", "email", "phone", "user_type", "profile_image", "organization_name", "organization_details", "status"]
    );

    for (let i = 0; i < result.length; i++) {

        result[i].role_name = (result[i].user_type == 2) ? "Business Agent" : "Personal Agent";

        let userInfoList = await userModel.getDataByWhereCondition({ "profile_id": result[i].id, "role_id": result[i].user_type }, { "id": "ASC" });

        if (isEmpty(userInfoList)) {
            result.splice(i, 1);
            i--;
        } else {
            result[i].user_id = userInfoList[0].id;
            try {
                let tempResult = await propertyModel.getDataByWhereCondition(
                    { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
                result[i].total_active_post = tempResult.length;
            } catch (error) {
                result[i].total_active_post = 0;
            }
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Agent List.",
        "image_folder_path": imageFolderPath,
        "count": result.length,
        "data": result
    });
});

router.post('/public-agent-list', async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }

    let searchData = {
        "status": { "not eq": 0 },
        "user_type": { "in": [2, 3] }
    }

    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 50;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    if (!isEmpty(req.body.user_type)) {
        if ([2, 3, "2", "3"].includes(req.body.user_type)) {
            searchData.user_type = req.body.user_type;
        }
    }

    if (!isEmpty(req.body.name)) {
        try {
            req.body.name = req.body.name.trim();
        } catch (error) { }

        searchData.name = { "like": req.body.name };
    }

    // if (!isEmpty(req.body.email)) {
    //     try {
    //         req.body.email = req.body.email.trim();
    //     } catch (error) { }

    //     searchData.email = req.body.email;
    // }


    // if (!isEmpty(req.body.phone)) {
    //     try {
    //         req.body.phone = req.body.phone.trim();
    //     } catch (error) { }

    //     searchData.phone = req.body.phone;
    // }


    // "area": req.body.area,

    let result = [];

    let tempSearch = {
        "status": 1, "is_sold_out": 0, "is_published": 1
    }


    if (!isEmpty(req.body.location)) {

        try {




            // Location validation
            let validateLocationId = await commonObject.checkItsNumber(req.body.location);
            if (validateLocationId.success == false) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Location value should be integer."
                });
            } else {
                tempSearch.location = validateLocationId.data;
            }


            if (!isEmpty(req.body.area)) {
                // Area validation
                let validateAreaId = await commonObject.checkItsNumber(req.body.area);
                if (validateAreaId.success == false) {
                    return res.status(400).send({
                        "success": false,
                        "status": 400,
                        "message": "Area value should be integer."
                    });
                } else {
                    tempSearch.area = validateAreaId.data;
                }
            }



        } catch (error) { }

    }

    // else {
    //     result = await systemUserModel.getDataByWhereCondition(
    //         searchData, { "id": "ASC" },
    //         reqData.limit,
    //         reqData.offset, ["id", "name", "user_type", "profile_image", "organization_name", "organization_details", "status"]
    //     );
    // }


    let userList = new Set();
    let propertyList = await propertyModel.getDataByWhereCondition(tempSearch);
    propertyList.map(item => userList.add(item.post_owner_id));

    userList = [...userList];

    if (!isEmpty(userList)) {
        let tempUserList = await userModel.getDataByWhereCondition({
            "status": 1, "role_id": { "not eq": 1 }, "id": { "in": userList }
        })

        userList = tempUserList.map(item => item.profile_id);
    }

    userList.push(0);

    searchData.id = { "in": userList }

    result = await systemUserModel.getDataByWhereCondition(
        searchData, { "id": "ASC" },
        reqData.limit,
        reqData.offset, ["id", "name", "user_type", "profile_image", "organization_name", "organization_details", "status"]
    );




    for (let i = 0; i < result.length; i++) {

        result[i].role_name = (result[i].user_type == 2) ? "Business Agent" : "Personal Agent";

        let userInfoList = await userModel.getDataByWhereCondition({ "profile_id": result[i].id, "role_id": result[i].user_type }, { "id": "ASC" });

        if (isEmpty(userInfoList)) {
            result.splice(i, 1);
            i--;
        } else {
            result[i].user_id = userInfoList[0].id;
            try {
                let tempResult = await propertyModel.getDataByWhereCondition(
                    { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
                result[i].total_active_post = tempResult.length;
            } catch (error) {
                result[i].total_active_post = 0;
            }
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Agent List.",
        "image_folder_path": imageFolderPath,
        "count": result.length,
        "data": result
    });
});

router.get("/agent-public-details/:id", async (req, res) => {

    // get user info, first check user table by id, then get SystemUser info from system user table by profile_id,

    let id = req.params.id;
    let validateId = await commonObject.checkItsNumber(id);

    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Id should be integer."
        });
    } else {
        id = validateId.data;
    }



    let userInfoList = await userModel.getDataByWhereCondition({ "id": id, "role_id": { "in": [2, 3] } }, { "id": "DESC" });


    if (isEmpty(userInfoList)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user found",
        });
    }

    let result = await systemUserModel.getDataByWhereCondition({ "id": userInfoList[0].profile_id }, {}, 1, 0, [
        ["id", "name", "user_type", "profile_image", "organization_name", "organization_details", "status"]
    ])

    if (isEmpty(result)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user found",
        });
    }

    result[0].role_name = (result[0].user_type == 2) ? "Business Agent" : "Personal Agent";
    result[0].user_id = userInfoList[0].id;
    result[0].description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

    try {
        let tempResult = await propertyModel.getDataByWhereCondition(
            { "post_owner_id": req.decoded.userInfo.id, "status": 1 });
        result[0].total_active_post = tempResult.length;
    } catch (error) {
        result[0].total_active_post = 0;
    }


    return res.status(200).send({
        success: true,
        status: 200,
        message: "SystemUser Details.",
        "image_folder_path": imageFolderPath,
        data: result[0],
    });

});




module.exports = router;
module.exports = router;