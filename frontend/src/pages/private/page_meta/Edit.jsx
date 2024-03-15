import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import userService from '../../../services/user.service'
import inqueryService from '../../../services/inquery.service'
import pageMetaService from '../../../services/pageMetaService'

const PageMetaEdit = (props) => {
  const [id, setID] = useState()
  const [meta_title, set_meta_title] = useState()
  const [meta_description, set_meta_description] = useState()
  const [meta_canonical_url, set_meta_canonical_url] = useState()
  const [meta_tag, set_meta_tag] = useState()

  // init
  useEffect((props) => {
    // console.log({props.match.params.id})
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/') + 1)
    // SetUserID(Number(id))
    if (id) {
      pageMetaService.getDetails(Number(id)).then((res) => {
        if (res?.data?.success) {
          setID(res?.data?.data?.id)
          set_meta_title(res?.data?.data?.meta_title)
          set_meta_description(res?.data?.data?.meta_description)
          set_meta_canonical_url(res?.data?.data?.meta_canonical_url)
          set_meta_tag(res?.data?.data?.meta_tag)
        }
      })
    } else {
      toast.error('System User Not found', {
        theme: 'dark',
      })
    }
  }, [])
  // save action
  const onSaveAction = () => {
    if (!meta_title) {
      toast.error('Meta Title is required', {
        theme: 'dark',
      })
    } else if (!meta_description) {
      toast.error('Meta Description is required', {
        theme: 'dark',
      })
    } else if (!meta_canonical_url) {
      toast.error('Meta canonical url is required', {
        theme: 'dark',
      })
    } else if (!meta_tag) {
      toast.error('Meta Tag is required', {
        theme: 'dark',
      })
    } else {
      let data = {
        id: id,
        meta_title: meta_title,
        meta_description: meta_description,
        meta_canonical_url: meta_canonical_url,
        meta_tag: meta_tag,
      }
      pageMetaService.updateMeta(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })
            // redirect
            window.location.replace('/auth/page-meta')
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
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="my_dashboard_review">
            <div className="row">
              <div className="col-lg-12 col-xl-12 mb10">
                <div className="breadcrumb_content style2 mb30-991">
                  <h2 className="breadcrumb_title">Edit System User</h2>
                  {/* <p>We are glad to see you again!</p> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Meta Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={meta_title}
                    onChange={(e) => set_meta_title(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Meta Description</label>
                  <textarea
                    className="form-control"
                    id="propertyTitle"
                    value={meta_description}
                    onChange={(e) => set_meta_description(e.target.value)}
                    style={{ minHeight: 150 }}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Meta Canonical URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={meta_canonical_url}
                    onChange={(e) => set_meta_canonical_url(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="my_profile_setting_input form-group">
                  <label htmlFor="propertyTitle">Meta Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="propertyTitle"
                    value={meta_tag}
                    onChange={(e) => set_meta_tag(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={onSaveAction}
                >
                  Submit
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

export default PageMetaEdit
