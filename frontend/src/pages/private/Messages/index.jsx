import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from './Table'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import userService from '../../../services/user.service'
import inqueryService from '../../../services/inquery.service'
import servicesService from '../../../services/services.service'

const AllMessages = () => {
  const [data, setData] = useState()
  const [searchData, setSearchData] = useState({})
  const [selectedMessage, setSelectedMessage] = useState('')

  // get list
  const getMessages = () => {
    servicesService.getAllMessages().then(
      (res) => {
        setData(res?.data?.data)
        setSearchData({})
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }
  // initialize
  useEffect(() => {
    getMessages()
  }, [])
  // control modal
  const setMessage = (msg) => {
    setSelectedMessage(msg)
    if (msg?.is_read === 0) {
      markReadAction(msg?.id)
    }
    // console.log(msg)
  }
  // delete
  const onDelete = (id) => {
    if (!id) {
      toast.error('No message selected', {
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
          servicesService.deleteMessage(id).then(
            (res) => {
              if (res?.data?.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                getMessages()
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
    servicesService.readMessages(id).then(
      (res) => {
        if (res?.data?.success) {
          getMessages()
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

  // search action
  const handleSearch = () => {
    let data = {
      is_read: searchData?.is_read,
      name: searchData?.name,
      email: searchData?.email,
      phone: searchData?.phone,
    }
    servicesService.searchMessage(data).then(
      (res) => {
        if (res?.data?.success) {
          setData(res?.data?.data)
        } else {
          setData([])
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
        setData([])
      },
    )
  }

  // render
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Messages</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8"></div>
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            <div className="row">
              <div className="col-lg-3">
                <div className="my_profile_setting_input form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={searchData?.name || ''}
                    onChange={(e) =>
                      setSearchData({ ...searchData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_profile_setting_input form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={searchData?.email || ''}
                    onChange={(e) =>
                      setSearchData({ ...searchData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_profile_setting_input form-group">
                  <label for="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={searchData?.phone || ''}
                    onChange={(e) =>
                      setSearchData({ ...searchData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="my_profile_setting_input form-group">
                  <label for="is_read">Status</label>
                  <select
                    className="form-control"
                    value={searchData?.is_read || ''}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        is_read: e?.target?.value,
                      })
                    }
                  >
                    <option value={0}>Unread</option>
                    <option value={1}>Read</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-3">
                <button
                  type="button"
                  className="btn btn-primary mr-1"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={getMessages}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="property_table">
              {data?.length > 0 ? (
                <Table
                  setMessage={setMessage}
                  data={data}
                  onDelete={onDelete}
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
                      <label>Subject</label>
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Address"
                            value={selectedMessage?.subject}
                            disabled
                          />
                        </div>
                      </li>
                      <label>Message</label>
                      <li className="search_area">
                        <div className="form-group">
                          <textarea
                            id="form_message"
                            name="form_message"
                            className="form-control required"
                            rows="5"
                            required="required"
                            placeholder="I'm interest in this product"
                            value={selectedMessage?.message}
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

export default AllMessages
