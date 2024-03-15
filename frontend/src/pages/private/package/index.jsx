import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { PackageTable } from './PackageTable'
import SelectStyle from '../helper/SelectStyle'
import packageService from '../../../services/package.service'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { PackageTableUser } from './PackageTableUser'

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

const Package = () => {
  const [packageData, setPackageData] = useState()
  const role = JSON.parse(localStorage?.getItem('user'))?.role?.role_id

  // initialize
  useEffect(() => {
    // setPackageData(data.map(i => i));
    packageService.getPackageList().then(
      (res) => {
        console.log(res.data)
        setPackageData(res?.data?.data)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }, [])

  // delete package
  const packageDelete = (id) => {
    if (!id) {
      toast.error('No package selected', {
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
          packageService.deletePackage(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                packageService.getPackageList().then((res) => {
                  setPackageData(res?.data?.data)
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
      toast.error('No package selected', {
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
          packageService.changeStatus(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                packageService.getPackageList().then((res) => {
                  setPackageData(res?.data?.data)
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
            <h2 className="breadcrumb_title">All Packages</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          {role === 1 && (
            <div className="my_profile_setting_input text-right">
              <Link to="/auth/packages/add" className="btn btn2">
                Add Package
              </Link>
            </div>
          )}
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
              {packageData?.length > 0 ? (
                role === 1 ? (
                  <PackageTable
                    packageData={packageData}
                    packageDelete={packageDelete}
                    handleChangeStatus={handleChangeStatus}
                  />
                ) : (
                  <PackageTableUser
                    packageData={packageData}
                    packageDelete={packageDelete}
                    handleChangeStatus={handleChangeStatus}
                  />
                )
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

export default Package