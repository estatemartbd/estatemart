const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const companyInfoModel= require('../models/company-info');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
const fileUploaderCommonObject = require("../common/fileUploader");
require('dotenv').config();
let imageFolderPath = `${process.env.backend_url}${process.env.company_logo_image_path_name}`;


// verifyToken,routeAccessChecker("companyDetails")

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

      if(id !== 1){
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Invalid Company Details id."
          });
      }
    }

    let result = await companyInfoModel.getById(id);

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
        message: "Company Details.",
        imageFolderPath: imageFolderPath,
        data: result[0],
      });
      
    }

  }
);

router.put('/update', [verifyToken, routeAccessChecker("companyDetailsUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        "company_name": req.body.company_name,
        "address": req.body.address,
        "email": req.body.email,
        "phone": req.body.phone,
        // "fax": req.body.fax,
        "fb_link": req.body.fb_link,
        // "twitter_link": req.body.twitter_link,
        "youtube_link": req.body.youtube_link,
        // "youtube_video_key": req.body.youtube_video_key,
        "footer_one": req.body.footer_one,
        // "footer_two": req.body.footer_two,
        "gps_coordinates": req.body.gps_coordinates,
        "instagram ": req.body.instagram
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

        if(reqData.id !== 1){
            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Invalid Company Details id."
              });
          }
        
    }

    let existingDataById = await companyInfoModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    } 

    let previousFile = existingDataById[0].logo;

    //  file codes
    if (req.files && Object.keys(req.files).length > 0) {

        let imageUploadCode = {};

        //image code
        if (req.files.logo) {
            
            imageUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                "companyLogo",
                "logo"
            );
            
            if (imageUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: imageUploadCode.message,
                });
            }
            reqData.logo = imageUploadCode.fileName;
        }
    }




  reqData.updated_by = req.decoded.userInfo.id;


  let result = await companyInfoModel.updateById(reqData.id,reqData);

  // existing file delete
  if (req.files && Object.keys(req.files).length > 0) {

    // image delete
    if (req.files.image) {
        if (previousFile != updateData.image) {
            if (previousFile != "default_image.jpg") {
                let fileDelete = {};

                fileDelete = await fileUploaderCommonObject.fileRemove(
                    previousFile,
                    "companyLogo"
                );
            }
        }
    }

}

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
      "message": "Company Info successfully updated."
  });


});


module.exports = router;