import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import locationService from '../../../services/location.service'

const AddLocation = () => {
  // const [propertyData, setPropertyData] = useState();
  const [title, setTitle] = useState()
  const [parentId, setParentId] = useState()
  const [parentLocations, setParentLocations] = useState()

  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRtl, setIsRtl] = useState(false)

  useEffect(() => {
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
    })
  }, [])

  // save action
  const onSaveAction = () => {
    // console.log(title, parentId?.value?.value)
    if (!title) {
      toast.error('Title is required', {
        theme: 'dark',
      })
    } else {
      setParentId(0)

      let data = {
        title: title,
        parent_id: Number(parentId?.value?.value) ?  Number(parentId?.value?.value) : 0,
        child_id: 0
      }
      locationService.locationAdd(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })
            setTitle('')
            setParentId({})
            // redirect
            window.location.replace('/auth/locations')
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
  const handleParentChange = (newSelection) => {
    console.log('___ multi: ', newSelection)
    setParentId({
      value: newSelection,
    })
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Add Location</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label for="propertyTitle">Location Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
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
                    value={parentId?.value}
                    onChange={handleParentChange}
                  />
                </div>
              </div>
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

export default AddLocation
