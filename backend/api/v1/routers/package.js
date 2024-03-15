const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const packageModel= require('../models/package');
const userPaymentPackageHistoryModel = require('../models/user-subscribed-package-history');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

router.get('/list', [verifyToken, routeAccessChecker("packageList")], async (req, res) => {

    let result = await packageModel.getList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Package List.",
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', async (req, res) => {

    let result = await packageModel.getActiveList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Package List.",
        "count": result.length,
        "data": result
    });
});


router.post('/list', [verifyToken, routeAccessChecker("packageListLimit")], async (req, res) => {

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
    let result = await packageModel.getDataByWhereCondition(
        {"status" : 1},
        {"id":"DESC"},
        reqData.limit,
        reqData.offset
        );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Package List.",
        "count": result.length,
        "data": result
    });
});

router.post('/public-list', async (req, res) => {

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
    let result = await packageModel.getDataByWhereCondition(
        {"status" : 1},
        {"id":"DESC"},
        reqData.limit,
        reqData.offset,
        ["title", "duration", "post_limit", "price", "discount_amount", "discount_percentage"]
        );


    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Public package List.",
        "count": result.length,
        "data": result
    });
});

router.post('/add', [verifyToken, routeAccessChecker("packageAdd")], async (req, res) => {

    let reqData = {
        "title" : req.body.title,
        "duration": req.body.duration,
        "price": req.body.price,
        "discount_amount": req.body.discount_amount,
        "post_limit": req.body.post_limit
    }

    reqData.created_by = req.decoded.userInfo.id;
    reqData.updated_by = req.decoded.userInfo.id;

    let errorMessage = "";
    let isError = 0; // 1 = yes, 0 = no

    // title validation
    let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Package");
    if (validateTitle.success == false) {
        isError = 1;
        errorMessage += validateTitle.message;
    } else {
        reqData.title = validateTitle.data;

        let existingData = await packageModel.getByTitle(reqData.title);
    
        if (!isEmpty(existingData)) {
            return res.status(409).send({
                "success": false,
                "status": 409,
                "message": existingData[0].status == "1" ? "This Package Already Exists." : "This Package Already Exists but Deactivate, You can activate it."
            });
        }
    }

    

    // duration validation (We are saving the number as day)
    let validateDuration = await commonObject.checkItsNumber(reqData.duration);
    if (validateDuration.success == false) {

        isError = 1;
        errorMessage += "Duration should be a number.";

    } else {
        req.body.duration = validateDuration.data;
        reqData.duration = validateDuration.data;

        if(reqData.duration > 1095){
            isError = 1;
            errorMessage += "Duration should be less than 1095.";
        }
            
    } 

    // price validation
    let validatePrice = await commonObject.checkItsNumber(reqData.price);
    if (validatePrice.success == false) {

        isError = 1;
        errorMessage += "Price should be a number.";

    } else {
        req.body.price = validatePrice.data;
        reqData.price = validatePrice.data;

    } 

    // discount amount validation
    if(!isEmpty(reqData.discount_amount)){
        let validateDiscountAmount = await commonObject.checkItsNumber(reqData.discount_amount);
        if (validateDiscountAmount.success == false) {

            isError = 1;
            errorMessage += " Discount Amount should be a number.";

        } else {
            req.body.discount_amount = validateDiscountAmount.data;
            reqData.discount_amount = validateDiscountAmount.data;

        } 
    } else {
        reqData.discount_amount = 0;
    }

    if(reqData.discount_amount >= reqData.price){
        isError = 1;
        errorMessage += " Discount Amount should not be greater than or equal to the actual price.";
    }

    // percentage of discount
    if(reqData.discount_amount == 0){
        reqData.discount_percentage = 0;
    } else {
        
        reqData.discount_percentage = ((reqData.discount_amount*100)/reqData.price).toFixed(2);

    }

    // Post Limit validation
    let validatePostLimit = await commonObject.checkItsNumber(reqData.post_limit);
    if (validatePostLimit.success == false) {

        isError = 1;
        errorMessage += "Post Limit should be a number.";

    } else {
        req.body.post_limit = validatePostLimit.data;
        reqData.post_limit = validatePostLimit.data;
    }

    
    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    let result = await packageModel.addNew(reqData);

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
        "message": "Package Added Successfully."
    });

});



router.put('/update', [verifyToken, routeAccessChecker("packageUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        "title": req.body.title,
        "duration": req.body.duration,
        "price": req.body.price,
        "post_limit": req.body.post_limit,
        "discount_amount": req.body.discount_amount
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

    let existingDataById = await packageModel.getById(reqData.id);
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

    // title validation
    if (existingDataById[0].title !== reqData.title) {

        let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Package");
        if (validateTitle.success == false) {
            isError = 1;
            errorMessage += validateTitle.message;
        } else {

        let existingDataByTitle = await packageModel.getByTitle(reqData.title);

        if (!isEmpty(existingDataByTitle) && existingDataByTitle[0].id != reqData.id) {
          
          isError = 1;
          errorMessage += existingDataByTitle[0].status == "1" ? "This Package Already Exists." : "This Package Exists but Deactivate, You can activate it."
        }

          reqData.title = validateTitle.data;
          willWeUpdate = 1;
          updateData.title = reqData.title;

      }
    }

    // duration validation
    if (existingDataById[0].duration !== reqData.duration) {
        let validateDuration = await commonObject.checkItsNumber(reqData.duration);
        if (validateDuration.success == false) {

            isError = 1;
            errorMessage += "Duration should be a number.";
    
        } else {
            req.body.duration = validateDuration.data;
            reqData.duration = validateDuration.data;
    
            if(reqData.duration > 1095){
                isError = 1;
                errorMessage += "Duration should be less than 1095.";
            } else {
                willWeUpdate = 1;
                updateData.duration = reqData.duration;
            }
                
        }
    }

    // price validation
    if (existingDataById[0].price !== reqData.price) {
        let validatePrice = await commonObject.checkItsNumber(reqData.price);
        if (validatePrice.success == false) {

            isError = 1;
            errorMessage += "Price should be a number.";

        } else {
            req.body.price = validatePrice.data;
            reqData.price = validatePrice.data;

            willWeUpdate = 1;
            updateData.price = reqData.price;

        } 
    }

    // discount amount validation
    if (existingDataById[0].discount_amount !== reqData.discount_amount) {

        if(isEmpty(reqData.discount_amount)){
            willWeUpdate = 1;
            updateData.discount_amount = 0;
        } else {
            let validateDiscountAmount = await commonObject.checkItsNumber(reqData.discount_amount);
            if (validateDiscountAmount.success == false) {

                isError = 1;
                errorMessage += " Discount Amount should be a number.";

            } else {
                req.body.discount_amount = validateDiscountAmount.data;
                reqData.discount_amount = validateDiscountAmount.data;

                willWeUpdate = 1;
                updateData.discount_amount = reqData.discount_amount;

            }
        }  
    }

    // percentage of discount
    let price = updateData.price ? updateData.price : existingDataById[0].price;
    let discountAmount = (updateData.discount_amount >= 0)  ? updateData.discount_amount : existingDataById[0].discount_amount;
    if(discountAmount >= price){
        isError = 1;
        errorMessage += " Discount Amount should not be greater than or equal to the actual price.";
    }

    updateData.discount_percentage = ((discountAmount*100)/price).toFixed(2);

    
     // Post Limit validation
     let validatePostLimit = await commonObject.checkItsNumber(reqData.post_limit);
     if (validatePostLimit.success == false) {
 
         isError = 1;
         errorMessage += "Post Limit should be a number.";
 
     } else {
         req.body.post_limit = validatePostLimit.data;
         reqData.post_limit = validatePostLimit.data;
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


  let result = await packageModel.updateById(reqData.id,updateData);


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
      "message": "Package successfully updated."
  });


// } else {
//   return res.status(200).send({
//       "success": true,
//       "status": 200,
//       "message": "Nothing to update."
//   });
// }

});



router.delete('/delete', [verifyToken, routeAccessChecker("packageDelete")], async (req, res) => {

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

    let existingDataById = await packageModel.getById(reqData.id);
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

     let result = await packageModel.updateById(reqData.id,data);


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
         "message": "Package successfully deleted."
     });

});

router.put('/changeStatus', [verifyToken, routeAccessChecker("changePackageStatus")], async (req, res) => {

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

      let existingDataById = await packageModel.getById(reqData.id);
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

    let result = await packageModel.updateById(reqData.id,data);


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
        "message": "Package status has successfully changed."
    });

});

router.get("/details/:id",[verifyToken,routeAccessChecker("packageDetails")],async (req, res) => {


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

    let result = await packageModel.getById(id);

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
        message: "Package Details.",
        data: result[0],
      });
      
    }

  }
);


// router.patch("/selectPackage/",[verifyToken,routeAccessChecker("selectPackage")],async (req, res) => {


//     let packageId = req.body.package_id;
//     let referralLink = req.body.referral_link;
//     let freeTrial = req.body.free_trial;
//     let currentTIme =  await commonObject.getGMT();;

//     let currentPackage = await userPaymentPackageHistoryModel.getDataByWhereCondition(
//         {user_id: req.decoded.userInfo.id, status: 1}, {"id": "DESC"}
//     );

//     if(!isEmpty(currentPackage)){
//         return res.status(409).send({
//             "success": false,
//             "status": 409,
//             "message": "You already select your package."
//           });
//     }

//     let requestData = {
//         "user_id" : req.decoded.userInfo.id,
//         "package_type" : 1,
//         "payment_package_id" : null,
//         "enroll_date" : currentTIme,
//         "expired_date" : undefined,
//         "details" : "",
//         "price" : 0,
//         "status" : 1,
//         "created_by" : req.decoded.userInfo.id,
//         "created_at" : currentTIme,
//         "updated_by" : req.decoded.userInfo.id,
//         "updated_at" : currentTIme,
//     };

//     // incomplete on progress ............  waiting fot Client  decision (11-august-2022)

//     if(!isEmpty(referralLink)){
//         if(req.decoded.userInfo.role_id != 4){
//             return res.status(400).send({
//                 "success": false,
//                 "status": 401,
//                 "message": "Only teen user can use referral link.",
//               });
//         }


//     } else if(!isEmpty(freeTrial) && freeTrial === true){
//         requestData.expired_date = await commonObject.getCustomDateTime(currentTIme, 14);
//         requestData.details = `User ( ${req.decoded.userInfo.id} enroll free trial for 14 days)`;
//     }

//     console.log(requestData)

//     return res.status(400).send({
//         "success": false,
//         "status": 400,
//         "message": req.body,
//         requestData
//       });

//     let validateId = await commonObject.checkItsNumber(id);

//     if (validateId.success == false) {
//       return res.status(400).send({
//         "success": false,
//         "status": 400,
//         "message": "Value should be integer."
//       });
//     } else {
//       id = validateId.data;
//     }

//     let result = await packageModel.getById(id);

//     if (isEmpty(result)) {

//       return res.status(404).send({
//         success: false,
//         status: 404,
//         message: "No data found",
//       });

//     } else {

//       return res.status(200).send({
//         success: true,
//         status: 200,
//         message: "Package Details.",
//         data: result[0],
//       });
      
//     }

//   }
// );





module.exports = router;