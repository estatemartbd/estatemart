import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { LocationTable } from './LocationTable'
import SelectStyle from '../helper/SelectStyle'
import locationService from '../../../services/location.service'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { LocationTableUser } from './LocationTableUser'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
// const data = [
//   {
//     id: 1,
//     parentLocation: 'Dhaka',
//     childLocation: 'Rupnagar',
//   },
//   {
//     id: 2,
//     parentLocation: 'Pallabi',
//     childLocation: '',
//   },
// ]

const Location = () => {
  const [locationData, setLocationData] = useState()
  const role = JSON.parse(localStorage?.getItem('user'))?.role?.role_id
  const [parentModalVisible, setParentModalVisible] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState({})
  // initialize
  useEffect(() => {
    locationService.getLocationList().then(
      (res) => {
        // console.log(res.data)
        setLocationData(res?.data?.data)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }, [])

  // delete Location
  const locationDelete = (id) => {
    if (!id) {
      toast.error('No Location selected', {
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
          locationService.deleteLocation(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                locationService.getLocationList().then((res) => {
                  setLocationData(res?.data?.data)
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
      toast.error('No Location selected', {
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
          locationService.changeStatus(id).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                locationService.getLocationList().then((res) => {
                  setLocationData(res?.data?.data)
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
  // get locations
  const getLocationList = () => {
    locationService.getLocationList().then(
      (res) => {
        // console.log(res.data)
        setLocationData(res?.data?.data)
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: 'dark',
        })
      },
    )
  }

  // handle parent modal
  const handleEditParent = (data) => {
    setParentModalVisible(true)
    setSelectedLocation(data)
  }
  const handleClose = () => {
    setParentModalVisible(false)
  }

  // update parent
  const updateParent = () => {
    let data = {
      id: selectedLocation?.id,
      title: selectedLocation?.title,
      parent_id: 0,
    }
    locationService.locationEdit(data).then(
      (res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message, {
            theme: 'dark',
          })
          // redirect
          getLocationList()
          setParentModalVisible(false)
          setSelectedLocation({})
        } else {
          toast.error(res.data.message, {
            theme: 'dark',
          })
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, {
          theme: 'dark',
        })
      },
    )
  }
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Locations</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          {role === 1 && (
            <div className="my_profile_setting_input text-right">
              <Link to="/auth/add-location" className="btn btn2">
                Add Location
              </Link>
            </div>
          )}
        </div>
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            {/* <div className="candidate_revew_select style2 mb30-991">
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
                <li className="list-inline-item">
                  <Select styles={SelectStyle} options={options} />
                </li>
              </ul>
            </div> */}
            <div className="property_table">
              {locationData?.length > 0 ? (
                role === 1 ? (
                  <LocationTable
                    locationData={locationData}
                    locationDelete={locationDelete}
                    handleChangeStatus={handleChangeStatus}
                    handleEditParent={handleEditParent}
                  />
                ) : (
                  <LocationTableUser
                    locationData={locationData}
                    locationDelete={locationDelete}
                    handleChangeStatus={handleChangeStatus}
                  />
                )
              ) : (
                <p className="alart alart-info">No Data Found</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        <Modal show={parentModalVisible} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={selectedLocation?.title}
                  onChange={(e) =>
                    setSelectedLocation({
                      ...selectedLocation,
                      title: e?.target?.value,
                    })
                  }
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateParent}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Location
