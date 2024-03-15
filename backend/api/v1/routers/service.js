const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const serviceModel= require('../models/service');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
const fileUploaderCommonObject = require("../common/fileUploader");
require('dotenv').config();

// verifyToken, routeAccessChecker("serviceActiveList")
// verifyToken,routeAccessChecker("serviceDetails")

router.get('/list', [verifyToken, routeAccessChecker("serviceList")], async (req, res) => {

    let imageFolderPath = `${process.env.backend_url}${process.env.service_image_path_name}`;
    let result = await serviceModel.getList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Service List.",
        "imageFolderPath": imageFolderPath,
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', [], async (req, res) => {

    let imageFolderPath = `${process.env.backend_url}${process.env.service_image_path_name}`;
    let result = await serviceModel.getActiveList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Service List.",
        "imageFolderPath": imageFolderPath,
        "count": result.length,
        "data": result
    });
});



router.post('/list', [verifyToken, routeAccessChecker("serviceListLimit")], async (req, res) => {

    let imageFolderPath = `${process.env.backend_url}${process.env.service_image_path_name}`;
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
    let result = await serviceModel.getDataByWhereCondition(
        {"status" : 1},
        {"id":"ASC"},
        reqData.limit,
        reqData.offset
        );

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Service List.",
        "count": result.length,
        "imageFolderPath": imageFolderPath,
        "data": result
    });
});

router.post('/add', [verifyToken, routeAccessChecker("serviceAdd")], async (req, res) => {

    let reqData = {
        "title": req.body.title,
        "short_description": req.body.short_description,
        "details": req.body.details,
        "meta_title": !isEmpty(req.body.meta_title) ? req.body.meta_title : "",
        "meta_description": !isEmpty(req.body.meta_description) ? req.body.meta_description : "" ,
        "meta_canonical_url": !isEmpty(req.body.meta_canonical_url) ? req.body.meta_canonical_url : "",
        "meta_tag": !isEmpty(req.body.meta_tag) ? req.body.meta_tag : ""
    }

    reqData.created_by = req.decoded.userInfo.id;
    reqData.updated_by = req.decoded.userInfo.id;

    let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Service");

    if (validateTitle.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": validateTitle.message,
 
        });
    }

    reqData.title = validateTitle.data;

    let existingData = await serviceModel.getByTitle(reqData.title);


    if (!isEmpty(existingData)) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": existingData[0].status == "1" ? "This Service Already Exists." : "This Service Already Exists but Deactivate, You can activate it."
        });

    }

    
    let validateShortDescription = await commonObject.characterLimitCheck(reqData.short_description, "Service Short Description");

    if (validateShortDescription.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": validateShortDescription.message,
 
        });
    }

    reqData.short_description = validateShortDescription.data;

    // description check
    if (isEmpty(reqData.details)) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Details should not be empty",
 
        });
    } 

    //  file codes
    if (req.files && Object.keys(req.files).length > 0) {

        let imageUploadCode = {};

        //image code
        if (req.files.image) {
            
            imageUploadCode = await fileUploaderCommonObject.uploadFile(
                    req,
                    "service",
                    "image"
                );
             
            if (imageUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: imageUploadCode.message,
                });
            }

            
            reqData.image = imageUploadCode.fileName;
        }
    } else {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Please Upload an Image",
 
        });
    }

    let result = await serviceModel.addNew(reqData);

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
        "message": "Service Added Successfully."
    });

});



router.put('/update', [verifyToken, routeAccessChecker("serviceUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        "title": req.body.title,
        "short_description": req.body.short_description,
        "details": req.body.details
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

    let existingDataById = await serviceModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    } 

    let previousFile = existingDataById[0].image;

    let updateData = {
        "meta_title": !isEmpty(req.body.meta_title) ? req.body.meta_title : "",
        "meta_description": !isEmpty(req.body.meta_description) ? req.body.meta_description : "" ,
        "meta_canonical_url": !isEmpty(req.body.meta_canonical_url) ? req.body.meta_canonical_url : "",
        "meta_tag": !isEmpty(req.body.meta_tag) ? req.body.meta_tag : ""
    };

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no
    let willWeUpdate = 0; // 1 = yes , 0 = no;

    // title
    if (existingDataById[0].title !== reqData.title) {

      let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Service");

      if (validateTitle.success == false) {
          isError = 1;
          errorMessage += validateTitle.message;
      } else {

        let existingDataByTitle = await serviceModel.getByTitle(reqData.title);

        if (!isEmpty(existingDataByTitle) && existingDataByTitle[0].id != reqData.id) {
          
          isError = 1;
          errorMessage += existingDataByTitle[0].status == "1" ? "This Service Already Exists." : "This Service Already Exists but Deactivate, You can activate it."
        }

          reqData.title = validateTitle.data;
          willWeUpdate = 1;
          updateData.title = reqData.title;

      }

  }

  // short description
  if (existingDataById[0].short_description != reqData.short_description) {

    let validateShortDescription = await commonObject.characterLimitCheck(reqData.short_description, "Service Short Description");

    if (validateShortDescription.success == false) {
        isError = 1;
        errorMessage += validateShortDescription.message;
    } else {

        reqData.short_description = validateShortDescription.data;
        willWeUpdate = 1;
        updateData.short_description = validateShortDescription.data;

    }

}

  // details check
   if (existingDataById[0].details !== reqData.details) { 
        if(isEmpty(reqData.details)){
            isError = 1;
            errorMessage += "Details should not be empty";
        } else {
            willWeUpdate = 1;
            updateData.details = reqData.details;
        }
   }

    //  file codes
    if (req.files && Object.keys(req.files).length > 0) {

        let imageUploadCode = {};

        //image code
        if (req.files.image) {
            
            imageUploadCode = await fileUploaderCommonObject.uploadFile(
                req,
                "service",
                "image"
            );
            
            if (imageUploadCode.success == false) {
                return res.status(200).send({
                    success: false,
                    status: 400,
                    message: imageUploadCode.message,
                });
            }

            willWeUpdate = 1;
            updateData.image = imageUploadCode.fileName;
        }
    }


  if (isError == 1) {
    return res.status(400).send({
        "success": false,
        "status": 400,
        "message": errorMessage
    });
}



// if (willWeUpdate == 1) {

  updateData.updated_by = req.decoded.userInfo.id;


  let result = await serviceModel.updateById(reqData.id,updateData);

  // existing file delete
  if (req.files && Object.keys(req.files).length > 0) {

    // image delete
    if (req.files.image) {
        if (previousFile != updateData.image) {
            if (previousFile != "default_image.jpg") {
                let fileDelete = {};

                fileDelete = await fileUploaderCommonObject.fileRemove(
                    previousFile,
                    "service"
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
      "message": "Service successfully updated."
  });


// } else {
//   return res.status(200).send({
//       "success": true,
//       "status": 200,
//       "message": "Nothing to update."
//   });
// }

});



router.delete('/delete', [verifyToken, routeAccessChecker("serviceDelete")], async (req, res) => {

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

    let existingDataById = await serviceModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    let previousFile = existingDataById[0].image;

     let data = {
      status : 0,
      updated_by : reqData.updated_by
     }

     let result = await serviceModel.updateById(reqData.id,data);

    // existing file delete
    if (previousFile != null) {
        if (previousFile != "default_image.jpg") {
            let fileDelete = {};

            fileDelete = await fileUploaderCommonObject.fileRemove(
                previousFile,
                "service"
            );
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
         "message": "Service successfully deleted."
     });

});

router.put('/changeStatus', [verifyToken, routeAccessChecker("changeServiceStatus")], async (req, res) => {

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

      let existingDataById = await serviceModel.getById(reqData.id);
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

    let result = await serviceModel.updateById(reqData.id,data);


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
        "message": "Service status has successfully changed."
    });

});

router.get("/details/:id",[],async (req, res) => {

    let imageFolderPath = `${process.env.backend_url}${process.env.service_image_path_name}`;
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

    let result = await serviceModel.getById(id);

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
        message: "Service Details.",
        imageFolderPath: imageFolderPath,
        data: result[0],
      });
      
    }

  }
);





module.exports = router;