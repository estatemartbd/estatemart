// ForgetPasswordComponent.js

import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../services/basePath'

const ForgetPasswordComponent = ({ setForgetPassActive }) => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [step, setStep] = useState(1) // 1 for forget password request, 2 for password reset confirmation
  const [message, setMessage] = useState('')

  const handleForgetPasswordRequest = async () => {
    try {
      const response = await axios.post(
        API_URL + '/user/forget-password-request',
        { email },
      )

      const data = response.data

      if (data.success) {
        setToken(data.token)
        // setOtp(data.otp)
        setStep(2)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Something went wrong.')
    }
  }

  const handlePasswordResetConfirm = async () => {
    try {
      const response = await axios.post(
        API_URL + '/user/reset-password-confirm',
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
          token,
          otp: otp.join(''),
        },
      )

      const data = response.data

      if (data.success) {
        setMessage(data.message)
        // Reset state for the next use
        setEmail('')
        setNewPassword('')
        setConfirmPassword('')
        setToken('')
        setOtp(['', '', '', ''])
        setStep(1)
      } else {
        setMessage(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Something went wrong.')
    }
  }

  const handleOtpChange = (index, value) => {
    const updatedOtp = [...otp]
    updatedOtp[index] = value.replace(/\D/, '')
    setOtp(updatedOtp)

    if (index < 3 && value.length === 1) {
      document.getElementById(`otp-input-${index + 1}`).focus()
    }
  }

  return (
    <div>
      <div className="d-lg-flex justify-content-between">
        <div className="heading">
          <h4>Forget Password</h4>
        </div>
        <div className="form-group custom-control custom-checkbox">
          <button
            className="btn btn-fpswd text-dark float-right bg-transparent border-0"
            onClick={() => setForgetPassActive(false)}
          >
            <i className="fa fa-undo mx-2"></i>
            Back to login
          </button>
        </div>
      </div>
      {step === 1 && (
        <>
          <div>
            <label>Email:</label>
            <input
              className="form-control"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-info"
            onClick={handleForgetPasswordRequest}
          >
            Send Request
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mb-3">
            <label className="form-label">OTP (4 digits):</label>
            <div className="d-flex justify-content-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control w-25 mx-1 text-center"
                  id={`otp-input-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
          <div>
            <label>New Password:</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={handlePasswordResetConfirm}
          >
            Reset
          </button>
        </>
      )}
      {message && <p className="text-info mt-3">{message}</p>}
    </div>
  )
}

export default ForgetPasswordComponent
