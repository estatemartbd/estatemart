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
  const [selectedMessage, setSelectedMessage] = useState('')

  // initialize
  useEffect(() => {
    inqueryService.getInquiryListForAdmin().then(
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
                inqueryService.getInquiryListForAdmin().then((res) => {
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
                userService.getSystemUserList().then((res) => {
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
          inqueryService.getInquiryListForAdmin().then((res) => {
            setInqueryData(res?.data?.data)
          })
        }
        // else {
        //   toast.info(res?.data?.message, {
        //     theme: 'dark',
        //   })
        // }
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }

  // control modal
  const setMessage = (msg) => {
    setSelectedMessage(msg)
    if (msg?.is_read === 0) {
      markReadAction(msg?.id)
    }
    // console.log(msg)
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Inqueries</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          {/* <div className="my_profile_setting_input text-right">
            <Link to="/systemUsers/add" className="btn btn2">
              Add System User
            </Link>
          </div> */}
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
              {inqueryData?.length > 0 ? (
                <Table
                  setMessage={setMessage}
                  inqueryData={inqueryData}
                  inqueryDelete={inqueryDelete}
                  handleChangeStatus={handleChangeStatus}
                  markReadAction={markReadAction}
                />
              ) : (
                <p className="alart alart-info">No Data Found</p>
              )}
            </div>
            <div
              className="sign_up_modal modal fade bd-example-modal-lg"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
              style={{ zIndex: '111111' }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setSelectedMessage('')}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <ul className="sasw_list mb0">
                      <label>Name</label>
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            disabled
                            className="form-control"
                            id="exampleInputName1"
                            placeholder="Name"
                            value={selectedMessage?.name}
                          />
                        </div>
                      </li>

                      <label>Email</label>
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName2"
                            placeholder="Phone"
                            value={selectedMessage?.email}
                          />
                        </div>
                      </li>
                      <label>Phone</label>
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Email"
                            value={selectedMessage?.phone}
                            disabled
                          />
                        </div>
                      </li>
                      <label>Address</label>
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Address"
                            value={selectedMessage?.address}
                            disabled
                          />
                        </div>
                      </li>
                      <label>Details</label>
                      <li className="search_area">
                        <div className="form-group">
                          <textarea
                            id="form_message"
                            name="form_message"
                            className="form-control required"
                            rows="5"
                            required="required"
                            placeholder="I'm interest in this product"
                            value={selectedMessage?.details}
                            disabled
                          ></textarea>
                        </div>
                      </li>
                      {/* <li>
                        <div className="search_option_button">
                          <button
                            type="button"
                            // onClick={onSubmitInquery}
                            className="btn btn-block btn-thm"
                          >
                            Send Message
                          </button>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InqueryData
