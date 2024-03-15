import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import bannerService from '../../../services/banner.service'
import locationService from '../../../services/location.service'

const AddBanner = () => {
  // const [propertyData, setPropertyData] = useState();
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [bannerType, setBannerType] = useState()
  const [image, setImage] = useState()
  const [details, setLink] = useState()

  // useEffect(() => {
  //   locationService.getParentList().then((res) => {
  //     let filterData = res?.data?.data
  //     setParentLocations(
  //       filterData?.map((e) => {
  //         return {
  //           ...e,
  //           value: e.id,
  //           label: e.title,
  //         }
  //       }),
  //     )
  //   })
  // }, [])

  // save action
  const onSaveAction = () => {
    if (!fromDate) {
      toast.error('From Date is required', {
        theme: 'dark',
      })
    } else if (!toDate) {
      toast.error('To Date is required', {
        theme: 'dark',
      })
    } else {
      let formData = new FormData()

      formData.append('from_date', fromDate)
      formData.append('to_date', toDate)
      formData.append('banner_type', bannerType)
      formData.append('image', image)
      formData.append('details', details)
      // console.log(formData, 'form data')

      bannerService.bannerAdd(formData).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })
            setFromDate('')
            setToDate('')
            setBannerType('')
            setImage('')
            // redirect
            window.location.replace('/auth/banners')
          }else{
            toast.info(res.data.message, {
              theme: 'dark',
            })
          }
        },
        (err) => {
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        },
      )
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Add Banner</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">From Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fromdate"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">To Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="todate"
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Banner Type</label>
                  <select
                    onChange={(e) => setBannerType(e.target.value)}
                    className="form-control"
                  >
                    {/* <option value={1}>Left</option> */}
                    <option value={2}>Right</option>
                    <option value={3}>Middle</option>
                    <option value={4}>Home</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              {( ![4,'4'].includes(bannerType)) ?
              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyDetails">Link</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyDetails"
                    value={details}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              </div> : ''}
              <div className="col-lg-12">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={onSaveAction}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  )
}

export default AddBanner
