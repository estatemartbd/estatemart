import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import userService from '../../../services/user.service'
import inqueryService from '../../../services/inquery.service'

const UpdateInquery = (props) => {
  const [id, setID] = useState()
  const [property_id, setPropertyID] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [role, setRole] = useState()
  const [address, setAddress] = useState()
  const [details, setDetails] = useState()

  // init
  useEffect((props) => {
    // console.log({props.match.params.id})
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/') + 1)
    // SetUserID(Number(id))
    if (id) {
      inqueryService.getInqueryDetails(Number(id)).then((res) => {
        if (res?.data?.success) {
          setID(res?.data?.data?.id)
          setPropertyID(res?.data?.data?.property_id)
          setName(res?.data?.data?.name)
          setEmail(res?.data?.data?.email)
          setPhone(res?.data?.data?.phone)
          setAddress(res?.data?.data?.address)
          setDetails(res?.data?.data?.details)
        }
      })
    } else {
      toast.error('System User Not found', {
        theme: 'dark',
      })
    }
  }, [])
  // save action
  const onSaveAction = () => {
    if (!name) {
      toast.error('Name is required', {
        theme: 'dark',
      })
    } else if (!email) {
      toast.error('Email is required', {
        theme: 'dark',
      })
    } else if (!phone) {
      toast.error('Phone is required', {
        theme: 'dark',
      })
    } 
    // else if (!address) {
    //   toast.error('Role is required', {
    //     theme: 'dark',
    //   })
    // } 
    else {
      let data = {
        id: id,
        property_id: property_id,
        name: name,
        phone: phone,
        email: email,
        address: address,
        details: details,
      }
      inqueryService.submitInquery(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/recieved-inqueries')
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
                  <h2 className="breadcrumb_title">Edit Inquery</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="propertyTitle"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Address</label>
                  <input
                    type="address"
                    className="form-control"
                    id="propertyTitle"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Details</label>
                  <textarea
                    style={{ minHeight: 150 }}
                    type="test"
                    className="form-control"
                    id="propertyTitle"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
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

export default UpdateInquery
