import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import RichTextEditor from "../helper/editor/RichTextEditor/index";
import SelectStyle from "../helper/SelectStyle";
import categoriesService from "../../../services/categories.service";
import locationService from "../../../services/location.service";
import { toast } from "react-toastify";
import indoorAmenitiesService from "../../../services/indoorAmenities.service";
import outdoorAmenitiesService from "../../../services/outdoorAmenities.service";
import PropertyServices from "../../../services/property.service";
import userService from '../../../services/user.service'

import * as Yup from "yup";
import clsx from "clsx";
import { Formik, useFormik } from "formik";

const initialValues = {
  property_name: null,
  address: null,
  categoriesData: null,
  parentLocationData: null,
  area: null,
  purpose: null,
  owner: null,
  details: "",
  description: "",
  size: null,
  bedroom: null,
  bathroom: null,
  price_per_sqft: null,
  total_price: null,
  floor: null,
  indoor_amenities: null,
  outdoor_amenities: null,
  distance: {},
  size_calculation_method: null,
  unit_size: null,
  total_unit: null,
  total_floor: null,
  id: null,
  front_road: null,
  entertainmentdistance: null,
  traindistance: null,
  schooldistance: null,
  busdistance: null,
  pharmacydistance: null,
  hospitaldistance: null,
  propertyImage: null,
  floorImage: null,
  meta_title: "",
  meta_description: "",
  meta_canonical_url: "",
  meta_tag: "",
  // post_owner_id: 0
};
const validationSchema = Yup.object().shape({
  property_name: Yup.string()
    .required("Title is required")
    .min(10, "Title must be greater than 2 character")
    .max(100, "Title must be less than 50 character"),
  category: Yup.number().required("category is required"),
  location: Yup.number().required("location is required"),
  area: Yup.number().required("area is required"),
  purpose: Yup.number().required("purpose is required"),
  size: Yup.number().required("size is required"),
  duration: Yup.string()
    .matches(
      /^[0-9]+$/,
      "Please enter numeric value only ! No alphabet character and special character is allowed"
    )
    .required("Duration is required")
    .test(
      "duration",
      "Workshop Duration must be between 1 minute to 800 minute",
      (value) => {
        if (parseInt(value) > 0 && parseInt(value) <= 800) {
          return true;
        } else {
          return false;
        }
      }
    ),
  price: Yup.string()
    .matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, "Please enter valid number only")
    .required("Price is required")
    .max(10, "Price must be less than or equal 10 digit")
    .test("Price", "Price must be greater than 0 $", (value) => {
      return value > "0";
    }),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "Unsupported file size ! only  5 Mb image is required",
      (value) => {
        console.log(value);
        return value && value.size <= 5000000;
      }
    )
    .test(
      "fileType",
      "Unsupported file format ! only png , jpg and jpeg required",
      (value) => {
        console.log(value);
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }
    ),
});

let purpose = [
  {
    label: "Rent",
    value: 1,
  },
  {
    label: "Sale",
    value: 2,
  },
];

const purposeMain = [
  {
    label: "Rent",
    value: 1,
  },
  {
    label: "Sale",
    value: 2,
  },
];

const owner = [
  {
    label: "Company",
    value: 1,
  },
  {
    label: "Land owner",
    value: 2,
  },
  {
    label: "Property owner",
    value: 3,
  },
];
const size_calculation_method = [
  {
    label: "Sqft",
    value: 1,
  },
];
const house_size_calculation_method = [
  {
    label: "Katha",
    value: 1,
  },
  {
    label: "Shotok",
    value: 2,
  },
  {
    label: "Bigha",
    value: 3,
  },
];

const UpdateProperty = () => {
  let navigate = useNavigate();
  const [propertyData, setPropertyData] = useState();
  const [purposeId, setPurposeId] = useState();
  const [sizeCalculationMethod, setSizeCalculationMethod] = useState();
  const [post_owner_id, setPostOwnerId] = useState();
  const [ownerShipId, setOwnerShipId] = useState();
  const [isFrontRoad, setFrontRoad] = useState();
  const [isDescriptionData, setDescriptionData] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const [categoryId, setCategoryId] = useState();
  const [propertyId, setPropertyId] = useState();
  const [categoriesData, setCategoryData] = useState();
  const [parentLocationId, setParentLocationId] = useState(0);
  const [parentLocationData, setParentLocationData] = useState();
  const [areaLocationId, setAreaLocationId] = useState();
  const [areaLocationData, setAreaLocationData] = useState();
  const [indoorAmenitiesList, setIndoorAmenitiesList] = useState();
  const [outdoorAmenitiesList, setOutdoorAmenitiesList] = useState();
  const [indorCheckBox, setIndoorCheckBox] = useState([]);
  const [outdorCheckBox, setOutdoorCheckBox] = useState([]);

  const [meInfo, setMeInfo] = useState(false);
  const [systemUserData, setSystemUserData] = useState()

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  // Status State
  const [isBedroom, setIsBedroom] = useState(true);
  const [isBathroom, setIsBathroom] = useState(true);
  const [isPricePerSqr, setIsPricePerSqr] = useState(true);
  const [isFloor, setIsFloor] = useState(true);
  const [isFloorPosition, setIsFloorPosition] = useState(false);
  const [isIndoorAmenities, setIsIndoorAmenities] = useState(true);
  const [isOutdoorAmenities, setIsOutdoorAmenities] = useState(true);
  const [isFloorImage, setIsFloorImage] = useState(true);
  const [isSizeCalculationMethod, setIsSizeCalculationMethod] = useState(false);
  const [isUnitSize, setIsUnitSize] = useState(false);
  const [isTotalUnit, setIsTotalUnit] = useState(false);
  const [isTotalFloor, setIsTotalFloor] = useState(false);
  const [isFloorImageFile, setFloorImageFile] = useState();
  const [isFloorImageFilePreviewUrl, setFloorImageFilePreviewUrl] = useState();

  const [propertyimageList, setPropertyimageList] = useState([
    { propertyImage: "" },
  ]);
  // const [propertyimageList, setPropertyimageList] = useState();

  const [descriptionValue, setValue] = useState();
  const [propertyDetailsValue, setPropertyDetailsValue] = useState({});
  const fristLoad = useRef(true);

  const areaRef = useRef(true);
  useEffect(() => {
    // initial edit values
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
    setPropertyId(Number(id));
    // setPropertyData();
    getCategoryList();
    getParentLocationList();
    getIndoorAmenitiesList();
    getOutdoorAmenitiesList();

    userService.getSystemUserList().then(
      (res) => {
        let finalData = [];

        if (res.data.success) {

          for (let index = 0; index < res.data.data.length; index++) {
            const e = res.data.data[index];
            finalData.push({
              label: `${e.name} (${e.role_name})`,
              value: e.user_id,
            })
          }
        }

        setSystemUserData(finalData)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    );

    userService
      .getMeInfo()
      .then((res) => {
        setMeInfo(res.data.data)
      })
      .catch((e) => {
        console.log(e.response.data.success)
      });

    let imagePreview = null;
  }, [parentLocationId, areaLocationData]);
  // Property Details
  useEffect(() => {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf("/") + 1);
    setPropertyId(Number(id));
    let formData = new FormData();
    formData.append("id", Number(id));
    // formData.append("directions_id", Number(id)'49ad8e0a-fca7-4b6b-928a-541a4575edfc');
    PropertyServices.detailsForAdminPanel(id).then(
      (res) => {
        // console.log("deetails", res?.data?.data.owner_ship);
        let filterData = res?.data?.data;
        // console.log('Filter', filterData);
        if (res?.data?.success == true && fristLoad.current) {
          setPropertyDetailsValue(res?.data);
          initialValues.property_name = filterData?.property_name;
          initialValues.address = filterData?.address;
          initialValues.details = filterData?.details;
          initialValues.property_name = filterData?.property_name;
          initialValues.size = filterData?.size;
          initialValues.bedroom = filterData?.bedroom;
          initialValues.bathroom = filterData?.bathroom;
          initialValues.price_per_sqft = filterData?.price_per_sqft;
          initialValues.total_price = filterData?.total_price;
          initialValues.floor = filterData?.floor;
          initialValues.unit_size = filterData?.unit_size;
          initialValues.total_unit = filterData?.total_unit;
          initialValues.total_floor = filterData?.total_floor;
          initialValues.front_road = filterData?.front_road;

          initialValues.propertyMetaTitle =
            filterData?.meta_title != "undefined" && filterData?.meta_title;
          initialValues.propertyMetaDescription =
            filterData?.meta_description != "undefined" &&
            filterData?.meta_description;
          initialValues.propertyMetaCanonicalUrl =
            filterData?.meta_canonical_url != "undefined" &&
            filterData?.meta_canonical_url;
          initialValues.propertyMetaTag =
            filterData?.meta_tag != "undefined" && filterData?.meta_tag;

          initialValues.post_owner_id =
            filterData?.post_owner_id != undefined && filterData?.post_owner_id;

          initialValues.entertainmentdistance =
            filterData?.distance.length >= 1
              ? filterData?.distance[0].distance
              : null;
          initialValues.traindistance =
            filterData?.distance.length >= 2
              ? filterData?.distance[1].distance
              : null;
          initialValues.schooldistance =
            filterData?.distance.length >= 3
              ? filterData?.distance[2].distance
              : null;
          initialValues.busdistance =
            filterData?.distance.length >= 4
              ? filterData?.distance[3].distance
              : null;
          initialValues.pharmacydistance =
            filterData?.distance.length >= 5
              ? filterData?.distance[4].distance
              : null;
          initialValues.hospitaldistance =
            filterData?.distance.length == 6
              ? filterData?.distance[5].distance
              : null;

          setCategoryId(
            categoriesData.find((val) => val?.value == filterData?.category)
          );


          setPostOwnerId(
            systemUserData.find((val) => val?.value == initialValues.post_owner_id)
          );


          // console.log('filterData?.category', typeof filterData?.category);
          let cat_id = filterData?.category;
          switch (cat_id) {
            //appertment
            case 1:
              setIsBedroom(true);
              setIsBathroom(true);
              setIsPricePerSqr(true);
              setIsFloor(true);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(false);
              setIsSizeCalculationMethod(false);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;
            //commercial
            case 2:
              setIsBedroom(false);
              setIsBathroom(true);
              setIsPricePerSqr(false);
              setIsFloor(true);
              setIsFloorPosition(true);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(true);
              setIsSizeCalculationMethod(false);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;
            //Hotel
            case 3:
              setIsBedroom(true);
              setIsBathroom(true);
              setIsPricePerSqr(false);
              setIsFloor(false);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(false);
              setIsSizeCalculationMethod(true);
              setIsUnitSize(true);
              setIsTotalUnit(true);
              setIsTotalFloor(true);
              break;
            //House
            case 4:
              setIsBedroom(true);
              setIsBathroom(true);
              setIsPricePerSqr(false);
              setIsFloor(false);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(false);
              setIsSizeCalculationMethod(false);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;
            //Land
            case 5:
              setIsBedroom(false);
              setIsBathroom(false);
              setIsPricePerSqr(true);
              setIsFloor(false);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(true);
              setIsSizeCalculationMethod(true);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;
            //Sublet
            case 6:
              setIsBedroom(true);
              setIsBathroom(true);
              setIsPricePerSqr(false);
              setIsFloor(true);
              setIsIndoorAmenities(true);
              setIsOutdoorAmenities(true);
              setIsFloorImage(true);
              setFrontRoad(false);
              setIsSizeCalculationMethod(false);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;

            default:
              setIsBedroom(false);
              setIsBathroom(false);
              setIsPricePerSqr(false);
              setIsFloor(false);
              setIsIndoorAmenities(false);
              setIsOutdoorAmenities(false);
              setIsFloorImage(false);
              setFrontRoad(false);
              setIsSizeCalculationMethod(false);
              setIsUnitSize(false);
              setIsTotalUnit(false);
              setIsTotalFloor(false);
              break;
          }
          setPurposeId(
            purpose?.find((val) => val?.value == filterData?.purpose)
          );
          setOwnerShipId(
            owner?.find((val) => val?.value == filterData?.owner_ship)
          );
          console.log("filterData?.area", filterData?.area);
          console.log(
            "areaLocationData 1111",
            areaLocationData?.find((val) => val?.value)
          );

          setParentLocationId(
            parentLocationData?.find(
              (val) => val?.value == filterData?.location
            )
          );

          setSizeCalculationMethod(
            size_calculation_method?.find(
              (val) => val?.value === filterData?.size_calculation_method
            )
          );
          // console.log('setAreaLocationId', areaLocationData?.find((val) => val?.value == 13));

          filterData?.indoor_amenities.length >= 1 &&
            setIndoorCheckBox(
              filterData?.indoor_amenities.map((i) => {
                return i.id;
              })
            );
          filterData?.outdoor_amenities.length >= 1 &&
            setOutdoorCheckBox(
              filterData?.outdoor_amenities.map((i) => {
                return i.id;
              })
            );

          fristLoad.current = false;
        }
      },
      (err) => {
        console.log("Error", err.response.data.message);
      }
    );
  }, [propertyDetailsValue, isFloorImageFile]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150";
  };
  // Get Category list
  const getCategoryList = () => {
    categoriesService.getCategoriesList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setCategoryData(
          filterData?.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            };
          })
        );
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        console.log("Error", err.response.data.message);
      }
    );
  };
  // Get Category list
  const getParentLocationList = async () => {
    await locationService.getParentList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setParentLocationData(
          filterData?.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            };
          })
        );

        getAreaLocationList();

        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        console.log("Error", err.response.data.message);
      }
    );
  };
  // Get Category list
  const getAreaLocationList = async () => {
    await locationService.getAreaById(parentLocationId?.value).then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        if (areaRef.current == true) {
          setAreaLocationData(
            filterData?.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              };
            })
          );
        }
        // console.log("areaLocationData = ", areaLocationData);
        setAreaLocationId(
          areaLocationData?.find(
            (val) => val?.id == propertyDetailsValue?.data?.area
          )
        );
        areaRef.current = false;
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        console.log("Error", err.response.data.message);
      }
    );
  };
  // Get Indoor Amenities
  const getIndoorAmenitiesList = async () => {
    await indoorAmenitiesService
      .getActiveIndoorAmenList()
      .then(
        (res) => {
          // console.log(res.data.data.map((e) => e.id));
          // console.log(res.data.data.map((e) => e.title));
          let filterData = res?.data?.data;
          setIndoorAmenitiesList(
            filterData?.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              };
            })
          );
          // setImagePath(res?.data?.imageFolderPath)
        },
        (err) => {
          console.log("Error", err.response.data.message);
        }
      )
      .catch((e) => {
        console.log("error", e);
      });
  };

  const checkedIndoorAmen = (event) => {
    var updatedList = [...indorCheckBox];
    // console.log('event.target.value=', event.target.value)

    console.log("updatedList=", updatedList);

    if (event.target.checked) {
      updatedList = [...indorCheckBox, parseInt(event.target.value)];
      setIndoorCheckBox(updatedList);
    } else {
      setIndoorCheckBox(indorCheckBox.filter((e) => e != event.target.value));
    }
  };

  // Get Outdoor Amenities
  const getOutdoorAmenitiesList = () => {
    outdoorAmenitiesService.getActiveOutdoorAmenList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setOutdoorAmenitiesList(
          filterData?.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            };
          })
        );
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        console.log("Error", err.response.data.message);
      }
    );
  };

  const checkedOutdoorAmen = (event) => {
    var updatedList = [...outdorCheckBox];
    if (event.target.checked) {
      updatedList = [...outdorCheckBox, parseInt(event.target.value)];
      setOutdoorCheckBox(updatedList);
    } else {
      setOutdoorCheckBox(outdorCheckBox.filter((e) => e != event.target.value));
    }
  };

  // Select Category List
  const handleCategoryChange = (newSelection) => {
    // setCategoryId({
    //   value: newSelection,
    // });
    setCategoryId(newSelection);
    console.log(newSelection, "Category ID");

    let cat_id = newSelection?.id;

    if (cat_id == 6) {
      purpose = [{ label: "Rent", value: 1 }];
      setPurposeId(1);
    } else purpose = purposeMain;

    switch (cat_id) {
      //appertment
      case 1:
        setIsBedroom(true);
        setIsBathroom(true);
        setIsPricePerSqr(true);
        setIsFloor(true);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(false);
        setIsSizeCalculationMethod(false);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);
        break;
      //commercial
      case 2:
        setIsBedroom(false);
        setIsBathroom(true);
        setIsPricePerSqr(false);
        setIsFloor(true);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(true);
        setIsSizeCalculationMethod(false);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);

        break;
      //House
      case 3:
        setIsBedroom(true);
        setIsBathroom(true);
        setIsPricePerSqr(false);
        setIsFloor(false);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(false);
        setIsSizeCalculationMethod(true);
        setIsUnitSize(true);
        setIsTotalUnit(true);
        setIsTotalFloor(true);
        break;
      //Hotel
      case 4:
        setIsBedroom(true);
        setIsBathroom(true);
        setIsPricePerSqr(false);
        setIsFloor(false);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(false);
        setIsSizeCalculationMethod(false);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);
        break;
      //Land
      case 5:
        setIsBedroom(false);
        setIsBathroom(false);
        setIsPricePerSqr(true);
        setIsFloor(false);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(true);
        setIsSizeCalculationMethod(true);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);
        break;
      //Sublet
      case 6:
        setIsBedroom(true);
        setIsBathroom(true);
        setIsPricePerSqr(false);
        setIsFloor(true);
        setIsIndoorAmenities(true);
        setIsOutdoorAmenities(true);
        setIsFloorImage(true);
        setFrontRoad(false);
        setIsSizeCalculationMethod(false);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);
        break;

      default:
        setIsBedroom(false);
        setIsBathroom(false);
        setIsPricePerSqr(false);
        setIsFloor(false);
        setIsIndoorAmenities(false);
        setIsOutdoorAmenities(false);
        setIsFloorImage(false);
        setFrontRoad(false);
        setIsSizeCalculationMethod(false);
        setIsUnitSize(false);
        setIsTotalUnit(false);
        setIsTotalFloor(false);
        break;
    }
  };
  // Select Category List
  const handlePurposeChange = (newSelection) => {
    setPurposeId(newSelection);
  };
  const handleSizeCalculationMethod = (newSelection) => {
    setSizeCalculationMethod(newSelection);
  };

  const handlePostOwnerId = (newSelection) => {
    setPostOwnerId(newSelection);
  };


  const handleOwnerShip = (newSelection) => {
    setOwnerShipId(newSelection);
  };
  // Select Area List
  const handleAreaLocationChange = (newSelection) => {
    console.log("handleAreaLocationChange", newSelection);
    setAreaLocationId(newSelection);
  };
  // Select location List
  const handleParentLocationChange = (newSelection) => {
    setParentLocationId(newSelection);
    console.log(newSelection);
    if (newSelection.id) {
      locationService.getAreaById(newSelection.id).then(
        (res) => {
          console.log(res.data.data.map((e) => e.id));
          console.log(res.data.data.map((e) => e.title));
          let filterData = res?.data?.data;
          setAreaLocationData(
            filterData?.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              };
            })
          );
          // setImagePath(res?.data?.imageFolderPath)
        },
        (err) => {
          console.log("Error", err.response.data.message);
        }
      );
    }
  };
  const _handleFloorImageFileChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log(file, "== file");
    console.log(reader, "== reader");

    reader.onloadend = () => {
      setFloorImageFile(file);
      setFloorImageFilePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const _handleRemveFloorImageFile = () => {
    setFloorImageFile();
    setFloorImageFilePreviewUrl();
  };
  const handleinputchange = (e, index) => {
    e.preventDefault();
    console.log("File===", e.target);
    // const { value } = e.target;

    let reader = new FileReader();
    let value = e.target.files[0];
    const list = [...propertyimageList];
    list[index] = value;

    // console.log(file, "== file");
    // console.log(reader, "== reader");

    reader.onloadend = () => {
      // setFloorImageFile(file);
      setPropertyimageList(list);
      // setFloorImageFilePreviewUrl(reader.result);
    };
    reader.readAsDataURL(value);
  };

  const handleremove = (index) => {
    const list = [...propertyimageList];
    list.splice(index, 1);
    setPropertyimageList(list);
  };

  const handleaddclick = () => {
    setPropertyimageList([...propertyimageList, { propertyImage: "" }]);
  };
  const handleDescriptionData = (e) => {
    console.log(e, "handleDescriptionData");
    setDescriptionData(e.target);
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,

    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log("values", values);

      const distance = {
        entertainment: {
          name: "entertainmen",
          distance: values.entertainmentdistance,
        },
        train: {
          name: "train",
          distance: values.traindistance,
        },
        school: {
          name: "school",
          distance: values.schooldistance,
        },
        bus: {
          name: "bus",
          distance: values.busdistance,
        },
        pharmacy: {
          name: "pharmacy",
          distance: values.pharmacydistance,
        },
        hospital: {
          name: "hospital",
          distance: values.hospitaldistance,
        },
      };

      // setbuttonLoading(true);
      const formData = new FormData();

      formData.append("id", propertyId);
      formData.append("property_name", values.property_name);
      formData.append("address", values.address);
      formData.append("category", categoryId.id);
      formData.append("location", parentLocationId?.id);
      formData.append(
        "area",
        areaLocationId?.id ? areaLocationId?.id : areaLocationId
      );
      formData.append("purpose", purposeId?.value);
      formData.append("details", values.details);
      formData.append("description", descriptionValue);
      formData.append("size", values.size);
      formData.append("bedroom", values.bedroom);
      formData.append("bathroom", values.bathroom);
      formData.append("price_per_sqft", values.price_per_sqft);
      formData.append("total_price", values.total_price);
      formData.append("floor", values.floor);
      // formData.append("indoor_amenities", indorCheckBox);

      formData.append("meta_title", values.propertyMetaTitle);
      formData.append("meta_description", values.propertyMetaDescription);
      formData.append("meta_canonical_url", values.propertyMetaCanonicalUrl);
      formData.append("meta_tag", values.propertyMetaTag);

      indorCheckBox.forEach((val) => {
        formData.append("indoor_amenities", val);
      });
      outdorCheckBox.forEach((val) => {
        formData.append("outdoor_amenities", val);
      });
      // formData.append("outdoor_amenities", outdorCheckBox);
      formData.append("distance", JSON.stringify(distance.entertainment));
      formData.append("distance", JSON.stringify(distance.train));
      formData.append("distance", JSON.stringify(distance.school));
      formData.append("distance", JSON.stringify(distance.bus));
      formData.append("distance", JSON.stringify(distance.pharmacy));
      formData.append("distance", JSON.stringify(distance.hospital));
      isSizeCalculationMethod &&
        formData.append(
          "size_calculation_method",
          sizeCalculationMethod?.value
        );
      formData.append("unit_size", values.unit_size);
      formData.append("owner_ship", ownerShipId?.value);
      formData.append("total_unit", values.total_unit);
      formData.append("total_floor", values.total_floor);
      formData.append("front_road", values.front_road);
      isFloorImageFile !== undefined &&
        formData.append("floor_image", isFloorImageFile);

      formData.append("post_owner_id", post_owner_id?.value);

      propertyimageList.forEach((val) => {
        console.log("property_image val", val);
        console.log("isFloorImageFile", isFloorImageFile);
        formData.append("property_image", val);
      });
      PropertyServices.propertyAdd(formData)
        .then((res) => {
          console.log("res", res);
          if (res.data.status == 201) {
            toast.success(res.data.message, {
              theme: "dark",
            });

            // redirect
            navigate("/auth/properties");
            // window.location.replace("/properties");
          } else {
            toast.error(res.data.message, {
              theme: "dark",
            });
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error(e.response.data.message, {
            theme: "dark",
          });
        });
      // Log the key/value pairs
      for (var pair of formData.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
      console.log("data", formData.append);
    },
  });

  // console.log("areaLocationId = ", areaLocationId);
  // console.log("parentLocationId = ", parentLocationId);
  // console.log("propertyDetailsValue = ", propertyDetailsValue);
  // console.log("areaRef.current = ", areaRef.current);
  // console.log("indorCheckBox = ", indorCheckBox);
  // console.log("outdorCheckBox = ", outdorCheckBox);
  // console.log("isFloorImageFile = ", isFloorImageFile);
  // console.log(
  //   propertyimageList.map((i) => i),
  //   "propertyimageList"
  // );
  console.log("csateId", categoryId?.id)
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="my_dashboard_review">
              <div className="row">
                <div className="col-lg-12 col-xl-12 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">Update Property</h2>
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <label for="property_name">Property Title<span className="star">*</span></label>
                    <input
                      className="form-control"
                      type="text"
                      id="property_name"
                      {...formik.getFieldProps("property_name")}
                    />
                  </div>
                </div>

                {meInfo?.role?.role_id == 1 && (

                  <div className="col-lg-12">
                    <div className="col-lg-6">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">
                          Property Owner
                        </label>

                        <Select
                          className="basic-single"
                          options={systemUserData}  // systemUserData
                          value={post_owner_id}
                          onChange={handlePostOwnerId}
                        />

                      </div>
                    </div>
                  </div>

                )}

                <div className="col-lg-3 col-xl-3">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label>Categories <span className="star">*</span></label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isSearchable={isSearchable}
                      name="categoryId"
                      options={categoriesData}
                      value={categoryId}
                      onChange={handleCategoryChange}
                      onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.category && formik.errors.category && (
                      <div className="fv-plugins-message-container mt-2">
                        <div className="fv-help-block">
                          <span role="alert" className="error text-danger">
                            {formik.errors.category}
                          </span>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
                <div className="col-lg-3 col-xl-3">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label>Purpose <span className="star">*</span></label>
                    <Select
                      className="basic-single"
                      options={purpose}
                      value={purposeId}
                      onChange={handlePurposeChange}
                    />
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label>Owner Ship</label>
                    <Select
                      className="basic-single"
                      options={owner}
                      value={ownerShipId}
                      onChange={handleOwnerShip}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-xl-3"></div>
                <div className="col-lg-3 col-xl-3">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label>Location <span className="star">*</span></label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isSearchable={isSearchable}
                      name="parentLocationId"
                      options={parentLocationData}
                      value={parentLocationId}
                      onChange={handleParentLocationChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-xl-3">
                  <div className="my_profile_setting_input ui_kit_select_search form-group">
                    <label>Area <span className="star">*</span></label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={isDisabled}
                      isLoading={isLoading}
                      isClearable={isClearable}
                      isSearchable={isSearchable}
                      name="areaLocationId"
                      options={areaLocationData}
                      value={areaLocationId}
                      onChange={handleAreaLocationChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="my_profile_setting_input form-group">
                    <label for="address">Address <span className="star">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      {...formik.getFieldProps("address")}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_profile_setting_textarea">
                    <label for="propertyDescription">Description <span className="star">*</span></label>

                    <RichTextEditor
                      setValue={setValue}
                      content={propertyDetailsValue?.data?.description}
                    />
                  </div>
                </div>

                {categoryId && categoryId?.id == 1 && purposeId?.value === 2 && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">
                          Size Calculation Method
                        </label>
                        <Select
                          className="basic-single"
                          options={size_calculation_method}
                          value={sizeCalculationMethod}
                          onChange={handleSizeCalculationMethod}
                        />
                      </div>
                    </div>
                  </>
                )}
                {categoryId && isSizeCalculationMethod && (<div className="col-lg-3">
                  <div className="my_profile_setting_input form-group">
                    <label for="propertyTitle">
                      Size Calculation Method
                    </label>
                    <Select
                      className="basic-single"
                      options={house_size_calculation_method}
                      value={sizeCalculationMethod}
                      onChange={handleSizeCalculationMethod}
                    />
                  </div>
                </div>)}

                {categoryId && categoryId?.id == 3 && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">
                          Land Size <span className="star">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="size"
                          {...formik.getFieldProps("size")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {categoryId && categoryId?.id != 3 && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">
                          Size <span className="star">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="size"
                          {...formik.getFieldProps("size")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* {isBedroom && <></>} */}
                {isBedroom && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Bedroom <span className="star">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          id="bedroom"
                          {...formik.getFieldProps("bedroom")}
                        />
                      </div>
                    </div>
                  </>
                )}
                {isBathroom && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Bathroom <span className="star">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          id="bathroom"
                          {...formik.getFieldProps("bathroom")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {isPricePerSqr && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Price Per Square <span className="star">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          id="price_per_sqft"
                          {...formik.getFieldProps("price_per_sqft")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {categoryId && categoryId?.id == 1 && (
                  <div className="col-lg-3">
                    <div className="my_profile_setting_input form-group">
                      <label for="propertyTitle">Total Price <span className="star">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        id="total_price"
                        {...formik.getFieldProps("total_price")}
                        min="0"
                      />
                    </div>
                  </div>
                )}

                {categoryId && categoryId?.id != 1 && (
                  <div className="col-lg-3">
                    <div className="my_profile_setting_input form-group">
                      <label for="propertyTitle">Price <span className="star">*</span></label>
                      <input
                        type="number"
                        className="form-control"
                        id="total_price"
                        {...formik.getFieldProps("total_price")}
                        min="0"
                      />
                    </div>
                  </div>
                )}


                {isFloor && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Floor <span className="star">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          id="floor"
                          {...formik.getFieldProps("floor")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {isFloorPosition && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Floor Position <span className="star">*</span></label>
                        <input
                          type="number"
                          className="form-control"
                          id="floor"
                          {...formik.getFieldProps("floor")}
                          min="0"
                        />
                      </div>
                    </div>
                  </>
                )}

                {isUnitSize && (
                  <>
                    <div className="col-lg-3 col-xl-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="formGroupExamplePrice">Unit Size</label>
                        <input
                          type="text"
                          className="form-control"
                          id="unit_size"
                          {...formik.getFieldProps("unit_size")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {isTotalUnit && (
                  <>
                    <div className="col-lg-3 col-xl-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="formGroupExampleArea">Total unit</label>
                        <input
                          type="text"
                          className="form-control"
                          id="total_unit"
                          {...formik.getFieldProps("total_unit")}
                        />
                      </div>
                    </div>
                  </>
                )}

                {isTotalFloor && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="total_floor">Total Floor</label>
                        <input
                          type="number"
                          className="form-control"
                          id="total_floor"
                          {...formik.getFieldProps("total_floor")}
                        />
                      </div>
                    </div>
                  </>
                )}
                {isFrontRoad && (
                  <>
                    <div className="col-lg-3">
                      <div className="my_profile_setting_input form-group">
                        <label for="front_road">Front Road</label>
                        <input
                          type="number"
                          className="form-control"
                          id="front_road"
                          {...formik.getFieldProps("front_road")}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="col-12">
                  <div className="row">
                    {/****** Indoor Amenities *******/}
                    {isIndoorAmenities && (
                      <>
                        <div className="col-xl-6">
                          <div className="row">
                            <div className="col-xl-12 mb-3">
                              <h4 className="font-weight-bold">
                                Indoor Amenities
                              </h4>
                            </div>

                            {indoorAmenitiesList?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                    key={index}
                                  >
                                    <ul className="ui_kit_checkbox selectable-list">
                                      <li>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={`custom-checkbox-${index}`}
                                            name={item?.id}
                                            value={item?.id}
                                            checked={
                                              indorCheckBox?.filter((e) => {
                                                return e == item?.id;
                                              }).length > 0
                                            }
                                            onChange={(e) => {
                                              checkedIndoorAmen(e);
                                            }}
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor={`custom-checkbox-${index}`}
                                          >
                                            {item.label}
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/****** Outdoor Amenities *******/}
                    {isOutdoorAmenities && (
                      <>
                        <div className="col-xl-6">
                          <div className="row">
                            <div className="col-xl-12 mb-3">
                              <h4 className="font-weight-bold">
                                Outdoor Amenities
                              </h4>
                            </div>
                            {outdoorAmenitiesList?.map((item2, index2) => {
                              return (
                                <>
                                  <div
                                    className="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                    key={index2}
                                  >
                                    <ul className="ui_kit_checkbox selectable-list">
                                      <li>
                                        <div className="custom-control custom-checkbox">
                                          <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={`checkbox2-${index2}`}
                                            value={item2.id}
                                            checked={
                                              outdorCheckBox.filter((e) => {
                                                return e == item2?.id;
                                              }).length > 0
                                            }
                                            onChange={(e) => {
                                              checkedOutdoorAmen(e);
                                            }}
                                          />
                                          <label
                                            className="custom-control-label"
                                            htmlFor={`checkbox2-${index2}`}
                                          >
                                            {item2.label}
                                          </label>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/****** distance *******/}
                <div className="col-xl-12 mt-3">
                  <div className="row">
                    <div className="col-xl-12">
                      <h4 className="font-weight-bold">Distance</h4>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row mb-3">
                        <div className="col-6 distance-title">Entertainmen</div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="entertainmentdistance"
                            {...formik.getFieldProps("entertainmentdistance")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row mb-3">
                        <div className="col-6 distance-title">Train/Metro</div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="traindistance"
                            {...formik.getFieldProps("traindistance")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row mb-3">
                        <div className="col-6 distance-title">
                          School/College/Varsity
                        </div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="schooldistance"
                            {...formik.getFieldProps("schooldistance")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row">
                        <div className="col-6 distance-title">Bus</div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="busdistance"
                            {...formik.getFieldProps("busdistance")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row">
                        <div className="col-6 distance-title">Pharmacy</div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="pharmacydistance"
                            {...formik.getFieldProps("pharmacydistance")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <div className="row">
                        <div className="col-6 distance-title">Hospital</div>
                        <div className="col-6 distance-input">
                          <input
                            type="text"
                            className="form-control"
                            id="hospitaldistance"
                            {...formik.getFieldProps("hospitaldistance")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 my_dashboard_review mt30">
                  <div className="row">
                    <div className="col-lg-12">
                      <h4 className="mb30">Property media</h4>
                    </div>

                    <div className="col-xl-12 d-lg-flex flex-wrap imgproperty justify-content-evenly">
                      {/* <label>Property Image <span className="star">*</span></label> */}
                      {/* <br /> */}
                      {propertyDetailsValue?.data?.property_image?.map(
                        (item, index) => {
                          return (

                            <ul className="mb0">
                              <li className="list-inline-item">
                                <div className="portfolio_item">
                                  <img key={index} className="img-fluid" src={propertyDetailsValue?.imageFolderPath + "/" + item?.name} onError={handleImageError} alt="property image" />
                                  <div className="edu_stats_list" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
                                    <a href="#"><span className="flaticon-garbage"></span></a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          );
                        }
                      )}
                    </div>

                    <div className="col-xl-12">
                      {propertyimageList?.map((x, i) => {
                        return (
                          <div className="row mb-3" key={i}>
                            <div className="form-group col-md-4 mt-4 d-flex">
                              <input
                                type="file"
                                name="propertyImage"
                                className="form-control"
                                placeholder="Select Image"
                                onChange={(e) => handleinputchange(e, i)}
                              />
                            </div>

                            <div className="form-group col-md-3 mt-4 d-flex">
                              {propertyimageList.length !== 1 && (
                                <button
                                  className="btn btn-danger mr-3 m-auto"
                                  onClick={() => handleremove(i)}
                                >
                                  Remove
                                </button>
                              )}
                              {propertyimageList.length - 1 === i && (
                                <button
                                  className="btn btn-success m-auto"
                                  onClick={handleaddclick}
                                >
                                  Add More
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="col-xl-12">
                      <div className="resume_uploader mb30">
                        <h4>Floor Image</h4>
                        <form className="form-inline">
                          {propertyDetailsValue?.data?.floor_image.length !=
                            0 &&
                            isFloorImageFilePreviewUrl == undefined && (
                              <div className="form-group col-md-1 mt-4 d-flex">
                                <img
                                  className="img-box"
                                  src={
                                    propertyDetailsValue?.imageFolderPath +
                                    "/" +
                                    propertyDetailsValue?.data?.floor_image[0]
                                      ?.name
                                  }
                                  onError={handleImageError}
                                />
                              </div>
                            )}
                          {isFloorImageFilePreviewUrl != undefined && (
                            <div className="form-group col-md-1 mt-4 d-flex">
                              <img
                                className="img-box"
                                src={isFloorImageFilePreviewUrl}
                                onError={handleImageError}
                              />
                            </div>
                          )}
                          <div className="form-group col-md-4">
                            <label>Floor Image <span className="star">*</span></label>
                            <input
                              type="file"
                              name="floorImage"
                              className="form-control"
                              placeholder="Select Image"
                              onChange={(e) =>
                                setFloorImageFile(e.target.files[0])
                              }
                            // id="floorImage"
                            // {...formik.getFieldProps("floorImage")}
                            />
                          </div>
                        </form>
                      </div>
                      {/* {isFloorImageFile && (
                        <ul className="mb0">
                          <li className="list-inline-item">
                            <div className="portfolio_item">
                              <img
                                className="img-fluid"
                                src={isFloorImageFilePreviewUrl}
                                alt="fp1.jpg"
                              />
                              <div
                                className="edu_stats_list"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                data-original-title="Delete"
                              >
                                <a onClick={_handleRemveFloorImageFile}>
                                  <span className="flaticon-garbage"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      )} */}
                    </div>

                    <div className="col-lg-12">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyMetaTitle">
                          Property Meta Title
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="propertyMetaTitle"
                          {...formik.getFieldProps("propertyMetaTitle")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyMetaDescription">
                          Property Meta Description
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="propertyMetaDescription"
                          {...formik.getFieldProps("propertyMetaDescription")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyMetaCanonicalUrl">
                          Property Meta Canonical Url
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="propertyMetaCanonicalUrl"
                          {...formik.getFieldProps("propertyMetaCanonicalUrl")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyMetaTag">Property Meta Tag</label>
                        <input
                          className="form-control"
                          type="text"
                          id="propertyMetaTag"
                          {...formik.getFieldProps("propertyMetaTag")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my_dashboard_review mt30">
              <div className="row">
                <div className="col-xl-12">
                  <div className="my_profile_setting_input text-center">
                    {/* <button className="btn btn1 float-left">Back</button> */}
                    <button className="btn btn2" type="submit">
                      Submit
                    </button>
                    {/* <a href="#"
                      className="btn btn-primary btn-lg btn-open-modal"
                      data-toggle="modal"
                      data-target="#modal-fullscreen-xl"
                    >
                      Fullscreen modal xl down
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div
        className="modal modal-fullscreen-xl"
        id="modal-fullscreen-xl"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default UpdateProperty;
