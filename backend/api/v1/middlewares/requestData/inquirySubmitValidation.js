var express = require('express');
var router = express.Router();
const isEmpty = require("is-empty");
const commonObject = require('../../common/common');
const propertyModel = require('../../models/property');
const multer = require('multer');
var upload = multer({ dest: 'upload/' });
var fs = require('fs');
let moment = require('moment');
const bcrypt = require("bcrypt");


// var upload = multer({ storage: storage });

router.use(async function (req, res, next) {

    let reqData = {
        "property_id": req.body.property_id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
        "address": req.body.address,
        "details": req.body.details
    }


    let errorMessage = "";
    let isError = 0;

    // property check 
    let validateProperty = await commonObject.checkItsNumber(reqData.property_id);

    if (validateProperty.success == false) {
        isError = 1;
        errorMessage += "Invalid Property ID.";

    } else {

        req.body.property_id = validateProperty.data;
        reqData.property_id = validateProperty.data;

    }


    // name
    if (isEmpty(reqData.name)) {
        isError = 1;
        errorMessage += `Fill the Person Name. `;
    }

    // address
    if (isEmpty(reqData.address)) {
        isError = 1;
        errorMessage += `Fill the Address. `;
    }

    // details
    if (isEmpty(reqData.details)) {
        isError = 1;
        errorMessage += `Fill the Details. `;
    }

    // phone number   valid
    if (!isEmpty(reqData.phone)) {

        reqData.phone = await commonObject.removeExtraDigitInPhoneNumber(reqData.phone);
        let validateMobileNumber = await commonObject.isValidPhoneNumberOfBD(reqData.phone);

        if (validateMobileNumber == false) {
            isError = 1;
            errorMessage += " Mobile number is not valid. ";
        }
    } else {
        isError = 1;
        errorMessage += `Fill phone number. `;
    }

    // email validation
    if (!isEmpty(reqData.email)) {
        let validateEmail = await commonObject.isValidEmail(reqData.email);

        if (validateEmail == false) {
            isError = 1;
            errorMessage += " Email is not valid. ";
        }
    } else {
        isError = 1;
        errorMessage += `Fill email. `;
    }



    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    req.data = reqData;

    next();

});

module.exports = router;
