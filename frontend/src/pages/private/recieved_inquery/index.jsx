import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from './Table'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import userService from '../../../services/user.service'
import inqueryService from '../../../services/inquery.service'

const InqueryData = () => {
  const [inqueryData, setInqueryData] = useState()

  // initialize
  useEffect(() => {
    inqueryService.getRecievedInqueries().then(
      (res) => {
        setInqueryData(res?.data?.data)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }, [])

  // delete systemUser
  const inqueryDelete = (id) => {
    if (!id) {
      toast.error('No inquery selected', {
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
          inqueryService.inqueryDelete(id).then(
            (res) => {
              if (res?.data?.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                inqueryService.getRecievedInqueries().then((res) => {
                  setInqueryData(res?.data?.data)
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
      toast.error('No systemUser selected', {
        theme: 'dark',
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You can change this later!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Proceed',
        allowOutsideClick: false,
      }).then((value) => {
        // console.log(value)
        if (value.isConfirmed === true) {
          userService.changeSystemUserStatus(id).then(
            (res) => {
              if (res?.data?.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                userService.getRecievedInqueries().then((res) => {
                  if (res?.data?.success) {
                    setInqueryData(res?.data?.data)
                  }
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
  // mark read
  const markReadAction = (id) => {
    inqueryService.markRead(id).then(
      (res) => {
        if (res?.data?.success) {
          inqueryService.getRecievedInqueries().then((res) => {
            setInqueryData(res?.data?.data)
          })
        } else {
          toast.info(res?.data?.message, {
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
  return (
    <>
      <section id="feature-property" className="feature-property-home6">
        <div className="container-fluid p0">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-4 col-xl-4 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Recieved Inqueries</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>
              <div className="col-lg-8 col-xl-8"></div>
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
                    {inqueryData?.length > 0 ? (
                      <Table
                        inqueryData={inqueryData}
                        inqueryDelete={inqueryDelete}
                        handleChangeStatus={handleChangeStatus}
                        markReadAction={markReadAction}
                      />
                    ) : (
                      <p className="alart alart-info text-center">
                        No Data Found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default InqueryData
