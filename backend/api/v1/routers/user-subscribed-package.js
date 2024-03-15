const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const packageModel= require('../models/package');
const userModel= require('../models/user');
const userSubscribedPackageHistoryModel = require('../models/user-subscribed-package-history');
const userSubscribedPackageModel = require('../models/user-subscribed-package');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

router.get('/my-subscribe-package', [verifyToken], async (req, res) => {


    if (req.decoded.userInfo.role_id == 1) {
        return res.status(403).send({
            success: false,
            status: 403,
            message: "Can't access this route.",
        });
    }

    let subscribePackage = await commonObject.getUserCurrentPackageByUserId(req.decoded.userInfo.id);

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "my subscribe package info.",
        "data": subscribePackage
    });
});

router.post('/user-subscribe-package-info', [verifyToken], async (req, res) => {


    if (req.decoded.userInfo.role_id != 1) {
        return res.status(403).send({
            success: false,
            status: 403,
            message: "Can't access this route.",
        });
    }

    let userId = req.body.user_id;

    // User Details
    let validateUserId = await commonObject.checkItsNumber(userId);

    if (validateUserId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "User id should be integer."
        });

    } else {
        userId = validateUserId.data;
    }


    let userDetails = await userModel.getDataByWhereCondition(
        { "id": userId }
    );

    if (isEmpty(userDetails)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });
    }


    let subscribePackage = await commonObject.getUserCurrentPackageByUserId(userId);



    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "User subscribed package info.",
        "data": subscribePackage
    });

});


router.post('/subscribe-new-package-by-admin', [verifyToken], async (req, res) => {

    let packageId = req.body.package_id;
    let duration = req.body.duration;
    let postLimit = req.body.post_limit;
    let userId = req.body.user_id;

    if ([ 2, 3, 4].includes(req.decoded.userInfo.role_id)) {
        return res.status(403).send({
            success: false,
            status: 403,
            message: "Can't access this route.",
        });
    }


    // Check package 
    if (isEmpty(packageId)) {
        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "Please give a valid package id."
        });
    }

    let existingPackageData = await packageModel.getDataByWhereCondition(
        { "id": packageId, "status": 1 }
    );


    if (isEmpty(existingPackageData)) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": "Unknown Package"
        });
    }


    existingPackageData = existingPackageData[0];

    // User Details
    let validateUserId = await commonObject.checkItsNumber(userId);

    if (validateUserId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "User id should be integer."
        });

    } else {
        userId = validateUserId.data;
    }


    let userDetails = await userModel.getDataByWhereCondition(
        {"id": userId, "status" : {"not eq" : 0}, "role_id": {"not eq" : 1}}
    )

    if (isEmpty(userDetails)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "No user data found",
        });

    }


    if (!isEmpty(duration)) {
        let validateDuration = await commonObject.checkItsNumber(duration);
        if (validateDuration.success == false) {
            return res.status(409).send({
                "success": false,
                "status": 409,
                "message": "Duration should be a number."
            });
        } else {
            existingPackageData.duration = validateDuration.data;
        }
    }

    if (!isEmpty(postLimit)) {
        let validatePostLimit = await commonObject.checkItsNumber(postLimit);
        if (validatePostLimit.success == false) {
            return res.status(409).send({
                "success": false,
                "status": 409,
                "message": "Post limit should be a number."
            });
        } else {
            existingPackageData.total_post = validatePostLimit.data;
        }
    };


    let currentDateTime = await commonObject.getGMT();
    let subscribePackage = await commonObject.getUserCurrentPackageByUserId(userId);

    let packageSubscribeCreatedData, packageSubscribeUpdatedData = undefined;


    let expiredDate = await commonObject.getCustomDate(
        currentDateTime, existingPackageData.duration
    );


    if (subscribePackage == undefined) {

        packageSubscribeCreatedData = {
            package_id: existingPackageData.id,
            user_id: userId,
            total_post_available: existingPackageData.total_post,
            details: JSON.stringify(existingPackageData),
            expired_date: expiredDate,
            updated_by: req.decoded.userInfo.id,
            updated_at: currentDateTime,
            created_by: req.decoded.userInfo.id,
            updated_at: currentDateTime
        }

    } else {

        packageSubscribeUpdatedData = {
            "id": subscribePackage.id,
            "data": {
                package_id: existingPackageData.id,
                user_id: userId,
                total_post_available: existingPackageData.total_post,
                details: JSON.stringify(existingPackageData),
                expired_date: expiredDate,
                updated_by: req.decoded.userInfo.id,
                updated_at: currentDateTime
            }
        }
    }


    let packageSubscribeHistoryData = {
        package_id: existingPackageData.id,
        user_id: userId,
        details: JSON.stringify(existingPackageData),
        status: 1,
        created_by: req.decoded.userInfo.id,
        created_at: currentDateTime
    }

    let result;

    if (packageSubscribeCreatedData == undefined) {
        // update
        result = await userSubscribedPackageModel.updateWithMultipleInfo(packageSubscribeUpdatedData, packageSubscribeHistoryData);
    } else {
        //create
        result = await userSubscribedPackageModel.addNewWithMultipleInfo(packageSubscribeCreatedData, packageSubscribeHistoryData);
    }


    if (result.affectedRows == undefined || result.affectedRows < 1) {
        return res.status(500).send({
            "success": false,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Package successfully subscribe."
    });

});

router.post('/update-subscribe-package-by-admin', [verifyToken], async (req, res) => {

    let id = req.body.id;
    let packageId = req.body.package_id;
    let duration = req.body.duration;
    let postLimit = req.body.post_limit;


    if (req.decoded.userInfo.role_id != 1) {
        return res.status(403).send({
            success: false,
            status: 403,
            message: "Can't access this route.",
        });
    }

    let validateId = await commonObject.checkItsNumber(id);
    if (validateId.success == false) {

        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer.",
            "id": reqData.id

        });
    } else {
        req.body.id = validateId.data;
        id = validateId.data;

    }

    let existingDataById = await userSubscribedPackageModel.getDataByWhereCondition(
        { "id": id, "status": { "not eq": 0 } }
    );

    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    // Check package 
    if (isEmpty(packageId)) {
        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "Please give a valid package id."
        });
    }

    let existingPackageData = await packageModel.getDataByWhereCondition(
        { "id": packageId, "status": 1 }
    );


    if (isEmpty(existingPackageData)) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": "Unknown Package"
        });
    }


    let packageData = existingPackageData[0];

    // User Details


    let userDetails = await userModel.getUserById(existingDataById[0].user_id);

    if (isEmpty(userDetails)) {
        return res.status(404).send({
            success: false,
            status: 404,
            message: "User data not found",
        });

    }

    if (!isEmpty(duration)) {
        let validateDuration = await commonObject.checkItsNumber(duration);
        if (validateDuration.success == false) {
            return res.status(409).send({
                "success": false,
                "status": 409,
                "message": "Duration should be a number."
            });
        } else {
            packageData.duration = validateDuration.data;
        }
    }

    if (!isEmpty(postLimit)) {
        let validatePostLimit = await commonObject.checkItsNumber(postLimit);
        if (validatePostLimit.success == false) {
            return res.status(409).send({
                "success": false,
                "status": 409,
                "message": "Job post limit should be a number."
            });
        } else {
            packageData.total_job_post = validatePostLimit.data;
        }
    };

 

    let currentDateTime = await commonObject.getGMT();
    let packageSubscribeUpdatedData = undefined;


    let expiredDate = await commonObject.getCustomDate(
        currentDateTime, packageData.duration
    );


    packageSubscribeUpdatedData = {
        "id": id,
        "data": {
            package_id: packageData.id,
            total_post_available: packageData.total_post,
            details: JSON.stringify(packageData),
            expired_date: expiredDate,
            updated_by: req.decoded.userInfo.id,
            updated_at: currentDateTime
        }
    }



    let existingHistoryData = await userSubscribedPackageHistoryModel.getDataByWhereCondition(
        { "user_id": existingDataById[0].user_id, "package_id": existingDataById[0].package_id, "status": 1 }, { "id": "DESC" }
    );

    let latestHistoryData = existingHistoryData[0];

    let updatePackageSubscribeHistoryData = undefined;
    if (latestHistoryData.package_id != packageData.id) {
        updatePackageSubscribeHistoryData = {
            "id": latestHistoryData.id,
            "data": {
                package_id: packageData.id,
                details: JSON.stringify(packageData),
                updated_by: req.decoded.userInfo.id,
                updated_at: currentDateTime
            }
        }
    }


    let result;


    // update
    result = await userSubscribedPackageModel.updateSubscribedPackageWithMultipleInfo(packageSubscribeUpdatedData, updatePackageSubscribeHistoryData);



    if (result.affectedRows == undefined || result.affectedRows < 1) {
        return res.status(500).send({
            "success": false,
            "status": 500,
            "message": "Something Wrong in system database."
        });
    }


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Package successfully updated."
    });

});


module.exports = router;