const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");
let fs = require('fs');
let path = require('path');
const commonObject = require('./common/common');

const { connectionEstateMYSQL } = require('./connections/connection');
const { routeAccessChecker } = require('./middlewares/routeAccess');
global.config = require('./jwt/config/config');
const verifyToken = require('./middlewares/jwt_verify/verifyToken');

const adminRouter = require('./routers/admin');
const authenticationRouter = require('./routers/authentication');
const userRouter = require('./routers/user');
const systemUserRouter = require('./routers/system-user');
const indoorAmenitiesRouter = require('./routers/indoor-amenities');
const outdoorAmenitiesRouter = require('./routers/outdoor-amenities');
const serviceRouter = require('./routers/service');
const blogRouter = require('./routers/blog');
const packageRouter = require('./routers/package');
const bannerRouter = require('./routers/banner');
const categoryRouter = require('./routers/categories');
const companyInfoRouter = require('./routers/company-info');
const areaRouter = require('./routers/area');
const propertyRouter = require('./routers/property');
const inquiryRouter = require('./routers/inquiry');
const contactUsRouter = require('./routers/contact-us');
const favouriteRouter = require('./routers/favourite');
const userSubscribedPackageRouter = require('./routers/user-subscribed-package');
const pageMetaRouter = require('./routers/page-meta');


router.use('/admin', adminRouter);
router.use('/authentication', authenticationRouter);
router.use('/blog', blogRouter);
router.use('/indoor-amenities', indoorAmenitiesRouter);
router.use('/outdoor-amenities', outdoorAmenitiesRouter);
router.use('/package', packageRouter);
router.use('/service', serviceRouter);
router.use('/system-user', systemUserRouter);
router.use('/user', userRouter);
router.use('/banner', bannerRouter);
router.use('/categories', categoryRouter);
router.use('/company-info', companyInfoRouter);
router.use('/area', areaRouter);
router.use('/inquiry', inquiryRouter);
router.use('/contact-us', contactUsRouter);
router.use('/favourite', favouriteRouter);
router.use('/property', propertyRouter);
router.use('/user-subscribed-package', userSubscribedPackageRouter);
router.use('/page-meta', pageMetaRouter);



router.get('/connection_check', (req, res) => {

    try {

        // This is for Pool connect
        connectionEstateMYSQL.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                return res.send({
                    "message": "Connection create fail",
                    "error": err,
                    "api v": 1
                });
            }

            connection.release();
            return res.send({
                "message": "Connection create success ",
                "api v": 1,
                "precess": connectionEstateMYSQL._acquiringConnections.length,
                "length": connectionEstateMYSQL._allConnections.length
            });
        });

        // This is for  connect
        // connectionEstateMYSQL.connect(function (err) {
        //     if (err) {
        //         return res.send({
        //             "message": "Connection create fail",
        //             "error": err,
        //             "api v": 1
        //         });
        //     }

        //     // console.log(connectionEstateMYSQL.destroy())

        //     return res.send({
        //         "message": "Connection create success",
        //         "api v": 1
        //     });
        // });


    } catch (error) {
        return res.status(400)
            .send({
                "status": 404,
                "message": "Connection create fail try",
                "api v": 1,
                "error": error
            });
    }
});



module.exports = router;