const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const pageMetaModel = require('../models/page-meta');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();


router.get('/list', async (req, res) => {

    let result = await pageMetaModel.getList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Page Meta List.",
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', [], async (req, res) => {

    let result = await pageMetaModel.getActiveList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Page Meta List.",
        "count": result.length,
        "data": result
    });
});

router.post('/list', async (req, res) => {

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
    let result = await pageMetaModel.getDataByWhereCondition(
        { "status": 1 },
        { "id": "ASC" },
        reqData.limit,
        reqData.offset
    );

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Page Meta List.",
        "count": result.length,
        "data": result
    });
});


router.put('/update', [verifyToken, routeAccessChecker("pageMetaUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        // "page_name": req.body.page_name,
        "meta_title": req.body.meta_title,
        "meta_description": req.body.meta_description,
        "meta_canonical_url": req.body.meta_canonical_url,
        "meta_tag": req.body.meta_tag
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

    let existingDataById = await pageMetaModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    let updateData = {
        meta_title : isEmpty(reqData.meta_title) ? "" : reqData.meta_title,
        meta_description : isEmpty(reqData.meta_description) ? "" : reqData.meta_description,
        meta_canonical_url : isEmpty(reqData.meta_canonical_url) ? "" : reqData.meta_canonical_url,
        meta_tag : isEmpty(reqData.meta_tag) ? "" : reqData.meta_tag
    };



    // let errorMessage = "";
    // let isError = 0; // 1 = yes, 0 = no
    // let willWeUpdate = 0; // 1 = yes , 0 = no;

    // title
    // if (existingDataById[0].title !== reqData.title) {

    //     let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Page Meta");

    //     if (validateTitle.success == false) {
    //         isError = 1;
    //         errorMessage += validateTitle.message;
    //     } else {

    //         let existingDataByTitle = await pageMetaModel.getByTitle(reqData.title);

    //         if (!isEmpty(existingDataByTitle) && existingDataByTitle[0].id != reqData.id) {

    //             isError = 1;
    //             errorMessage += existingDataByTitle[0].status == "1" ? "This Page Meta Already Exist." : "This Page Meta Already Exist but Deactivate, You can activate it."
    //         }

    //         reqData.title = validateTitle.data;
    //         willWeUpdate = 1;
    //         updateData.title = reqData.title;
    //     }

    // }


    // if (isError == 1) {
    //     return res.status(400).send({
    //         "success": false,
    //         "status": 400,
    //         "message": errorMessage
    //     });
    // }

    // if (willWeUpdate == 1) {

    updateData.updated_by = req.decoded.userInfo.id;


    let result = await pageMetaModel.updateById(reqData.id, updateData);


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
        "message": "Page Meta successfully updated."
    });


    // } else {
    //   return res.status(200).send({
    //       "success": true,
    //       "status": 200,
    //       "message": "Nothing to update."
    //   });
    // }

});


router.get("/details/:id", [], async (req, res) => {


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

    let result = await pageMetaModel.getById(id);

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
            message: "Page Meta Details.",
            data: result[0],
        });

    }

}
);





module.exports = router;