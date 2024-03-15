const isEmpty = require('is-empty');
const { connectionEstateMYSQL } = require('../connections/connection');
const queriesSystemUser = require('../queries/system-user');
const queriesUser = require('../queries/user');
//const userModel = require('./user');


let getAllSystemUserList = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesSystemUser.getAllSystemUserList(), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getListByStatus = async (status = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesSystemUser.getListByStatus(status), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getSystemUserById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesSystemUser.getSystemUserById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getSystemUserDetailsById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queriesSystemUser.getSystemUserDetailsById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let addNewSystemUser = async (info = {}, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.addNewSystemUser(), [info], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let disableSystemUserById = async (updatedBy, updatedAt, systemUserId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.disableSystemUserById(), [updatedBy, updatedAt, systemUserId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let enableSystemUserById = async (updatedBy, updatedAt, systemUserId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.enableSystemUserById(), [updatedBy, updatedAt, systemUserId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let deleteSystemUserById = async (updatedBy = 0, updatedAt, systemUserId = 0, conn = undefined) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.updateSystemUserProfileById({
            "status": 0,
            "updated_by": updatedBy,
            "updated_at": updatedAt,
        }), [0, updatedBy, updatedAt, systemUserId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let updateSystemUserProfileById = (systemUserId, userId, systemUserData = {}, userData = {}) => {
    // get object, generate an array and push data value here
    // for SystemUser data
    let keys = Object.keys(systemUserData);
    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(systemUserData[keys[index]]);

    }

    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                // if (!isEmpty(userData)) {

                // get object, generate an array and push data value here
                // for user data

                let keys2 = Object.keys(userData);
                let dataParameter2 = [];

                for (let index2 = 0; index2 < keys2.length; index2++) {
                    dataParameter2.push(userData[keys2[index2]]);
                }

                conn.query(queriesUser.updateUserData(userData), [...dataParameter2, userId], (error, result, fields) => {

                    if (error) {
                        console.log(error);
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }

                    conn.query(queriesSystemUser.updateSystemUserProfileById(systemUserData), [...dataParameter, systemUserId], (error, result, fields) => {

                        if (error) {
                            console.log(error);
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
    });
}

let updateSystemUserEmailById = async (email, updatedAt, updatedBy, techId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.updateSystemUserEmailById(), [email, updatedAt, updatedBy, techId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
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
                if (key2[indexKey].toUpperCase() === "OR" && Array.isArray(tempSubKeyValue)) {
                    for (let indexValue = 0; indexValue < tempSubKeyValue.length; indexValue++) {
                        dataParameter.push(tempSubKeyValue[indexValue]);
                    }
                } else if (key2[indexKey].toUpperCase() === "OR") {
                    dataParameter.push(tempSubKeyValue);
                } else if (key2[indexKey].toUpperCase() === "LIKE") {
                    dataParameter.push('%' + tempSubKeyValue + '%');
                } else if (["IN", "NOT IN"].includes(key2[indexKey].toUpperCase())) {
                    dataParameter.push(tempSubKeyValue);
                } else if  (["IN QUERY", "NOT IN QUERY"].includes(key2[indexKey].toUpperCase())){
                    // General Code manage my  query file
                }  else if  (["GTE", "GT", "LTE", "LT", "NOT EQ" ].includes(key2[indexKey].toUpperCase())){
                    dataParameter.push(tempSubKeyValue);
                } 

            }

        } else {
            dataParameter.push(where[keys[index]]);
        }
    }

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.getDataByWhereCondition(where, orderBy, limit, offset, columnList), [...dataParameter], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

let updateById = async (id = 0, updateData = {}, conn = undefined) => {

    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;
    // get object, generate an array and push data value here

    // for update data
    let keysOfUpdateData = Object.keys(updateData);
    let dataParameterUpdateData = [];

    for (let index = 0; index < keysOfUpdateData.length; index++) {
        dataParameterUpdateData.push(updateData[keysOfUpdateData[index]]);
    }

    return new Promise((resolve, reject) => {
        connection.query(queriesSystemUser.updateById(updateData), [...dataParameterUpdateData, id], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}


module.exports = {
    getAllSystemUserList,
    getSystemUserById,
    addNewSystemUser,
    disableSystemUserById,
    enableSystemUserById,
    getSystemUserDetailsById,
    updateSystemUserProfileById,
    updateSystemUserEmailById,
    getDataByWhereCondition,
    getListByStatus,
    deleteSystemUserById,
    updateById
}

