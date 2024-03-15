import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import packageService from '../../../services/package.service'

const AddPackage = (props) => {
  const [id, setId] = useState()
  const [packageID, setPackageID] = useState()
  const [title, setTitle] = useState()
  const [duration, setDuration] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()

  // init
  useEffect(
    (props) => {
      // console.log({props.match.params.id})
      var url = window.location.href
      var id = url.substring(url.lastIndexOf('/') + 1)
      setPackageID(Number(id))
      if (id) {
        packageService.getPackageDetails(Number(id)).then((res) => {
          console.log(res?.data?.data)
          if (res.data.success) {
            setId(res?.data?.data?.id)
            setTitle(res?.data?.data?.title)
            setDuration(res?.data?.data?.duration)
            setPrice(res?.data?.data?.price)
            setDiscount(res?.data?.data?.discount_amount)
          }
        })
      } else {
        toast.error('Package Not found', {
          theme: 'dark',
        })
      }
    },
    [packageID],
  )
  // save action
  const onSaveAction = () => {
    if (!title) {
      toast.error('Title is required', {
        theme: 'dark',
      })
    } else if (!duration) {
      toast.error('Duration is required', {
        theme: 'dark',
      })
    } else if (!price) {
      toast.error('Price is required', {
        theme: 'dark',
      })
    } else if (!discount) {
      toast.error('Discount amount is required', {
        theme: 'dark',
      })
    } else {
      let data = {
        id: id,
        title: title,
        duration: duration,
        price: price,
        discount_amount: discount,
      }
      console.log(data)
      packageService.packageEdit(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/packages')
          } else {
            toast.error(res.data.message, {
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
                  <h2 className="breadcrumb_title">Edit Package</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Package Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Discount Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onSaveAction}
                >
                  Submit
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

export default AddPackage
