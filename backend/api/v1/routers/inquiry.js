const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const inquiryModel = require('../models/inquiry');
const propertyModel = require('../models/property');
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const systemUserModel = require("../models/system-user");
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

const inquirySubmitValidation = require('../middlewares/requestData/inquirySubmitValidation');

router.get('/list-admin', [verifyToken, routeAccessChecker("inquiryAdminList")], async (req, res) => {

    let result = await inquiryModel.getDataByWhereCondition(
        {  status: 1 }
    );

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});

router.post('/list-admin-search', [verifyToken, routeAccessChecker("inquiryAdminList")], async (req, res) => {


    let dataSearchConditionObject = {
        "status": 1
    };

    if (!isEmpty(req.body.property_id) && !(req.body.property_id == undefined)) {  
        dataSearchConditionObject.property_id = req.body.property_id;
    }

    if (!isEmpty(req.body.name) && !(req.body.name == undefined)) {  
        dataSearchConditionObject.name = {
            "like": req.body.name
        };
    }

    if (!isEmpty(req.body.email) && !(req.body.email == undefined)) {  
        dataSearchConditionObject.email = {
            "like": req.body.email
        };
    }

    if (!isEmpty(req.body.phone) && !(req.body.phone == undefined)) {  
        dataSearchConditionObject.phone = {
            "like": req.body.phone
        };
    }

    if(req.body.is_read == 1 || req.body.is_read == 0){
        dataSearchConditionObject.is_read = req.body.is_read;
    }


    
    let result = await inquiryModel.getDataByWhereCondition(
        dataSearchConditionObject,
        { "id": "ASC" }
    );




    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});

router.get('/my-submitted-list', [verifyToken, routeAccessChecker("inquiryMySubmittedList")], async (req, res) => {

    let result = await inquiryModel.getDataByWhereCondition(
        {  status: 1, sender_id: req.decoded.userInfo.id  }
    );

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});

router.post('/my-submitted-search', [verifyToken, routeAccessChecker("inquiryMySubmittedList")], async (req, res) => {

    let dataSearchConditionObject = {
        "status": 1,
        "sender_id": req.decoded.userInfo.id
    };

    if (!isEmpty(req.body.property_id) && !(req.body.property_id == undefined)) {  
        dataSearchConditionObject.property_id = req.body.property_id;
    }

    // if (!isEmpty(req.body.name) && !(req.body.name == undefined)) {  
    //     dataSearchConditionObject.name = {
    //         "like": req.body.name
    //     };
    // }

    // if (!isEmpty(req.body.email) && !(req.body.email == undefined)) {  
    //     dataSearchConditionObject.email = {
    //         "like": req.body.email
    //     };
    // }

    // if (!isEmpty(req.body.phone) && !(req.body.phone == undefined)) {  
    //     dataSearchConditionObject.phone = {
    //         "like": req.body.phone
    //     };
    // }

    // if(req.body.is_read == 1 || req.body.is_read == 0){
    //     dataSearchConditionObject.is_read = req.body.is_read;
    // }

    let result = await inquiryModel.getDataByWhereCondition(
        dataSearchConditionObject,
        { "id": "ASC" }
    );


    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});

router.get('/my-received-list', [verifyToken], async (req, res) => {

    let result = await inquiryModel.getDataByWhereCondition(
        {  status: 1, receiver_id: req.decoded.userInfo.id  }
    );

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});

router.post('/my-received-search', [verifyToken], async (req, res) => {

    let dataSearchConditionObject = {
        "status": 1,
        "receiver_id": req.decoded.userInfo.id
    };

    if (!isEmpty(req.body.property_id) && !(req.body.property_id == undefined)) {  
        dataSearchConditionObject.property_id = req.body.property_id;
    }

    if (!isEmpty(req.body.name) && !(req.body.name == undefined)) {  
        dataSearchConditionObject.name = {
            "like": req.body.name
        };
    }

    if (!isEmpty(req.body.email) && !(req.body.email == undefined)) {  
        dataSearchConditionObject.email = {
            "like": req.body.email
        };
    }

    if (!isEmpty(req.body.phone) && !(req.body.phone == undefined)) {  
        dataSearchConditionObject.phone = {
            "like": req.body.phone
        };
    }

    if(req.body.is_read == 1 || req.body.is_read == 0){
        dataSearchConditionObject.is_read = req.body.is_read;
    }

    let result = await inquiryModel.getDataByWhereCondition(
        dataSearchConditionObject,
        { "id": "ASC" }
    );

   

    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: element.property_id
        }, undefined, undefined, undefined, []);
    
        if (isEmpty(propertyDetails)) {
            element.propertyDetails = {};
        } else {
            element.propertyDetails = propertyDetails[0];
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Inquiry List.",
        "count": result.length,
        "data": result
    });
});





router.put('/submit-inquiry', [verifyToken, routeAccessChecker("submitInquiry"), inquirySubmitValidation], async (req, res) => {

    let reqData = req.data;

    let propertyDetails = await propertyModel.getDataByWhereCondition({
        status: 1, id: reqData.property_id
    }, undefined, undefined, undefined, []);

    if (isEmpty(propertyDetails)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Property.",
        });
    }

    if (propertyDetails[0].post_owner_id == req.decoded.userInfo.id) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Inquiry Submission.",
        });
    }

    // check this property inquiry  already added or update
    let existingData = [];
    if (!isEmpty(req.body.id)) {
        reqData.id = req.body.id;
        let validateId = await commonObject.checkItsNumber(reqData.id);

        if (validateId.success == false) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: "Invalid ID.",
            });

        } else {

            req.body.id = validateId.data;
            reqData.id = validateId.data;

            // existing data
            existingData = await inquiryModel.getDataByWhereCondition(
                { id: reqData.id, property_id: reqData.property_id, sender_id: req.decoded.userInfo.id, status: 1 }
            );

            if (isEmpty(existingData)) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: "Invalid Inquiry Update.",
                });
            }

            if (existingData[0].is_read == 1) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: "Already Read .",
                });
            }

            if (existingData[0].created_by != req.decoded.userInfo.id) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: "Invalid user to update inquiry .",
                });
            }

        }
    }

    let result;
    if (isEmpty(existingData)) {
        // will add
        reqData.sender_id = req.decoded.userInfo.id;
        reqData.receiver_id = propertyDetails[0].post_owner_id;
        reqData.created_by = req.decoded.userInfo.id;
        reqData.updated_by = req.decoded.userInfo.id;
        reqData.created_at = await commonObject.getGMT();
        reqData.updated_at = await commonObject.getGMT();

        result = await inquiryModel.addNew(reqData);


    } else {
        // update data
        reqData.updated_by = req.decoded.userInfo.id;
        reqData.updated_at = await commonObject.getGMT();

        result = await inquiryModel.updateById(existingData[0].id, reqData);
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
        "message": "Inquiry Submitted successfully."
    });

});

router.delete('/delete', [verifyToken, routeAccessChecker("deleteInquiry")], async (req, res) => {

    let reqData = {
        "id": req.body.id
    }

    reqData.updated_by = req.decoded.userInfo.id;

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

    let existingData = await inquiryModel.getDataByWhereCondition(
        { id: reqData.id, sender_id: req.decoded.userInfo.id, status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Inquiry Delete.",
        });
    }


    let data = {
        status: 0,
        updated_by: reqData.updated_by
    }

    let result = await inquiryModel.updateById(reqData.id, data);


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
        "message": "Inquiry successfully deleted."
    });

});


router.post('/read-inquiry', [verifyToken, routeAccessChecker("readInquiry")], async (req, res) => {

    let reqData = {
        "id": req.body.id
    }

    reqData.updated_by = req.decoded.userInfo.id;

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

    let existingData = await inquiryModel.getDataByWhereCondition(
        { id: reqData.id,  status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Inquiry Read.",
        });
    }

    if (existingData[0].is_read == 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Already Read .",
        });
    }

    if(existingData[0].receiver_id != req.decoded.userInfo.id && req.decoded.role.id != 1){
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Can't mark this inquiry read .",
        });
    }

    let data = {
        is_read: 1,
        updated_by: reqData.updated_by
    }

    let result = await inquiryModel.updateById(reqData.id, data);


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
        "message": "Inquiry successfully read."
    });

});



router.get("/details/:id", [verifyToken, routeAccessChecker("inquiryDetails")], async (req, res) => {


    let id = req.params.id;

    let validateId = await commonObject.checkItsNumber(id);


    if (validateId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer."
        });
    } else {
        id = validateId.data;
    }

    let existingData = await inquiryModel.getDataByWhereCondition(
        { id: id, status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Inquiry.",
        });
    } else {

        let canSee = false;
        if (req.decoded.role.id == 2 || req.decoded.role.id == 3) {
            if ((existingData[0].sender_id == req.decoded.userInfo.id) || (existingData[0].receiver_id == req.decoded.userInfo.id)) {
                canSee = true;
            }

        } else {
            canSee = true;
        }

        if (canSee == false) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: "Invalid Access to see details.",
            });
        }

        let propertyDetails = await propertyModel.getDataByWhereCondition({
            status: 1, id: existingData[0].property_id
        }, undefined, undefined, undefined, []);

        if (isEmpty(propertyDetails)) {
            return res.status(400).send({
                success: false,
                status: 400,
                message: "Invalid Property.",
            });
        } else {
            existingData[0].propertyDetails = propertyDetails[0];
        }

        return res.status(200).send({
            success: true,
            status: 200,
            message: "Inquiry Details.",
            data: existingData[0],
        });

    }

}
);





module.exports = router;