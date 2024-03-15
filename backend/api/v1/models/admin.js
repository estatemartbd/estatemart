const isEmpty = require('is-empty');
const { connectionEstateMYSQL } = require('../connections/connection');
const queries = require('../queries/admin');
const queriesUser = require('../queries/user');
//const userModel = require('./user');


let getAllAdminList = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getAllAdminList(), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getAdminById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getAdminById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getAdminDetailsById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getAdminDetailsById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let addNewAdmin = async (info = {}, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queries.addNewAdmin(), [info], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let disableAdminById = async (updatedBy, updatedAt, adminId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queries.disableAdminById(), [updatedBy, updatedAt, adminId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let enableAdminById = async (updatedBy, updatedAt, adminId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queries.enableAdminById(), [updatedBy, updatedAt, adminId], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let updateAdminProfileById = (adminId, userId, adminData = {}, userData = {}) => {
    // get object, generate an array and push data value here
    // for admin data
    let keys = Object.keys(adminData);
    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(adminData[keys[index]]);

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

                if (!isEmpty(userData)) {

                    // get object, generate an array and push data value here
                    // for user data
                    
                    let keys2 = Object.keys(userData);
                    let dataParameter2 = [];

                    for (let index2 = 0; index2 < keys2.length; index2++) {
                        dataParameter2.push(userData[keys2[index2]]);
                    }

                    await conn.query(queriesUser.updateAdminUserData(userData), [...dataParameter2, userId], async (error, result, fields) => {

                        if (error) {
                            console.log(error);
                            return conn.rollback(function () {
                                conn.release();
                                resolve([]);
                            });
                        }

                        // let updateUserData = await userModel.updateAdminUserData(userId,userData,conn);

                        // if (updateUserData.affectedRows == undefined || updateUserData.affectedRows < 1) {
                        //     return conn.rollback(function () {
                        // conn.release();
                        //         resolve([]);
                        //     });
                        // }
                    });
                }


                conn.query(queries.updateAdminProfileById(adminData), [...dataParameter, adminId], (error, result, fields) => {

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
        connection.query(queries.updateById(updateData), [...dataParameterUpdateData, id], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

let updateAdminEmailById = async (email, updatedAt, updatedBy, techId, conn) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queries.updateAdminEmailById(), [email, updatedAt, updatedBy, techId], (error, result, fields) => {
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
        connection.query(queries.getDataByWhereCondition(where, orderBy, limit, offset, columnList), [...dataParameter], (error, result, fields) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
}

module.exports = {
    getAllAdminList,
    getAdminById,
    addNewAdmin,
    disableAdminById,
    enableAdminById,
    getAdminDetailsById,
    updateAdminProfileById,
    updateAdminEmailById,
    getDataByWhereCondition,
    updateById
}

