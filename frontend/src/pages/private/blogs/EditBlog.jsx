import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import blogsService from '../../../services/blogs.service'

const EditBlog = () => {
  const [serviceID, setServiceID] = useState()
  const [title, setTitle] = useState()
  const [details, setDetails] = useState()
  const [image, setImage] = useState()
  useEffect(() => {
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/') + 1)
    setServiceID(Number(id))
    blogsService.getBlogsDetails(Number(id)).then((res) => {
      let filterData = res?.data?.data
      setTitle(filterData?.title)
      setDetails(filterData?.details)
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

      // API call
      blogsService.blogEdit(formData).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/blogs')
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
                  <h2 className="breadcrumb_title">Edit Blog</h2>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Title</label>
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
                  <textarea
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
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

export default EditBlog
