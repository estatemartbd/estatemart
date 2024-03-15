import { useCallback, useEffect, useState } from 'react'
import {
  Link,
  Outlet,
  Router,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import '../assets/css/bootstrap.min.css'
import '../assets/css/admin.css'
import '../assets/css/new-custom.css'
import AdminLeftSideNav from '../common/private/AdminLeftSideNav'
import { logout } from '../actions/auth.js'
import authService from '../services/auth.service'
import { useSelector } from 'react-redux'
import userService from '../services/user.service'
import QuickLink from '../common/quickLink'
const PrivateLayout = () => {
  const navigate = useNavigate()
  const { isLoggedIn: currentUser } = useSelector((state) => state.auth)
  const [meInfo, setMeInfo] = useState(false)
  const logOutAction = () => {
    authService.logout()
    navigate('/')
    console.log('logout')
  }
  const [fixed, setFixed] = useState()
  const [y, setY] = useState()

  useEffect(() => {
    console.log(currentUser)
    let user = localStorage.getItem('user')
    if (!user) {
      navigate('/')
    }
    userService
      .getMeInfo()
      .then((res) => {
        console.log('Meeee', res.data)
        setMeInfo(res.data)
      })
      .catch((e) => {
        console.log(e.response.data.success)
        window.location.reload()
        authService.logout()
      })
  }, [])
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/50'
  }
  const myAccount = () => {
    navigate('auth/dashboard')
    window.location.reload()
  }

  const handleNavigation = useCallback(
    (e) => {
      if (window !== undefined) {
        if (window.scrollY >= 200) {
          setFixed(true)
          // console.log("scrolling up");
        } else {
          setFixed(false)
          // console.log("scrolling down");
        }
        setY(window.scrollY)
      }
    },
    [y],
  )

  // get countryList
  useEffect(() => {
    window.addEventListener('scroll', handleNavigation)

    return () => {
      window.removeEventListener('scroll', handleNavigation)
    }
  }, [handleNavigation])
  return (
    <>
      <div className="wrapper">
        {/* <div className="preloader"></div> */}
        {/** Main Header Nav **/}
        <div className={`${fixed ? 'sticky-menu' : 'non-sticky-menu'}`}>
          <header className="header-nav menu_style_home_one style2 menu-fixed main-menu">
            <div className="container-fluid p0">
              {/* * Ace Responsive Menu * */}
              <nav>
                {/* * Menu Toggle btn* */}
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
                  {/* <span>EStateMart</span> */}
                </a>
                {/** Responsive Menu Structure**/}
                {/**Note: declare the Menu style in
            the data-menu-style="horizontal" (options: horizontal, vertical,
            accordion) **/}
                <ul
                  id="respMenu"
                  className="ace-responsive-menu text-right"
                  data-menu-style="horizontal"
                >
                  <li className="list-inline-item add_listing">
                    <a href="/auth/add-property" className="dn-lg">
                      <span className="flaticon-plus"></span>
                      <span className="dn-lg"> Create Post</span>
                    </a>
                  </li>
                  <li className="user_setting">
                    <div className="dropdown">
                      <a
                        className="btn dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                      >
                        <img
                          className="rounded-circle mr-2 profile_photo"
                          src={
                            meInfo?.data?.imageFolderPath +
                            '/' +
                            meInfo?.data?.profile_image
                          }
                          width="50"
                          height="50"
                          alt={meInfo?.data?.name}
                          onError={handleImageError}
                        />
                        <span className="dn-1199">{meInfo?.data?.name}</span>
                      </a>
                      <div className="dropdown-menu">
                        <div className="user_set_header">
                          <img
                            className="float-left profile_photo_sqr"
                            src={
                              meInfo?.data?.imageFolderPath +
                              '/' +
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
                  className="nav_logo_img img-fluid mt20"
                  src="images/header-logo2.png"
                  alt="header-logo2.png"
                />
                <span className="mt20">FindHouse</span>
              </div>
              <ul className="menu_bar_home2">
                <li className="list-inline-item list_s">
                  <a href="page-register.html">
                    <span className="flaticon-user"></span>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#menu">
                    <span></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/** /.mobile-menu **/}
          <nav id="menu" className="stylehome1">
            <ul>
              <li>
                <span>Home</span>
                <ul>
                  <li>
                    <a href="index.html">Home 1</a>
                  </li>
                  <li>
                    <a href="index2.html">Home 2</a>
                  </li>
                  <li>
                    <a href="index3.html">Home 3</a>
                  </li>
                  <li>
                    <a href="index4.html">Home 4</a>
                  </li>
                  <li>
                    <a href="index5.html">Home 5</a>
                  </li>
                  <li>
                    <a href="index6.html">Home 6</a>
                  </li>
                  <li>
                    <a href="index7.html">Home 7</a>
                  </li>
                  <li>
                    <a href="index8.html">Home 8</a>
                  </li>
                  <li>
                    <a href="index9.html">Home 9</a>
                  </li>
                  <li>
                    <a href="index10.html">Home 10</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Listing</span>
                <ul>
                  <li>
                    <span>Listing Grid</span>
                    <ul>
                      <li>
                        <a href="page-listing-grid-v1.html">Grid v1</a>
                      </li>
                      <li>
                        <a href="page-listing-grid-v2.html">Grid v2</a>
                      </li>
                      <li>
                        <a href="page-listing-grid-v3.html">Grid v3</a>
                      </li>
                      <li>
                        <a href="page-listing-grid-v4.html">Grid v4</a>
                      </li>
                      <li>
                        <a href="page-listing-grid-v5.html">Grid v5</a>
                      </li>
                      <li>
                        <a href="page-listing-full-width-grid.html">
                          Grid Fullwidth
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Listing Style</span>
                    <ul>
                      <li>
                        <a href="page-listing-parallax.html">Parallax Style</a>
                      </li>
                      <li>
                        <a href="page-listing-slider.html">Slider Style</a>
                      </li>
                      <li>
                        <a href="page-listing-map.html">Map Header</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Listing Half</span>
                    <ul>
                      <li>
                        <a href="page-listing-half-map-v1.html">Map V1</a>
                      </li>
                      <li>
                        <a href="page-listing-half-map-v2.html">Map V2</a>
                      </li>
                      <li>
                        <a href="page-listing-half-map-v3.html">Map V3</a>
                      </li>
                      <li>
                        <a href="page-listing-half-map-v4.html">Map V4</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Agent View</span>
                    <ul>
                      <li>
                        <a href="page-listing-agent-v1.html">Agent V1</a>
                      </li>
                      <li>
                        <a href="page-listing-agent-v2.html">Agent V2</a>
                      </li>
                      <li>
                        <a href="page-listing-agent-v3.html">Agent Details</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Agencies View</span>
                    <ul>
                      <li>
                        <a href="page-agencies-list-v1.html">Agencies V1</a>
                      </li>
                      <li>
                        <a href="page-agencies-list-v2.html">Agencies V2</a>
                      </li>
                      <li>
                        <a href="page-agencies-list-v3.html">
                          Agencies Details
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Property</span>
                <ul>
                  <li>
                    <span>Property</span>
                    <ul>
                      <li>
                        <a href="page-dashboard.html">Dashboard</a>
                      </li>
                      <li>
                        <a href="page-my-properties.html">My Properties</a>
                      </li>
                      <li>
                        <a href="page-add-new-property.html">
                          Add New Property
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span>Listing Single</span>
                    <ul>
                      <li>
                        <a href="page-listing-single-v1.html">Single V1</a>
                      </li>
                      <li>
                        <a href="page-listing-single-v2.html">Single V2</a>
                      </li>
                      <li>
                        <a href="page-listing-single-v3.html">Single V3</a>
                      </li>
                      <li>
                        <a href="page-listing-single-v4.html">Single V4</a>
                      </li>
                      <li>
                        <a href="page-listing-single-v5.html">Single V5</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <ul>
                  <li>
                    <a href="page-blog-v1.html">Blog List 1</a>
                  </li>
                  <li>
                    <a href="page-blog-grid.html">Blog List 2</a>
                  </li>
                  <li>
                    <a href="page-blog-single.html">Single Post</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Pages</span>
                <ul>
                  <li>
                    <span>Shop</span>
                    <ul>
                      <li>
                        <a href="page-shop.html">Shop</a>
                      </li>
                      <li>
                        <a href="page-shop-single.html">Shop Single</a>
                      </li>
                      <li>
                        <a href="page-shop-cart.html">Cart</a>
                      </li>
                      <li>
                        <a href="page-shop-checkout.html">Checkout</a>
                      </li>
                      <li>
                        <a href="page-shop-order.html">Order</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="page-about.html">About Us</a>
                  </li>
                  <li>
                    <a href="page-gallery.html">Gallery</a>
                  </li>
                  <li>
                    <a href="page-faq.html">Faq</a>
                  </li>
                  <li>
                    <a href="page-login.html">LogIn</a>
                  </li>
                  <li>
                    <a href="page-compare.html">Membership</a>
                  </li>
                  <li>
                    <a href="page-compare2.html">Membership 2</a>
                  </li>
                  <li>
                    <a href="page-register.html">Register</a>
                  </li>
                  <li>
                    <a href="page-service.html">Service</a>
                  </li>
                  <li>
                    <a href="page-error.html">404 Page</a>
                  </li>
                  <li>
                    <a href="page-terms.html">Terms and Conditions</a>
                  </li>
                  <li>
                    <a href="page-ui-element.html">UI Elements</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="page-contact.html">Contact</a>
              </li>
              <li>
                <a href="page-login.html">
                  <span className="flaticon-user"></span> Login
                </a>
              </li>
              <li>
                <a href="page-register.html">
                  <span className="flaticon-edit"></span> Register
                </a>
              </li>
              <li className="cl_btn">
                <a className="btn btn-block btn-lg btn-thm circle" href="#">
                  <span className="flaticon-plus"></span>
                  Create Listing
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/** Main Left Side Menu **/}
        <AdminLeftSideNav />
        {/** Main Center Container **/}
        <section className="our-dashbord dashbord bgc-f7 pb50">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-xl-2 dn-992 pl0"></div>
              <div className="col-lg-9 col-xl-10 maxw100flex-992">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default PrivateLayout
