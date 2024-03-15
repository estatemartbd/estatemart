const { connectionEstateMYSQL } = require('../connections/connection');
const userSubscribedPackageHistoryModel = require('../models/user-subscribed-package-history');
const queries = require('../queries/user-subscribed-package');

// Promises Method


let getById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let addNew = async (info = {}, conn = undefined) => {
    let connection = connectionEstateMYSQL;
    if (conn !== undefined) connection = conn;

    return new Promise((resolve, reject) => {
        connection.query(queries.addNew(), [info], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
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

let updateWithMultipleInfo = async (info = { "id": 0, "data": {} }, packageSubscribeHistoryData = {}) => {
    return new Promise((resolve, reject) => {


        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }


                let result = await updateById(info.id, info.data, conn);

                if (result.affectedRows == undefined || result.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve(result);
                    });
                }


                let temPackageSubscribeHistoryResult = await userSubscribedPackageHistoryModel.addNew(packageSubscribeHistoryData, conn);

                if (temPackageSubscribeHistoryResult.affectedRows == undefined || temPackageSubscribeHistoryResult.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve(temPackageSubscribeHistoryResult);
                    });
                }

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

            });
        });

    });
}

let addNewWithMultipleInfo = async (info = {}, packageSubscribeHistoryData = {}) => {
    return new Promise((resolve, reject) => {


        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }


                let result = await addNew(info, conn);

                if (result.affectedRows == undefined || result.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve(result);
                    });
                }


                let temPackageSubscribeHistoryResult = await userSubscribedPackageHistoryModel.addNew(packageSubscribeHistoryData, conn);

                if (temPackageSubscribeHistoryResult.affectedRows == undefined || temPackageSubscribeHistoryResult.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve(temPackageSubscribeHistoryResult);
                    });
                }



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

            });
        });

    });
}


let updateSubscribedPackageWithMultipleInfo = async (info = { "id": 0, "data": {} }, updatePackageSubscribeHistoryData = undefined) => {
    return new Promise((resolve, reject) => {


        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }


                let result = await updateById(info.id, info.data, conn);

                if (result.affectedRows == undefined || result.affectedRows < 1) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve(result);
                    });
                }


                if (updatePackageSubscribeHistoryData != undefined) {
                    let updateSubscribeHistory = await userSubscribedPackageHistoryModel.updateById(updatePackageSubscribeHistoryData.id, updatePackageSubscribeHistoryData.data, conn);

                    if (updateSubscribeHistory.affectedRows == undefined || updateSubscribeHistory.affectedRows < 1) {
                        return conn.rollback(function () {
                            conn.release();
                            resolve(updateSubscribeHistory);
                        });
                    }
                }




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

            });
        });

    });
}


module.exports = {
    getById,
    addNew,
    getDataByWhereCondition,
    updateById,
    addNewWithMultipleInfo,
    updateWithMultipleInfo,
    updateSubscribedPackageWithMultipleInfo
}

