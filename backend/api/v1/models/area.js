const { connectionEstateMYSQL } = require('../connections/connection');
const queries = require('../queries/area');

// Promises Method

let getList = async () => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.getList(), (error, result, fields) => {
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

let addNew = async (info) => {
    return new Promise((resolve, reject) => {
        connectionEstateMYSQL.query(queries.addNew(), [info], (error, result, fields) => {
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

let changeStatusValueById = (id,  mainData = {}, childData = {}) => {
    // get object, generate an array and push data value here
    // for Parent data
    let keys = Object.keys(mainData);
    let dataParameter = [];

    for (let index = 0; index < keys.length; index++) {
        dataParameter.push(mainData[keys[index]]);

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

                conn.query(queries.updateById(mainData), [...dataParameter, id], (error, result, fields) => {
                    if (error) {
                        console.log(error);
                        return conn.rollback(function () {
                            conn.release();
                            resolve([]);
                        });
                    }


                    if(childData.length > 0){
                        let setData = {
                            updated_by : mainData.updated_by
                        };
                        if(mainData.status == 0){
                            setData.status = 0;
                        } else if(mainData.status == 1){
                            setData.status = 1;
                        } else if(mainData.status == 2){
                            setData.status = 2;
                        }

                        for (let data = 0; data < childData.length; data++) {
                            let element = childData[data];
                            
                            let keys2 = Object.keys(setData);
                            let dataParameter2 = [];

                            for (let index2 = 0; index2 < keys2.length; index2++) {
                                dataParameter2.push(setData[keys2[index2]]);
                            }
                            try {
                            conn.query(queries.updateById(setData), [...dataParameter2, element.id], (error, result, fields) => {

                                if (error) {
                                    
                                    console.log(error);
                                    return conn.rollback(function () {
                                        conn.release();
                                        resolve([]);
                                    });
                                } 
                            });

                        } catch (error) {
                            return conn.rollback(function () {
                                conn.release();
                                console.log(error);
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


module.exports = {
    getList,
    getActiveList,
    getByTitle,
    getById,
    addNew,
    getDataByWhereCondition,
    updateById,
    changeStatusValueById
}

