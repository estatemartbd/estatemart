const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const outdoorAmenitiesModel= require('../models/outdoor-amenities');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

// verifyToken, routeAccessChecker("outdoorAmenitiesActiveList")
// verifyToken,routeAccessChecker("outdoorAmenitiesDetails")

router.get('/list', [verifyToken , routeAccessChecker("outdoorAmenitiesList")], async (req, res) => {

    let result = await outdoorAmenitiesModel.getList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Outdoor Amenities List.",
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', [], async (req, res) => {

    let result = await outdoorAmenitiesModel.getActiveList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Outdoor Amenities List.",
        "count": result.length,
        "data": result
    });
});

router.post('/list', [verifyToken, routeAccessChecker("outdoorAmenitiesListLimit")], async (req, res) => {

    let reqData = {
        "limit": req.body.limit,
        "offset": req.body.offset,
    }

    if(!(await commonObject.checkItsNumber(reqData.limit)).success || reqData.limit < 1){
        reqData.limit = 50;
    }

    if(!(await commonObject.checkItsNumber(reqData.offset)).success || reqData.offset < 0){
        reqData.offset = 0;
    }
    let result = await outdoorAmenitiesModel.getDataByWhereCondition(
        {"status" : 1},
        {"id":"ASC"},
        reqData.limit,
        reqData.offset
        );

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Outdoor Amenities List.",
        "count": result.length,
        "data": result
    });
});



router.post('/add', [verifyToken, routeAccessChecker("outdoorAmenitiesAdd")], async (req, res) => {

    let reqData = {
        "title": req.body.title
    }

    reqData.created_by = req.decoded.userInfo.id;
    reqData.updated_by = req.decoded.userInfo.id;

    let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Outdoor Amenities");

    if (validateTitle.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": validateTitle.message,
 
        });
    }

    reqData.title = validateTitle.data;

    let existingData = await outdoorAmenitiesModel.getByTitle(reqData.title);


    if (!isEmpty(existingData)) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": existingData[0].status == "1" ? "This Outdoor Amenities Already Exists." : "This Outdoor Amenities Already Exists but Deactivate, You can activate it."
        });

    }

    let result = await outdoorAmenitiesModel.addNew(reqData);

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
        "message": "Outdoor Amenities Added Successfully."
    });

});



router.put('/update', [verifyToken, routeAccessChecker("outdoorAmenitiesUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        "title": req.body.title
    }

    reqData.updated_by = req.decoded.userInfo.id;

    let validateId = await commonObject.checkItsNumber(reqData.id);
    if (validateId.success == false) {

        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Value should be integer.",
            "id": reqData.id

        });
    } else {
        req.body.id = validateId.data;
        reqData.id = validateId.data;
        
    }

    let existingDataById = await outdoorAmenitiesModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    } 

    let updateData = {};

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no
    let willWeUpdate = 0; // 1 = yes , 0 = no;

    // title
    if (existingDataById[0].title !== reqData.title) {

      let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Outdoor Amenities");

      if (validateTitle.success == false) {
          isError = 1;
          errorMessage += validateTitle.message;
      } else {

        let existingDataByTitle = await outdoorAmenitiesModel.getByTitle(reqData.title);

        if (!isEmpty(existingDataByTitle) && existingDataByTitle[0].id != reqData.id) {
          
          isError = 1;
          errorMessage += existingDataByTitle[0].status == "1" ? "This Outdoor Amenities Already Exist." : "This Outdoor Amenities Already Exist but Deactivate, You can activate it."
        }

          reqData.title = validateTitle.data;
          willWeUpdate = 1;
          updateData.title = reqData.title;

      }

  }


  if (isError == 1) {
    return res.status(400).send({
        "success": false,
        "status": 400,
        "message": errorMessage
    });
}

if (willWeUpdate == 1) {

  updateData.updated_by = req.decoded.userInfo.id;


  let result = await outdoorAmenitiesModel.updateById(reqData.id,updateData);


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
      "message": "Outdoor Amenities successfully updated."
  });


} else {
  return res.status(200).send({
      "success": true,
      "status": 200,
      "message": "Nothing to update."
  });
}

});



router.delete('/delete', [verifyToken, routeAccessChecker("outdoorAmenitiesDelete")], async (req, res) => {

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

    let existingDataById = await outdoorAmenitiesModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

     let data = {
      status : 0,
      updated_by : reqData.updated_by
     }

     let result = await outdoorAmenitiesModel.updateById(reqData.id,data);


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
         "message": "Outdoor Amenities successfully deleted."
     });

});

router.put('/changeStatus', [verifyToken, routeAccessChecker("changeOutdoorAmenitiesStatus")], async (req, res) => {

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

      let existingDataById = await outdoorAmenitiesModel.getById(reqData.id);
      if (isEmpty(existingDataById)) {

          return res.status(404).send({
              "success": false,
              "status": 404,
              "message": "No data found",

          });
      }

      let data = {
        status: existingDataById[0].status == 1 ? 2 : 1,
        updated_by : reqData.updated_by
    }

    let result = await outdoorAmenitiesModel.updateById(reqData.id,data);


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
        "message": "Outdoor Amenities status has successfully changed."
    });

});

router.get("/details/:id",[],async (req, res) => {


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

    let result = await outdoorAmenitiesModel.getById(id);

    if (isEmpty(result)) {

      return res.status(404).send({
        success: false,
        status: 404,
        message: "No data found",
      });

    } else {

      return res.status(200).send({
        success: true,
        status: 200,
        message: "Outdoor Amenities Details.",
        data: result[0],
      });
      
    }

  }
);





module.exports = router;