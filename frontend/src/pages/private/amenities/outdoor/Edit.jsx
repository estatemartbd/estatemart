import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import indoorAmenitiesService from '../../../../services/indoorAmenities.service'
import outdoorAmenitiesService from '../../../../services/outdoorAmenities.service'

const AddPackage = (props) => {
  const [id, setId] = useState()
  const [packageID, setPackageID] = useState()
  const [title, setTitle] = useState()

  // init
  useEffect(
    (props) => {
      // console.log({props.match.params.id})
      var url = window.location.href
      var id = url.substring(url.lastIndexOf('/') + 1)
      setPackageID(Number(id))
      if (id) {
        outdoorAmenitiesService.getDetails(Number(id)).then((res) => {
          console.log(res?.data?.data)
          if (res.data.success) {
            setId(res?.data?.data?.id)
            setTitle(res?.data?.data?.title)
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
    } else {
      let data = {
        id: id,
        title: title,
      }
      console.log(data)
      outdoorAmenitiesService.outdoorAmenitiesEdit(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/outdoor-amenities')
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
                  <h2 className="breadcrumb_title">Edit</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
