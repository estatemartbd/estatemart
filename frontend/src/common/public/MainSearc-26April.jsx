import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import propertyService from "../../services/property.service";
import { toast } from "react-toastify";
import categoriesService from "../../services/categories.service";
import locationService from "../../services/location.service";
import services from "../../services/services.service";
import moment from "moment";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import indoorAmenitiesService from "../../services/indoorAmenities.service";
import outdoorAmenitiesService from "../../services/outdoorAmenities.service";

export default function MainSearch({ filteredPropertyList }) {
  const search = {
    categoryId: '',
    purpose: '',
    parentLocationId: '',
    areaLocationId: '',
    bathroom: '',
    bedroom: '',
    maxSize: '',
    indorCheckBox: [],
    outdorCheckBox: [],
    minSize: '',
    maxPrice: '',
    minSize: '',
    minPrice: ''
  }
  const { pur, cat, loc, area, bed, bath, minS, maxS, minP, maxP } =
    useParams();
  const [searchData, setSearchData] = useState(search);
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [imagePath, setImgPath] = useState("");
  const [purpose, setPurpose] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceImgPath, setServiceImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [advanceStatus, setAdvanceStatus] = useState(false);
  // Search state
  const [indoorAmenitiesList, setIndoorAmenitiesList] = useState();
  const [outdoorAmenitiesList, setOutdoorAmenitiesList] = useState();
  const [indorCheckBox, setIndoorCheckBox] = useState([]);
  const [outdorCheckBox, setOutdoorCheckBox] = useState([]);
  const [searchTitle, setSearchTitle] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoriesData, setCategoryData] = useState();
  const [defaultActivePropertyType, setDefaultActivePropertyType] = useState();
  const [defaultActiveLocation, setDefaultActiveLocation] = useState();
  const [defaultActiveArea, setDefaultActiveArea] = useState();
  const [parentLocationId, setParentLocationId] = useState();
  const [parentLocationData, setParentLocationData] = useState();
  const [areaLocationId, setAreaLocationId] = useState();
  const [areaLocationData, setAreaLocationData] = useState();
  const [areaData, setAreaData] = useState();
  const [grandChildAreaLocationId, setGrandChildAreaLocationId] = useState();
  const [grandChildAreaLocationData, setGrandChildAreaLocationData] =
    useState();
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [searchClear, setSearchClear] = useState(false);
  const [searchCateError, setSearchCateError] = useState(false);
  const [searchLocationError, setSearchLocationError] = useState(false);
  const [bathroom, setBathroom] = useState();
  const [bedroom, setBedroom] = useState();
  const [maxSize, setmaxSize] = useState();
  const [minSize, setminSize] = useState();
  const [maxPrice, setmaxPrice] = useState();
  const [minPrice, setminPrice] = useState();
  let location = useLocation();
  let navigate = useNavigate();
  // const search = useLocation().search;
  useEffect(() => {
    getServiceList();
    getCatagories();
    getParentLocations();
    getIndoorAmenitiesList();
    getOutdoorAmenitiesList();
    getAreaList();
    console.log("location.pathname", location.pathname);
  }, []);

  useLayoutEffect(() => {
    console.log(
      "purpose1==",
      pur,
      "cat",
      cat,
      loc,
      area,
      bed,
      bath,
      minS,
      maxS,
      minP,
      maxP
    );
    if (pur != null) setPurpose(pur);
    if (cat != undefined) {
      // setCategoryId(cat)
      console.log(
        "Cat",
        categoriesData?.find((val) => val?.value == cat)
      );
      setCategoryId(categoriesData?.find((val) => val?.value == cat));
    }
    if (loc != undefined) {
      // setCategoryId(cat)
      console.log(
        "Loc",
        parentLocationData?.find((val) => val?.value),
        loc
      );
      setParentLocationId(parentLocationData?.find((val) => val?.value == loc));
    }
    if (area != undefined) {
      // setCategoryId(cat)
      console.log(
        "area",
        areaLocationData?.find((val) => val?.value),
        area
      );
      setAreaLocationId(areaData?.find((val) => val?.value == area));
    }
    if (bath != undefined) setBathroom(bath);
    if (bed != undefined) setBedroom(bed);
    if (minS != undefined) setminSize(minS);
    if (maxS != undefined) setmaxSize(maxS);
    if (maxP != undefined) setmaxPrice(maxP);
    if (minP != undefined) setminPrice(minP);
    allSearchHandler()
  }, [categoriesData, parentLocationData, areaData]);

  const getAreaList = async () => {
    locationService.getArea().then(
      (res) => {
        console.log(
          "Child area",
          res.data.data.map((e) => e.id)
        );
        console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setAreaData(
          filterData.map((e) => {
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
        toast.error(err.response.data.message, {
          theme: "dark",
        });
      }
    );
  };
  // get services
  const getServiceList = async () => {
    await services.getActiveServiceList().then((res) => {
      setServiceList(res?.data?.data);
      setServiceImgPath(res?.data?.imageFolderPath);
    });
  };

  // get getCatagories list
  const getCatagories = async () => {
    await categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data);
          let filterData = res?.data?.data;
          setCategoryData(
            filterData.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              };
            })
          );
        } else {
          setCatagoriesList([]);
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: "dark" });
      }
    );
  };

  // get getParentLocations
  const getParentLocations = async () => {
    await locationService.getParentList().then((res) => {
      setLocationList(
        res?.data?.data.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          };
        })
      );

      let filterData = res?.data?.data;
      setParentLocationData(
        filterData.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          };
        })
      );
    });
  };
  // Select Category List
  const handleCategoryChange = (newSelection) => {
    setCategoryId(newSelection);
    localStorage.setItem('search',JSON.stringify(newSelection))
    console.log(newSelection, "Category ID");
    setDefaultActivePropertyType(newSelection);
  };
  // Select location List
  const handleParentLocationChange = (newSelection) => {
    setParentLocationId(newSelection);
    console.log(newSelection);
    // setDefaultActiveLocation(newSelection);
    if (newSelection.id) {
      locationService.getChildAreaListById(newSelection.id).then(
        (res) => {
          console.log(
            "Child area",
            res.data.data.map((e) => e.id)
          );
          console.log(res.data.data.map((e) => e.title));
          let filterData = res?.data?.data;
          setAreaLocationData(
            filterData.map((e) => {
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
          toast.error(err.response.data.message, {
            theme: "dark",
          });
        }
      );
    }
  };
  // Select Grand Child Area List
  const handleChildLocationChange = (newSelection) => {
    setAreaLocationId(newSelection);

    // if (newSelection.id) {
    //   locationService.getGrandChildAreaListById(newSelection.id).then(
    //     (res) => {
    //       console.log(
    //         "Child area",
    //         res.data.data.map((e) => e.id)
    //       );
    //       console.log(res.data.data.map((e) => e.title));
    //       let filterData = res?.data?.data;
    //       setGrandChildAreaLocationData(
    //         filterData.map((e) => {
    //           return {
    //             ...e,
    //             value: e.id,
    //             label: e.title,
    //           };
    //         })
    //       );
    //       // setImagePath(res?.data?.imageFolderPath)
    //     },
    //     (err) => {
    //       toast.error(err.response.data.message, {
    //         theme: "dark",
    //       });
    //     }
    //   );
    // }
  };
  // Select Grand Child Area List

  // Get Indoor Amenities
  const getIndoorAmenitiesList = async () => {
    await indoorAmenitiesService.getActiveIndoorAmenList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setIndoorAmenitiesList(
          filterData.map((e) => {
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
        toast.error(err.response.data.message, {
          theme: "dark",
        });
      }
    );
  };

  const checkedIndoorAmen = (event) => {
    var updatedList = [...indorCheckBox];
    // console.log('event.target.value=', event.target.value)
    if (event.target.checked) {
      updatedList = [...indorCheckBox, event.target.value];

      console.log("updatedList=", updatedList);
    } else {
      updatedList.splice(indorCheckBox.indexOf(event.target.value), 1);
    }
    // console.log('updatedList=', updatedList)
    setIndoorCheckBox(updatedList);
  };

  // Get Outdoor Amenities
  const getOutdoorAmenitiesList = async () => {
    await outdoorAmenitiesService.getActiveOutdoorAmenList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data;
        setOutdoorAmenitiesList(
          filterData.map((e) => {
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
        toast.error(err.response.data.message, {
          theme: "dark",
        });
      }
    );
  };

  const checkedOutdoorAmen = (event) => {
    var updatedList2 = [...outdorCheckBox];
    if (event.target.checked) {
      updatedList2 = [...outdorCheckBox, event.target.value];
    } else {
      updatedList2.splice(outdorCheckBox.indexOf(event.target.value), 1);
    }
    setOutdoorCheckBox(updatedList2);
  };

  const allSearchHandler = () => {
    let data = {
      limit: 10,
      offset: 0,
      category: categoryId?.id,
      location: parentLocationId?.id,
      area: areaLocationId?.id,
      purpose: purpose != null && purpose,
      bedroom: bedroom != null && bedroom,
      bathroom: bathroom != null && bathroom,
      min_size: minSize != null && minSize,
      max_size: maxSize != null && maxSize,
      min_price: minPrice != null && minPrice,
      max_price: maxPrice != null && maxPrice,
      indoor_amenities: indorCheckBox != null && indorCheckBox,
      outdoor_amenities: outdorCheckBox != null && outdorCheckBox,
    };
    console.log("Search Data", data);
    propertyService
      .getActivePropertyList(data)
      .then(
        (res) => {
          if (res?.data?.success) {
            setSearchClear(true);
            setPropertyList(res?.data?.data);
            filteredPropertyList(res?.data?.data);
            setImgPath(res?.data?.imageResizeFolderPath);
          } else {
            setPropertyList([]);
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: "dark" });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const clearSearchHandler = () => {
    console.log("Clear");
    setSearchClear(!searchClear);
    setCategoryId();
    setParentLocationId();
    setPurpose(null);
    setAreaLocationId();
    let path = location.pathname.split("/").slice(1).join(" ");
    if (path?.includes("home")) {
      navigate("/");
    } else {
      navigate("/all-ads");
    }


    setBathroom();
    setBedroom();
    setmaxSize();
    setminSize();
    setmaxPrice();
    setminPrice();
    getServiceList();
    getCatagories();
    getParentLocations();
    getIndoorAmenitiesList();
    getOutdoorAmenitiesList();
    getAreaList()
    setSearchTitle('')
    let data = {
      limit: 10,
      offset: 0,
    };
    propertyService
      .getActivePropertyList(data)
      .then(
        (res) => {
          if (res?.data?.success) {
            setSearchClear(true);
            setPropertyList(res?.data?.data);
            filteredPropertyList(res?.data?.data);
            setImgPath(res?.data?.imageResizeFolderPath);
          } else {
            setPropertyList([]);
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: "dark" });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("categoriesData", categoriesData);
  console.log("categoryId", categoryId);
  console.log("parentLocationId?.id", parentLocationId);
  console.log("parentLocationData", parentLocationData);
  console.log("areaLocationId?.id", areaLocationId);
  console.log("areaLocationData", areaLocationData);
  console.log("defaultActivePropertyType", defaultActivePropertyType);
  return (
    <div className="row posr  justify-content-center">
      <div className="col-lg-10">
        <div className="home_content home4">
          <div className="home_adv_srch_opt home4">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className={purpose == null ? "nav-link active" : "nav-link"}
                  onClick={() => setPurpose(null)}
                >
                  All
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={purpose == 1 ? "nav-link active" : "nav-link"}
                  onClick={() => setPurpose(1)}
                >
                  Sale
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => setPurpose(2)}
                  className={purpose == 2 ? "nav-link active" : "nav-link"}
                >
                  Rent
                </a>
              </li>
            </ul>
            <div className="tab-content home1_adsrchfrm" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-all"
                role="tabpanel"
                aria-labelledby="pills-all-tab"
              >
                <div className="home1-advnc-search home4">
                  <ul className="h1ads_1st_list mb0">
                    <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={"Property Type"}
                            className="basic-single selectpicker w100 show-tick"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isSearchable={isSearchable}
                            name="categoryId"
                            options={categoriesData}
                            value={categoryId}
                            onChange={handleCategoryChange}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: "none",
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={"Location"}
                            className="basic-single selectpicker w100 show-tick"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: "none",
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isSearchable={isSearchable}
                            name="parentLocationId"
                            options={parentLocationData}
                            value={parentLocationId}
                            onChange={handleParentLocationChange}
                          />
                        </div>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={"Area"}
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: "none",
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isSearchable={isSearchable}
                            name="areaLocationId"
                            options={areaLocationData}
                            value={areaLocationId}
                            onChange={handleChildLocationChange}
                          />
                        </div>
                      </div>
                    </li>
                    {/* Grand Child Location */}
                    {/* <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={"Area"}
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: "none",
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isSearchable={isSearchable}
                            name="grandAreaLocationId"
                            options={grandChildAreaLocationData}
                            value={grandChildAreaLocationId?.value}
                            onChange={handleGrandChildLocationChange}
                          />
                        </div>
                      </div>
                    </li> */}
                    {/* Advance Search */}
                    <li className="custome_fields_520 list-inline-item">
                      <div className="navbered">
                        <div className="mega-dropdown home4">
                          <span
                            onClick={() => setAdvanceStatus(!advanceStatus)}
                            className="dropbtn"
                          >
                            Advanced{" "}
                            <i className="flaticon-more pl10 flr-520"></i>
                          </span>
                          <div
                            className="dropdown-content"
                            style={{
                              display: advanceStatus == true ? "block" : "none",
                            }}
                          >
                            <div className="row p15">
                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Bedroom</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="bedroom"
                                    value={bedroom}
                                    onChange={(e) => setBedroom(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Bathroom</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="bathroom"
                                    value={bathroom}
                                    onChange={(e) =>
                                      setBathroom(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Min Size</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="minSize"
                                    value={minSize}
                                    onChange={(e) => setminSize(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Max Size</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="maxSize"
                                    value={maxSize}
                                    onChange={(e) => setmaxSize(e.target.value)}
                                  />
                                </div>
                              </div>

                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Min Price</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="minPrice"
                                    value={minPrice}
                                    onChange={(e) =>
                                      setminPrice(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-2">
                                <div className="my_profile_setting_input form-group">
                                  <label for="propertyTitle">Max Price</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="maxPrice"
                                    value={maxPrice}
                                    onChange={(e) =>
                                      setmaxPrice(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row p15">
                              <div className="col-lg-12">
                                <h4 className="text-thm3">Indoor Amenities</h4>
                              </div>
                              {indoorAmenitiesList?.map((item, index) => {
                                return (
                                  <>
                                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id={`indoor-checkbox-${index}`}
                                              name={item.id}
                                              value={item.id}
                                              onChange={(e) =>
                                                checkedIndoorAmen(e)
                                              }
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor={`indoor-checkbox-${index}`}
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
                            <div className="row p15">
                              <div className="col-lg-12">
                                <h4 className="text-thm3">Outdoor Amenities</h4>
                              </div>
                              {outdoorAmenitiesList?.map((item, index) => {
                                return (
                                  <>
                                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id={`outdoor-checkbox-${index}`}
                                              name={item.id}
                                              value={item.id}
                                              onChange={(e) =>
                                                checkedOutdoorAmen(e)
                                              }
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor={`outdoor-checkbox-${index}`}
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
                            <div className="row p15 pt0-xsd">
                              <div className="col-lg-11 col-xl-10"></div>
                              <div className="col-lg-1 col-xl-2">
                                <div className="mega_dropdown_content_closer">
                                  <h5 className="text-thm text-right mt15">
                                    <span
                                      onClick={() =>
                                        setAdvanceStatus(!advanceStatus)
                                      }
                                      className="curp"
                                    >
                                      Hide
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Advance Search End*/}
                    <li className="list-inline-item" style={{ width: "200px" }}>
                      <div className="search_option_button">
                        {location.pathname
                          .split("/")
                          .slice(1)
                          .join(" ")
                          ?.includes("home") ? (
                          <Link
                            to={
                              "/all-ads/" +
                              purpose +
                              "/" +
                              categoryId?.value +
                              "/" +
                              parentLocationId?.value +
                              "/" +
                              areaLocationId?.value +
                              "/" +
                              bedroom +
                              "/" +
                              bathroom +
                              "/" +
                              minSize +
                              "/" +
                              maxSize +
                              "/" +
                              minPrice +
                              "/" +
                              maxPrice
                            }
                            className="btn btn-thm3"
                          >
                            Search
                          </Link>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-thm3"
                            onClick={allSearchHandler}
                          >
                            Search
                          </button>
                        )}
                        {location.pathname
                          .split("/")
                          .slice(1)
                          .join(" ")
                          ?.includes("home") ? (
                          <a
                            type="submit"
                            className="btn btn-thm3"
                            href={"/"}
                          >
                            Clear
                          </a>
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-thm3"
                            onClick={clearSearchHandler}
                          >
                            Clear
                          </button>
                          // <a
                          //   type="submit"
                          //   className="btn btn-thm3"
                          //   href={'/all-ads'}
                          // >
                          //   Clear
                          // </a>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
    // </section>
  );
}
