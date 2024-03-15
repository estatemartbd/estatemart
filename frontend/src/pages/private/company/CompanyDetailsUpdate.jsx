import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import servicesService from '../../../services/services.service'
import CompanyDetails from './CompanyDetails'

const CompanyDetailsUpdate = (props) => {
  // const [userID, SetUserID] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [fax, setFax] = useState()
  const [fbLink, setFBLink] = useState()
  const [youtubeLink, setYoutubeLink] = useState()
  const [twitterLink, setTwitterLink] = useState()
  const [instagramLink, setInstagramLink] = useState()
  const [footerOne, setFooterOne] = useState()
  const [footerTwo, setFooterTwo] = useState()
  const [gpsCordinates, setGpsCordinates] = useState()
  const [address, setAddress] = useState()
  const [logo, setLogo] = useState()
  const [defaultLogo, setDefaultLogo] = useState()
  const role = JSON.parse(localStorage?.getItem('user'))?.role?.role_id

  // upload course cover image
  const uploadCoverImage = (e) => {
    if (e?.target?.files?.length >= 0) {
      let reader = new FileReader()
      reader.onload = (e) => {
        setDefaultLogo(e?.target?.result)
      }
      if (e?.target?.files[0]) {
        reader.readAsDataURL(e?.target?.files[0])
        setLogo(e.target.files[0])
      }
    }
  }

  // init
  useEffect((props) => {
    // console.log({props.match.params.id})
    // var url = window.location.href
    // var id = url.substring(url.lastIndexOf('/') + 1)
    // SetUserID(Number(id))
    // if (id) {
    servicesService.getCompanyDetails(1).then((res) => {
      if (res.data.success) {
        setName(res?.data?.data?.company_name)
        setEmail(res?.data?.data?.email)
        setPhone(res?.data?.data?.phone)
        setFax(res?.data?.data?.fax)
        setFBLink(res?.data?.data?.fb_link)
        setYoutubeLink(res?.data?.data?.youtube_link)
        setTwitterLink(res?.data?.data?.twitter_link)
        setInstagramLink(res?.data?.data?.instagram)
        setFooterOne(res?.data?.data?.footer_one)
        setFooterTwo(res?.data?.data?.footer_two)
        setAddress(res?.data?.data?.address)
        setGpsCordinates(res?.data?.data?.gps_coordinates)
        setDefaultLogo(res?.data?.imageFolderPath + '/' + res?.data?.data?.logo)
      }
    })
    // } else {
    //   toast.error('System User Not found', {
    //     theme: 'dark',
    //   })
    // }
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
    //  else if (!role) {
    //   toast.error('Role is required', {
    //     theme: 'dark',
    //   })
    // }
    else {
      let formData = new FormData()
      formData.append('id', 1)
      formData.append('company_name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('fax', fax)
      formData.append('fb_link', fbLink)
      formData.append('instagram', instagramLink)
      formData.append('twitter_link', twitterLink)
      formData.append('youtube_link', youtubeLink)
      // formData.append('youtube_video_key', instagramLink)
      formData.append('footer_one', footerOne)
      // formData.append('footer_two', footerTwo)
      formData.append('gps_coordinates', gpsCordinates)
      formData.append('address', address)
      formData.append('logo', logo)

      servicesService.updateCompanyDetails(formData).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/company-details')
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
      {role === 1 ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="my_dashboard_review">
              <div className="row">
                <div className="col-lg-12 col-xl-12 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">
                      {role === 1
                        ? 'Update Company Details'
                        : 'Company Details'}
                    </h2>
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Company Name</label>
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
                {/* <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Fax</label>
                    <input
                      type="number"
                      className="form-control"
                      id="propertyTitle"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Facebook Link</label>
                    <input
                      type="text"
                      placeholder="https://"
                      className="form-control"
                      id="propertyTitle"
                      value={fbLink}
                      onChange={(e) => setFBLink(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Twitter Link</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://"
                      id="propertyTitle"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Youtube Link</label>
                    <input
                      type="text"
                      placeholder="https://"
                      className="form-control"
                      id="propertyTitle"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Instagram Link</label>
                    <input
                      type="text"
                      placeholder="https://"
                      className="form-control"
                      id="propertyTitle"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Youtube Video Key</label>
                    <input
                      type="text"
                      placeholder="************"
                      className="form-control"
                      id="propertyTitle"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="col-lg-8" />
                <div className="col-lg-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Footer 1</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={footerOne}
                      onChange={(e) => setFooterOne(e.target.value)}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Footer 2</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={footerTwo}
                      onChange={(e) => setFooterTwo(e.target.value)}
                    />
                  </div>
                </div> */}
                <div className="col-lg-4">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">GPS Co-ordinates</label>
                    <input
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={gpsCordinates}
                      onChange={(e) => setGpsCordinates(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Logo</label>
                    <input
                      accept="JPG,PNG,JPEG"
                      type="file"
                      className="form-control"
                      id="propertyTitle"
                      // value={address}
                      onChange={uploadCoverImage}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div
                    style={{
                      height: '5rem',
                      width: '100%',
                      border: '1px dashed #CDCDCD',
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `url(${defaultLogo})`,
                    }}
                  ></div>
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="my_profile_setting_input form-group">
                    <label htmlFor="propertyTitle">Address</label>
                    <textarea
                      style={{ minHeight: 150 }}
                      type="text"
                      className="form-control"
                      id="propertyTitle"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                {role === 1 && (
                  <div className="col-lg-12">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={onSaveAction}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      ) : (
        <CompanyDetails
          name={name}
          phone={phone}
          email={email}
          fax={fax}
          defaultLogo={defaultLogo}
          role={role}
          address={address}
          footerOne={footerOne}
          footerTwo={footerTwo}
          fbLink={fbLink}
          youtubeLink={youtubeLink}
          twitterLink={twitterLink}
          gpsCordinates={gpsCordinates}
          instagramLink={instagramLink}
        />
      )}
    </>
  )
}

export default CompanyDetailsUpdate
