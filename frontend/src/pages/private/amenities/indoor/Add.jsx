import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import indoorAmenitiesService from '../../../../services/indoorAmenities.service'

const AddPackage = () => {
  const [title, setTitle] = useState()

  // save action
  const onSaveAction = () => {
    if (!title) {
      toast.error('Title is required', {
        theme: 'dark',
      })
    }  else {
      let data = {
        title: title,
      }
      console.log(data)
      indoorAmenitiesService.indoorAmenitiesAdd(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace("/auth/indoor-amenities");

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
                  <h2 className="breadcrumb_title">Add New</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setTitle(e.target.value)}
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
