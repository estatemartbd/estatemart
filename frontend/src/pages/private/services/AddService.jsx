import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import packageService from '../../../services/package.service'
import servicesService from '../../../services/services.service'
import * as Yup from 'yup'
import clsx from 'clsx'
import RichTextEditor from '../helper/editor/RichTextEditor'
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z]/, 'Title must be start with alphabet character')
    .required('Title is required')
    .min(2, 'Title must be greater than 2 character')
    .max(50, 'Title must be less than 50 character'),
  host_name: Yup.string()
    .matches(/^[a-zA-Z]/, 'Host Name be start with alphabet character')
    .required('Host Name is required')
    .min(3, 'Host Name must be greater than 3 character')
    .max(50, 'Host Name must be less than 50 character'),
  duration: Yup.string()
    .matches(
      /^[0-9]+$/,
      'Please enter numeric value only ! No alphabet character and special character is allowed',
    )
    .required('Duration is required')
    .test(
      'duration',
      'Workshop Duration must be between 1 minute to 800 minute',
      (value) => {
        if (parseInt(value) > 0 && parseInt(value) <= 800) {
          return true
        } else {
          return false
        }
      },
    ),
  price: Yup.string()
    .matches(/(^[0-9]+\.?[0-9]+$)|(^[0-9]+$)/, 'Please enter valid number only')
    .required('Price is required')
    .max(10, 'Price must be less than or equal 10 digit')
    .test('Price', 'Price must be greater than 0 $', (value) => {
      return value > '0'
    }),
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'Unsupported file size ! only  5 Mb image is required',
      (value) => {
        console.log(value)
        return value && value.size <= 5000000
      },
    )
    .test(
      'fileType',
      'Unsupported file format ! only png , jpg and jpeg required',
      (value) => {
        console.log(value)
        return (
          value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
        )
      },
    ),
})

const AddService = () => {
  const [title, setTitle] = useState()
  const [details, setDetails] = useState()
  const [image, setImage] = useState()
  const [shortDesc, setShortDesc] = useState()
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [metaCanonicalURL, setMetaCanonicalUrl] = useState('')
  const [metaTag, setMetaTag] = useState('')
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
    } else if (!image) {
      toast.error('Image is required', {
        theme: 'dark',
      })
    } else {
      let formData = new FormData()
      formData.append('title', title)
      formData.append('details', details)
      formData.append('image', image)
      formData.append('meta_title', metaTitle)
      formData.append('meta_description', metaDescription)
      formData.append('meta_canonical_url', metaCanonicalURL)
      formData.append('meta_tag', metaTag)
      formData.append('short_description', shortDesc)

      // API call
      servicesService.serviceAdd(formData).then(
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
                  <h2 className="breadcrumb_title">Add Service</h2>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Service Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
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
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ minHeight: 150 }}
                  /> */}
                  <RichTextEditor setValue={setDetails} />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Meta Title</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
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

export default AddService
