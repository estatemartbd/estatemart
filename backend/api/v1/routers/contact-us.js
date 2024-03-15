const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const contactUsModel = require('../models/contact-us');
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const systemUserModel = require("../models/system-user");
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

const submitValidation = require('../middlewares/requestData/contactUsValidation');

router.get('/list-admin', [verifyToken, routeAccessChecker("contactUsList")], async (req, res) => {

    let result = await contactUsModel.getDataByWhereCondition(
        { status: 1 }
    );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Contact Us List.",
        "count": result.length,
        "data": result
    });
});

router.post('/list-admin-search', [verifyToken, routeAccessChecker("contactUsList")], async (req, res) => {


    let dataSearchConditionObject = {
        "status": 1
    };

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


    let result = await contactUsModel.getDataByWhereCondition(
        dataSearchConditionObject,
        { "id": "ASC" }
    );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Contact Us List.",
        "count": result.length,
        "data": result
    });
});


router.post('/submit', [submitValidation], async (req, res) => {

    let reqData = req.data;

    let result;

    // will add
    reqData.created_at = await commonObject.getGMT();
    reqData.updated_at = await commonObject.getGMT();

    result = await contactUsModel.addNew(reqData);


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
        "message": "Thank you for reaching out to us. We will get back to you soon."
    });

});

router.delete('/delete', [verifyToken, routeAccessChecker("deleteContactUS")], async (req, res) => {

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

    let existingData = await contactUsModel.getDataByWhereCondition(
        { id: reqData.id,  status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Data Delete.",
        });
    }

    let data = {
        status: 0,
        updated_by: reqData.updated_by,
        updated_at : await commonObject.getGMT()
    }

    let result = await contactUsModel.updateById(reqData.id, data);


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
        "message": "Data successfully deleted."
    });

});


router.post('/mark-read', [verifyToken, routeAccessChecker("readContactUS")], async (req, res) => {

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

    let existingData = await contactUsModel.getDataByWhereCondition(
        { id: reqData.id, status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Data to be Read.",
        });
    }

    if (existingData[0].is_read == 1) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Already Read .",
        });
    }

    let data = {
        is_read: 1,
        updated_by: reqData.updated_by
    }

    let result = await contactUsModel.updateById(reqData.id, data);


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
        "message": "Data successfully read."
    });

});



router.get("/details/:id", [verifyToken, routeAccessChecker("contactUSDetails")], async (req, res) => {


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

    let existingData = await contactUsModel.getDataByWhereCondition(
        { id: id, status: 1 }
    );

    if (isEmpty(existingData)) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Invalid Data.",
        });
    } else {

        return res.status(200).send({
            success: true,
            status: 200,
            message: "Contact Us Details.",
            data: existingData[0],
        });

    }

}
);





module.exports = router;