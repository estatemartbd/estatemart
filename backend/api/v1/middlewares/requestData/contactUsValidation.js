var express = require('express');
var router = express.Router();
const isEmpty = require("is-empty");
const commonObject = require('../../common/common');
const multer = require('multer');
var upload = multer({ dest: 'upload/' });
var fs = require('fs');
let moment = require('moment');
const bcrypt = require("bcrypt");


// var upload = multer({ storage: storage });

router.use(async function (req, res, next) {

    let reqData = {
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
        "subject": req.body.subject,
        "message": req.body.message
    }


    let errorMessage = "";
    let isError = 0;

    // name
    if (isEmpty(reqData.name)) {
        isError = 1;
        errorMessage += `Fill the Person Name. `;
    }

    // subject
    if (isEmpty(reqData.subject)) {
        isError = 1;
        errorMessage += `Fill the subject. `;
    }

    // message
    if (isEmpty(reqData.message)) {
        isError = 1;
        errorMessage += `Fill the message. `;
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
