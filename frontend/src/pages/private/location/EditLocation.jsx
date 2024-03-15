import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import locationService from '../../../services/location.service'
import Swal from 'sweetalert2'

const EditLocation = () => {
  const [locationId, setLocationId] = useState()
  const [title, setTitle] = useState()
  const [parentId, setParentId] = useState()
  const [parentLocations, setParentLocations] = useState()
  const [data, setData] = useState([])

  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(false)

  useEffect(() => {
    // parent location list
    locationService.getParentList().then((res) => {
      let filterData = res?.data?.data
      setParentLocations(
        filterData?.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        }),
      )

      // initial edit values
      var url = window.location.href
      var id = url.substring(url.lastIndexOf('/') + 1)
      setLocationId(Number(id))

      locationService.getLocationDetails(Number(id)).then((res) => {
        setTitle(res?.data?.data?.title)
        console.log(res?.data?.data?.parent_id)
        let parent = filterData.map((e) => e.id === res?.data?.data?.parent_id)
        console.log(parent, 'clg')
        setParentId({
          value: { value: res?.data?.data?.id, label: res?.data?.data?.title },
        })
      })

      locationService.getChildList(Number(id)).then(
        (res) => {
          if (res?.data?.success) {
            setData(res?.data?.data)
          } else {
            setData([])
          }
        },
        (err) => {
          setData([])
        },
      )
    })
  }, [])

  const handleRemoveLocation = (id) => {
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
              // parent location list
              locationService.getParentList().then((res) => {
                let filterData = res?.data?.data
                setParentLocations(
                  filterData?.map((e) => {
                    return {
                      ...e,
                      value: e.id,
                      label: e.title,
                    }
                  }),
                )

                // initial edit values
                var url = window.location.href
                var id = url.substring(url.lastIndexOf('/') + 1)
                setLocationId(Number(id))

                locationService.getLocationDetails(Number(id)).then((res) => {
                  setTitle(res?.data?.data?.title)
                  let parent = filterData.map(
                    (e) => e.id === res?.data?.data?.parent_id,
                  )
                  setParentId({
                    value: {
                      value: res?.data?.data?.id,
                      label: res?.data?.data?.title,
                    },
                  })
                })

                locationService.getChildList(Number(id)).then(
                  (res) => {
                    if (res?.data?.success) {
                      setData(res?.data?.data)
                    } else {
                      setData([])
                    }
                  },
                  (err) => {
                    setData([])
                  },
                )
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

  // save action
  const onSaveAction = () => {
    // setParentId(0)
    if (data?.length === 0) {
      toast.info('Nothing to update', {
        theme: 'dark',
      })
      // redirect
      setTimeout(() => {
        window.location.replace('/auth/locations')
      }, [1000])
    } else {
      data?.map((e) => {
        let data = {
          id: e?.id,
          title: e?.title,
          parent_id: e?.parent_id,
          child_id: e?.child_id,
        }
        // console.log(data)
        locationService.locationEdit(data).then(
          (res) => {
            if (res?.data?.success) {
              toast.success(e?.title + ' successfully updated', {
                theme: 'dark',
              })
              // redirect
              setTimeout(() => {
                window.location.replace('/auth/locations')
              }, [1000])
            } else {
              toast.error(res.data.message, {
                theme: 'dark',
              })
            }
          },
          (err) => {
            toast.error(e?.title + ' update failed', {
              theme: 'dark',
            })
          },
        )
      })
    }
  }
  const handleParentChange = (newSelection) => {
    setParentId({
      value: newSelection,
    })
    console.log(parentId)
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Edit Location</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              {/* <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Location Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div> */}
              {data?.map((e, index) => (
                <div className="col-12">
                  <div className="row">
                    <div className="col-lg-6" key={e?.id}>
                      <div className="my_profile_setting_input form-group">
                        <label for="propertyTitle">Location Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={e?.title}
                          onChange={(e2) =>
                            setData(
                              data?.map((e3) => {
                                if (e3.id === e.id) {
                                  return {
                                    ...e3,
                                    title: e2?.target?.value,
                                  }
                                } else {
                                  return {
                                    ...e3,
                                  }
                                }
                              }),
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveLocation(e?.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="col-lg-6">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Parent Location</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    name="parentId"
                    options={parentLocations}
                    value={parentId?.value || locationId}
                    onChange={handleParentChange}
                  />
                </div>
              </div> */}
              <div className="col-lg-12">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={onSaveAction}
                >
                  Save
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

export default EditLocation
