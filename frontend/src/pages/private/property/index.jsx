import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { PropertyTable } from './PropertyTable'
import SelectStyle from '../helper/SelectStyle'
import propertyService from '../../../services/property.service'
import locationService from '../../../services/location.service'
import { toast } from 'react-toastify'
import categoriesService from '../../../services/categories.service'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReactSwitch from 'react-switch'
import { Formik, useFormik } from 'formik'
import userService from '../../../services/user.service'
import Swal from 'sweetalert2'
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
const initialValues = {
  property_id: 0,
  is_featured: 0,
  from_date: '',
  to_date: '',
}

const Property = () => {
  const [propertiesData, setPropertyData] = useState([])
  const [imageFolderPath, setImageFolderPath] = useState()
  const [imageResizeFolderPath, setImageResizeFolderPath] = useState()
  const [locationData, setLocationData] = useState()
  const [categories, setCategories] = useState()
  const [propertyId, setPropertyId] = useState()
  const [isSeleted, setIsSelected] = useState()
  const [parentModalVisible, setParentModalVisible] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isClearable, setIsClearable] = useState(true)

  const [agentList, setAgentList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [purposeList, setPurposeList] = useState([
    {
      value: 1,
      label: 'Rent',
    },
    {
      value: 2,
      label: 'Sell',
    },
  ])
  const [categoryList, setCategoryList] = useState([])
  const [locationList, setLocationList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedType, setSelectedType] = useState()
  const [selectedLocation, setSelectedLocation] = useState()
  const [selectedPurpose, setSelectedPurpose] = useState()
  const [selectedAgent, setSelectedAgent] = useState()

  useEffect(() => {
    // category
    categoriesService
      .getCategoriesList()
      .then(
        (res) => {
          console.log(res.data?.data, 'Category')
          setCategories(res?.data?.data)
        },
        (err) => {
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        },
      )
      .catch((e) => {
        console.log(e)
      })

    locationService
      .getLocationList()
      .then(
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
      .catch((e) => {
        console.log(e)
      })
    // setPropertyData(data.map((i) => i));
    getPropertiesList()
    // Location
  }, [])

  useEffect(() => {
    getAgentList()
    getCategories()
    getLocationList()
  }, [])

  // get agentList
  const getAgentList = () => {
    userService.getSystemUserList().then((res) => {
      if (res?.data?.success) {
        setAgentList(
          res?.data?.data?.map((e) => {
            return {
              value: e?.user_id,
              label: e?.name,
            }
          }),
        )
      } else {
        setAgentList([])
      }
    })
  }
  // get Categories
  const getCategories = () => {
    categoriesService.getCategoriesList().then((res) => {
      if (res?.data?.success) {
        setCategoryList(
          res?.data?.data?.map((e) => {
            return {
              value: e?.id,
              label: e?.title,
            }
          }),
        )
      } else {
        setCategoryList([])
      }
    })
  }
  // get location list
  const getLocationList = () => {
    locationService.getLocationList().then((res) => {
      if (res?.data?.success) {
        setLocationList(
          res?.data?.data?.map((e) => {
            return {
              value: e?.id,
              label: e?.title,
            }
          }),
        )
      } else {
        setLocationList([])
      }
    })
  }
  const getPropertiesList = () => {
    propertyService
      .getPropertyList()
      .then((response) => {
        console.log(response?.data?.data)
        if (response.data.status == 200) {
          setPropertyData(response?.data?.data)
          setImageFolderPath(response?.data?.imageFolderPath)
          setImageResizeFolderPath(response?.data?.imageResizeFolderPath)
        } else {
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const handleMarkFeatured = async (id, isFeatured) => {
    if (isFeatured == 1) {
      let values = {
        property_id: id,
        is_featured: 0,
        from_date: '',
        to_date: '',
      }

      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to change this later!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Proceed',
        allowOutsideClick: false,
      }).then((value) => {
        if (value.isConfirmed == true) {
          propertyService.markFeatured(values).then(
            (res) => {
              if (res.data.success) {
                toast.success(res.data.message, {
                  theme: 'dark',
                })
                setParentModalVisible(false)
                initialValues.is_featured = 0
                initialValues.property_id = 0
                initialValues.from_date = ''
                initialValues.to_date = ''
                setTimeout(() => {
                  window.location.reload()
                }, 3000)
                // getPropertiesList()
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
    } else {
      setParentModalVisible(true)
      initialValues.property_id = id
      initialValues.is_featured = 1
    }
  }

  const handleClose = () => {
    setParentModalVisible(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values)
      propertyService.markFeatured(values).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })
            setParentModalVisible(false)
            // getPropertiesList()
            initialValues.is_featured = 0
            initialValues.property_id = 0
            initialValues.from_date = ''
            initialValues.to_date = ''
            setTimeout(() => {
              window.location.reload()
            }, 3000)
          }
        },
        (err) => {
          toast.error(err.response.data.message, {
            theme: 'dark',
          })
        },
      )
    },
  })

  // handle search
  const handleSearch = () => {
    let data = {
      limit: 20,
      offset: 0,
      // type: selectedType,
      purpose: selectedPurpose,
      category: selectedCategory,
      // agent_name: selectedAgent,  // not not use
      post_owner_id: selectedAgent,
      location: selectedLocation,
      // area: selectedArea,
    }
    propertyService
      .searchProperty(data)
      .then((response) => {
        console.log(response?.data?.data)
        if (response.data.status === 200) {
          setPropertyData(response?.data?.data)
          setImageFolderPath(response?.data?.imageFolderPath)
          setImageResizeFolderPath(response?.data?.imageResizeFolderPath)
        } else {
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handlePropertyStatus = (propertyId, currentStatus, param) => {
    if (param === 'publish') {
      propertyService
        .propertyPublishToggle(propertyId)
        .then((response) => {
          if (response?.data?.status === 200) {
            getPropertiesList()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      propertyService
        .propertySoldOutToggle(propertyId)
        .then((response) => {
          if (response?.data?.status === 200) {
            getPropertiesList()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Properties</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          <div className="my_profile_setting_input text-right">
            <Link to="/auth/add-property" className="btn btn2">
              Add Property
            </Link>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            <div className="candidate_revew_select style2 mb30-991">
              <ul className="mb0">
                {/* <li className="list-inline-item">
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
                </li> */}

                <li className="list-inline-item">
                  <label>Category</label>
                  <Select
                    styles={SelectStyle}
                    options={categoryList}
                    onChange={(e) => setSelectedCategory(e?.value)}
                  />
                </li>
                <li className="list-inline-item">
                  <label>Purpose</label>
                  <Select
                    styles={SelectStyle}
                    options={purposeList}
                    onChange={(e) => setSelectedPurpose(e?.value)}
                  />
                </li>
                <li className="list-inline-item">
                  <label>Location</label>
                  <Select
                    styles={SelectStyle}
                    options={locationList}
                    onChange={(e) => setSelectedLocation(e?.value)}
                  />
                </li>
                <li className="list-inline-item">
                  <label>Agent</label>
                  <Select
                    styles={SelectStyle}
                    options={agentList}
                    onChange={(e) => setSelectedAgent(e?.value)}
                  />
                </li>
                <li className="list-inline-item">
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="btn btn-dark mr-2"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="btn btn-warning"
                  >
                    Clear
                  </button>
                </li>
              </ul>
            </div>
            <div className="property_table">
              {propertiesData?.length > 0 ? (
                <PropertyTable
                  propertyData={propertiesData}
                  imageFolderPath={imageFolderPath}
                  imageResizeFolderPath={imageResizeFolderPath}
                  locationData={locationData}
                  categories={categories}
                  handleMarkFeatured={handleMarkFeatured}
                  handlePropertyStatus={handlePropertyStatus}
                />
              ) : (
                <p className="alart alart-info">No Data Found</p>
              )}
            </div>
            {/* Modal */}
            <Modal show={parentModalVisible} onHide={handleClose}>
              <form onSubmit={formik.handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Form Date</Form.Label>
                    <input
                      type="date"
                      className="form-control"
                      id="from_date"
                      {...formik.getFieldProps('from_date')}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>To Date</Form.Label>
                    <input
                      type="date"
                      className="form-control"
                      id="from_date"
                      {...formik.getFieldProps('to_date')}
                    />
                    <input
                      type="hidden"
                      className="form-control"
                      id="property_id"
                      {...formik.getFieldProps('property_id')}
                    />
                    <input
                      type="hidden"
                      className="form-control"
                      id="is_featured"
                      {...formik.getFieldProps('is_featured')}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Make Featured
                  </Button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default Property
