const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const favouriteModel = require('../models/favourite');
const propertyModel = require('../models/property');
const userModel = require("../models/user");
const adminModel = require("../models/admin");
const systemUserModel = require("../models/system-user");
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();


router.post('/make-favourite', [verifyToken, routeAccessChecker("makeFavourite")], async (req, res) => {

    let reqData = {
        "property_id": req.body.property_id
    }

    reqData.user_id = req.decoded.userInfo.id;
    reqData.created_by = req.decoded.userInfo.id;
    reqData.updated_by = req.decoded.userInfo.id;

    reqData.created_at = await commonObject.getGMT();
    reqData.updated_at = await commonObject.getGMT();


    // validate property_id id
    let validateId = await commonObject.checkItsNumber(reqData.property_id);

    if (validateId.success == false) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Property Id Value should be integer.",
        });
    } else {

        req.body.property_id = validateId.data;
        reqData.property_id = validateId.data;

    }

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

    // find this already in your favourite list
    let alreadyExist = await favouriteModel.getDataByWhereCondition(
        {
            "status": 1,
            "user_id": req.decoded.userInfo.id,
            "property_id": reqData.property_id
        }
    );

    if (isEmpty(alreadyExist)) {

        // insert to DB
        let result = await favouriteModel.addNew(reqData);

        if (result.affectedRows == undefined || result.affectedRows < 1) {
            return res.status(500).send({
                "success": false,
                "status": 500,
                "message": "Something Wrong in system database."
            });
        }

        return res.status(201).send({
            "success": true,
            "status": 201,
            "message": "Property has added to favorite list."
        });
    } else {
        // update by removing from favourite

        let updateData = {};

        updateData.status = 0;
        updateData.updated_by = req.decoded.userInfo.id;
        updateData.updated_at = await commonObject.getGMT();

        let result = await favouriteModel.updateById(alreadyExist[0].id, updateData);

        if (result.affectedRows == undefined || result.affectedRows < 1) {
            return res.status(500).send({
                "success": false,
                "status": 500,
                "message": "Something Wrong in system database."
            });
        }

        return res.status(201).send({
            "success": true,
            "status": 201,
            "message": "Property has removed from favorite list."
        });

    }

});


router.post('/my-favourite-properties', [verifyToken, routeAccessChecker("myFavouriteList")], async (req, res) => {


    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset
    }

    let dataSearchConditionObject = {
        "status": 1
    };

    // favourite properties
    let favoriteProperties = await favouriteModel.getDataByWhereCondition(
        {
            "status": 1,
            "user_id": req.decoded.userInfo.id
        }, { "created_at": "DESC" }
    );



    let propertyIds = [];

    for (let i = 0; i < favoriteProperties.length; i++) {
        propertyIds.push(favoriteProperties[i].property_id);
    }

    if (isEmpty(propertyIds)) {
        propertyIds = [0];
    }

    // insert property id in data search object
    dataSearchConditionObject.id = {
        "IN": propertyIds
    }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 5;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    let result = await propertyModel.getDataByWhereCondition(
        dataSearchConditionObject,
        { "created_at": "DESC" },
        reqData.limit,
        reqData.offset,
        []
    );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Favourite Property List.",
        "count": result.length,
        "data": result
    });
});


router.post('/all-favourite-properties', [verifyToken, routeAccessChecker("allFavouriteList")], async (req, res) => {


    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset
    }

    let dataSearchConditionObject = {
        "status": 1
    };


    // let propertyIds = [];

    // for (let i = 0; i < favoriteProperties.length; i++) {
    //     propertyIds.push(favoriteProperties[i].property_id);
    // }

    // if(isEmpty(propertyIds)){
    //     propertyIds = [0];
    // }

    // // insert property id in data search object
    // dataSearchConditionObject.id = {
    //     "IN": propertyIds
    // }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 5;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    // let result = await propertyModel.getDataByWhereCondition(
    //     dataSearchConditionObject,
    //     { "created_at": "DESC" },
    //     reqData.limit,
    //     reqData.offset,
    //     []
    // );

    // favourite properties
    let favoriteProperties = await favouriteModel.getDataByWhereCondition(
        {
            "status": 1
        }, { "created_at": "DESC" }, reqData.limit,
        reqData.offset,
    );


    for (let index = 0; index < favoriteProperties.length; index++) {
        const element = favoriteProperties[index];
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
        "message": "All Favourite Property List.",
        "count": favoriteProperties.length,
        "data": favoriteProperties
    });
});



module.exports = router;