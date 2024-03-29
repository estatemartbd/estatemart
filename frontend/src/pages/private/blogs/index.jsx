import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BlogTable } from './BlogTable'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import blogsService from '../../../services/blogs.service'

const options = [
  {
    label: 'Commercial',
    value: 1,
  },
  {
    label: 'Apartment',
    value: 2,
  },
]

const Service = () => {
  const [serviceData, setServiceData] = useState()
  const [imagePath, setImagePath] = useState()

  // initialize
  useEffect(() => {
    blogsService.getBlogsList().then(
      (res) => {
        setServiceData(res?.data?.data)
        setImagePath(res?.data?.imageFolderPath)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }, [])

  // delete blog
  const serviceDelete = (id) => {
    if (!id) {
      toast.error('No blog selected', {
        theme: 'dark',
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to change this later!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Proceed',
        allowOutsideClick: false,
      }).then((value) => {
        if (value.isConfirmed === true) {
          blogsService.deleteBlogs(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                blogsService.getBlogsList().then((res) => {
                  setServiceData(res?.data?.data)
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
      })
    }
  }

  // status change
  const handleChangeStatus = (id) => {
    if (!id) {
      toast.error('No blog selected', {
        theme: 'dark',
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be able to change this later!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Proceed',
        allowOutsideClick: false,
      }).then((value) => {
        // console.log(value)
        if (value.isConfirmed === true) {
          blogsService.changeStatus(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                blogsService.getBlogsList().then((res) => {
                  setServiceData(res?.data?.data)
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
      })
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Blogs</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          <div className="my_profile_setting_input text-right">
            <Link to="/auth/blogs/add" className="btn btn2">
              Add Blog
            </Link>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            <div className="candidate_revew_select style2 mb30-991">
              <ul className="mb0">
                <li className="list-inline-item">
                  <div className="candidate_revew_search_box course fn-520">
                    <form className="form-inline my-2">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search here"
                        aria-label="Search"
                      />
                      <button className="btn my-2 my-sm-0" type="submit">
                        <span className="flaticon-magnifying-glass"></span>
                      </button>
                    </form>
                  </div>
                </li>
                {/* <li className="list-inline-item">
                  <Select styles={SelectStyle} options={options} />
                </li> */}
              </ul>
            </div>
            <div className="property_table">
              {serviceData?.length > 0 ? (
                <BlogTable
                  serviceData={serviceData}
                  serviceDelete={serviceDelete}
                  handleChangeStatus={handleChangeStatus}
                  imagePath={imagePath}
                />
              ) : (
                <p className="alart alart-info">No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service
