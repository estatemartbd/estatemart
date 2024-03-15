
require('dotenv').config();
const isEmpty = require('is-empty');
const request = require("request");

let sentSMS = async (smsData) => {

    if(isEmpty(smsData.phoneNo)){
        console.log("SMS not send as invalid PHONE no");
        return 0;
    }
    
    var options = {
        'method': 'POST',
        'url': `${process.env.smsUrl}?username=${process.env.smsUserName}&password=${process.env.smsPassword}&number=88${smsData.phoneNo}&message=${smsData.message}`,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    request(options, function (error, response) {
        if (error) console.log(`Message not send`);
        else console.log(`Message send`);
    });
}

module.exports = {
    sentSMS
}