import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import packageService from '../../../services/package.service'
import userService from '../../../services/user.service'

const UpdateSystemUser = (props) => {
  const [profileID, setProfileID] = useState()
  const [userID, SetUserID] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [role, setRole] = useState()
  const [userType, setUserType] = useState()
  const [userData, setUserData] = useState()
  const [organizationName, setOrgranizationName] = useState()
  const [organizatioDetails, setOrgranizationDetails] = useState()

  // init
  useEffect(
    (props) => {
      // console.log({props.match.params.id})
      var url = window.location.href
      var id = url.substring(url.lastIndexOf('/') + 1)
      SetUserID(Number(id))
      if (id) {
        userService.getSystemUserDetails(Number(id)).then((res) => {
          console.log(res?.data?.data)
          if (res.data.success) {
            setProfileID(res?.data?.data?.id)
            setName(res?.data?.data?.name)
            setEmail(res?.data?.data?.email)
            setPhone(res?.data?.data?.phone)
            setRole(res?.data?.data?.role_id)
            setUserData(res?.data?.data)
            setOrgranizationName(res?.data?.data?.organization_name)
            setOrgranizationDetails(res?.data?.data?.organization_details)
            setUserType(res?.data?.data?.user_type)
          }
        })
      } else {
        toast.error('System User Not found', {
          theme: 'dark',
        })
      }
    },
    [userID],
  )
  // save action
  const onSaveAction = () => {
    if (!name) {
      toast.error('Name is required', {
        theme: 'dark',
      })
    }
    // else if (!email) {
    //   toast.error('Email is required', {
    //     theme: 'dark',
    //   })
    // }
    else if (!phone) {
      toast.error('Phone is required', {
        theme: 'dark',
      })
    } else if (!userType) {
      toast.error('Role is required', {
        theme: 'dark',
      })
    } else {
      let data = {
        profile_id: profileID,
        name: name,
        phone: phone,
        email: email,
        user_type: userType,
        organization_name: organizationName,
        organization_details: organizatioDetails
      }

      userService.updateSystemUser(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            // window.location.replace('/auth/system-users')
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
                  <h2 className="breadcrumb_title">Edit System User</h2>
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
                    placeholder="Optional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* <h3>{email}</h3> */}
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
                  <label htmlFor="propertyTitle">User Type</label>
                  <select
                    className="form-control"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option disabled value={''}>
                      Select Role
                    </option>
                    {/* <option value={1}>Admin</option> */}
                    <option value={2}>Business Agent</option>
                    <option value={3}>Personal Agent</option>
                    <option value={4}>Buyer</option>
                  </select>
                </div>
              </div>
              
              {userType == 2 && (
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={organizationName}
                      onChange={(e) => setOrgranizationName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {userType == 2 && (
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Organization Details</label>
                    <textarea
                      type="text" 
                      className="form-control"
                      id="propertyTitle"
                      value={organizatioDetails}
                      onChange={(e) => setOrgranizationDetails(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
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

export default UpdateSystemUser
