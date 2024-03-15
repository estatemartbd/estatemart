const { connectionEstateMYSQL } = require('../connections/connection');
const queriesUser = require('../queries/user');
const adminModel = require('./admin');
const superAdminModel = require("./admin");
const systemUserModel = require("./system-user");
const forgetPasswordModel = require('./forget-password');
const commonObject = require('../common/common');
const isEmpty = require('is-empty');

let getUserByUserName = async (userName = "") => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserByUserName(), [userName], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getUserByUserNameOrEmail = async (userName = "") => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserByUserNameOrEmail(), [userName, userName], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getUserById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getUserDataById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserDataById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getUserDetailsById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserDetailsById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getPendingUserById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getPendingUserById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let updateUserPasswordByUserId = async (id = 0, password = "") => { // get only active user
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.updateUserPasswordByUserId(), [password, id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getUserByEmail = async (email = "") => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserByEmail(), [email], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}


let getUserByPhone = async (phone = "") => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.getUserByPhone(), [phone], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}



let addNewUser = (userInfo = {}, profileInfo = {}) => {


    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {
            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                
                let profileResult = {};

                if (userInfo.role_id === 1) {
                    profileResult = await adminModel.addNewAdmin(profileInfo, conn);
                } else if ([2,3,4,"2", "3", "4"].includes(userInfo.role_id)) {
                    profileResult = await systemUserModel.addNewSystemUser(profileInfo, conn);
                }

        

                if (isEmpty(profileResult) || profileResult.affectedRows == undefined || profileResult.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                //insert added data's id into userInfo
                userInfo.profile_id = profileResult.insertId;
                // console.log(userInfo.profile_id);
                conn.query(queriesUser.addNewUser(), [userInfo], async (error, result, fields) => {
                    if (error) {
                        console.log(error);
                        console.log("final err");
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    } else {

                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(result);
                        });
                    }
                });


            });
        });
    });
}




let resetPasswordForUser = async (user_id, password, updatedBy, updatedAt) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesUser.resetPasswordForUser(), [password, updatedBy, updatedAt, user_id], (error, result, fields) => {

            if (error) reject(error)
            else resolve(result)
        });
    });
}

let disableUserById = (updatedBy, updatedAt, userId, profileId, roleId) => {


    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                if (roleId === 2) {
                    let disableAdmin = await adminModel.disableAdminById(updatedBy, updatedAt, profileId, conn);

                    if (disableAdmin.affectedRows == undefined || disableAdmin.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.disableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {
                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }

                    });
                } else if (roleId === 3) {
                    let disableDentist = await parentModel.disableParentById(updatedBy, updatedAt, profileId, conn);

                    if (disableDentist.affectedRows == undefined || disableDentist.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.disableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {
                            //console.log("result");
                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();

                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 4) {
                    let disableTeen = await teenModel.disableTeenById(updatedBy, updatedAt, profileId, conn);

                    if (disableTeen.affectedRows == undefined || disableTeen.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.disableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {
                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }
                    });
                } else {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

            });
        });
    });
}

let enableUserById = (updatedBy, updatedAt, userId, profileId, roleId) => {



    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                if (roleId === 2) {
                    let enableAdmin = await adminModel.enableAdminById(updatedBy, updatedAt, profileId, conn);

                    if (enableAdmin.affectedRows == undefined || enableAdmin.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.enableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 3) {
                    let enableDentist = await parentModel.enableParentById(updatedBy, updatedAt, profileId, conn);

                    if (enableDentist.affectedRows == undefined || enableDentist.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.enableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {
                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 4) {
                    let enableConsultant = await teenModel.enableTeenById(updatedBy, updatedAt, profileId, conn);

                    if (enableConsultant.affectedRows == undefined || enableConsultant.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.enableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }

                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 5) {
                    let enableLab = await labModel.enableLabById(updatedBy, updatedAt, profileId, conn);

                    if (enableLab.affectedRows == undefined || enableLab.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.enableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 6) {
                    let enableTech = await techCompanyModel.enableTechById(updatedBy, updatedAt, profileId, conn);

                    if (enableTech.affectedRows == undefined || enableTech.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.enableUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                }

            });
        });
    });
}

let deleteUserById = (updatedBy, updatedAt, userId, profileId, roleId) => {

    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                if (roleId === 3) {
                    let deleteDentist = await parentModel.deleteParentById(updatedBy, updatedAt, profileId, conn);

                    if (deleteDentist.affectedRows == undefined || deleteDentist.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.deleteUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });
                } else if (roleId === 4) {
                    let deleteTeen = await teenModel.deleteTeenById(updatedBy, updatedAt, profileId, conn);

                    if (deleteTeen.affectedRows == undefined || deleteTeen.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    conn.query(queriesUser.deleteUserById(), [updatedBy, updatedAt, userId], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }
                    });
                }

            });
        });
    });
}


// password update by Forget Password
let updateUserPasswordUsingForgetPassword = (userId, newPassword, forgetPasswordId) => {

    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                let disableLink = await forgetPasswordModel.disableLinkById(forgetPasswordId, conn);

                if (disableLink.affectedRows == undefined || disableLink.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }


                conn.query(queriesUser.updateUserPasswordByUserId(), [newPassword, userId], (error, result, fields) => {

                    if (error) {

                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    } else {

                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(result);

                        });
                    }


                });


            });
        });
    });
}


let updateAdminUserData = async (userId, userData = {}, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    // get object, generate an array and push data value here

    // for user data
    let keys = Object.keys(userData);

    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(userData[keys[index]]);

    }
    return new Promise((resolve, reject) => {
        connection.query(queriesUser.updateAdminUserData(userData), [...dataParameter, userId], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}


let updateUserProfileById = async (profileId, userId, profileData = {}, userData = {}, roleId) => {

    // get object, generate an array and push data value here
    // for user data
    let keys = Object.keys(userData);
    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(userData[keys[index]]);
    }

    let currentTime = await commonObject.getGMT();

    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                if (roleId == 3) {

                    let updateProfileData = await dentistModel.updateDentistById(profileId, profileData, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    if (!isEmpty(userData)) {
                        conn.query(queriesUser.updateUserProfileById(userData), [...dataParameter, userId], (error, result, fields) => {

                            if (error) {

                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            } else {

                                conn.commit(function (err) {
                                    if (err) {
                                        return conn.rollback(function () {
                                            conn.release();
                                            resolve([]);
                                        });
                                    }
                                    conn.release();
                                    return resolve(result);

                                });
                            }


                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(updateProfileData);

                        });
                    }

                } else if (roleId == 4) {

                    let updateProfileData = await teenModel.deleteTeenById(userId, currentTime, profileId, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    if (!isEmpty(userData)) {

                        conn.query(queriesUser.updateUserProfileById(userData), [...dataParameter, userId], (error, result, fields) => {

                            if (error) {

                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            } else {

                                conn.commit(function (err) {
                                    if (err) {
                                        return conn.rollback(function () {
                                            conn.release();
                                            resolve([]);
                                        });
                                    }
                                    conn.release();
                                    return resolve(result);

                                });
                            }


                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(updateProfileData);

                        });
                    }

                } else if (roleId == 5) {


                    let updateProfileData = await labModel.updateLabById(profileId, profileData, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    if (!isEmpty(userData)) {
                        conn.query(queriesUser.updateUserProfileById(userData), [...dataParameter, userId], (error, result, fields) => {

                            if (error) {

                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            } else {

                                conn.commit(function (err) {
                                    if (err) {
                                        return conn.rollback(function () {
                                            conn.release();
                                            resolve([]);
                                        });
                                    }
                                    conn.release();
                                    return resolve(result);

                                });
                            }


                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(updateProfileData);

                        });
                    }

                } else if (roleId == 6) {
                    let updateProfileData = await techCompanyModel.updateTechById(profileId, profileData, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    if (!isEmpty(userData)) {
                        conn.query(queriesUser.updateUserProfileById(userData), [...dataParameter, userId], (error, result, fields) => {

                            if (error) {

                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            } else {

                                conn.commit(function (err) {
                                    if (err) {
                                        return conn.rollback(function () {
                                            conn.release();
                                            resolve([]);
                                        });
                                    }
                                    conn.release();
                                    return resolve(result);

                                });
                            }


                        });
                    } else {
                        conn.commit(function (err) {
                            if (err) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
                                });
                            }
                            conn.release();
                            return resolve(updateProfileData);

                        });
                    }

                }

            });
        });
    });
}


// update user email
let updateUserEmail = (requestData, roleId) => {



    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }


                // profile table email update
                if (roleId == 3) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await dentistModel.updateDentistEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                } else if (roleId == 4) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await consultantModel.updateConsultantEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                } else if (roleId == 5) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await labModel.updateLabEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                } else if (roleId == 6) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await techCompanyModel.updateTechEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                } else if (roleId == 2) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await adminModel.updateAdminEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                } else if (roleId == 1) {

                    // otp status change
                    let disableOTP = await otpModel.updateEmailChangeRequest(requestData.otp_id, conn);
                    if (disableOTP.affectedRows == undefined || disableOTP.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    let updateProfileData = await superAdminModel.updateSuperAdminEmailById(requestData.email, requestData.updated_at, requestData.updated_by, requestData.profile_id, conn);

                    if (updateProfileData.affectedRows == undefined || updateProfileData.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }



                    conn.query(queriesUser.updateUserEmailById(), [requestData.email, requestData.user_id, requestData.updated_at, requestData.updated_by], (error, result, fields) => {

                        if (error) {

                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        } else {

                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                }
                                conn.release();
                                return resolve(result);

                            });
                        }


                    });


                }


            });
        });
    });
}


let getDataByWhereCondition = async (where = {}, orderBy = {}, limit = 2000, offset = 0, columnList = []) => {

    let connection = connectionEstateMYSQL;
    // get object, generate an array and push data value here
    let keys = Object.keys(where);

    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        if (Array.isArray(where[keys[index]]) && where[keys[index]].length > 1) {
            dataParameter.push(where[keys[index]][0], where[keys[index]][1]);    // where date between  ? and ?  [ so we pass multiple data]

        } else if (typeof where[keys[index]] === 'object' && !Array.isArray(where[keys[index]]) && where[keys[index]] !== null) {

            let key2 = Object.keys(where[keys[index]]);

            
            for (let indexKey = 0; indexKey < key2.length; indexKey++) {
                
                let tempSubKeyValue = where[keys[index]][key2[indexKey]];
                if (key2[indexKey].toUpperCase() === "OR" && Array.isArray( tempSubKeyValue )) {
                    for (let indexValue = 0; indexValue < tempSubKeyValue.length; indexValue++) {
                        dataParameter.push(tempSubKeyValue[indexValue]);
                    }
                } else if (key2[indexKey].toUpperCase() === "OR" ){
                    dataParameter.push(tempSubKeyValue);
                } else if  (key2[indexKey].toUpperCase() === "LIKE" ){
                    dataParameter.push('%' + tempSubKeyValue + '%');
                 } else if  (["IN", "NOT IN"].includes(key2[indexKey].toUpperCase())){
                    dataParameter.push( tempSubKeyValue);
                } else if  (["IN QUERY", "NOT IN QUERY"].includes(key2[indexKey].toUpperCase())){
                    // General Code manage my  query file
                } else if  (["GTE", "GT", "LTE", "LT", "NOT EQ" ].includes(key2[indexKey].toUpperCase())){
                    dataParameter.push(tempSubKeyValue);
                } 

            }

        } else {
            dataParameter.push(where[keys[index]]);
        }
    }

    return new Promise((resolve, reject) => {
        connection.query(queriesUser.getDataByWhereCondition(where, orderBy, limit, offset, columnList), [...dataParameter], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}




module.exports = {
    getUserByUserName,
    getUserByUserNameOrEmail,
    getUserById,
    getUserDataById,
    getPendingUserById,
    updateUserPasswordByUserId,
    getUserByEmail,
    getUserByPhone,
    addNewUser,
    resetPasswordForUser,
    disableUserById,
    enableUserById,
    getUserDetailsById,
    updateUserPasswordUsingForgetPassword,
    updateAdminUserData,
    deleteUserById,
    updateUserProfileById,
    updateUserEmail,
    getDataByWhereCondition

}

