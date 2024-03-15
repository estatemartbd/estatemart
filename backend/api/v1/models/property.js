const { connectionEstateMYSQL } = require('../connections/connection');
const queries = require('../queries/property');
const propertyImageModel = require('../models/property-image');

// Promises Method

let getList = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getList(), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getListWithLimit = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getListWithLimit(), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getActiveList = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getActiveList(), (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getByTitle = async (title = "") => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getByTitle(), [title], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let getById = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getById(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let addNew = (propertyDetails = {}, imageList = []) => {

    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.getConnection(function (err, conn) {

            conn.beginTransaction(async function (error) {
                if (error) {
                    return conn.rollback(function () {
                        conn.release();
                        resolve([]);
                    });
                }

                conn.query(queries.addNew(), propertyDetails, async (error, result, fields) => {


                    if (error) {

                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    } else {

                        let insertId = result.insertId;


                        for (let index = 0; index < imageList.length; index++) {

                            imageList[index].property_id = insertId;

                            let addData = await propertyImageModel.addNew(imageList[index], conn);
                            if (addData.affectedRows == undefined || addData.affectedRows < 1) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
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
                    }

                });

            });
        });
    });
}

let updateById = (id, propertyDetails = {}, imageList = []) => {
    // get object, generate an array and push data value here
    // for admin data
    let keys = Object.keys(propertyDetails);
    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(propertyDetails[keys[index]]);

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


                conn.query(queries.updateById(propertyDetails), [...dataParameter, id], async (error, result, fields) => {

                    if (error) {
                        console.log(error);
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    } else {

                        for (let index = 0; index < imageList.length; index++) {

                            imageList[index].property_id = id;

                            let addData = await propertyImageModel.addNew(imageList[index], conn);
                            if (addData.affectedRows == undefined || addData.affectedRows < 1) {
                                return conn.rollback(function () {
                                    conn.release();
                                    resolve([]);
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
                    }

                });

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

let updatePropertyClickCount = async (id = 0) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.updatePropertyClickCount(), [id], (error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}

let updateDataObjectById = async (id = 0, updateData = {}, conn = undefined) => {

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

let getFeaturedListByDate = async (limit = 0,offset = 0,todayDate)=> {
    
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getFeaturedListByDate(),[todayDate,limit,offset] ,(error, result, fields) => {
            if (error) reject(error)
            else resolve(result)
        });
    });
}





module.exports = {
    getList,
    getListWithLimit,
    getActiveList,
    getByTitle,
    getById,
    addNew,
    getDataByWhereCondition,
    updateById,
    updatePropertyClickCount,
    updateDataObjectById,
    getFeaturedListByDate
}

