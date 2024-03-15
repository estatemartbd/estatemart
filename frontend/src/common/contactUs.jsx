import React, { useState } from 'react'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'

function ContactUs() {
  const [data, setData] = useState({})
  const [recaptchaValue, setRecaptchaValue] = useState(null)

  // submit
  const handleSubmit = () => {
    if (!recaptchaValue) {
      toast.info('Please verify that you are not a robot')
      return
    }
    if (!data?.name) {
      toast.info('Name is required')
    } else if (!data?.email && !data?.phone) {
      toast.info('Email/Phone is required')
    } else if (!data?.subject) {
      toast.info('Subject is required')
    } else if (!data?.message) {
      toast.info('Please enter message')
    } else {
      userService.contactUs(data).then(
        (res) => {
          if (res?.data?.success) {
            toast.success(res?.data?.message)
            setData({})
          } else {
            toast.info(res?.data?.message)
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message)
        },
      )
    }
  }

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value)
  }

  return (
    <div className="form_grid">
      <h4 className="mb5">
        Contact us to improve your experience at EstateMart
      </h4>
      {/* <form
        className="contact_form"
        id="contact_form"
        name="contact_form"
        action="#"
        method="post"
        novalidate="novalidate"
      > */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_name"
              name="form_name"
              className="form-control"
              required="required"
              type="text"
              placeholder="Name"
              value={data?.name || ''}
              onChange={(e) => setData({ ...data, name: e?.target?.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_email"
              name="form_email"
              className="form-control required email"
              required="required"
              type="email"
              placeholder="Email"
              value={data?.email || ''}
              onChange={(e) => setData({ ...data, email: e?.target?.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_phone"
              name="form_phone"
              className="form-control required phone"
              required="required"
              type="phone"
              placeholder="Phone"
              value={data?.phone || ''}
              onChange={(e) => setData({ ...data, phone: e?.target?.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <input
              id="form_subject"
              name="form_subject"
              className="form-control required"
              required="required"
              type="text"
              placeholder="Subject"
              value={data?.subject || ''}
              onChange={(e) => setData({ ...data, subject: e?.target?.value })}
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="form-group">
            <textarea
              id="form_message"
              name="form_message"
              className="form-control required"
              rows="8"
              required="required"
              placeholder="Your Message"
              value={data?.message || ''}
              onChange={(e) => setData({ ...data, message: e?.target?.value })}
            ></textarea>
          </div>
          <div className="form-group mb0">
            <ReCAPTCHA
              sitekey="6LcXziopAAAAAP0VKTZAmSADd6A_4IkiriPc44ly"
              onChange={handleRecaptchaChange}
            />

            <button
              type="button"
              className="btn btn-lg btn-thm"
              onClick={handleSubmit}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default ContactUs
