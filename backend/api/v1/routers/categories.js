const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const categoriesModel= require('../models/categories');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

// verifyToken , routeAccessChecker("categoryList")

router.get('/list', [], async (req, res) => {

    let result = await categoriesModel.getList();


    for (let index = 0; index < result.length; index++) {
        const element = result[index];

        if(isEmpty(element.sub_title)){
            if( result[index].title == "Apartment")  result[index].sub_title = "Best deals for your dream apartment.";
            else if( result[index].title == "Commercial")  result[index].sub_title = "Unlock opportunities in prime commercial spaces.";
            else if( result[index].title == "Hotel and Resort")  result[index].sub_title = "Experience luxury getaways.";
            else if( result[index].title == "House")  result[index].sub_title = "Discover your dream home.";
            else if( result[index].title == "Land")  result[index].sub_title = "Invest in exclusive land properties.";
            else if( result[index].title == "Room Mate/Sublet")  result[index].sub_title = "Explore flexible living options.";
            else result[index].sub_title = "";
        }
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Category List.",
        "count": result.length,
        "data": result
    });
});


module.exports = router;