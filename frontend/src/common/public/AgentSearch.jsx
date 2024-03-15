import React, { useState } from 'react'
import { useEffect } from 'react'
import propertyService from '../../services/property.service'
import { toast } from 'react-toastify'
import categoriesService from '../../services/categories.service'
import locationService from '../../services/location.service'
import services from '../../services/services.service'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AgentSearch({
  filteredAgentList,
  searchNameText,
  searchEmailText,
  searchPhoneText,
  setSearchNameText,
  setSearchEmailText,
  setSearchPhoneText,
  setSearchClear,
  searchClear,
  allSearchHandler,
  getAgentList,
}) {
  const search = {
    parentLocationId: '',
    areaLocationId: ''
  }
  const [isSearchable, setIsSearchable] = useState(true)
  const [parentLocationData, setParentLocationData] = useState()
  const [locationList, setLocationList] = useState([])
  const [searchData, setSearchData] = useState(search)
  const [areaLocationData, setAreaLocationData] = useState()
  const [isDisabled, setIsDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    getParentLocations();
  }, [])
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

  const handleParentLocationChange = (newSelection) => {
    // setSearchData(...searchData, ...{ areaLocationId: {} })

    setSearchNameText(newSelection?.parentLocationId?.id);



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
    setIsLoading(true)
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
            filterData.length > 0 && setIsDisabled(false)
            filterData.length > 0 && setIsLoading(false)
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

    setSearchPhoneText(newSelection?.areaLocationId?.id);
    // setSearchPhoneText(newSelection);

    // console.log("handleChildLocationChange");
    // console.log(newSelection);

    setSearchData({ ...searchData, ...newSelection })
    localStorage.setItem(
      'searchData',
      JSON.stringify({ ...searchData, ...newSelection }),
    )
  }
  const clearSearchHandler = () => {
    setSearchClear(!searchClear)
    setSearchNameText('')
    setSearchEmailText('')
    setSearchPhoneText('')
    // setSearchTitle('')
    // let data = {
    //   limit: 10,
    //   offset: 0,
    // }
    // propertyService
    //   .getSearchAgentList(data)
    //   .then(
    //     (res) => {
    //       if (res?.data?.success) {
    //         filteredAgentList(res?.data)
    //       } else {
    //         filteredAgentList()
    //       }
    //     },
    //     (err) => {
    //       toast.error(err?.response?.data?.message, { theme: 'dark' })
    //     },
    //   )
    //   .catch((error) => {
    //     console.log(error)
    //   })
    getAgentList('', '', '')
  }

  return (
    <ul className="sasw_list mb0">
      <li className="search_area">
        <div className="form-group">
          <Select
            placeholder={'Location'}
            className="basic-single selectpicker w100 show-tick"
            classNamePrefix="select"
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
      </li>
      <li>
        <div className="form-group">
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
      </li>

      <li>
        <div className="search_option_button mb-3">
          <button onClick={allSearchHandler} className="btn btn-block btn-thm">
            Search
          </button>
        </div>
      </li>
      <li>
        <div className="search_option_button">
          <button
            onClick={clearSearchHandler}
            className="btn btn-block btn-thm"
          >
            Clear
          </button>
        </div>
      </li>
    </ul>
  )
}
