import React, {useState} from 'react'
import { useEffect } from "react";
import propertyService from "../../services/property.service";
import { toast } from "react-toastify";
import categoriesService from "../../services/categories.service";
import locationService from "../../services/location.service";
import services from "../../services/services.service";
import moment from "moment";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function MainSearch({filteredPropertyList}) {
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [imagePath, setImgPath] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState(1);
  const [locationList, setLocationList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceImgPath, setServiceImgPath] = useState("");
  const [loading, setLoading] = useState(false);
    // Search state
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
    const [grandChildAreaLocationId, setGrandChildAreaLocationId] = useState();
    const [grandChildAreaLocationData, setGrandChildAreaLocationData] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const [searchClear, setSearchClear] = useState(false);
    const [searchCateError, setSearchCateError] = useState(false);
    const [searchLocationError, setSearchLocationError] = useState(false);
    useEffect(() => {
      getServiceList();
      getCatagories()
      getParentLocations()
    }, []);


    // get services
    const getServiceList = () => {
      services.getActiveServiceList().then((res) => {
        setServiceList(res?.data?.data);
        setServiceImgPath(res?.data?.imageFolderPath);
      });
    };


    // get getCatagories list
  const getCatagories = () => {
    categoriesService.getCategoriesList().then(
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
  const getParentLocations = () => {
    locationService.getParentList().then((res) => {
      setLocationList(res?.data?.data);
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
    setCategoryId(
      newSelection.id
    );
    console.log(newSelection.id, "Category ID");
    setDefaultActivePropertyType(newSelection);
    let cat_id = newSelection.id;
  };
  // Select location List
  const handleParentLocationChange = (newSelection) => {
    setParentLocationId({
      newSelection,
    });
    console.log(newSelection);
    setDefaultActiveLocation(newSelection);
    if (newSelection.id) {
      locationService.getChildAreaListById(newSelection.id).then(
        (res) => {
          console.log('Child area',res.data.data.map((e) => e.id));
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

  const allSearchHandler = () => {
    let data = {
      limit: 10,
      offset: 0,
      category: categoryId
    };
    propertyService.getActivePropertyList(data).then(
      (res) => {
        if (res?.data?.success) {
          setSearchClear(true);
          setPropertyList(
            res?.data?.data
          );
          filteredPropertyList(res?.data?.data)
          setImgPath(res?.data?.imageResizeFolderPath);
        } else {
          setPropertyList([]);
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: "dark" });
      }
    ).catch((error=>{
      console.log(error)
    }));
  }
  const clearSearchHandler = () => {
    setSearchClear(!searchClear);
    setDefaultActivePropertyType(null);
    setDefaultActiveLocation(null);
    // setSearchTitle('')
    let data = {
      limit: 10,
      offset: 0,
    };
    propertyService.getActivePropertyList(data).then(
      (res) => {
        if (res?.data?.success) {
          setSearchClear(true);
          setPropertyList(
            res?.data?.data
          );
          filteredPropertyList(res?.data?.data)
          setImgPath(res?.data?.imageResizeFolderPath);
        } else {
          setPropertyList([]);
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: "dark" });
      }
    ).catch((error=>{
      console.log(error)
    }));
  };

  // Select Grand Child Area List
  const handleChildLocationChange = (newSelection) => {
    setAreaLocationId({
      value: newSelection,
    });
    if (newSelection.id) {
      locationService.getGrandChildAreaListById(newSelection.id).then(
        (res) => {
          console.log('Child area',res.data.data.map((e) => e.id));
          console.log(res.data.data.map((e) => e.title));
          let filterData = res?.data?.data;
          setGrandChildAreaLocationData(
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
  const handleGrandChildLocationChange = (newSelection) => {
    setGrandChildAreaLocationId({
      value: newSelection,
    });

  };
  console.log('defaultActivePropertyType', defaultActivePropertyType);
  return (
    <section
        className="adSearch parallax pt30-520"
        data-stellar-background-ratio="0.2"
        style={{
          backgroundColor: " rgb(7, 15, 67)",
          backgroundPosition: "50% -121.44px",
        }}
      >
        <div className="container">
          <div className="row posr  justify-content-center">
            <div className="col-lg-8">
              <div className="home_content home4">
                <div className="home_adv_srch_opt home4">
                  <ul className="nav nav-pills" id="pills-tab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="pills-all-tab"
                        data-toggle="pill"
                        href="#pills-all"
                        role="tab"
                        aria-controls="pills-all"
                        aria-selected="true"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-home-tab"
                        data-toggle="pill"
                        href="#pills-home"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Buy
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="pills-profile-tab"
                        data-toggle="pill"
                        href="#pills-profile"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Rent
                      </a>
                    </li>
                  </ul>
                  <div
                    className="tab-content home1_adsrchfrm"
                    id="pills-tabContent"
                  >
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
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="categoryId"
                                    options={categoriesData}
                                    value={defaultActivePropertyType}
                                    onChange={handleCategoryChange}
                                  />


                                </div>
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div className="search_option_two">
                                <div className="candidate_revew_select">
                                  <Select
                                    placeholder={"Division"}
                                    className="basic-single selectpicker w100 show-tick"
                                    classNamePrefix="select"
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="parentLocationId"
                                    options={parentLocationData}
                                    value={defaultActiveLocation}
                                    onChange={handleParentLocationChange}
                                  />

                                </div>
                              </div>
                            </li>
                            <li className="list-inline-item">
                              <div className="search_option_two">
                                <div className="candidate_revew_select">
                                  <Select
                                  placeholder={"District"}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    isDisabled={isDisabled}
                                    isLoading={isLoading}
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="areaLocationId"
                                    options={areaLocationData}
                                    value={areaLocationId?.value}
                                    onChange={handleChildLocationChange}
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
                                    isClearable={isClearable}
                                    isSearchable={isSearchable}
                                    name="grandAreaLocationId"
                                    options={grandChildAreaLocationData}
                                    value={grandChildAreaLocationId?.value}
                                    onChange={handleGrandChildLocationChange}
                                  />

                                </div>
                              </div>
                            </li>

                            <li className="list-inline-item">
                              <div className="search_option_button">
                              <button
                                    type="submit"
                                    className="btn btn-thm3"
                                    onClick={allSearchHandler}
                                  >
                                    Search
                                  </button>
                                {searchClear && (
                                  <button
                                    type="submit"
                                    className="btn btn-thm3"
                                    onClick={clearSearchHandler}
                                  >
                                    Clear
                                  </button>
                                )}
                              </div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="home1-advnc-search home4">
                        <ul className="h1ads_1st_list mb0">
                          {/* <!-- <li className="list-inline-item">
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputName1" placeholder="Enter keyword...">
                                            </div>
                                        </li> --> */}
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Property Type</option>
                                  <option>Apartment</option>
                                  <option>Commercial</option>
                                  <option>Hotel and Resort</option>
                                  <option>House</option>
                                  <option>Land</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Loction</option>
                                  <option>Dhaka</option>
                                  <option>Savar</option>
                                  <option>Sylhet</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Area</option>
                                  <option>Mirpur</option>
                                  <option>Uttara</option>
                                  <option>Bannani</option>
                                  <option>Gulshan</option>
                                  <option>Badda</option>
                                  <option>Danmondi</option>
                                </select>
                              </div>
                            </div>
                          </li>

                          <li className="custome_fields_520 list-inline-item">
                            <div className="navbered">
                              <div className="mega-dropdown home4">
                                <span id="show_advbtn" className="dropbtn">
                                  Advanced{" "}
                                  <i className="flaticon-more pl10 flr-520"></i>
                                </span>
                                <div className="dropdown-content">
                                  <div className="row p15">
                                    <div className="col-lg-12">
                                      <h4 className="text-thm3">Amenities</h4>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck1"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck1"
                                            >
                                              Air Conditioning
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck2"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck2"
                                            >
                                              Lawn
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck3"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck3"
                                            >
                                              Swimming Pool
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck4"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck4"
                                            >
                                              Barbeque
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck5"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck5"
                                            >
                                              Microwave
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck6"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck6"
                                            >
                                              TV Cable
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck7"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck7"
                                            >
                                              Dryer
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck8"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck8"
                                            >
                                              Outdoor Shower
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck9"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck9"
                                            >
                                              Washer
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck10"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck10"
                                            >
                                              Gym
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck11"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck11"
                                            >
                                              Refrigerator
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck12"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck12"
                                            >
                                              WiFi
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck13"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck13"
                                            >
                                              Laundry
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck14"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck14"
                                            >
                                              Sauna
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck15"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck15"
                                            >
                                              Window Coverings
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="row p15 pt0-xsd">
                                    <div className="col-lg-11 col-xl-10">
                                      <ul className="apeartment_area_list mb0">
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Bathrooms</option>
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Bedrooms</option>
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Year built</option>
                                              <option>2013</option>
                                              <option>2014</option>
                                              <option>2015</option>
                                              <option>2016</option>
                                              <option>2017</option>
                                              <option>2018</option>
                                              <option>2019</option>
                                              <option>2020</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Built-up Area</option>
                                              <option>Adana</option>
                                              <option>Ankara</option>
                                              <option>Antalya</option>
                                              <option>Bursa</option>
                                              <option>Bodrum</option>
                                              <option>Gaziantep</option>
                                              <option>İstanbul</option>
                                              <option>İzmir</option>
                                              <option>Konya</option>
                                            </select>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-lg-1 col-xl-2">
                                      <div className="mega_dropdown_content_closer">
                                        <h5 className="text-thm text-right mt15">
                                          <span
                                            id="hide_advbtn"
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
                          <li className="list-inline-item">
                            <div className="search_option_button">
                              <button type="submit" className="btn btn-thm3">
                                Search
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="home1-advnc-search home4">
                        <ul className="h1ads_1st_list mb0">
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Property Type</option>
                                  <option>Apartment</option>
                                  <option>Commercial</option>
                                  <option>Hotel and Resort</option>
                                  <option>House</option>
                                  <option>Land</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Loction</option>
                                  <option>Dhaka</option>
                                  <option>Savar</option>
                                  <option>Sylhet</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li className="list-inline-item">
                            <div className="search_option_two">
                              <div className="candidate_revew_select">
                                <select className="selectpicker w100 show-tick">
                                  <option>Area</option>
                                  <option>Mirpur</option>
                                  <option>Uttara</option>
                                  <option>Bannani</option>
                                  <option>Gulshan</option>
                                  <option>Badda</option>
                                  <option>Danmondi</option>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li className="custome_fields_520 list-inline-item">
                            <div className="navbered">
                              <div className="mega-dropdown home4">
                                <span id="show_advbtn2" className="dropbtn">
                                  Advanced{" "}
                                  <i className="flaticon-more pl10 flr-520"></i>
                                </span>
                                <div className="dropdown-content">
                                  <div className="row p15">
                                    <div className="col-lg-12">
                                      <h4 className="text-thm3">Amenities</h4>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck16"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck16"
                                            >
                                              Air Conditioning
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck17"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck17"
                                            >
                                              Lawn
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck18"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck18"
                                            >
                                              Swimming Pool
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck19"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck19"
                                            >
                                              Barbeque
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck20"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck20"
                                            >
                                              Microwave
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck21"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck21"
                                            >
                                              TV Cable
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck22"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck22"
                                            >
                                              Dryer
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck23"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck23"
                                            >
                                              Outdoor Shower
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck24"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck24"
                                            >
                                              Washer
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck25"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck25"
                                            >
                                              Gym
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck26"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck26"
                                            >
                                              Refrigerator
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck27"
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customCheck27"
                                            >
                                              WiFi
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-xxs-6 col-sm col-lg col-xl">
                                      <ul className="ui_kit_checkbox selectable-list">
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck28"
                                            />
                                            <label className="custom-control-label">
                                              Laundry
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck29"
                                            />
                                            <label className="custom-control-label">
                                              Sauna
                                            </label>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="custom-control custom-checkbox">
                                            <input
                                              type="checkbox"
                                              className="custom-control-input"
                                              id="customCheck30"
                                            />
                                            <label className="custom-control-label">
                                              Window Coverings
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="row p15 pt0-xsd">
                                    <div className="col-lg-11 col-xl-10">
                                      <ul className="apeartment_area_list mb0">
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Bathrooms</option>
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Bedrooms</option>
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option>4</option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Year built</option>
                                              <option>2013</option>
                                              <option>2014</option>
                                              <option>2015</option>
                                              <option>2016</option>
                                              <option>2017</option>
                                              <option>2018</option>
                                              <option>2019</option>
                                              <option>2020</option>
                                            </select>
                                          </div>
                                        </li>
                                        <li className="list-inline-item">
                                          <div className="candidate_revew_select">
                                            <select className="selectpicker w100 show-tick">
                                              <option>Built-up Area</option>
                                              <option>Adana</option>
                                              <option>Ankara</option>
                                              <option>Antalya</option>
                                              <option>Bursa</option>
                                              <option>Bodrum</option>
                                              <option>Gaziantep</option>
                                              <option>İstanbul</option>
                                              <option>İzmir</option>
                                              <option>Konya</option>
                                            </select>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col-lg-1 col-xl-2">
                                      <div className="mega_dropdown_content_closer">
                                        <h5 className="text-thm text-right mt15">
                                          <span
                                            id="hide_advbtn2"
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
                          <li className="list-inline-item">
                            <div className="search_option_button">
                              <button type="submit" className="btn btn-thm3">
                                Search
                              </button>
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
        </div>
      </section>
  )
}
