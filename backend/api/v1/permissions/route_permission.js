
let adminPermission = [
    "adminList", "adminRegistration", "adminResetPassword", "changeAdminStatus", "adminProfileUpdate", "adminPersonalProfileUpdate", "adminProfileDetails",
    "indoorAmenitiesList", "indoorAmenitiesAdd", "indoorAmenitiesActiveList", "indoorAmenitiesUpdate", "indoorAmenitiesDelete", "changeIndoorAmenitiesStatus", "indoorAmenitiesDetails", "indoorAmenitiesListLimit",
    "outdoorAmenitiesList", "outdoorAmenitiesAdd", "outdoorAmenitiesActiveList", "outdoorAmenitiesUpdate", "outdoorAmenitiesDelete", "changeOutdoorAmenitiesStatus", "outdoorAmenitiesDetails", "outdoorAmenitiesListLimit",
    "serviceList", "serviceAdd", "serviceActiveList", "serviceUpdate", "serviceDelete", "changeServiceStatus", "serviceDetails", "serviceListLimit",
    "blogList", "blogAdd", "blogActiveList", "blogUpdate", "blogDelete", "changeBlogStatus", "blogDetails", "blogListLimit",
    "packageList", "packageAdd", "packageActiveList", "packageUpdate", "packageDelete", "changePackageStatus", "packageDetails", "packageListLimit",
    "bannerList", "bannerAdd", "bannerActiveList", "bannerUpdate", "bannerDelete", "changeBannerStatus", "bannerDetails", "bannerListLimit", "bannerFrontend",
    "categoryList",
    "areaList", "areaAdd", "areaActiveList", "areaUpdate", "areaDelete", "changeAreaStatus", "areaDetails", "areaListLimit", "parentAreaList", "childAreaList",
    "companyDetails", "companyDetailsUpdate",
    "inquiryDetails","inquiryAdminList","readInquiry",
    "allFavouriteList","contactUsList","deleteContactUS","readContactUS","contactUSDetails", "pageMetaUpdate",

    "publishProperty","soldOut"
];

let agentPermission = [
    "submitInquiry","deleteInquiry","inquiryDetails","inquiryList","inquiryMySubmittedList","inquiryMyReceivedList",
    "makeFavourite","myFavouriteList","readInquiry",
    "packageList", "packageActiveList", "packageDetails", "packageListLimit"
];

let generalUserPermission = [
    "submitInquiry","deleteInquiry","inquiryDetails","inquiryList","inquiryMySubmittedList",
    "makeFavourite","myFavouriteList",
    "packageList", "packageActiveList", "packageDetails", "packageListLimit"
];



let getRouterPermissionList = async (id = 0) => {
    return new Promise((resolve, reject) => {
        if (id === 1) resolve(adminPermission);
        else if (id === 2) resolve(agentPermission);
        else if (id === 3) resolve(generalUserPermission);
        else resolve([]);
    });
}


module.exports = {
    getRouterPermissionList
}
