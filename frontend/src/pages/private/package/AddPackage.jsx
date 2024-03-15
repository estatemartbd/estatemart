import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import packageService from '../../../services/package.service'

const AddPackage = () => {
  const [title, setTitle] = useState()
  const [duration, setDuration] = useState()
  const [price, setPrice] = useState()
  const [discount, setDiscount] = useState()

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
        title: title,
        duration: duration,
        price: price,
        discount_amount: discount,
      }
      console.log(data)
      packageService.packageAdd(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace("/auth/packages");

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
                  <h2 className="breadcrumb_title">Add Package</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Package Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Discount Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button
                  className="btn btn-dark"
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
