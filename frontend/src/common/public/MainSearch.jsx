/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import propertyService from '../../services/property.service'
import { toast } from 'react-toastify'
import categoriesService from '../../services/categories.service'
import locationService from '../../services/location.service'
import services from '../../services/services.service'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import indoorAmenitiesService from '../../services/indoorAmenities.service'
import outdoorAmenitiesService from '../../services/outdoorAmenities.service'

export default function MainSearch({ setPropertyList, setSelectedCatagory }) {
  const search = {
    categoryId: '',
    purpose: '',
    parentLocationId: '',
    areaLocationId: '',
    bathroom: '',
    bedroom: '',
    maxSize: '',
    indorCheckBox: [],
    outdoorCheckBox: [],
    minSize: '',
    maxPrice: '',
    minSize: '',
    minPrice: '',
  }
  const [searchData, setSearchData] = useState(search)
  const [catagoriesList, setCatagoriesList] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [purpose, setPurpose] = useState(null)
  const [locationList, setLocationList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [serviceImgPath, setServiceImgPath] = useState('')
   const [advanceStatus, setAdvanceStatus] = useState(false)
  // Search state
  const [indoorAmenitiesList, setIndoorAmenitiesList] = useState()
  const [outdoorAmenitiesList, setOutdoorAmenitiesList] = useState()
  const [indorCheckBox, setIndoorCheckBox] = useState([])
  const [outdoorCheckBox, setOutdoorCheckBox] = useState([])
  const [searchTitle, setSearchTitle] = useState()
  const [categoryId, setCategoryId] = useState()
  const [categoriesData, setCategoryData] = useState()
  const [defaultActivePropertyType, setDefaultActivePropertyType] = useState()
  const [parentLocationId, setParentLocationId] = useState()
  const [parentLocationData, setParentLocationData] = useState()
  const [areaLocationId, setAreaLocationId] = useState()
  const [areaLocationData, setAreaLocationData] = useState()
  const [areaData, setAreaData] = useState()
   const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchClear, setSearchClear] = useState(false)

  let location = useLocation()
  let navigate = useNavigate()
  // const search = useLocation().search;
  useEffect(() => {
    getServiceList()
    getCatagories()
    getParentLocations()
    getIndoorAmenitiesList()
    getOutdoorAmenitiesList()
    getAreaList()
    console.log('location.pathname', location.pathname)
  }, [])

  useEffect(() => {
    console.log('Local', localStorage.getItem('searchData'))
    if (
      window.localStorage != undefined &&
      localStorage.getItem('searchData')
    ) {
      setSearchData(JSON.parse(localStorage.getItem('searchData')))
    }
    console.log('setSearchData==', searchData)

    // allSearchHandler()
  }, [categoriesData, parentLocationData, areaData])

  const getAreaList = async () => {
    locationService.getArea().then(
      (res) => {
        console.log(
          'Child area',
          res.data.data.map((e) => e.id),
        )
        console.log(res.data.data.map((e) => e.title))
        let filterData = res?.data?.data
        setAreaData(
          filterData.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            }
          }),
        )
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }
  // get services
  const getServiceList = async () => {
    await services.getActiveServiceList().then((res) => {
      setServiceList(res?.data?.data)
      setServiceImgPath(res?.data?.imageFolderPath)
    })
  }

  // get getCatagories list
  const getCatagories = async () => {
    await categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data)
          let filterData = res?.data?.data
          setCategoryData(
            filterData.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              }
            }),
          )
        } else {
          setCatagoriesList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }

  // get getParentLocations
  const getParentLocations = async () => {
    await locationService.getParentList().then((res) => {
      setLocationList(
        res?.data?.data.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        }),
      )

      let filterData = res?.data?.data
      setParentLocationData(
        filterData.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        }),
      )
    })
  }
  // Select Category List
  const handleCategoryChange = (newSelection) => {
    setCategoryId(newSelection)
    setSelectedCatagory(newSelection?.categoryId?.id)
    setSearchData({ ...searchData, ...newSelection })
    localStorage.setItem(
      'searchData',
      JSON.stringify({ ...searchData, ...newSelection }),
    )
    console.log(newSelection, 'Category ID')
    setDefaultActivePropertyType(newSelection)
  }
  // Input Text List
  const handleText = (newSelection) => {
    setSearchData({ ...searchData, ...newSelection })
    localStorage.setItem(
      'searchData',
      JSON.stringify({ ...searchData, ...newSelection }),
    )
    console.log(newSelection, 'Category ID')
    setDefaultActivePropertyType(newSelection)
  }
  // Select location List
  const handleParentLocationChange = (newSelection) => {
    // setSearchData(...searchData, ...{ areaLocationId: {} })

    setParentLocationId(newSelection)
    setSearchData({ ...searchData, ...newSelection })
    localStorage.setItem(
      'searchData',
      JSON.stringify({ ...searchData, ...newSelection }),
    )

    // localStorage.setItem(
    //   'searchData',
    //   JSON.stringify(...searchData, ...{ areaLocationId: {} }),
    // )
    console.log('parentLocationId', newSelection)
    // setDefaultActiveLocation(newSelection);
    if (newSelection) {
      locationService
        .getChildAreaListById(newSelection?.parentLocationId?.id)
        .then(
          (res) => {
            console.log(
              'Child area',
              res.data.data.map((e) => e.id),
            )
            console.log(res.data.data.map((e) => e.title))
            let filterData = res?.data?.data
            setAreaLocationData(
              filterData.map((e) => {
                return {
                  ...e,
                  value: e.id,
                  label: e.title,
                }
              }),
            )
            // setImagePath(res?.data?.imageFolderPath)
          },
          (err) => {
            toast.error(err.response.data.message, {
              theme: 'dark',
            })
          },
        )
    }
  }
  // Select Grand Child Area List
  const handleChildLocationChange = (newSelection) => {
    setAreaLocationId(newSelection)
    setSearchData({ ...searchData, ...newSelection })
    localStorage.setItem(
      'searchData',
      JSON.stringify({ ...searchData, ...newSelection }),
    )
  }
  // Select Grand Child Area List

  // Get Indoor Amenities
  const getIndoorAmenitiesList = async () => {
    await indoorAmenitiesService.getActiveIndoorAmenList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data
        setIndoorAmenitiesList(
          filterData.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            }
          }),
        )
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }

  const checkedIndoorAmen = (event) => {
    var updatedList = [...indorCheckBox, event.target.value]
    if (event.target.checked) {
      setIndoorCheckBox(updatedList)
      setSearchData({ ...searchData, ...{ indorCheckBox: updatedList } })
      localStorage.setItem(
        'searchData',
        JSON.stringify({
          ...searchData,
          ...{ indorCheckBox: updatedList },
        }),
      )
    } else {
      setIndoorCheckBox(indorCheckBox.filter((e) => e != event.target.value))
      setSearchData({
        ...searchData,
        ...{
          indorCheckBox: indorCheckBox.filter((e) => e != event.target.value),
        },
      })
      localStorage.setItem(
        'searchData',
        JSON.stringify({
          ...searchData,
          ...{
            indorCheckBox: indorCheckBox.filter((e) => e != event.target.value),
          },
        }),
      )
    }

    // setSearchData({ ...searchData, ...{ indorCheckBox: updatedList } });
  }

  // Get Outdoor Amenities
  const getOutdoorAmenitiesList = async () => {
    await outdoorAmenitiesService.getActiveOutdoorAmenList().then(
      (res) => {
        // console.log(res.data.data.map((e) => e.id));
        // console.log(res.data.data.map((e) => e.title));
        let filterData = res?.data?.data
        setOutdoorAmenitiesList(
          filterData.map((e) => {
            return {
              ...e,
              value: e.id,
              label: e.title,
            }
          }),
        )
        // setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }

  const checkedOutdoorAmen = (event) => {
    var updatedList = [...outdoorCheckBox, event.target.value]
    if (event.target.checked) {
      setOutdoorCheckBox(updatedList)
      setSearchData({ ...searchData, ...{ outdoorCheckBox: updatedList } })
      localStorage.setItem(
        'searchData',
        JSON.stringify({
          ...searchData,
          ...{ outdoorCheckBox: updatedList },
        }),
      )
    } else {
      setOutdoorCheckBox(
        outdoorCheckBox.filter((e) => e !== event.target.value),
      )
      setSearchData({
        ...searchData,
        ...{
          outdoorCheckBox: outdoorCheckBox.filter(
            (e) => e !== event.target.value,
          ),
        },
      })
      localStorage.setItem(
        'searchData',
        JSON.stringify({
          ...searchData,
          ...{
            outdoorCheckBox: outdoorCheckBox.filter(
              (e) => e !== event.target.value,
            ),
          },
        }),
      )
    }
  }

  const allSearchHandler = () => {
    let data = {
      limit: 10,
      offset: 0,
      category: searchData?.categoryId?.id,
      location: searchData?.parentLocationId?.id,
      area: searchData?.areaLocationId?.id,
      purpose: Number(localStorage?.getItem('purpose')),
      bedroom: searchData?.bedroom,
      bathroom: searchData?.bathroom,
      min_size: searchData?.minSize,
      max_size: searchData?.maxSize,
      min_price: searchData?.minPrice,
      max_price: searchData?.maxPrice,
      indoor_amenities: searchData?.indorCheckBox,
      outdoor_amenities: searchData?.outdoorCheckBox,
    }
    console.log('Search Data', data)
    propertyService
      .getActivePropertyList(data)
      .then(
        (res) => {
          if (res?.data?.success) {
            setSearchClear(true)
            setPropertyList(res?.data?.data)
            setImgPath(res?.data?.imageResizeFolderPath)
          } else {
            setPropertyList([])
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
      .catch((error) => {
        console.log(error)
      })
  }
  const clearSearchHandler = () => {
    setSearchData(search)
    let data = {
      limit: 10,
      offset: 0,
    }
    localStorage.removeItem('searchData')
    propertyService
      .getActivePropertyList(data)
      .then(
        (res) => {
          if (res?.data?.success) {
            setSearchClear(true)
            setPropertyList(res?.data?.data)
            setImgPath(res?.data?.imageResizeFolderPath)
          } else {
            setPropertyList([])
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
      .catch((error) => {
        console.log(error)
      })
  }
  // console.log('searchData', searchData)

  useEffect(() => {
    let purposeID = localStorage?.getItem('purpose')
    if(purposeID){
      setPurpose(Number(purposeID))
    }
  }, [])
  
  return (
    <div className="row posr  justify-content-center">
      <div className="col-lg-10">
        <div className="home_content home4">
          <div className="home_adv_srch_opt home4">
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <li className="nav-item">
                <a
                  className={purpose == null ? 'nav-link active' : 'nav-link'}
                  onClick={() => {
                    setPurpose(null)
                    localStorage.removeItem('purpose')
                  }}
                >
                  All
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={purpose === 1 ? 'nav-link active' : 'nav-link'}
                  onClick={() => {
                    setPurpose(1)
                    localStorage.setItem('purpose', 1)
                  }}
                >
                  Sale
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={() => {
                    setPurpose(2)
                    localStorage.setItem('purpose', 2)
                  }}
                  className={purpose === 2 ? 'nav-link active' : 'nav-link'}
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
                  <ul className="h1ads_1st_list">
                    <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={'Property Type'}
                            className="basic-single selectpicker w100 show-tick"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isSearchable={isSearchable}
                            name="categoryId"
                            options={categoriesData}
                            value={searchData.categoryId}
                            onChange={(value) =>
                              handleCategoryChange({
                                categoryId: value,
                              })
                            }
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: 'none',
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
                            placeholder={'Location'}
                            className="basic-single selectpicker w100 show-tick"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: 'none',
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isSearchable={isSearchable}
                            name="parentLocationId"
                            options={parentLocationData}
                            value={searchData?.parentLocationId}
                            onChange={(value) =>
                              handleParentLocationChange({
                                parentLocationId: value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </li>
                    <li className="list-inline-item">
                      <div className="search_option_two">
                        <div className="candidate_revew_select">
                          <Select
                            placeholder={'Area'}
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            styles={{
                              control: (baseStyles) => ({
                                ...baseStyles,
                                border: 0,
                                boxShadow: 'none',
                              }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            isSearchable={isSearchable}
                            name="areaLocationId"
                            options={areaLocationData}
                            value={searchData?.areaLocationId}
                            onChange={(value) =>
                              handleChildLocationChange({
                                areaLocationId: value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </li>
                    {/* Grand Child Location */}

                    {/* Advance Search */}
                    <li className="custome_fields_520 list-inline-item">
                      <div className="navbered">
                        <div className="mega-dropdown home4">
                          <span
                            onClick={() => setAdvanceStatus(!advanceStatus)}
                            className="dropbtn"
                          >
                            Advanced{' '}
                            <i className="flaticon-more pl10 flr-520"></i>
                          </span>
                          <div
                            className="dropdown-content"
                            style={{
                              display: advanceStatus == true ? 'block' : 'none',
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
                                    min="0"
                                    max="15"
                                    value={searchData?.bedroom}
                                    onChange={(e) =>
                                      handleText({
                                        bedroom: e.target.value,
                                      })
                                    }
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
                                    min="0"
                                    max="15"
                                    value={searchData?.bathroom}
                                    onChange={(e) =>
                                      handleText({
                                        bathroom: e.target.value,
                                      })
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
                                    min="0"
                                    value={searchData?.minSize}
                                    onChange={(e) =>
                                      handleText({
                                        minSize: e.target.value,
                                      })
                                    }
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
                                    value={searchData?.maxSize}
                                    min="0"
                                    onChange={(e) =>
                                      handleText({
                                        maxSize: e.target.value,
                                      })
                                    }
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
                                    value={searchData?.minPrice}
                                    onChange={(e) =>
                                      handleText({
                                        minPrice: e.target.value,
                                      })
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
                                    value={searchData?.maxPrice}
                                    onChange={(e) =>
                                      handleText({
                                        maxPrice: e.target.value,
                                      })
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
                                              name={item?.id}
                                              value={item?.id}
                                              checked={
                                                searchData?.indorCheckBox?.filter(
                                                  (e) => {
                                                    return e == item?.id
                                                  },
                                                ).length > 0
                                              }
                                              onChange={(event) =>
                                                checkedIndoorAmen(event)
                                              }
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor={`indoor-checkbox-${index}`}
                                            >
                                              {item?.label}
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </>
                                )
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
                                              checked={
                                                searchData?.outdoorCheckBox?.filter(
                                                  (e) => {
                                                    return e == item?.id
                                                  },
                                                ).length > 0
                                              }
                                              onChange={(event) =>
                                                checkedOutdoorAmen(event)
                                              }
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor={`outdoor-checkbox-${index}`}
                                            >
                                              {item.label} {item.id}
                                            </label>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </>
                                )
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
                    <li className="list-inline-item" style={{ width: '200px' }}>
                      <div className="search_option_button">
                        {location.pathname
                          .split('/')
                          .slice(1)
                          .join(' ')
                          ?.includes('home') ? (
                          <Link to={'/all-ads'} className="btn btn-thm3">
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
                        <button
                          type="submit"
                          className="btn btn-thm3"
                          onClick={clearSearchHandler}
                        >
                          Clear
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
    // </div>
    // </section>
  )
}
