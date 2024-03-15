import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from './Table'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import userService from '../../../services/user.service'
import inqueryService from '../../../services/inquery.service'
import pageMetaService from '../../../services/pageMetaService'

const PageMeta = () => {
  const [tableData, setTableData] = useState()
  const [selectedMessage, setSelectedMessage] = useState('')

  // initialize
  useEffect(() => {
    pageMetaService.getList().then(
      (res) => {
        setTableData(res?.data?.data)
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
                  setTableData(res?.data?.data)
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
                    setTableData(res?.data?.data)
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
            setTableData(res?.data?.data)
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
            <h2 className="breadcrumb_title">All Users</h2>
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
            <div className="property_table">
              {tableData?.length > 0 ? (
                <Table
                  // setMessage={setMessage}
                  tableData={tableData}
                  // inqueryDelete={inqueryDelete}
                  // handleChangeStatus={handleChangeStatus}
                  // markReadAction={markReadAction}
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

export default PageMeta
