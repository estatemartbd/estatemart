const express = require("express");
const isEmpty = require("is-empty");
let moment = require('moment');
const router = express.Router();
const commonObject = require('../common/common');
const smsCommonObject = require('../common/sms');
const emailCommonObject = require('../common/email');
const commonImageWaterMarkObject = require('../common/imageWaterMark');

const propertyModel = require('../models/property');
const propertyImageModel = require('../models/property-image');
const outdoorAmenitiesModel = require('../models/outdoor-amenities');
const propertyDeviceClickCountModel = require('../models/property-device-click-count');
const indoorAmenitiesModel = require('../models/indoor-amenities');
const favouriteModel = require('../models/favourite');

const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const propertyAddMiddleware = require('../middlewares/requestData/property-add');
const { routeAccessChecker } = require('../middlewares/routeAccess');
const fileUploaderCommonObject = require("../common/fileUploader");
require('dotenv').config();

let imageFolderPath = `${process.env.backend_url}${process.env.property_image_path_name}`;
let imageResizeFolderPath = `${process.env.backend_url}${process.env.property_image_path_name}/resize`;

router.get('/list', [verifyToken], async (req, res) => {

    let result = [];

    if (req.decoded.role.id == 1) {
        result = await propertyModel.getDataByWhereCondition({}, { "id": "DESC" });
    } else {
        result = await propertyModel.getDataByWhereCondition(
            {
                "post_owner_id": req.decoded.userInfo.id
            }, { "id": "DESC" }
        );
    }

    //  console.log(req.decoded)

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );



    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', [verifyToken], async (req, res) => {

    let result = [];

    if (req.decoded.role.id == 1) {
        result = await propertyModel.getDataByWhereCondition(
            {
                "status": 1
            }, { "id": "DESC" }
        );
    } else {
        result = await propertyModel.getDataByWhereCondition(
            {
                "post_owner_id": req.decoded.userInfo.id, "status": 1
            }, { "id": "DESC" }
        );
    }

    //  console.log(req.decoded)

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "count": result.length,
        "data": result
    });
});

router.post('/property-list', [verifyToken], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1) {
        reqData.limit = 50;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }



    let result = [];
    let searchData = {};

    if ([0, 1, 2].includes(req.body.type)) {
        searchData.status = req.body.type;
    }

    if ([1, 2, '1', '2'].includes(req.body.purpose)) {
        searchData.purpose = req.body.purpose;
    }

    if ([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'].includes(req.body.category)) {
        searchData.category = req.body.category;
    }

    if (!isEmpty(req.body.location) && req.body.location != 0) {
        let validateLocationId = await commonObject.checkItsNumber(req.body.location);
        if (validateLocationId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Location value should be integer."
            });
        } else {
            searchData.purpose = validateLocationId.data;
        }
    }

    if (!isEmpty(req.body.area) && req.body.area != 0) {
        let validateAreaId = await commonObject.checkItsNumber(req.body.area);
        if (validateAreaId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Location value should be integer."
            });
        } else {
            searchData.area = validateAreaId.data;
        }
    }

    if (req.decoded.role.id != 1) {
        searchData.post_owner_id = req.decoded.userInfo.id;
    } else {

        if (!isEmpty(req.body.post_owner_id)) {
            searchData.post_owner_id = req.body.post_owner_id;

        } else if (!isEmpty(req.body.agent_name)) {

            try {
                req.body.agent_name = req.body.agent_name.trim();
            } catch (error) {
                req.body.agent_name = "A unknown user"
            }

            searchData.post_owner_id = { "IN QUERY": `Select esm_users.id from esm_system_users join esm_users on esm_system_users.id = esm_users.profile_id  where esm_system_users.name like '%${req.body.agent_name}%' and esm_users.role_id != 1 ` }
        }
    }

    // Advance search 
    // ...  new 

    if (!isEmpty(req.body.bedroom) && (isEmpty(req.body.category) || [1, 3, 4, 5, '1', '3', '4', '5'].includes(req.body.category))) {
        if (req.body.bedroom > 0) {
            searchData.bedroom = req.body.bedroom;
        }
    }


    if (!isEmpty(req.body.bathroom) && (isEmpty(req.body.category) || [1, 2, 4, 5, '1', '2', '4', '5'].includes(req.body.category))) {
        if (req.body.bathroom > 0) {
            searchData.bathroom = req.body.bathroom;
        }
    }

    if (!isEmpty(req.body.min_size) && !isEmpty(req.body.max_size)) {
        if (req.body.min_size < req.body.max_size) {
            searchData.size = [req.body.min_size, req.body.max_size]
        }
    }

    if (!isEmpty(req.body.min_price) && !isEmpty(req.body.max_price) && req.body.min_price > 0 && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = [req.body.min_price, req.body.max_price];
        }
    } else if (!isEmpty(req.body.min_price) && req.body.min_price > 0) {
        searchData.total_price = { "gte": req.body.min_price };

    } else if (!isEmpty(req.body.max_price) && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = { "LTE": req.body.max_price };
        }
    }

    // end new 


    result = await propertyModel.getDataByWhereCondition(
        searchData,
        { "id": "DESC" },
        reqData.limit,
        reqData.offset
    );



    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        // let post ower
        let postOwnerInfo = await commonObject.getUserInfoByUserId(result[index].post_owner_id);
        result[index].post_owner_info = postOwnerInfo.success ? postOwnerInfo.data : {};

        try {

            if (postOwnerInfo.success) {
                delete result[index].post_owner_info.status;
                delete result[index].post_owner_info.role_id;
                delete result[index].post_owner_info.created_by;
                delete result[index].post_owner_info.updated_by;
                delete result[index].post_owner_info.created_at;
                delete result[index].post_owner_info.updated_at;
                delete result[index].post_owner_info.address;
            }

        } catch (error) { }


    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "count": result.length,
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "data": result
    });
});

// public list
router.post('/list', async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1 || reqData.limit > 20) {
        reqData.limit = 20;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }



    let result = [];
    let searchData = {};

    // if ([0, 1, 2].includes(req.body.type)) {
    searchData.status = 1;
    // }


    if ([1, 2, '1', '2'].includes(req.body.purpose)) {
        searchData.purpose = req.body.purpose;
    }

    if (!isEmpty(req.body.location) && req.body.location != 0) {
        let validateLocationId = await commonObject.checkItsNumber(req.body.location);
        if (validateLocationId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Locataion value should be integer."
            });
        } else {
            searchData.purpose = validateLocationId.data;
        }
    }

    if (!isEmpty(req.body.area) && req.body.area != 0) {
        let validateAreaId = await commonObject.checkItsNumber(req.body.area);
        if (validateAreaId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Locataion value should be integer."
            });
        } else {
            searchData.area = validateAreaId.data;
        }
    }



    if ([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'].includes(req.body.category)) {
        searchData.category = req.body.category;
    }


    // advance search start

    if (!isEmpty(req.body.bedroom) && (isEmpty(req.body.category) || [1, 3, 4, 5, '1', '3', '4', '5'].includes(req.body.category))) {
        if (req.body.bedroom > 0) {
            searchData.bedroom = req.body.bedroom;
        }
    }


    if (!isEmpty(req.body.bathroom) && (isEmpty(req.body.category) || [1, 2, 4, 5, '1', '2', '4', '5'].includes(req.body.category))) {
        if (req.body.bathroom > 0) {
            searchData.bathroom = req.body.bathroom;
        }
    }

    if (!isEmpty(req.body.min_size) && !isEmpty(req.body.max_size)) {
        if (req.body.min_size < req.body.max_size) {
            searchData.size = [req.body.min_size, req.body.max_size]
        }
    }

    if (!isEmpty(req.body.min_price) && !isEmpty(req.body.max_price) && req.body.min_price > 0 && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = [req.body.min_price, req.body.max_price];
        }
    } else if (!isEmpty(req.body.min_price) && req.body.min_price > 0) {
        searchData.total_price = { "gte": req.body.min_price };

    } else if (!isEmpty(req.body.max_price) && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = { "LTE": req.body.max_price };
        }
    }

    // advanch search end

    result = await propertyModel.getDataByWhereCondition(
        searchData,
        { "id": "DESC" },
        reqData.limit,
        reqData.offset
    );

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );
    }

    let tempResult = [...result];

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "count": tempResult.length,
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "data": tempResult
    });

});


// public list after login
router.post('/list-after-login', [verifyToken], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1 || reqData.limit > 20) {
        reqData.limit = 20;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }



    let result = [];
    let searchData = {};

    // if ([0, 1, 2].includes(req.body.type)) {
    searchData.status = 1;
    // }


    if ([1, 2, '1', '2'].includes(req.body.purpose)) {
        searchData.purpose = req.body.purpose;
    }


    if ([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'].includes(req.body.category)) {
        searchData.category = req.body.category;
    }

    if (!isEmpty(req.body.location) && req.body.location != 0) {
        let validateLocationId = await commonObject.checkItsNumber(req.body.location);
        if (validateLocationId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Locataion value should be integer."
            });
        } else {
            searchData.purpose = validateLocationId.data;
        }
    }

    if (!isEmpty(req.body.area) && req.body.area != 0) {
        let validateAreaId = await commonObject.checkItsNumber(req.body.area);
        if (validateAreaId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Locataion value should be integer."
            });
        } else {
            searchData.area = validateAreaId.data;
        }
    }


    // advance search start

    if (!isEmpty(req.body.bedroom) && (isEmpty(req.body.category) || [1, 3, 4, 5, '1', '3', '4', '5'].includes(req.body.category))) {
        if (req.body.bedroom > 0) {
            searchData.bedroom = req.body.bedroom;
        }
    }


    if (!isEmpty(req.body.bathroom) && (isEmpty(req.body.category) || [1, 2, 4, 5, '1', '2', '4', '5'].includes(req.body.category))) {
        if (req.body.bathroom > 0) {
            searchData.bathroom = req.body.bathroom;
        }
    }

    if (!isEmpty(req.body.min_size) && !isEmpty(req.body.max_size)) {
        if (req.body.min_size < req.body.max_size) {
            searchData.size = [req.body.min_size, req.body.max_size]
        }
    }

    if (!isEmpty(req.body.min_price) && !isEmpty(req.body.max_price) && req.body.min_price > 0 && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = [req.body.min_price, req.body.max_price];
        }
    } else if (!isEmpty(req.body.min_price) && req.body.min_price > 0) {
        searchData.total_price = { "gte": req.body.min_price };

    } else if (!isEmpty(req.body.max_price) && req.body.max_price > 0) {
        if (req.body.min_price < req.body.max_price) {
            searchData.total_price = { "LTE": req.body.max_price };
        }
    }

    // advanch search end

    result = await propertyModel.getDataByWhereCondition(
        searchData,
        { "id": "DESC" },
        reqData.limit,
        reqData.offset
    );

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }

        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        // check is favourite
        if (req.decoded.role.id == 2 || req.decoded.role.id == 3) {
            let favouriteData = await favouriteModel.getDataByWhereCondition(
                {
                    "status": 1,
                    "user_id": req.decoded.userInfo.id,
                    "property_id": result[index].id
                }
            );

            if (isEmpty(favouriteData)) {
                result[index].is_favourite = false;
            } else {
                result[index].is_favourite = true;
            }
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "count": result.length,
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "data": result
    });

});

router.post('/add', [verifyToken, propertyAddMiddleware], async (req, res) => {

    let currentTime = await commonObject.getGMT();
    let postOwner = req.decoded.userInfo.id;

    if (req.decoded.userInfo.role_id == 1) postOwner = req.body.post_owner_id;


    //  file codes
    if (req.files && Object.keys(req.files).length > 0 && req.registrationData.category != 6 && req.files.floor_image) {

        let imageUploadCode = {};

        //image code
        if (req.files.floor_image) {

            imageUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                "floor_image",
                "floor_image"
            );

            if (imageUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: imageUploadCode.message,
                });
            }
            req.registrationData.floor_image = imageUploadCode.fileName;
            commonImageWaterMarkObject.makeWaterMarkInImage(imageUploadCode.fileName, imageUploadCode.filePath)

        }
    } else if (req.registrationData.category != 6 && req.registrationData.willCreate) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Please Upload a floor Image"
        });
    }


    if (req.files && Object.keys(req.files).length > 0 && req.files.property_image) {

        let imageUploadCode = {};


        //image code
        if (!Array.isArray(req.files.property_image)) {
            req.files.property_image = [req.files.property_image];
        }

        // Code for save multiple image
        let tempPropertyImageList = req.files.property_image;
        let tempPropertyImageNameList = [];


        for (let index = 0; index < tempPropertyImageList.length; index++) {
            req.files.property_image = tempPropertyImageList[index];

            imageUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                "property_image",
                "property_image",
                true
            );

            if (imageUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: imageUploadCode.message,
                });
            }

            tempPropertyImageNameList.push(imageUploadCode.fileName);
            commonImageWaterMarkObject.makeWaterMarkInImage(imageUploadCode.fileName, imageUploadCode.filePath)

            // console.log(tempPropertyImageNameList)
        }

        req.registrationData.property_image = tempPropertyImageNameList;


    } else if (req.registrationData.willCreate) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Please Upload an property image.",

        });
    }

    let saveData = {
        "property_name": req.registrationData.propertyName,
        "address": req.registrationData.address,
        "category": req.registrationData.category,
        "location": req.registrationData.location,
        "area": req.registrationData.area,
        "purpose": req.registrationData.purpose,
        "details": req.registrationData.details,
        // "key": req.registrationData.key,
        "description": req.registrationData.description,
        "post_owner_id": postOwner,
        "created_by": req.decoded.userInfo.id,
        "updated_by": req.decoded.userInfo.id,
        "meta_title": req.registrationData.meta_title,
        "meta_description": req.registrationData.meta_description,
        "meta_canonical_url": req.registrationData.meta_canonical_url,
        "meta_tag": req.registrationData.meta_tag
    }




    if (req.registrationData.category == 1) {
        saveData.size = req.registrationData.size;
        saveData.bedroom = req.registrationData.bedroom;
        saveData.bathroom = req.registrationData.bathroom;
        saveData.price_per_sqft = req.registrationData.pricePerSqft;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.floor = req.registrationData.floor;
        saveData.distance = JSON.stringify(req.registrationData.distance);
        // saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$");
        // saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$");

        if (!isEmpty(req.registrationData.indoorAmenities)) { saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$"); }
        if (!isEmpty(req.registrationData.outdoorAmenities)) { saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$"); }

    } else if (req.registrationData.category == 2) {
        saveData.size = req.registrationData.size;
        saveData.front_road = req.registrationData.frontRoad;  // Not set yet
        saveData.bathroom = req.registrationData.bathroom;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.floor = req.registrationData.floor;
        saveData.distance = JSON.stringify(req.registrationData.distance);
        // saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$");
        // saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$");

        if (!isEmpty(req.registrationData.indoorAmenities)) { saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$"); }
        if (!isEmpty(req.registrationData.outdoorAmenities)) { saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$"); }

    } else if (req.registrationData.category == 3) {
        saveData.size = req.registrationData.size;
        saveData.size_calculation_method = req.registrationData.sizeCalculationMethod;
        saveData.bedroom = req.registrationData.bedroom;
        saveData.unit_size = req.registrationData.unitSize;
        saveData.total_unit = req.registrationData.totalUnit;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.total_floor = req.registrationData.totalFloor;
        saveData.distance = JSON.stringify(req.registrationData.distance);
        // saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$");
        // saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$");

        if (!isEmpty(req.registrationData.indoorAmenities)) { saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$"); }
        if (!isEmpty(req.registrationData.outdoorAmenities)) { saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$"); }

    } else if (req.registrationData.category == 4) {
        saveData.size = req.registrationData.size;
        saveData.bedroom = req.registrationData.bedroom;
        saveData.bathroom = req.registrationData.bathroom;
        saveData.price_per_sqft = req.registrationData.pricePerSqft;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.distance = JSON.stringify(req.registrationData.distance);
        // saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$");
        // saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$");

        if (!isEmpty(req.registrationData.indoorAmenities)) { saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$"); }
        if (!isEmpty(req.registrationData.outdoorAmenities)) { saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$"); }


    } else if (req.registrationData.category == 5) {
        saveData.size = req.registrationData.size;
        saveData.bedroom = req.registrationData.bedroom;
        saveData.bathroom = req.registrationData.bathroom;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.floor = req.registrationData.floor;
        saveData.distance = JSON.stringify(req.registrationData.distance);
        // saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$");
        // saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$");

        if (!isEmpty(req.registrationData.indoorAmenities)) { saveData.indoor_amenities = req.registrationData.indoorAmenities.join("__$"); }
        if (!isEmpty(req.registrationData.outdoorAmenities)) { saveData.outdoor_amenities = req.registrationData.outdoorAmenities.join("__$"); }

    } else if (req.registrationData.category == 6) {
        saveData.size = req.registrationData.size;
        saveData.size_calculation_method = req.registrationData.sizeCalculationMethod;
        saveData.price_per_sqft = req.registrationData.pricePerSqft;
        saveData.total_price = req.registrationData.totalPrice;
        saveData.owner_ship = req.registrationData.ownerShip;
        saveData.distance = JSON.stringify(req.registrationData.distance);
    }

    let imageListObject = [];

    if (req.registrationData.hasOwnProperty("property_image")) {
        for (let index = 0; index < req.registrationData.property_image.length; index++) {
            const imageName = req.registrationData.property_image[index];
            imageListObject.push(
                {
                    "name": imageName,
                    "path": process.env.property_image_path,
                    "image_type": "property_image",
                    "created_by": req.decoded.userInfo.id,
                    "updated_by": req.decoded.userInfo.id,
                    "created_at": currentTime,
                    "updated_at": currentTime
                }
            );
        }
    }

    

    // console.log(req.registrationData.floor_image)


    if (req.registrationData.category != 6 && req.registrationData.hasOwnProperty("floor_image")) {

        // if(! Array.isArray(req.registrationData.floor_image)){
        //     req.registrationData.floor_image = [req.registrationData.floor_image];
        // }

        // for (let index = 0; index < req.registrationData.floor_image; index++) {
        // const imageName = req.registrationData.floor_image[index];  
        const imageName = req.registrationData.floor_image;
        imageListObject.push(
            {
                "name": imageName,
                "path": process.env.property_image_path,
                "image_type": "floor_image",
                "created_by": req.decoded.userInfo.id,
                "updated_by": req.decoded.userInfo.id,
                "created_at": currentTime,
                "updated_at": currentTime
            }
        );
        // }
    }



    // console.log(imageListObject)

    let result;
    let message = "added";

    if (req.registrationData.willCreate) {
        saveData.status = 1;
        // saveData.status = (req.decoded.userInfo.role_id == 1) ? 1 : 2;
        saveData.is_published = (req.decoded.userInfo.role_id == 1) ? 1 : 0;
        result = await propertyModel.addNew(saveData, imageListObject);

        if (req.decoded.userInfo.role_id != 1) {
            // sms a new user 
            smsCommonObject.sentSMS({
                phoneNo: process.env.adminPhoneNo,
                message: `A user add a new property. Plz review it`
            });

            // email
            let sendEmail = await emailCommonObject.sentEmailByHtmlFormate(
                process.env.adminEmailAddress,
                "Notification new post",
                "A user add a new property. Plz review it",
                `a user add a new property. Plz review it`,
                "#"
            );

        }

    } else {

        //  meta tag

        // try {
        //     if(!isEmpty(req.body.meta_tags)){
        //         let metaTags = req.body.meta_tags;
        //         if (!Array.isArray(metaTags)) {
        //             reqData.meta_tags = reqData.metaTags.join("__&^^&__");
        //         } else {
        //             reqData.meta_tags = [reqData.metaTags];
        //         }
        //     }
        // } catch (error) {}

        message = "updated";
        result = await propertyModel.updateById(req.body.id, saveData, imageListObject);
    }

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
        "message": `Property successfully ${message}.`
    });

});

router.post("/publicDetails", async (req, res) => {


    let id = req.body.id;
    let directionsId = req.headers.directions_id;
    let currentTime = await commonObject.getGMT();
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

    if (isEmpty(directionsId)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Please give directions_id."
        });
    }

    let result = await propertyModel.getDataByWhereCondition(
        { "id": id, "status": 1, "is_published" : 1 }, { "id": "ASC" }, undefined, undefined, undefined
    );

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });

    } else {

        result[0].distance = JSON.parse(result[0].distance);

        let tempIndoorAmenitiesId = [];

        try {
            tempIndoorAmenitiesId = result[0].indoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempIndoorAmenitiesId.length; index++) {
            try {
                tempIndoorAmenitiesId[index] = Number.parseInt(tempIndoorAmenitiesId[index]);
                tempIndoorAmenitiesId[index] = isNaN(tempIndoorAmenitiesId[index]) ? 0 : tempIndoorAmenitiesId[index];
            } catch (error) {
                tempIndoorAmenitiesId[index] = 0;
            }
        }

        result[0].indoor_amenities = [];

        if (tempIndoorAmenitiesId.length > 0) {
            let indoorAmenitiesDetails = await indoorAmenitiesModel.getDetailsByIdAndWhereIn(tempIndoorAmenitiesId);
            result[0].indoor_amenities = indoorAmenitiesDetails;
        }


        let tempOutdoorAmenitiesId = [];

        try {
            tempOutdoorAmenitiesId = result[0].outdoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempOutdoorAmenitiesId.length; index++) {
            try {
                tempOutdoorAmenitiesId[index] = Number.parseInt(tempOutdoorAmenitiesId[index]);
                tempOutdoorAmenitiesId[index] = isNaN(tempOutdoorAmenitiesId[index]) ? 0 : tempOutdoorAmenitiesId[index];
            } catch (error) {
                tempOutdoorAmenitiesId[index] = 0;
            }
        }


        result[0].outdoor_amenities = [];
        if (tempOutdoorAmenitiesId.length > 0) {
            let outdoorAmenitiesDetails = await outdoorAmenitiesModel.getDetailsByIdAndWhereIn(tempOutdoorAmenitiesId);
            result[0].outdoor_amenities = outdoorAmenitiesDetails;
        }

        result[0].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );

        result[0].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );


        // check is this device already visit this page click

        let clickCountRecords = await propertyDeviceClickCountModel.getDataByWhereCondition(
            { "user_browser_id": directionsId, "property_id": id }
        );

        if (isEmpty(clickCountRecords)) {
            // insert new records
            propertyDeviceClickCountModel.addNew({
                "user_browser_id": directionsId,
                "property_id": id,
                "user_id": 0,
                "created_at": currentTime,
                "updated_at": currentTime
            });

            propertyModel.updatePropertyClickCount(id);
        }

        // let post ower
        let postOwnerInfo = await commonObject.getUserInfoByUserId(result[0].post_owner_id);
        result[0].post_owner_info = postOwnerInfo.success ? postOwnerInfo.data : {};

        try {

            if (!isEmpty(result[0].post_owner_info)) {
                delete result[0].post_owner_info.id;
                delete result[0].post_owner_info.status;
                delete result[0].post_owner_info.role_id;
                delete result[0].post_owner_info.role;
                delete result[0].post_owner_info.email;
                delete result[0].post_owner_info.phone;
            }

        } catch (error) { }

        try {
            // meta tag add 
            result[0].meta_tags = result[0].meta_tags.split("__&^^&__");
        } catch (error) {
            result[0].meta_tags = [];
        }

        return res.status(200).send({
            success: true,
            status: 200,
            message: "Property Details.",
            imageFolderPath: imageFolderPath,
            imageResizeFolderPath: imageResizeFolderPath,
            data: result[0],
        });

    }

}
);

router.post("/detailsForAdminPanel", [verifyToken], async (req, res) => {


    let id = req.body.id;
    let directionsId = req.headers.directions_id;
    let currentTime = await commonObject.getGMT();
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

    let searchData = {
        "id": id
    }

    if(req.decoded.role.id != 1) {
        searchData.post_owner_id = req.decoded.userInfo.id;
    }
  

    let result = await propertyModel.getDataByWhereCondition(
        searchData, { "id": "ASC" }, undefined, undefined, undefined
    );

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });

    } else {

        result[0].distance = JSON.parse(result[0].distance);

        let tempIndoorAmenitiesId = [];

        try {
            tempIndoorAmenitiesId = result[0].indoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempIndoorAmenitiesId.length; index++) {
            try {
                tempIndoorAmenitiesId[index] = Number.parseInt(tempIndoorAmenitiesId[index]);
                tempIndoorAmenitiesId[index] = isNaN(tempIndoorAmenitiesId[index]) ? 0 : tempIndoorAmenitiesId[index];
            } catch (error) {
                tempIndoorAmenitiesId[index] = 0;
            }
        }

        result[0].indoor_amenities = [];

        if (tempIndoorAmenitiesId.length > 0) {
            let indoorAmenitiesDetails = await indoorAmenitiesModel.getDetailsByIdAndWhereIn(tempIndoorAmenitiesId);
            result[0].indoor_amenities = indoorAmenitiesDetails;
        }


        let tempOutdoorAmenitiesId = [];

        try {
            tempOutdoorAmenitiesId = result[0].outdoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempOutdoorAmenitiesId.length; index++) {
            try {
                tempOutdoorAmenitiesId[index] = Number.parseInt(tempOutdoorAmenitiesId[index]);
                tempOutdoorAmenitiesId[index] = isNaN(tempOutdoorAmenitiesId[index]) ? 0 : tempOutdoorAmenitiesId[index];
            } catch (error) {
                tempOutdoorAmenitiesId[index] = 0;
            }
        }


        result[0].outdoor_amenities = [];
        if (tempOutdoorAmenitiesId.length > 0) {
            let outdoorAmenitiesDetails = await outdoorAmenitiesModel.getDetailsByIdAndWhereIn(tempOutdoorAmenitiesId);
            result[0].outdoor_amenities = outdoorAmenitiesDetails;
        }

        result[0].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );

        result[0].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );


        // let post ower
        let postOwnerInfo = await commonObject.getUserInfoByUserId(result[0].post_owner_id);
        result[0].post_owner_info = postOwnerInfo.success ? postOwnerInfo.data : {};

        try {

            if (!isEmpty(result[0].post_owner_info)) {
                delete result[0].post_owner_info.id;
                delete result[0].post_owner_info.status;
                delete result[0].post_owner_info.role_id;
                delete result[0].post_owner_info.role;
                delete result[0].post_owner_info.email;
                delete result[0].post_owner_info.phone;
            }

        } catch (error) { }

        try {
            // meta tag add 
            result[0].meta_tags = result[0].meta_tags.split("__&^^&__");
        } catch (error) {
            result[0].meta_tags = [];
        }

        return res.status(200).send({
            success: true,
            status: 200,
            message: "Property Details.",
            imageFolderPath: imageFolderPath,
            imageResizeFolderPath: imageResizeFolderPath,
            data: result[0],
        });

    }

}
);

router.post("/details", [verifyToken], async (req, res) => {


    let id = req.body.id;
    let directionsId = req.headers.directions_id;
    let currentTime = await commonObject.getGMT();
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

    if (isEmpty(directionsId)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Please give directions_id."
        });
    }

    let result = await propertyModel.getDataByWhereCondition(
        { "id": id, "status": 1 }, { "id": "ASC" }, undefined, undefined, undefined
    );

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });

    } else {

        result[0].distance = JSON.parse(result[0].distance);

        let tempIndoorAmenitiesId = [];
        try {
            tempIndoorAmenitiesId = result[0].indoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempIndoorAmenitiesId.length; index++) {
            try {
                tempIndoorAmenitiesId[index] = Number.parseInt(tempIndoorAmenitiesId[index]);
                tempIndoorAmenitiesId[index] = isNaN(tempIndoorAmenitiesId[index]) ? 0 : tempIndoorAmenitiesId[index];
            } catch (error) {
                tempIndoorAmenitiesId[index] = 0;
            }
        }


        result[0].indoor_amenities = [];

        if (tempIndoorAmenitiesId.length > 0) {
            let indoorAmenitiesDetails = await indoorAmenitiesModel.getDetailsByIdAndWhereIn(tempIndoorAmenitiesId);
            result[0].indoor_amenities = indoorAmenitiesDetails;
        }


        let tempOutdoorAmenitiesId = [];

        try {
            tempOutdoorAmenitiesId = result[0].outdoor_amenities.split("__$");
        } catch (error) { }

        for (let index = 0; index < tempOutdoorAmenitiesId.length; index++) {
            try {
                tempOutdoorAmenitiesId[index] = Number.parseInt(tempOutdoorAmenitiesId[index]);
                tempOutdoorAmenitiesId[index] = isNaN(tempOutdoorAmenitiesId[index]) ? 0 : tempOutdoorAmenitiesId[index];
            } catch (error) {
                tempOutdoorAmenitiesId[index] = 0;
            }
        }

        result[0].outdoor_amenities = [];
        if (tempOutdoorAmenitiesId.length > 0) {
            let outdoorAmenitiesDetails = await outdoorAmenitiesModel.getDetailsByIdAndWhereIn(tempOutdoorAmenitiesId);
            result[0].outdoor_amenities = outdoorAmenitiesDetails;
        }

        result[0].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );

        result[0].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );


        // check is this device already visit this page click

        let clickCountRecords = await propertyDeviceClickCountModel.getDataByWhereCondition(
            { "user_browser_id": directionsId, "property_id": id }
        );

        if (isEmpty(clickCountRecords)) {
            // insert new records
            propertyDeviceClickCountModel.addNew({
                "user_browser_id": directionsId,
                "property_id": id,
                "user_id": 0,
                "created_at": currentTime,
                "updated_at": currentTime
            });

            propertyModel.updatePropertyClickCount(id);
        }

        // let post ower
        let postOwnerInfo = await commonObject.getUserInfoByUserId(result[0].post_owner_id);
        result[0].post_owner_info = postOwnerInfo.success ? postOwnerInfo.data : {};

        try {
            if (!isEmpty(result[0].post_owner_info)) {
                delete result[0].post_owner_info.status;
                delete result[0].post_owner_info.role_id;
                delete result[0].post_owner_info.email;
                delete result[0].post_owner_info.phone;
            }
        } catch (error) { }


        try {
            // meta tag add 
            result[0].meta_tags = result[0].meta_tags.split("__&^^&__");
        } catch (error) {
            result[0].meta_tags = [];
        }




        // check is favourite
        if (req.decoded.role.id == 2 || req.decoded.role.id == 3) {
            let favouriteData = await favouriteModel.getDataByWhereCondition(
                {
                    "status": 1,
                    "user_id": req.decoded.userInfo.id,
                    "property_id": id
                }
            );

            if (isEmpty(favouriteData)) {
                result[0].is_favourite = false;
            } else {
                result[0].is_favourite = true;
            }
        }




        return res.status(200).send({
            success: true,
            status: 200,
            message: "Property Details.",
            imageFolderPath: imageFolderPath,
            imageResizeFolderPath: imageResizeFolderPath,
            data: result[0],
        });

    }

}
);

router.post("/make-feature", [verifyToken], async (req, res) => {


    let id = req.body.property_id;
    let isFeatured = req.body.is_featured;
    let from_date = req.body.from_date;
    let to_date = req.body.to_date;
    let currentTime = await commonObject.getGMT();
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



    let result = await propertyModel.getDataByWhereCondition(
        { "id": id, "status": 1 }, { "id": "ASC" }, undefined, undefined, undefined
    );

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "Property data not found.",
        });

    } else {

        if (isFeatured == 1) {
            // date validation

            let today = new Date();

            if (isEmpty(from_date)) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Please fill up  Starting date. "
                });
            } else {

                let date = moment(from_date)

                if (date.isValid() == false) {
                    return res.status(400).send({
                        "success": false,
                        "status": 400,
                        "message": "Invalid Start Date. "
                    });
                }
            }

            if (isEmpty(to_date)) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Please fill up  End date. "
                });
            } else {
                let date = moment(to_date);

                if (date.isValid() == false) {
                    return res.status(400).send({
                        "success": false,
                        "status": 400,
                        "message": "Invalid End Date. "
                    });
                }

            }

            if (from_date > to_date) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Please give valid  start  date and end date."
                });
            }
        } else {
            from_date = null;
            to_date = null;
        }


        result[0].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );

        result[0].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[0].id }, { "id": "DESC" }
        );

        propertyModel.updateDataObjectById(id,
            {
                "is_featured": isFeatured,
                "feature_start_date": from_date,
                "feature_end_date": to_date
            });


        return res.status(200).send({
            success: true,
            status: 200,
            message: "Property Details.",
            data: result[0],
        });

    }

}
);


router.post('/feature-list', [], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }

    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1 || reqData.limit > 5) {
        reqData.limit = 5;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }

    let todayDate = new Date().toISOString().split('T')[0];



    let result = await propertyModel.getFeaturedListByDate(reqData.limit, reqData.offset, todayDate);

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].img_name = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );



    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Featured List.",
        "count": result.length,
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "data": result
    });
});

router.post('/agent-wise-property-list', async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }


    if (!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1 || reqData.limit > 20) {
        reqData.limit = 5;
    }

    if (!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0) {
        reqData.offset = 0;
    }



    let result = [];
    let searchData = {
        "status": 1
    };


    if (isEmpty(req.body.user_id)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Give agent id."
        });
    } else {
        let validateId = await commonObject.checkItsNumber(req.body.user_id);

        if (validateId.success == false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Agent id value should be integer."
            });
        } else {
            searchData.post_owner_id = validateId.data;
        }
    }

    // if ([0, 1, 2].includes(req.body.type)) {
    // searchData.status = 1;
    // }


    // if ([1, 2, '1', '2'].includes(req.body.purpose)) {
    //     searchData.purpose = req.body.purpose;
    // }


    // if ([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6'].includes(req.body.category)) {
    //     searchData.category = req.body.category;
    // }

    result = await propertyModel.getDataByWhereCondition(
        searchData,
        { "id": "DESC" },
        reqData.limit,
        reqData.offset
    );

    for (let index = 0; index < result.length; index++) {
        result[index].distance = JSON.parse(result[index].distance);

        try {
            result[index].indoor_amenities = (result[index].indoor_amenities).split("__$");
        } catch (error) {
            result[index].indoor_amenities = [];
        }

        try {
            result[index].outdoor_amenities = (result[index].outdoor_amenities).split("__$");
        } catch (error) {
            result[index].outdoor_amenities = [];
        }
        result[index].property_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "property_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );

        result[index].floor_image = await propertyImageModel.getDataByWhereCondition(
            { "image_type": "floor_image", "status": 1, "property_id": result[index].id }, { "id": "DESC" }
        );
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Property List.",
        "count": result.length,
        "imageFolderPath": imageFolderPath,
        "imageResizeFolderPath": imageResizeFolderPath,
        "data": result
    });

});


// is published
router.put('/publish', [verifyToken, routeAccessChecker("publishProperty")], async (req, res) => {

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

    let existingDataById = await propertyModel.getDataByWhereCondition({ "id": reqData.id, "status": 1 });
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    let data = {
        is_published: existingDataById[0].is_published == 0 ? 1 : 0,
        updated_by: reqData.updated_by
    }

    let result = await propertyModel.updateById(reqData.id, data);


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
        "message": "Property Publish status has successfully changed."
    });

});

// is sold out
router.put('/sold-out', [verifyToken, routeAccessChecker("soldOut")], async (req, res) => {

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

    let existingDataById = await propertyModel.getDataByWhereCondition({ "id": reqData.id, "status": 1, is_sold_out: 0 });
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    let data = {
        is_sold_out: 1,
        updated_by: reqData.updated_by
    }

    let result = await propertyModel.updateById(reqData.id, data);


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
        "message": "Property Sold Out."
    });

});

router.post("/similar-property", async (req, res) => {


    let id = req.body.id;
    let currentTime = await commonObject.getGMT();
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


    let result = await propertyModel.getDataByWhereCondition(
        { "id": id, "status": 1 }, { "id": "ASC" }, undefined, undefined, undefined
    );

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });

    } else {

        result = result[0];

        let similarPropertyList = await propertyModel.getDataByWhereCondition(
            {
                "status": 1, "id": { "not eq": id }, "category": result.category, "location": result.location, "area": result.area, "purpose": result.purpose, "is_sold_out": 0
            }, { "id": "DESC" }, 6
        );

        if (isEmpty(similarPropertyList)) {
            similarPropertyList = await propertyModel.getDataByWhereCondition(
                {
                    "status": 1, "id": { "not eq": id }, "category": result.category, "location": result.location, "purpose": result.purpose, "is_sold_out": 0
                }, { "id": "DESC" }, 6
            );
        }

        if (isEmpty(similarPropertyList)) {
            similarPropertyList = await propertyModel.getDataByWhereCondition(
                {
                    "status": 1, "id": { "not eq": id }, "category": result.category, "is_sold_out": 0
                }, { "id": "DESC" }, 6
            );
        }

        if (isEmpty(similarPropertyList)) {
            similarPropertyList = await propertyModel.getDataByWhereCondition(
                {
                    "status": 1, "id": { "not eq": id }, "category": result.category
                }, { "id": "DESC" }, 6
            );
        }



        for (let index = 0; index < similarPropertyList.length; index++) {
            similarPropertyList[index].distance = JSON.parse(similarPropertyList[index].distance);

            try {
                similarPropertyList[index].indoor_amenities = (similarPropertyList[index].indoor_amenities).split("__$");
            } catch (error) {
                similarPropertyList[index].indoor_amenities = [];
            }

            try {
                similarPropertyList[index].outdoor_amenities = (similarPropertyList[index].outdoor_amenities).split("__$");
            } catch (error) {
                similarPropertyList[index].outdoor_amenities = [];
            }
            similarPropertyList[index].property_image = await propertyImageModel.getDataByWhereCondition(
                { "image_type": "property_image", "status": 1, "property_id": similarPropertyList[index].id }, { "id": "DESC" }
            );

            similarPropertyList[index].floor_image = await propertyImageModel.getDataByWhereCondition(
                { "image_type": "floor_image", "status": 1, "property_id": similarPropertyList[index].id }, { "id": "DESC" }
            );

            // let post ower
            let postOwnerInfo = await commonObject.getUserInfoByUserId(similarPropertyList[index].post_owner_id);
            similarPropertyList[index].post_owner_info = postOwnerInfo.success ? postOwnerInfo.data : {};

            try {

                if (postOwnerInfo.success) {
                    delete similarPropertyList[index].post_owner_info.status;
                    delete similarPropertyList[index].post_owner_info.role_id;
                    delete similarPropertyList[index].post_owner_info.created_by;
                    delete similarPropertyList[index].post_owner_info.updated_by;
                    delete similarPropertyList[index].post_owner_info.created_at;
                    delete similarPropertyList[index].post_owner_info.updated_at;
                    delete similarPropertyList[index].post_owner_info.address;
                }

            } catch (error) { }


        }


        return res.status(200).send({
            success: true,
            status: 200,
            message: "Similar Property",
            imageFolderPath: imageFolderPath,
            imageResizeFolderPath: imageResizeFolderPath,
            data: similarPropertyList
        });

    }

}
);

module.exports = router;