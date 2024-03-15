import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import packageService from '../../../services/package.service'
import servicesService from '../../../services/services.service'
import RichTextEditor from '../helper/editor/RichTextEditor'

const EditService = () => {
  const [serviceID, setServiceID] = useState()
  const [title, setTitle] = useState()
  const [details, setDetails] = useState()
  const [image, setImage] = useState()
  const [shortDesc, setShortDesc] = useState()
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaCanonicalURL, setMetaCanonicalUrl] = useState('')
  const [metaTag, setMetaTag] = useState('')

  useEffect(() => {
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/') + 1)
    setServiceID(Number(id))
    servicesService.getServiceDetails(Number(id)).then((res) => {
      let filterData = res?.data?.data
      setTitle(filterData?.title)
      setDetails(filterData?.details)
      setShortDesc(filterData?.short_description)
      setMetaTitle(filterData?.meta_title)
      setMetaDescription(filterData?.meta_description)
      setMetaCanonicalUrl(filterData?.meta_canoncal_url)
      setMetaTag(filterData?.meta_tag)
    })
  }, [])
  // save action
  const onSaveAction = () => {
    if (!title) {
      toast.error('Title is required', {
        theme: 'dark',
      })
    } else if (!details) {
      toast.error('Details is required', {
        theme: 'dark',
      })
    } else {
      let formData = new FormData()
      formData.append('id', serviceID)
      formData.append('title', title)
      formData.append('details', details)
      formData.append('image', image)
      formData.append('short_description', shortDesc)
      formData.append('meta_title', metaTitle)
      formData.append('meta_description', metaDescription)
      formData.append('meta_canonical_url', metaCanonicalURL)
      formData.append('meta_tag', metaTag)

      // API call
      servicesService.serviceEdit(formData).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/services')
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
                  <h2 className="breadcrumb_title">Edit Service</h2>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Service Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
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
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Details</label>
                  {/* <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ minHeight: 150 }}
                  /> */}
                  <RichTextEditor setValue={setDetails} content={details} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Meta Title</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Meta Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    style={{ minHeight: 150 }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Meta Canonical URL</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={metaCanonicalURL}
                    onChange={(e) => setMetaCanonicalUrl(e.target.value)}
                    style={{ minHeight: 150 }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Meta Tag</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={metaTag}
                    onChange={(e) => setMetaTag(e.target.value)}
                    style={{ minHeight: 150 }}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Short Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={shortDesc}
                    id="propertyTitle"
                    onChange={(e) => setShortDesc(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <button className="btn btn-dark" onClick={onSaveAction}>
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

export default EditService
