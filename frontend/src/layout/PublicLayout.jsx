/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Outlet,
  Link,
  useNavigate,
  useLocation,
  Router,
} from "react-router-dom";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style-new.css";
import "../assets/css/new-custom.css";
import "../assets/css/responsive.css";
import { useState, useEffect } from "react";
import * as React from "react";
import { toast } from "react-toastify";
import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import auth from "../reducers/auth";
import userService from "../services/user.service";
import servicesService from "../services/services.service";
import QuickLink from "../common/quickLink";
import AddProperty from "../pages/private/property/AddProperty";
import LoginModal from "../common/LoginModal";
const PublicLayout = () => {
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isRegisterModalRegularVisible, setRegisterModalRegular] =
    useState(false);
  const [isLoginModalVisible, setLoginModalVissible] = useState(false);
  const [isAddPropertyModalVisible, setAddPropertyModalVissible] =
    useState(false);
  const [user_email_or_phone, set_user_email_or_phone] = useState(null);
  const [password, set_password] = useState(null);

  // register
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password1, setPass1] = useState("");
  const [password2, setPass2] = useState("");
  const [userType, setUserType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgDetails, setOrgDetails] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [meInfo, setMeInfo] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const location = useLocation();
  const [serviceData, setServiceData] = useState();
  const [imagePath, setImagePath] = useState();
  const [y, setY] = useState();
  const [fixed, setFixed] = useState();

  const handleNavigation = React.useCallback(
    (e) => {
      if (window !== undefined) {
        if (window.scrollY >= 200) {
          setFixed(true);
          // console.log("scrolling up");
        } else {
          setFixed(false);
          // console.log("scrolling down");
        }
        setY(window.scrollY);
      }
    },
    [y]
  );
  // console.log("yyyyyy", y);
  // get countryList
  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);
  // initialize
  const handleModal = (data) => {
    console.log("handle Modal", data);
    setAddPropertyModalVissible(false);
    setLoginModalVissible(true);
  };
  useEffect(() => {
    // setServiceData(data.map(i => i));
    servicesService.getActiveServiceList().then(
      (res) => {
        setServiceData(res?.data?.data);
        setImagePath(res?.data?.imageFolderPath);
      },
      (err) => {
        toast.error(err.response.data.message, {
          theme: "dark",
        });
        localStorage.removeItem("user");
      }
    );
  }, []);
  useEffect(() => {
    let user = localStorage.getItem("user");
    setUser(JSON.parse(user));
    if (user) {
      userService.getMeInfo().then(
        (res) => {
          // console.log('Meeee', res.data)
          setIsLogin(true);
          setMeInfo(res.data);
        },
        (err) => {
          setIsLogin(false);
          localStorage.removeItem("user");
        }
      );
    } else {
      setIsLogin(false);
      localStorage.removeItem("user");
    }
  }, []);
  // login
  // const loginAction = () => {
  //   console.log("called");

  //   if (!user_email_or_phone && !password) {
  //     toast.error("Enter email/password", {
  //       theme: "dark",
  //     });
  //   } else {
  //     authService
  //       .login(user_email_or_phone, password)
  //       // login(user_email_or_phone, password)
  //       // dispatch(auth.actions.login(user_email_or_phone, password))
  //       .then(
  //         (res) => {
  //           console.log(res);
  //           if (res?.success) {
  //             // console.log('login success')
  //             // localStorage.setItem('user2', JSON.stringify(res?.data))
  //             const retrievedData = localStorage.getItem("formData");
  //             const filterData = JSON.parse(retrievedData);
  //             if (filterData) {
  //               navigate("/auth/add-property");
  //               window.location.reload();
  //             } else {
  //               navigate("/auth/dashboard");
  //               window.location.reload();
  //             }
  //           } else {
  //             toast.error(res.message, {
  //               theme: "dark",
  //             });
  //           }
  //         },
  //         (err) => {
  //           if (err?.response?.data?.success === false) {
  //             toast.error(err.response.data.message, {
  //               theme: "dark",
  //             });
  //           }
  //         }
  //       );
  //   }
  // };
  const handleOpenLoginModal = () => {
    setLoginModalVissible(true)
  }

  const handleCloseLoginModal = () => {
    setLoginModalVissible(false)
  }
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/50";
  };
  const logOutAction = () => {
    authService.logout();
    navigate("/home");

    // console.log("logout");
  };
  const createPost = () => {
    navigate("auth/add-property");
    window.location.reload();
    // console.log('logout')
  };
  const myAccount = () => {
    navigate("auth/my-profile");
    window.location.reload();
  };

  // clear states
  const clearRegisterStates = () => {
    setName("");
    setEmail("");
    setPass1("");
    setPass2("");
    setUserType("");
    setRegisterModalRegular(false);
    setRegisterModalVisible(false);
    setOrgDetails("");
    setOrgName("");
    setChecked(false);
    setPhone("");
    setRegisterModalVisible(false);

    setLoginModalVissible(true)
  };

  // login
  const registerAction = () => {
    // console.log('called')
    if (userType === "") {
      toast.info("Select registration user type", {
        theme: "dark",
      });
    } else if (!name) {
      toast.info("Name is required", {
        theme: "dark",
      });
    // } else if (!email) {
    //   toast.info("Email is required", {
    //     theme: "dark",
    //   });
    } else if (!phone) {
      toast.info("Phone Number is required", {
        theme: "dark",
      });
    } else if (!password1) {
      toast.info("Password is required", {
        theme: "dark",
      });
    } else if (password1 !== password2) {
      toast.info("Password not matched", {
        theme: "dark",
      });
    } else {
      let data = {};
      if (userType === 3) {
        data = {
          name: name,
          email: email,
          phone: phone,
          password: password1,
          confirm_password: password2,
          user_type: userType,
        };
      }
      if (userType === 2) {
        data = {
          name: name,
          email: email,
          phone: phone,
          password: password1,
          confirm_password: password2,
          user_type: userType,
          organization_name: orgName,
          organization_details: " ",
        };
      }
      authService.register(data).then(
        (res) => {
          if (res?.data?.success) {
            clearRegisterStates();
            toast.success(res?.data?.message, {
              theme: "dark",
            });
            // window.location.reload()
          } else {
            toast.error(res?.data?.message, {
              theme: "dark",
            });
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      );
    }
  };
  const registerActionPersonal = () => {
    if (!name) {
      toast.info("Name is required", {
        theme: "dark",
      });
    // } else if (!email) {
    //   toast.info("Email is required", {
    //     theme: "dark",
    //   });
    } else if (!phone) {
      toast.info("Phone Number is required", {
        theme: "dark",
      });
    } else if (!password1) {
      toast.info("Password is required", {
        theme: "dark",
      });
    } else if (password1 !== password2) {
      toast.info("Password not matched", {
        theme: "dark",
      });
    } else {
      // if(userType === 2 && ){

      // }
      let data = {
        name: name,
        email: email,
        phone: phone,
        password: password1,
        confirm_password: password2,
        user_type: 4,
      };
      authService.register(data).then(
        (res) => {
          if (res?.data?.success) {
            clearRegisterStates();
            toast.success(res?.data?.message, {
              theme: "dark",
            });
            // window.location.reload()
          } else {
            toast.error(res?.data?.message, {
              theme: "dark",
            });
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, {
            theme: "dark",
          });
        }
      );
    }
  };
  const handleAddPropertyButton = () => {
    setAddPropertyModalVissible(true);
    localStorage.removeItem("formData");
  };

  // New mennu

  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  // console.log("isActive", isActive);
  return (
    <>
      <div className="wrapper">
        {/* <!-- Main Header Nav --> */}
        <div className={`${fixed ? "sticky-menu" : "non-sticky-menu"}`}>
          <header className="header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu">
            <div className="container mx-0 p0 mw-100">
              {/* <!-- Ace Responsive Menu --> */}
              <nav className="tab">
                {/* <!-- Menu Toggle btn--> */}
                <div className="menu-toggle">
                  <img
                    className="nav_logo_img img-fluid"
                    src="images/header-logo.png"
                    alt="header-logo.png"
                  />
                  <button type="button" id="menu-btn">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <a href="/" className="navbar_brand float-left dn-smd">
                  <img
                    className="logo1 img-fluid"
                    src="images/header-logo2.png"
                    alt="header-logo.png"
                  />
                  <img
                    className="logo2 img-fluid"
                    src="images/header-logo2.png"
                    alt="header-logo2.png"
                  />
                  {/* <!-- <span>FindHouse</span> --> */}
                </a>
                {/* <!-- Responsive Menu Structure--> */}
                {/* <!--Note: declare the Menu style in the data-menu-style="horizontal" (options: horizontal, vertical, accordion) --> */}
                <ul
                  id="respMenu"
                  className="ace-responsive-menu text-right"
                  data-menu-style="horizontal"
                >
                  <li>
                    <a href="/">
                      <span className="title">Home</span>
                    </a>
                  </li>
                  <li>
                    <a href="/all-ads">
                      <span className="title">All Ads</span>
                    </a>
                    {/* <!-- Level Two--> */}
                  </li>
                  <li>
                    <Link to="/all-agents">
                      <span className="title">Agents</span>
                    </Link>
                    <ul>
                      <li>
                        <a href="/all-agents/business">
                          <span>Business Agent</span>
                        </a>
                      </li>
                      <li>
                        <a href="/all-agents/personal">
                          <span>Personal Agent</span>
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Level Two--> */}
                  </li>
                  {/* <li>
                  <a href="/articles">
                    <span className="title">Articles</span>
                  </a>
                </li> */}
                  <li>
                    <a href="/all-service">
                      <span className="title">Services</span>
                    </a>
                    <ul>
                      {serviceData?.map((e) => (
                        <li key={e?.id}>
                          <a href={"/service-details/" + e?.id}>
                            {e?.title || "Service name missing"}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="last">
                    <Link to="/contact-us">
                      <span className="title">Contact</span>
                    </Link>
                  </li>

                  {!isLogin && (
                    <>
                      <li>
                        <Link to="#">
                          <span className="title">Sign up</span>
                        </Link>
                        <ul>
                          <li>
                            <a onClick={() => setRegisterModalRegular(true)} href="#">
                              <span className="dn-lg">Buyer</span>
                            </a>
                          </li>
                          <li>
                            <a onClick={() => setRegisterModalVisible(true)} href="#">
                              <span className="dn-lg">Agent</span>
                            </a>
                          </li>
                        </ul>
                        {/* <!-- Level Two--> */}
                      </li>
                      <li className="list-inline-item add_listing home2 style2 float-right">
                        <a
                          className="mm-listitem__text"
                          onClick={handleAddPropertyButton}
                        >
                          <span className="flaticon-plus"></span>
                          <span className="dn-lg"> Post Free Ads</span>
                        </a>
                      </li>

                      <li
                        className="list-inline-item list_s float-right d-flex"
                        style={{ minHeight: 60 }}
                      >
                        <button
                          type="button"
                          onClick={handleOpenLoginModal}
                          className="btn flaticon-user"
                        >
                          <span className="dn-lg"> Sign in</span>
                        </button>
                        {/* <button
                        type="button"
                        // href="#"
                        onClick={() => setRegisterModalVisible(true)}
                        className="btn flaticon-user"
                        // data-toggle="modal"
                        // data-target=".bd-example-modal-lg-2"
                      >
                        {' '}
                        <span className="dn-lg">Register</span>
                      </button> */}
                      </li>
                    </>
                  )}
                  {isLogin && (
                    <>
                      {(user?.role?.role_id === 2 ||
                        user?.role?.role_id === 3) && (
                        <li>
                          <Link to="#">
                            <span className="title">Inqueries</span>
                          </Link>
                          <ul>
                            <li>
                              <Link to="/submitted-inqueries">
                                Submitted Inqueries
                              </Link>
                            </li>
                            <li>
                              <Link to="/recieved-inqueries">
                                Recieved Inqueries
                              </Link>
                            </li>
                          </ul>
                        </li>
                      )}
                      {(user?.role?.role_id === 2 ||
                        user?.role?.role_id === 1 ||
                        user?.role?.role_id === 3) && (
                        <li className="list-inline-item add_listing">
                          <a onClick={createPost} className="dn-lg">
                            <span className="flaticon-plus"></span>
                            <span className="dn-lg"> Create Post</span>
                          </a>
                        </li>
                      )}
                      <li className="user_setting">
                        <div className="dropdown">
                          <a
                            className="btn dropdown-toggle"
                            href="#"
                            data-toggle="dropdown"
                          >
                            {/* <img
                            className="rounded-circle"
                            src="images/team/e1.png"
                            alt="e1.png"
                          /> */}
                            <img
                              className="rounded-circle mr-2 profile_photo"
                              src={
                                meInfo?.data?.imageFolderPath +
                                "/" +
                                meInfo?.data?.profile_image
                              }
                              alt={meInfo?.data?.name}
                              onError={handleImageError}
                            />
                            <span className="dn-1199">
                              {meInfo?.data?.name} {user?.role?.role_id}
                            </span>
                          </a>
                          <div className="dropdown-menu">
                            <div className="user_set_header">
                              {/* <img
                              className="float-left"
                              src="images/team/e1.png"
                              alt="e1.png"
                            /> */}
                              <img
                                className="float-left profile_photo_sqr"
                                src={
                                  meInfo?.data?.imageFolderPath +
                                  "/" +
                                  meInfo?.data?.profile_image
                                }
                                alt={meInfo?.data?.name}
                                onError={handleImageError}
                              />
                              <p>
                                {meInfo?.data?.name} <br />
                                <span className="address">
                                  {meInfo?.data?.email}
                                </span>
                              </p>
                            </div>
                            <QuickLink
                              logOutAction={logOutAction}
                              myAccount={myAccount}
                            />
                          </div>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </header>
        </div>
        {/** Main Header Nav For Mobile **/}
        <div id="page" className="stylehome1 h0 mbl">
          <div className="mobile-menu">
            <div className="header stylehome1">
              <div className="main_logo_home2 text-center">
                <img
                  className="nav_logo_img img-fluid mt-2"
                  src="images/header-logo2.png"
                  alt="header-logo2.png"
                />
                {/* <span className="mt20">FindHouse</span> */}
              </div>

              <ul className="menu_bar_home2">
                <li className="list-inline-item list_s d-flex">
                  {!isLogin && (
                    <>
                      <button
                        type="button"
                        onClick={() => setAddPropertyModalVissible(true)}
                        className="btn flaticon-plus"
                      >
                        {/* <span> Post Free Ads</span> */}
                      </button>
                      <button
                        type="button"
                        // href="#"
                        onClick={onClick}
                        className="btn flaticon-user"
                      ></button>
                      {/* Dropdown Content */}
                      <div
                        className={`dropdown__content ${
                          isActive ? "active" : "inactive"
                        }`}
                      >
                        <div className="dropdown__info">
                          <ul>
                            <li>
                              <a
                                className="drop"
                                onClick={() => setLoginModalVissible(true)}
                              >
                                <span className="title">Login</span>
                              </a>
                            </li>
                            <li>
                              <Link to="#" className="drop">
                                <span className="title">Sign up</span>
                              </Link>
                            </li>
                            <li>
                              <a
                                className="drop"
                                onClick={() => setRegisterModalRegular(true)}
                              >
                                Buyer
                              </a>
                            </li>
                            <li>
                              <a
                                className="drop"
                                onClick={() => setRegisterModalVisible(true)}
                              >
                                Agent
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                  {isLogin && (
                    <>
                      {/* <span> Post Free Ads</span> */}

                      {(user?.role?.role_id === 2 ||
                        user?.role?.role_id === 1 ||
                        user?.role?.role_id === 3) && (
                        <button
                          type="button"
                          onClick={createPost}
                          className="btn flaticon-plus"
                        ></button>
                      )}
                      <button
                        type="button"
                        // href="#"
                        onClick={onClick}
                        className="btn"
                      >
                        <img
                          className="rounded-circle profile_photo"
                          src={
                            meInfo?.data?.imageFolderPath +
                            "/" +
                            meInfo?.data?.profile_image
                          }
                          alt={meInfo?.data?.name}
                          onError={handleImageError}
                        />
                      </button>

                      {/* Dropdown Content */}
                      <div
                        className={`dropdown__content ${
                          isActive ? "active" : "inactive"
                        }`}
                      >
                        <div className="dropdown__info">
                          <ul>
                            <li>

                              <p>
                                {meInfo?.data?.name} <br />
                                <span className="address">
                                  {meInfo?.data?.email}
                                </span>
                              </p>
                            </li>

                            <li>
                              <a
                                className="drop"
                                href={
                                  user?.role?.role_id !== 1
                                    ? "/auth/favorites"
                                    : "/auth/all-favorites"
                                }
                              >
                                {user?.role?.role_id !== 1
                                  ? "My Favorites"
                                  : "All Favorites"}
                              </a>
                            </li>
                            <li>
                              <a
                                className="drop"
                                style={{ cursor: "pointer" }}
                                onClick={myAccount}
                              >
                                My Account
                              </a>
                            </li>
                            <li>
                              <a
                                className="drop"
                                href="#"
                                onClick={logOutAction}
                                style={{color:'red'}}
                              >
                                Sign out
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </li>
                <li className="list-inline-item">
                  <a href="#menu">
                    <span></span>
                  </a>
                </li>
              </ul>

              {/* <ul className="menu_bar_home2">
                <li className="list-inline-item list_s">
                  <button
                    type="button"
                    className="mm-listitem__text"
                    onClick={() => setRegisterModalVisible(true)}
                  >
                    <span>Business Member</span>
                  </button>
                </li>
                <li className="list-inline-item list_s">
                  <button
                    type="button"
                    className="mm-listitem__text"
                    onClick={() => setRegisterModalRegular(true)}
                  >
                    <span>Regular Member</span>
                  </button>
                </li>
              </ul> */}
            </div>
          </div>
          {/** /.mobile-menu **/}
          <nav id="menu" className="stylehome1">
            <ul
              id="respMenu"
              className="mm-listview"
              data-menu-style="horizontal"
            >
              <li className="mm-listitem">
                <a href="/">
                  <span className="title">Home</span>
                </a>
              </li>
              <li className="mm-listitem">
                <a href="/all-ads">
                  <span className="title">All Ads</span>
                </a>
                {/* <!-- Level Two--> */}
              </li>
              <li className="mm-listitem">
                <Link to="/all-agents">
                  <span className="title">Agents</span>
                </Link>
                <ul className="mm-listview">
                  <li className="mm-listitem">
                    <a
                      href="/all-agents/business"
                      className="mm-listitem__text"
                    >
                      <span>Business Agent</span>
                    </a>
                  </li>
                  <li className="mm-listitem">
                    <a
                      href="/all-agents/personal"
                      className="mm-listitem__text"
                    >
                      <span>Personal Agent</span>
                    </a>
                  </li>
                </ul>
                {/* <!-- Level Two--> */}
              </li>
              {/* <li>
                  <a href="/articles">
                    <span className="title">Articles</span>
                  </a>
                </li> */}
              <li className="mm-listitem">
                <a href="#">
                  <span className="title">Services</span>
                </a>
                <ul className="mm-listview">
                  {serviceData?.map((e) => (
                    <li key={e?.id} className="mm-listitem">
                      <a
                        href={"/service-details/" + e?.id}
                        className="mm-listitem__text"
                      >
                        {e?.title || "Service name missing"}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mm-listitem">
                <Link to="/contact-us">
                  <span className="title">Contact</span>
                </Link>
              </li>

              
            </ul>
          </nav>
        </div>
        {/* <!-- Modal --> */}
        {/* <div
          className={`sign_up_modal modal fade bd-example-modal-lg-2 ${
            isLoginModalVisible ? "show" : ""
          }`}
          role="dialog"
          aria-hidden="true"
          style={{
            display: `${isLoginModalVisible ? "block" : "none"}`,
            transition: `opacity .15s linear`,
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => setLoginModalVissible(false)}
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
                        <form action="#">
                          <div className="heading">
                            <h4>Sign In</h4>
                          </div>

                          <div className="input-group mb-2 mr-sm-2">
                            <input
                              type="text"
                              onChange={(e) => {
                                set_user_email_or_phone(e.target.value);
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
                                set_password(e.target.value);
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
                           
                            <a className="btn-fpswd float-right" href="#">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
         <LoginModal
          handleCloseLoginModal={handleCloseLoginModal}
          isLoginModalVisible={isLoginModalVisible}
        />
        {/* Business Registration */}
        <div
          className={`sign_up_modal modal fade bd-example-modal-lg-2 ${
            isRegisterModalVisible ? "show" : ""
          }`}
          role="dialog"
          aria-hidden="true"
          style={{
            display: `${isRegisterModalVisible ? "block" : "none"}`,
            transition: `opacity .15s linear`,
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => setRegisterModalVisible(false)}
                  className="close"
                  // data-dismiss="modal"
                  // aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body container pb20">
                <div className="tab-content container" id="myTabContent">
                  <div
                    className="row mt25 tab-pane fade show active"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="col-lg-6 col-xl-6">
                      <div className="regstr_thumb">
                        <img
                          className="img-fluid w100"
                          src="images/resource/regstr.jpg"
                          alt="regstr.jpg"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6">
                      <div className="sign_up_form">
                        <div className="heading">
                          <h4>Sign up</h4>
                        </div>
                        <form action="#">
                          <label>Sign up as</label>
                          <div className="row">
                            <div className="col-lg-6">
                              <button
                                type="button"
                                onClick={() => setUserType(3)}
                                className="btn btn-block btn-fb"
                                style={{
                                  background: userType === 3 ? "#506dab" : "",
                                  color: userType === 3 ? "#fff" : "",
                                }}
                              >
                                {/* <i className="fa fa-facebook float-left mt5"></i>{' '} */}
                                Personal Agent
                              </button>
                            </div>
                            <div className="col-lg-6">
                              <button
                                type="button"
                                onClick={() => setUserType(2)}
                                className="btn btn-block btn-fb"
                                style={{
                                  background: userType === 2 ? "#506dab" : "",
                                  color: userType === 2 ? "#fff" : "",
                                }}
                              >
                                {/* <i className="fa fa-google float-left mt5"></i>{' '} */}
                                Business Agent
                              </button>
                            </div>
                          </div>
                          {/* <hr /> */}
                          {userType === 2 && (
                            <div className="form-group input-group">
                              <input
                                value={orgName}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail2"
                                placeholder="Organization Name"
                                onChange={(e) => setOrgName(e?.target?.value)}
                              />
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <i className="fa fa-users"></i>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="form-group input-group">
                            <input
                              value={name}
                              type="text"
                              className="form-control"
                              id="exampleInputName2"
                              placeholder="Full Name"
                              onChange={(e) => setName(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-user"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={email}
                              type="email"
                              className="form-control"
                              id="exampleInputEmail2"
                              placeholder="Email"
                              onChange={(e) => setEmail(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-envelope-o"></i>
                              </div>
                            </div>
                          </div>
                          
                          {/* {userType === 2 && (
                            <div className="form-group input-group">
                              <input
                                value={orgDetails}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail2"
                                placeholder="Organization Details"
                                onChange={(e) =>
                                  setOrgDetails(e?.target?.value)
                                }
                              />
                              <div className="input-group-prepend">
                                <div className="input-group-text">
                                  <i className="fa fa-users"></i>
                                </div>
                              </div>
                            </div>
                          )} */}
                          <div className="form-group input-group">
                            <input
                              value={phone}
                              type="text"
                              className="form-control"
                              id="exampleInputPhonel2"
                              placeholder="Phone Number"
                              onChange={(e) => setPhone(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-phone"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={password1}
                              type="password"
                              className="form-control"
                              id="exampleInputPassword2"
                              placeholder="Password"
                              onChange={(e) => setPass1(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-password"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={password2}
                              type="password"
                              className="form-control"
                              id="exampleInputPassword3"
                              placeholder="Re-enter password"
                              onChange={(e) => setPass2(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-password"></i>
                              </div>
                            </div>
                          </div>
                          {/* <div className="form-group ui_kit_select_search mb0">
                            <select
                              className="selectpicker"
                              data-live-search="true"
                              data-width="100%"
                            >
                              <option data-tokens="SelectRole">
                                Single User
                              </option>
                              <option data-tokens="Agent/Agency">Agent</option>
                              <option data-tokens="SingleUser">
                                Multi User
                              </option>
                            </select>
                          </div> */}
                          {/* <div className="form-group custom-control custom-checkbox">
                            <input
                              value={checked}
                              type="checkbox"
                              className="custom-control-input"
                              id="exampleCheck2"
                              onChange={(e) => setChecked(e?.target?.checked)}
                            />
                            <label className="custom-control-label">
                              I have read and accept the Terms and Privacy
                              Policy?
                            </label>
                          </div> */}
                          <button
                            type="button"
                            onClick={registerAction}
                            className="btn btn-log btn-block btn-thm"
                          >
                            Sign Up
                          </button>
                          {/* <p className="text-center">
                            Already have an account?{" "}
                            <a className="text-thm" href="#">
                              Log In
                            </a>
                          </p> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Registration */}
        <div
          className={`sign_up_modal modal fade bd-example-modal-lg-2 ${
            isRegisterModalRegularVisible ? "show" : ""
          }`}
          role="dialog"
          aria-hidden="true"
          style={{
            display: `${isRegisterModalRegularVisible ? "block" : "none"}`,
            transition: `opacity .15s linear`,
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => setRegisterModalRegular(false)}
                  className="close"
                  // data-dismiss="modal"
                  // aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body container pb20">
                <div className="tab-content container" id="myTabContent">
                  <div
                    className="row mt25 tab-pane fade show active"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="col-lg-6 col-xl-6">
                      <div className="regstr_thumb">
                        <img
                          className="img-fluid w100"
                          src="images/resource/regstr.jpg"
                          alt="regstr.jpg"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-xl-6">
                      <div className="sign_up_form">
                        <div className="heading">
                          <h4>Sign up</h4>
                        </div>
                        <form action="#">
                          {/* <hr /> */}
                          <div className="form-group input-group">
                            <input
                              value={name}
                              type="text"
                              className="form-control"
                              id="exampleInputName2"
                              placeholder="Full Name"
                              onChange={(e) => setName(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-user"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={email}
                              type="email"
                              className="form-control"
                              id="exampleInputEmail2"
                              placeholder="Email"
                              onChange={(e) => setEmail(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-envelope-o"></i>
                              </div>
                            </div>
                          </div>

                          <div className="form-group input-group">
                            <input
                              value={phone}
                              type="text"
                              className="form-control"
                              id="exampleInputPhonel2"
                              placeholder="Phone Number"
                              onChange={(e) => setPhone(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="fa fa-phone"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={password1}
                              type="password"
                              className="form-control"
                              id="exampleInputPassword2"
                              placeholder="Password"
                              onChange={(e) => setPass1(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-password"></i>
                              </div>
                            </div>
                          </div>
                          <div className="form-group input-group">
                            <input
                              value={password2}
                              type="password"
                              className="form-control"
                              id="exampleInputPassword3"
                              placeholder="Re-enter password"
                              onChange={(e) => setPass2(e?.target?.value)}
                            />
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i className="flaticon-password"></i>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={registerActionPersonal}
                            className="btn btn-log btn-block btn-thm"
                          >
                            Sign Up
                          </button>
                          <p className="text-center">
                            Already have an account?{" "}
                            <a className="text-thm" href="#">
                              Log In
                            </a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Property */}
        <div
          className={`sign_up_modal modal fade bd-example-modal-lg-2 add-property-modal ${
            isAddPropertyModalVisible ? "show" : ""
          }`}
          role="dialog"
          aria-hidden="true"
          style={{
            display: `${isAddPropertyModalVisible ? "block" : "none"}`,
            transition: `opacity .15s linear`,
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  onClick={() => {
                    setAddPropertyModalVissible(false);
                    localStorage.removeItem("formData");
                  }}
                  className="close"
                  // data-dismiss="modal"
                  // aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body container pb20 add-property-modal">
                {isAddPropertyModalVisible && (<AddProperty handleModal={handleModal} />)}
                
              </div>
            </div>
          </div>
        </div>
        {/* <!--  --> */}
        {/* Header End */}
        <Outlet />
        {/* Footer Start */}
        <section className="footer_middle_area home3 pt30 pb30">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="footer_menu_widget home3">
                  <ul>
                    <li className="list-inline-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="/all-ads">All Ads</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="/all-agents">Agents</a>
                    </li>
                    {/* <li className="list-inline-item">
                      <a href="#">Articles</a>
                    </li> */}
                    <li className="list-inline-item">
                      <a href="/contact-us">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-xl-6">
                <div className="copyright-widget home3 text-right">
                  <p>© 2022 Estate Mart BD All Rights Reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Top */}
      </div>
    </>
  );
};

export default PublicLayout;
