const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
const commonObject = require('../common/common');
const areaModel = require('../models/area');
const verifyToken = require('../middlewares/jwt_verify/verifyToken');
const { routeAccessChecker } = require('../middlewares/routeAccess');
require('dotenv').config();

// verifyToken , routeAccessChecker("areaList")
// verifyToken , routeAccessChecker("parentAreaList")
// verifyToken, routeAccessChecker("areaActiveList")
// verifyToken , routeAccessChecker("childAreaList")
// verifyToken,routeAccessChecker("areaDetails")


router.get('/list', [], async (req, res) => {

    let result = await areaModel.getList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Area List.",
        "count": result.length,
        "data": result
    });
});

router.get('/activeList', [], async (req, res) => {

    let result = await areaModel.getActiveList();

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Area List.",
        "count": result.length,
        "data": result
    });
});

router.get('/parentAreaList', [], async (req, res) => {

    let result = await areaModel.getDataByWhereCondition(
        { "parent_id": 0, "status": 1 },
        { "id": "ASC" },
    );

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Parent Area List.",
        "count": result.length,
        "data": result
    });
});

router.get('/childAreaList', [], async (req, res) => {

    let result = await areaModel.getDataByWhereCondition(
        { "child_id": 0, "parent_id": { "GT": 0 }, "status": 1 },
        { "id": "ASC" },
    );

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Child Area List.",
        "count": result.length,
        "data": result
    });
});



router.get('/childAreaList/:parent_id', [], async (req, res) => {

    let parent_id = req.params.parent_id;

    let validateParentId = await commonObject.checkItsNumber(parent_id);
    if (validateParentId.success == false) {

        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Parent Id Value should be integer."

        });
    }

    let result = await areaModel.getDataByWhereCondition(
        { "parent_id": parent_id, "status": 1 },
        { "id": "ASC" },
    );

    for (let i = 0; i < result.length; i++) {
        let parentArea = await areaModel.getDataByWhereCondition(
            { "id": result[i].parent_id, "status": 1 },
            { "id": "ASC" },
        );

        result[i].parentAreaTitle = parentArea[0].title;
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Area List.",
        "count": result.length,
        "data": result
    });
});

router.get('/grandChildAreaList/:child_id', [], async (req, res) => {

    let child_id = req.params.child_id;

    let validateChildId = await commonObject.checkItsNumber(child_id);
    if (validateChildId.success == false) {

        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": "Child Id Value should be integer."

        });
    }

    let result = await areaModel.getDataByWhereCondition(
        { "child_id": child_id, "parent_id": { "GT": 0 }, "status": 1 },
        { "id": "ASC" },
    );

    for (let i = 0; i < result.length; i++) {
        let childArea = await areaModel.getDataByWhereCondition(
            { "id": result[i].child_id, "status": 1 },
            { "id": "ASC" },
        );

        result[i].childAreaTitle = childArea[0].title;
    }

    return res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Area List.",
        "count": result.length,
        "data": result
    });
});



router.post('/add', [verifyToken, routeAccessChecker("areaAdd")], async (req, res) => {

    let reqData = {
        "title": req.body.title,
        "parent_id": req.body.parent_id,
        "child_id": req.body.child_id,
    }

    reqData.created_by = req.decoded.userInfo.id;
    reqData.updated_by = req.decoded.userInfo.id;

    let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Area");

    if (validateTitle.success == false) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": validateTitle.message,

        });
    }

    reqData.title = validateTitle.data;

    if (isEmpty(reqData.parent_id)) {
        reqData.parent_id = 0;
        reqData.child_id = 0;
    } else {
        let validateParentId = await commonObject.checkItsNumber(reqData.parent_id);
        if (validateParentId.success == false) {

            return res.status(400).send({
                "success": false,
                "status": 400,
                "message": "Parent Id Value should be integer."

            });
        } else {

            // check if this parent exists
            let parentData = await areaModel.getDataByWhereCondition(
                { "id": reqData.parent_id, "parent_id": 0, "child_id": 0, "status": 1 },
                { "id": "ASC" },
            );

            if (isEmpty(parentData)) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Invalid parent selection."

                });
            }
            req.body.parent_id = validateParentId.data;
            reqData.parent_id = validateParentId.data;

        }

        if (!isEmpty(reqData.child_id)) {
            let validateChildId = await commonObject.checkItsNumber(reqData.child_id);
            if (validateChildId.success == false) {

                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": "Child Id Value should be integer."

                });
            } else {

                // check if this child exists
                let childData = await areaModel.getDataByWhereCondition(
                    { "id": reqData.child_id, "parent_id": reqData.parent_id, "child_id": 0, "status": 1 },
                    { "id": "ASC" },
                );

                if (isEmpty(childData)) {
                    return res.status(400).send({
                        "success": false,
                        "status": 400,
                        "message": "Invalid child selection."

                    });
                }
                req.body.child_id = validateChildId.data;
                reqData.child_id = validateChildId.data;

            }
        }
    }


    let existingData = await areaModel.getDataByWhereCondition(
        { "title": reqData.title, "parent_id": reqData.parent_id, "child_id": reqData.child_id },
        { "id": "ASC" },
    );


    if (!isEmpty(existingData)) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": existingData[0].status == "1" ? "This Area Already Exists." : "This Area Already Exists but Deactivate, You can activate it."
        });

    }

    let result = await areaModel.addNew(reqData);

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
        "message": "Area Added Successfully."
    });

});



router.put('/update', [verifyToken, routeAccessChecker("areaUpdate")], async (req, res) => {

    let reqData = {
        "id": req.body.id,
        "title": req.body.title,
        "parent_id": req.body.parent_id,
        "child_id": req.body.child_id
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

    let existingDataById = await areaModel.getById(reqData.id);
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

        let validateTitle = await commonObject.characterLimitCheck(reqData.title, "Area");

        if (validateTitle.success == false) {
            isError = 1;
            errorMessage += validateTitle.message;
        } else {

            reqData.title = validateTitle.data;
            willWeUpdate = 1;
            updateData.title = reqData.title;

        }

    }

    // parent id validation
    if (existingDataById[0].parent_id != reqData.parent_id) {
        if (reqData.parent_id == 0) {
            willWeUpdate = 1;
            updateData.parent_id = 0;
            updateData.child_id = 0;
        } else {

            let validateParentId = await commonObject.checkItsNumber(reqData.parent_id);
            if (validateParentId.success == false) {
                isError = 1;
                errorMessage += "Parent Id Value should be integer."

            } else {

                // check if this parent exists
                let parentData = await areaModel.getDataByWhereCondition(
                    { "id": reqData.parent_id, "parent_id": 0, "status": 1 },
                    { "id": "ASC" },
                );

                if (isEmpty(parentData)) {
                    isError = 1;
                    errorMessage += "Invalid parent selection."

                }

                req.body.parent_id = validateParentId.data;
                reqData.parent_id = validateParentId.data;
                willWeUpdate = 1;
                updateData.parent_id = reqData.parent_id;

            }
        }
    }

    // child id validation
    if (reqData.child_id > 0) {

        let validateChildId = await commonObject.checkItsNumber(reqData.child_id);
        if (validateChildId.success == false) {
            isError = 1;
            errorMessage += "Child Id Value should be integer."

        } else {

            // check if this child exists
            let childData = await areaModel.getDataByWhereCondition(
                { "id": reqData.child_id, "parent_id": reqData.parent_id, "child_id": 0, "status": 1 },
                { "id": "ASC" },
            );

            if (isEmpty(childData)) {
                isError = 1;
                errorMessage += "Invalid child selection."
            }
            req.body.child_id = validateChildId.data;
            reqData.child_id = validateChildId.data;
            willWeUpdate = 1;
            updateData.child_id = reqData.child_id;

        }
    } else if (reqData.child_id == 0) {
        willWeUpdate = 1;
        updateData.child_id = 0;
    }


    let title = isEmpty(updateData.title) ? existingDataById[0].title : updateData.title;
    let parentId = (existingDataById[0].parent_id != reqData.parent_id) ? updateData.parent_id : existingDataById[0].parent_id;
    let childId = (existingDataById[0].child_id != reqData.child_id) ? updateData.child_id : existingDataById[0].child_id;


    let existingData = await areaModel.getDataByWhereCondition(
        { "title": title, "parent_id": parentId, "child_id": childId },
        { "id": "ASC" },
    );

    if (!isEmpty(existingData) && existingData[0].id != reqData.id) {
        return res.status(409).send({
            "success": false,
            "status": 409,
            "message": existingData[0].status == "1" ? "This Area Already Exists." : "This Area Already Exists but Deactivate, You can activate it."
        });

    }


    if (isError == 1) {
        return res.status(400).send({
            "success": false,
            "status": 400,
            "message": errorMessage
        });
    }

    // return res.status(400).send({
    //     "success": false,
    //     "status": 400,
    //     "message": updateData
    // });

    if (willWeUpdate == 1) {

        updateData.updated_by = req.decoded.userInfo.id;

        let result = await areaModel.updateById(reqData.id, updateData);


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
            "message": "Area successfully updated."
        });


    } else {
        return res.status(200).send({
            "success": true,
            "status": 200,
            "message": "Nothing to update."
        });
    }

});



router.delete('/delete', [verifyToken, routeAccessChecker("areaDelete")], async (req, res) => {

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

    let existingDataById = await areaModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    // check it has parent and child data or not
    let finalData = {};
    let childData = {};
    let grandChildData = {};
    if (existingDataById[0].parent_id == 0) {
        childData = await areaModel.getDataByWhereCondition(
            { "parent_id": existingDataById[0].id, "status": [1, 2] },
            { "id": "ASC" }, undefined, undefined, ["id", "title"]
        );
    }

    if (existingDataById[0].child_id == 0) {
        grandChildData = await areaModel.getDataByWhereCondition(
            { "child_id": existingDataById[0].id, "status": [1, 2] },
            { "id": "ASC" }, undefined, undefined, ["id", "title"]
        );
    }

    let merged = { ...childData, ...grandChildData };

    let keys = Object.keys(merged);
    let dataId = [];

    for (let index = 0; index < keys.length; index++) {
        dataId.push(merged[keys[index]].id);
    }

    if (isEmpty(dataId)) {
        dataId = [0];
    } else {
        dataId = [...new Set(dataId)];
    }

    finalData = await areaModel.getDataByWhereCondition(
        { "id": { "IN": dataId }, "status": [1, 2] },
        { "id": "ASC" }, undefined, undefined, []
    );


    let data = {
        status: 0,
        updated_by: reqData.updated_by
    }

    let result = await areaModel.changeStatusValueById(reqData.id, data, finalData);


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
        "message": "Area successfully deleted."
    });

});

router.put('/changeStatus', [verifyToken, routeAccessChecker("changeAreaStatus")], async (req, res) => {

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

    let existingDataById = await areaModel.getById(reqData.id);
    if (isEmpty(existingDataById)) {

        return res.status(404).send({
            "success": false,
            "status": 404,
            "message": "No data found",

        });
    }

    // check it has parent and child data or not
    let finalData = {};
    let childData = {};
    let grandChildData = {};
    if (existingDataById[0].parent_id == 0) {
        childData = await areaModel.getDataByWhereCondition(
            { "parent_id": existingDataById[0].id, "status": [1, 2] },
            { "id": "ASC" }, undefined, undefined, ["id", "title"]
        );
    }

    if (existingDataById[0].child_id == 0) {
        grandChildData = await areaModel.getDataByWhereCondition(
            { "child_id": existingDataById[0].id, "status": [1, 2] },
            { "id": "ASC" }, undefined, undefined, ["id", "title"]
        );
    }

    let merged = { ...childData, ...grandChildData };

    let keys = Object.keys(merged);
    let dataId = [];

    for (let index = 0; index < keys.length; index++) {
        dataId.push(merged[keys[index]].id);
    }

    if (isEmpty(dataId)) {
        dataId = [0];
    } else {
        dataId = [...new Set(dataId)];
    }

    finalData = await areaModel.getDataByWhereCondition(
        { "id": { "IN": dataId }, "status": [1, 2] },
        { "id": "ASC" }, undefined, undefined, []
    );


    let data = {
        status: existingDataById[0].status == 1 ? 2 : 1,
        updated_by: reqData.updated_by
    }

    let result = await areaModel.changeStatusValueById(reqData.id, data, finalData);


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
        "message": "Area status has successfully changed."
    });

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

    let result = await areaModel.getById(id);

    if (isEmpty(result)) {

        return res.status(404).send({
            success: false,
            status: 404,
            message: "No data found",
        });

    } else {

        if (result[0].parent_id != 0) {

            let parentArea = await areaModel.getDataByWhereCondition(
                { "id": result[0].parent_id, "status": 1 }, undefined, undefined, undefined, ["id", "title"]);

            if (isEmpty(parentArea)) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Unknown Parent Area",
                });
            } else {
                result[0].parentAreaTitle = parentArea[0];
            }
        }

        if (result[0].child_id != 0) {

            let childArea = await areaModel.getDataByWhereCondition(
                { "id": result[0].child_id, "status": 1 }, undefined, undefined, undefined, ["id", "title"]);

            if (isEmpty(childArea)) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Unknown Child Area",
                });
            } else {
                result[0].childAreaTitle = childArea[0];
            }
        }

        return res.status(200).send({
            success: true,
            status: 200,
            message: "Area Details.",
            data: result[0],
        });

    }
}
);





module.exports = router;