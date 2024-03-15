
const fs = require('fs');
const isEmpty = require('is-empty');
let watermark = require('jimp-watermark');
require('dotenv').config();

let makeWaterMarkInImage = async (imageName = "", imagePath = "") => {

    try {

        if (!fs.existsSync(`${imagePath}original`)) {
            fs.mkdirSync(`${imagePath}original`);
        }
        
        let optionsForWatermark = {
            'ratio': 0.5,// Should be less than one
            'opacity': 0.8, //Should be less than one
            'dstPath' : `${imagePath}${imageName}`,
            'positionX': 2,
            'positionY': 3.9,
        };
    
        let optionsForDuplicateImage = {
            'ratio': 0.5,// Should be less than one
            'opacity': 0, //Should be less than one
            'dstPath' : `${imagePath}original/${imageName}`,
            'positionX': 2,
            'positionY': 3.9,
        };
        
        watermark.addWatermark(`${imagePath}${imageName}`, './logo.png', optionsForDuplicateImage);
        watermark.addWatermark(`${imagePath}${imageName}`, './logo.png', optionsForWatermark);
    
        return ({ "success" :  true})
    } catch (error) {return ({ "success" :  false})}
    
}

module.exports = {
    makeWaterMarkInImage
}