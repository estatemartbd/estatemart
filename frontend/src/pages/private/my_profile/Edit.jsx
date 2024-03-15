/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import userService from '../../../services/user.service'

const UpdateSystemUser = (props) => {
  const [profileID, setProfileID] = useState()
  const [userID, SetUserID] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [role, setRole] = useState()
  const [userRole, setUserRole] = useState()
  const [user, setUser] = useState()
  const [profileImage, setProfileImageFile] = useState()
  const [orgName, setOrgName] = useState('')
  const [orgDetails, setOrgDetails] = useState('')
  // init
  useEffect(
    (props) => {
      // console.log({props.match.params.id})
      var url = window.location.href
      var id = url.substring(url.lastIndexOf('/') + 1)
      SetUserID(Number(id))
      if (id) {
        userService.getMeInfo().then((res) => {
          // console.log(res?.data?.data)
          if (res.data.success) {
            setUser(res?.data)
            setProfileID(res?.data?.data?.id)
            setName(res?.data?.data?.name)
            setEmail(res?.data?.data?.email)
            setPhone(res?.data?.data?.phone)
            setRole(res?.data?.data?.role)
            setUserRole(res?.data?.data?.user_role)
            setOrgName(res?.data?.data?.organization_name)
            setOrgDetails(res?.data?.data?.organization_details)
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
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/100'
  }
  // save action
  const onSaveAction = () => {
    if (!name) {
      toast.error('Name is required', {
        theme: 'dark',
      })
    // } else if (!email) {
    //   toast.error('Email is required', {
    //     theme: 'dark',
    //   })
    } else if (!phone) {
      toast.error('Phone is required', {
        theme: 'dark',
      })
    } else if (!role?.role_id) {
      toast.error('Role is required', {
        theme: 'dark',
      })
    } else {
      let data = {}
      if (role?.role_id === 2) {
        data = {
          profile_id: profileID,
          name: name,
          email: email,
          // phone: phone,
          user_type: role?.role_id,
          organization_name: orgName,
          organization_details: orgDetails,
        }
      } else {
        data = {
          profile_id: profileID,
          name: name,
          email: email,
          // phone: phone,
          user_type: role?.role_id,
        }
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
      if (profileImage) {
        let formData = new FormData()

        formData.append('profile_image', profileImage)
        userService.uploadImage(formData).then(
          (res) => {
            if (res.data.success) {
              userService.getMeInfo().then((res) => {
                if (res.data.success) {
                  setUser(res?.data)
                  setProfileID(res?.data?.data?.id)
                  setName(res?.data?.data?.name)
                  setEmail(res?.data?.data?.email)
                  setPhone(res?.data?.data?.phone)
                  setRole(res?.data?.data?.role)
                  setUserRole(res?.data?.data?.user_role)
                  setOrgName(res?.data?.data?.organization_name)
                  setOrgDetails(res?.data?.data?.organization_details)
                }
              })
            } else {
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
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Update Profile</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group p-0">
                  {user?.data?.imageFolderPath !== undefined && (
                    <div className="form-group col-md-1 mt-4 d-flex">
                      <img
                        className="img-box"
                        src={
                          user?.data?.imageFolderPath +
                          '/' +
                          user?.data?.profile_image
                        }
                        onError={handleImageError}
                      />
                    </div>
                  )}
                  <div className="form-group col-md-4 px-0">
                    <label>Profile Photo</label>
                    <input
                      type="file"
                      name="floorImage"
                      className="form-control"
                      placeholder="Select Image"
                      onChange={(e) => setProfileImageFile(e.target.files[0])}
                      // id="floorImage"
                      // {...formik.getFieldProps("floorImage")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
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
                    style={{background:'#dddddd!important'}}
                    // readOnly
                  />
                  {/* <h3>{email ? email : 'n/a'}</h3> */}

                </div>
              </div>
              {/* <div className="col-lg-4">
                <div className="my_profile_setting_input form-group"></div>
              </div> */}
            
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group disabled">
                  <label htmlFor="propertyTitle">Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    id="propertyTitle"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly
                  />
                </div>
              </div>
              {role?.role_id === 2 && (
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Organization Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {role?.role_id === 2 && (
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Organization Details</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={orgDetails}
                      onChange={(e) => setOrgDetails(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">User Type </label>
                  <h3>{role?.role_name ? role?.role_name : userRole}</h3>
                </div>
              </div>
              {/* {role?.role_id} */}
             

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
