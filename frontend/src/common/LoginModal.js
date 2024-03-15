import React, { useState } from 'react'
import authService from '../services/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import ForgetPasswordComponent from './ForgetPassword'

const LoginModal = ({ isLoginModalVisible, handleCloseLoginModal }) => {
  const [userEmailOrPhone, setUserEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isForgetPassActive, setForgetPassActive] = useState(false)
  const loginAction = () => {
    if (!userEmailOrPhone && !password) {
      toast.error('Enter email/password', {
        theme: 'dark',
      })
    } else {
      authService.login(userEmailOrPhone, password).then(
        (res) => {
          console.log(res)
          if (res?.success) {
            const retrievedData = localStorage.getItem('formData')
            const filterData = JSON.parse(retrievedData)
            if (filterData) {
              navigate('/auth/add-property')
              window.location.reload()
            } else {
              navigate('/auth/dashboard')
              window.location.reload()
            }
          } else {
            toast.error(res.message, {
              theme: 'dark',
            })
          }
        },
        (err) => {
          if (err?.response?.data?.success === false) {
            toast.error(err.response.data.message, {
              theme: 'dark',
            })
          }
        },
      )
    }
  }

  return (
    <div>
      <div
        className={`sign_up_modal modal fade bd-example-modal-lg-2 ${
          isLoginModalVisible ? 'show' : ''
        }`}
        role="dialog"
        aria-hidden="true"
        style={{
          display: `${isLoginModalVisible ? 'block' : 'none'}`,
          transition: `opacity .15s linear`,
        }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={handleCloseLoginModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container pb20">
              <div className="tab-content container" id="myTabContent">
                <div
                  className="row mt25 tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="col-lg-6 col-xl-6">
                    <div className="login_thumb">
                      <img
                        className="img-fluid w100"
                        src="images/resource/login.jpg"
                        alt="login.jpg"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-xl-6">
                    <div className="login_form">
                      {isForgetPassActive === false ? (
                        <form action="#">
                          <div className="heading">
                            <h4>Sign In</h4>
                          </div>

                          <div className="input-group mb-2 mr-sm-2">
                            <input
                              type="text"
                              onChange={(e) => {
                                setUserEmailOrPhone(e.target.value)
                              }}
                              className="form-control"
                              id="inlineFormInputGroupUsername2"
                              placeholder="Phone Number / Email"
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-user"></i>
                              </div>
                            </div>
                          </div>
                          <div className="input-group form-group">
                            <input
                              type="password"
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Password"
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-password"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group custom-control custom-checkbox">
                            <a
                              className="btn-fpswd float-right"
                              onClick={() => setForgetPassActive(true)}
                            >
                              Lost your password?
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={loginAction}
                            className="btn btn-log btn-block btn-thm"
                          >
                            Sign In
                          </button>
                        </form>
                      ) : (
                        <ForgetPasswordComponent setForgetPassActive={setForgetPassActive} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
