var express = require('express');
let router = express.Router();
const isEmpty = require("is-empty");

const areaModel = require('../../models/area');
const propertyModel = require('../../models/property');
const commonObject = require('../../common/common');
const indoorAmenitiesModel = require('../../models/indoor-amenities');
const outdoorAmenitiesModel = require('../../models/outdoor-amenities');


// var upload = multer({ storage: storage });

router.use(async function (req, res, next) {

    let reqData = {
        "propertyName": req.body.property_name,
        "address": isEmpty(req.body.address) ? "" : req.body.address,
        "category": req.body.category,
        "location": req.body.location,
        "area": req.body.area,
        "purpose": req.body.purpose,
        "details": req.body.details,
        "meta_title": isEmpty(req.body.meta_title) ? req.body.property_name : req.body.meta_title,
        "meta_description": req.body.meta_description,
        "meta_canonical_url": req.body.meta_canonical_url,
        "meta_tag": req.body.meta_tag,
        "description": req.body.description,
        "willCreate": true  // User por maintaing create and update;
    }

    let errorMessage = "";
    let isError = 0;

    if(isEmpty(reqData.meta_title))  reqData.meta_title = "";
    if(isEmpty(reqData.meta_description))  reqData.meta_description = "";
    if(isEmpty(reqData.meta_canonical_url))  reqData.meta_canonical_url = "";
    if(isEmpty(reqData.meta_tag))  reqData.meta_tag = "";


    if (!isEmpty(req.body.id)) {
        let exitProperty = await propertyModel.getDataByWhereCondition({ "id": 1, "status": [1, 2] }, {}, 1, 0);

        if (isEmpty(exitProperty)) {
            return res.status(400).send({
                "success": false,
                "status": 404,
                "message": "Unknown property."
            });
        }

        reqData.willCreate = false;
    }


    // property name valid
    if (isEmpty(reqData.propertyName)) {

        return res.status(400)
            .send({
                "success": false,
                "status": 400,
                "message": "Please give property name."
            });
    }


    let validateName = await commonObject.characterLimitCheck(reqData.propertyName, "property name");
    if (validateName.success == false) {
        isError = 1;
        errorMessage += validateName.message;
    }
    reqData.name = validateName.data;



    // address valid
    if (isEmpty(reqData.address)) {

        return res.status(400)
            .send({
                "success": false,
                "status": 400,
                "message": "Please give address."
            });
    }


    let validateAddress = await commonObject.characterLimitCheck(reqData.address, "Address");
    if (validateAddress.success == false) {
        isError = 1;
        errorMessage += validateAddress.message;
    }
    reqData.address = validateAddress.data;




    // description valid
    if (isEmpty(reqData.description)) {

        return res.status(400)
            .send({
                "success": false,
                "status": 400,
                "message": "Please give description."
            });
    }


    let validateDescription = await commonObject.characterLimitCheck(reqData.description, "Description");
    if (validateDescription.success == false) {
        isError = 1;
        errorMessage += validateDescription.message;
    }
    reqData.name = validateDescription.data;


    // Location validation
    let validateLocationId = await commonObject.checkItsNumber(reqData.location);
    if (validateLocationId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Location value should be integer."
        });
    } else {
        reqData.location = validateLocationId.data;
    }



    // Area validation
    let validateAreaId = await commonObject.checkItsNumber(reqData.area);
    if (validateAreaId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Area value should be integer."
        });
    } else {
        reqData.area = validateAreaId.data;
    }



    // get are data from DB

    let areaDetails = await areaModel.getDataByWhereCondition(
        { "id": reqData.area, "status": 1 }
    );

    if (isEmpty(areaDetails) || areaDetails[0].parent_id == 0) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Unknown area. Please select valid area."
        });
    }


    if (areaDetails[0].parent_id != reqData.location) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Location id and area main location is not same."
        });
    }



    // purpose validation
    let validatePurposeId = await commonObject.checkItsNumber(reqData.purpose);
    if (validatePurposeId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Purpose value should be integer."
        });
    } else {
        reqData.purpose = validatePurposeId.data;
    }


    if (![1, 2, "1", "2"].includes(reqData.purpose)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Give valid purpose. Purpose should be Sale or Rent"
        });
    }


    // Category validation
    let validateCategoryId = await commonObject.checkItsNumber(reqData.category);
    if (validateCategoryId.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Category value should be integer."
        });
    } else {
        reqData.category = validateCategoryId.data;
    }


    if (!(reqData.category > 0 && reqData.category < 7)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Give valid category"
        });
    }


    if (reqData.category == 1) {
        reqData.size = req.body.size;
        reqData.bedroom = req.body.bedroom;
        reqData.bathroom = req.body.bathroom;
        reqData.pricePerSqft = req.body.price_per_sqft;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.floor = req.body.floor;
        reqData.distance = req.body.distance;
        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;
        reqData.propertyImage = req.body.property_image;
        reqData.floorPlanImage = req.body.floor_plan_image;


        //  Size check
        let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bedroom check
        numberCheckResult = await numberTypeCheck(reqData.bedroom, "Bedroom", { max: 20, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bathroom check
        numberCheckResult = await numberTypeCheck(reqData.bathroom, "Bathroom", { max: 20, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        if(reqData.purpose == 1) {

            // price Per Sqft check
            // if its sale post then we check it
            numberCheckResult = await numberTypeCheck(reqData.pricePerSqft, "Price Per Sqft", { max: 60000, min: 5 });
            if (numberCheckResult.success === false) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": numberCheckResult.message
                });
            }
        } else reqData.pricePerSqft = 0;

        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Total price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Floor check
        numberCheckResult = await numberTypeCheck(reqData.floor, "Floor", { max: 25, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;

        // Indoor amenities check

        if (!Array.isArray(reqData.indoorAmenities) && !isEmpty(reqData.indoorAmenities)) {
            reqData.indoorAmenities = [reqData.indoorAmenities];
        }

        let indoorAmenitiesResult = await indoorAmenitiesCheck(reqData.indoorAmenities);
        if (indoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": indoorAmenitiesResult.message
            });
        }

        // Outdoor amenities  check

        if (!Array.isArray(reqData.outdoorAmenities) && !isEmpty(reqData.outdoorAmenities)) {
            reqData.outdoorAmenities = [reqData.outdoorAmenities];
        }

        let outdoorAmenitiesResult = await outdoorAmenitiesCheck(reqData.outdoorAmenities);
        if (outdoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": outdoorAmenitiesResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert


        try {

            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);


        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    } else if (reqData.category == 2) {
        reqData.size = req.body.size;
        reqData.frontRoad = req.body.front_road;  // Not set yet
        reqData.bathroom = req.body.bathroom;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.floor = req.body.floor;
        reqData.distance = req.body.distance;
        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;
        reqData.propertyImage = req.body.property_image;
        reqData.floorPlanImage = req.body.floor_plan_image;


        //  Size check
        let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        // Bathroom check
        numberCheckResult = await numberTypeCheck(reqData.bathroom, "Bathroom", { max: 20, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Total price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Floor check
        numberCheckResult = await numberTypeCheck(reqData.floor, "Floor", { max: 25, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // frontRoad check
        numberCheckResult = await numberTypeCheck(reqData.frontRoad, "Front road", { max: 1000, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;

        // Indoor amenities check

        if (!Array.isArray(reqData.indoorAmenities) && !isEmpty(reqData.indoorAmenities)) {
            reqData.indoorAmenities = [reqData.indoorAmenities];
        }

        let indoorAmenitiesResult = await indoorAmenitiesCheck(reqData.indoorAmenities);
        if (indoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": indoorAmenitiesResult.message
            });
        }

        // Outdoor amenities  check

        if (!Array.isArray(reqData.outdoorAmenities) && !isEmpty(reqData.outdoorAmenities)) {
            reqData.outdoorAmenities = [reqData.outdoorAmenities];
        }

        let outdoorAmenitiesResult = await outdoorAmenitiesCheck(reqData.outdoorAmenities);
        if (outdoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": outdoorAmenitiesResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert


        try {

            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);


        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    } else if (reqData.category == 3) { // house
        // reqData.size = req.body.size;
        reqData.size = 0;
        reqData.sizeCalculationMethod = req.body.size_calculation_method;
        reqData.bedroom = req.body.bedroom;
        reqData.unitSize = req.body.unit_size;
        reqData.totalUnit = req.body.total_unit;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.totalFloor = req.body.total_floor;
        reqData.distance = req.body.distance;
        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;
        reqData.propertyImage = req.body.property_image;
        reqData.floorPlanImage = req.body.floor_plan_image;


        //  Size check
        // let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        // if (numberCheckResult.success === false) {
        //     return res.status(400).send({
        //         "success": false,
        //         "status": 400,
        //         "message": numberCheckResult.message
        //     });
        // }

        //  Size Calculation Method check
        numberCheckResult = await numberTypeCheck(reqData.sizeCalculationMethod, "Size Calculation Method", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        //  total Unit check
        numberCheckResult = await numberTypeCheck(reqData.totalUnit, "Total unit", { max: 200, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        //  Unit Size  check
        numberCheckResult = await numberTypeCheck(reqData.unitSize, "Unit size ", { max: 12000, min: 100 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        //  total Floor check
        numberCheckResult = await numberTypeCheck(reqData.totalFloor, "Total floor", { max: 35, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bedroom check
        numberCheckResult = await numberTypeCheck(reqData.bedroom, "Bedroom", { max: 20, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // bedroom check
        numberCheckResult = await numberTypeCheck(reqData.bedroom, "Bedroom", { max: 20, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Total price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;

        // Indoor amenities check

        if (!Array.isArray(reqData.indoorAmenities) && !isEmpty(reqData.indoorAmenities)) {
            reqData.indoorAmenities = [reqData.indoorAmenities];
        }

        let indoorAmenitiesResult = await indoorAmenitiesCheck(reqData.indoorAmenities);
        if (indoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": indoorAmenitiesResult.message
            });
        }

        // Outdoor amenities  check

        if (!Array.isArray(reqData.outdoorAmenities) && !isEmpty(reqData.outdoorAmenities)) {
            reqData.outdoorAmenities = [reqData.outdoorAmenities];
        }

        let outdoorAmenitiesResult = await outdoorAmenitiesCheck(reqData.outdoorAmenities);
        if (outdoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": outdoorAmenitiesResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert


        try {

            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);


        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    } else if (reqData.category == 4) {  //  hotel & resort
        reqData.size = req.body.size;
        reqData.bedroom = req.body.bedroom;
        reqData.bathroom = req.body.bathroom;
        // reqData.pricePerSqft = req.body.price_per_sqft;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.distance = req.body.distance;
        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;
        reqData.propertyImage = req.body.property_image;
        reqData.floorPlanImage = req.body.floor_plan_image;


        //  Size check
        let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bedroom check
        numberCheckResult = await numberTypeCheck(reqData.bedroom, "Bedroom", { max: 20, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bathroom check
        numberCheckResult = await numberTypeCheck(reqData.bathroom, "Bathroom", { max: 20, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Total price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;

        // Indoor amenities check

        if (!Array.isArray(reqData.indoorAmenities) && !isEmpty(reqData.indoorAmenities)) {
            reqData.indoorAmenities = [reqData.indoorAmenities];
        }

        let indoorAmenitiesResult = await indoorAmenitiesCheck(reqData.indoorAmenities);
        if (indoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": indoorAmenitiesResult.message
            });
        }

        // Outdoor amenities  check

        if (!Array.isArray(reqData.outdoorAmenities) && !isEmpty(reqData.outdoorAmenities)) {
            reqData.outdoorAmenities = [reqData.outdoorAmenities];
        }

        let outdoorAmenitiesResult = await outdoorAmenitiesCheck(reqData.outdoorAmenities);
        if (outdoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": outdoorAmenitiesResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert


        try {

            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);


        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    } else if (reqData.category == 6) {
        reqData.size = req.body.size;
        reqData.bedroom = req.body.bedroom;
        reqData.bathroom = req.body.bathroom;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.floor = req.body.floor;
        reqData.distance = req.body.distance;
        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;
        reqData.propertyImage = req.body.property_image;
        reqData.floorPlanImage = req.body.floor_plan_image;


        //  Size check
        let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bedroom check
        numberCheckResult = await numberTypeCheck(reqData.bedroom, "Bedroom", { max: 20, min: 0 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Bathroom check
        numberCheckResult = await numberTypeCheck(reqData.bathroom, "Bathroom", { max: 20, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Rent price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Floor check
        numberCheckResult = await numberTypeCheck(reqData.floor, "Floor", { max: 25, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        reqData.indoorAmenities = req.body.indoor_amenities;
        reqData.outdoorAmenities = req.body.outdoor_amenities;

        // Indoor amenities check

        if (!Array.isArray(reqData.indoorAmenities) && !isEmpty(reqData.indoorAmenities)) {
            reqData.indoorAmenities = [reqData.indoorAmenities];
        }

        let indoorAmenitiesResult = await indoorAmenitiesCheck(reqData.indoorAmenities);
        if (indoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": indoorAmenitiesResult.message
            });
        }

        // Outdoor amenities  check

        if (!Array.isArray(reqData.outdoorAmenities) && !isEmpty(reqData.outdoorAmenities)) {
            reqData.outdoorAmenities = [reqData.outdoorAmenities];
        }

        let outdoorAmenitiesResult = await outdoorAmenitiesCheck(reqData.outdoorAmenities);
        if (outdoorAmenitiesResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": outdoorAmenitiesResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert


        try {

            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);


        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    } else if (reqData.category == 5) { // land
        reqData.size = req.body.size;
        reqData.sizeCalculationMethod = req.body.size_calculation_method;
        reqData.pricePerSqft = req.body.price_per_sqft;
        reqData.totalPrice = req.body.total_price;
        reqData.ownerShip = req.body.owner_ship;
        reqData.distance = req.body.distance;
        reqData.propertyImage = req.body.property_image;


        //  Size check
        let numberCheckResult = await numberTypeCheck(reqData.size, "Size", { max: 9000, min: 500 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        //  Size Calculation Method check
        numberCheckResult = await numberTypeCheck(reqData.sizeCalculationMethod, "Size Calculation Method", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // price Per Sqft check
        numberCheckResult = await numberTypeCheck(reqData.pricePerSqft, "Price Per Sqft", { max: 60000, min: 5 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        // total Price check
        numberCheckResult = await numberTypeCheck(reqData.totalPrice, "Total price", { max: 100000000, min: 50 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }

        // Owner Ship check
        numberCheckResult = await numberTypeCheck(reqData.ownerShip, "Ownership", { max: 3, min: 1 });
        if (numberCheckResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": numberCheckResult.message
            });
        }


        // Distance  check

        if (!Array.isArray(reqData.distance) && !isEmpty(reqData.distance)) {
            reqData.distance = [reqData.distance];
        }


        // JSON string to Object convert

        try {
            for (let index = 0; index < reqData.distance.length; index++)
                reqData.distance[index] = JSON.parse(reqData.distance[index]);

        } catch (error) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Distance is wrong formate."
            });
        }


        let distanceResult = await distanceCheck(reqData.distance);
        if (distanceResult.success === false) {
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": distanceResult.message
            });
        }
    }


    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }


    // return res.status(200).send({
    //     "success": true,
    //     "status": 200,
    //     "message": "Good "
    // });

    req.registrationData = reqData;
    next();

});


let numberTypeCheck = async (number = undefined, name = "", limit = { "max": undefined, "min": undefined }) => {
    return new Promise((resolve, reject) => {
        let response = { message: "", success: true }

        if (number === undefined) {
            response.success = false;
            response.message = `Please give ${name} info.`;
        } else if (isNaN(number)) {
            response.success = false;
            response.message = `${name} should be number.`;
        } else if (!(limit === undefined || (limit.max === undefined && limit.min === undefined)) && (limit.min > number || limit.max < number)) {
            response.success = false;
            response.message = `${name} should be getter than ${limit.min} and less than ${limit.max}.`;
        }

        return resolve(response);
    });
}


let indoorAmenitiesCheck = async (amenities = []) => {

    return new Promise(async (resolve, reject) => {
        let response = { message: "", success: true };

        if (!Array.isArray(amenities)) {
            return resolve({ message: "Please give indoor amenities. Which is array.", success: false });
        }

        for (let index = 0; index < amenities.length; index++) {
            if (isNaN(amenities[index])) {
                return resolve({ message: `Indoor amenities should be number but get ${amenities[index]}.`, success: false });
            } else {
                let amenitieDetails = await indoorAmenitiesModel.getDataByWhereCondition(
                    { "id": amenities[index], "status": 1 }, { "id": "ASC" }, 1, 0
                );

                if (isEmpty(amenitieDetails)) {
                    return resolve({ message: `Unknown indoor amenities: ${amenities[index]}.`, success: false });
                }
            }
        }

        return resolve(response);
    });
}


let outdoorAmenitiesCheck = async (amenities = []) => {

    return new Promise(async (resolve, reject) => {
        let response = { message: "", success: true };

        if (!Array.isArray(amenities)) {
            return resolve({ message: "Please give outdoor amenities. Which is array.", success: false });
        }

        for (let index = 0; index < amenities.length; index++) {
            if (isNaN(amenities[index])) {
                return resolve({ message: `Outdoor amenities should be number but get ${amenities[index]}.`, success: false });
            } else {
                let amenitieDetails = await outdoorAmenitiesModel.getDataByWhereCondition(
                    { "id": amenities[index], "status": 1 }, { "id": "ASC" }, 1, 0
                );

                if (isEmpty(amenitieDetails)) {
                    return resolve({ message: `Unknown outdoor amenitie: ${amenities[index]}.`, success: false });
                }
            }
        }

        return resolve(response);
    });
}


let distanceCheck = async (distances = []) => {

    return new Promise(async (resolve, reject) => {
        let response = { message: "", success: true };

        if (!Array.isArray(distances)) {
            return resolve({ message: "Please give distances. Which is array.", success: false });
        }

        // console.log(distances)

        let tempDistance = [];

        for (let index = 0; index < distances.length; index++) {

            try {
                if (tempDistance.includes(distances[index].name.toUpperCase())) {
                    return resolve({ message: `Duplicate distance found in : ${distances[index].name}.`, success: false });
                } else {
                    tempDistance.push(distances[index].name.toUpperCase());
                }
            } catch (error) {
                // console.log("error found");
                // console.log(error);
                return resolve({ message: `Duplicate distance found: ${distances[index].name}.`, success: false });

            }
        }

        return resolve(response);
    });
}




module.exports = router;
