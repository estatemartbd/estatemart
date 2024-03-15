var express = require('express');
let router = express.Router();
const isEmpty = require("is-empty");
const commonObject = require('../../common/common');


// var upload = multer({ storage: storage });

router.use(async function (req, res, next) {

    let reqUserData = {
        "name": req.body.name,
        "email": req.body.email,
        "phone": req.body.phone,
        "password": req.body.password,
        "confirmPassword": req.body.confirm_password,
        "userType": req.body.user_type,
        "organizationName": req.body.organization_name,
        "organizationDetails": req.body.organization_details,
    }

    let errorMessage = "";
    let isError = 0;


    if (isEmpty(reqUserData.userType)) {
        reqUserData.userType = 3; // Genearal user
    } else if (![2, 3, 4, "2", "3", "4"].includes(reqUserData.userType)) {
        return res.status(400)
            .send({
                "success": false,
                "status": 400,
                "message": "Give valid user type."
            });
    } else if ([2, "2"].includes(reqUserData.userType)) {

        //  Check Extra info for BUSINESS Agent
        if (isEmpty(reqUserData.organizationName)) {
            return res.status(400)
                .send({
                    "success": false,
                    "status": 400,
                    "message": "Please give organization name."
                });
        }

        let validateOrganizationName = await commonObject.characterLimitCheck(reqUserData.organizationName, "organization name");
        if (validateOrganizationName.success == false) {
            isError = 1;
            errorMessage += validateOrganizationName.message;
        }
        reqUserData.organizationName = validateOrganizationName.data;


        reqUserData.organizationDetails = "";

        /*

        if (isEmpty(reqUserData.organizationDetails)) {
            reqUserData.organizationDetails = "";
            // return res.status(400)
            //     .send({
            //         "success": false,
            //         "status": 400,
            //         "message": "Please give organization details."
            //     });
        } else {

            console.log("Start");
            console.log(reqUserData.organizationDetails.length);
            console.log("End");

            let validateOrganizationDetails = await commonObject.characterLimitCheck(reqUserData.organizationDetails, "organization details");
            if (validateOrganizationDetails.success == false) {
                isError = 1;
                errorMessage += validateOrganizationDetails.message;
            }
            reqUserData.organizationDetails = validateOrganizationDetails.data;

        }

        */

    }

    // name valid
    if (isEmpty(reqUserData.name)) {
        return res.status(400)
            .send({
                "success": false,
                "status": 400,
                "message": "Please provide name."
            });
    }


    let validateName = await commonObject.characterLimitCheck(reqUserData.name, "Name");
    if (validateName.success == false) {
        isError = 1;
        errorMessage += validateName.message;
    }
    reqUserData.name = validateName.data;


    // email validation
    if (isEmpty(reqUserData.phone)) {
        isError = 1;
        errorMessage += "Please give phone no.";
    } else if (reqUserData.phone.length != 11) {
        isError = 1;
        errorMessage += "Please give valid phone no.";
    }


    if (!isEmpty(reqUserData.email)) {
        let validateEmail = await commonObject.isValidEmail(reqUserData.email);
        if (validateEmail == false) {
            isError = 1;
            errorMessage += "Email is not valid.";
        }
    }

    // password check
    let validatePassword = await commonObject.characterLimitCheck(reqUserData.password, "Password");
    if (validatePassword.success == false) {
        isError = 1;
        errorMessage += validatePassword.message;
    }
    reqUserData.password = validatePassword.data;

    if (reqUserData.password !== reqUserData.confirmPassword) {
        isError = 1;
        errorMessage += "Password and Confirm password should be same.";
    }


    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    req.registrationData = reqUserData;
    next();

});

module.exports = router;
