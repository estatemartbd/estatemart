var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const isEmpty = require("is-empty");

const commonObject = require('../../common/common');
const userModel = require('../../models/user');
const adminModel = require('../../models/admin');
const roleModel = require('../../models/role');
const systemUserModel = require('../../models/system-user');
const routePermissionModel = require('../../permissions/route_permission');

router.use(async function (req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, global.config.secretKey,
            {
                algorithm: global.config.algorithm

            }, async function (err, decoded) {
                if (err) {
                    return res.status(401)
                        .send({
                            "success": false,
                            "status": 401,
                            "message": "Timeout Login First"
                        });
                }



                try {

                    //api_token then decode user id,  convert to number
                    let userData = await userModel.getUserById(parseInt(await commonObject.decodingUsingCrypto(decoded.api_token)));
                    let profileInfo = {};
                    

                    if (isEmpty(userData) || !decoded.hasOwnProperty('identity_id')) {
                        return res.status(401)
                            .send({
                                "success": false,
                                "status": 401,
                                "message": "Unauthorize Request. User not found, please login again."
                            });
                    }

                    
                    //  device verification 
                    let deviceVerify = await commonObject.compareDeviceInfo(req, decoded.identity_id);
                    if (deviceVerify === false) {
                        return res.status(401)
                            .send({
                                "success": false,
                                "status": 401,
                                "message": "Unauthorize Request. Login First"
                            });
                    }

                    //Check Role 
                    let roleData = await roleModel.getRoleById(userData[0].role_id);
                    if (isEmpty(roleData) || userData[0].role_id != decoded.role.role_id) {
                        return res.status(401)
                            .send({
                                "success": false,
                                "status": 401,
                                "message": "Unauthorize Request. User not found, please login again."
                            });
                    }


                    //console.log(userData[0])

                    if (userData[0].role_id == 1) {
                        profileInfo = await adminModel.getAdminById(userData[0].profile_id,);
                    } else if ([2,3,4,"2","3", "4"].includes(userData[0].role_id)) {
                        profileInfo = await systemUserModel.getSystemUserDetailsById(userData[0].profile_id,);
                    } else {
                        return res.status(401)
                            .send({
                                "success": false,
                                "status": 401,
                                "message": "Unauthorize Request. User not found, please login again."
                            });
                    }

  
                    if (isEmpty(profileInfo)) {
                        return res.status(401)
                            .send({
                                "success": false,
                                "status": 401,
                                "message": "Unauthorize Request. User not found, please login again."
                            });
                    }

                    decoded = {
                        userInfo: {
                            id: userData[0].id,
                            user_name: profileInfo[0].name,
                            email: userData[0].email,
                            phone: userData[0].phone,
                            status: userData[0].status,
                            role_id: userData[0].role_id,
                        },
                        profileInfo: { ...profileInfo[0] },
                        role: { ...roleData[0] },
                        permissions: await routePermissionModel.getRouterPermissionList(userData[0].role_id),
                        uuid: decoded.identity_id
                    };

                    // console.log(decoded)
                    req.decoded = decoded;
                    next();

                } catch (error) {
                    return res.status(500)
                            .send({
                                "success": false,
                                "status": 500,
                                "message": "Server down"
                            });
                }
            });
    } else {

        return res.status(401)
            .send({
                "success": false,
                "status": 401,
                "message": "Unauthorize Request"
            });
    }
});

module.exports = router;