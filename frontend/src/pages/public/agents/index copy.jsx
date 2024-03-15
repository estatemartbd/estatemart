import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import inqueryService from '../../../services/inquery.service'
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import userService from '../../../services/user.service'
import services from '../../../services/services.service'
import { toast } from 'react-toastify'
import ListingFeature from '../../../common/public/listingFeature'
import propertyService from '../../../services/property.service'

function AllAgents() {
  const [agentDetails, setAgentDetails] = useState({})
  const [directionID, setDirectionID] = useState()
  const [inqueryData, setInqueryData] = useState({})
  const [catagoriesList, setCatagoriesList] = useState([])
  const [agentList, setAgentList] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [agentImage, setAgentImage] = useState()
  const [imagePathResize, setImgPathResize] = useState('')
  const [selectedCatagory, setSelectedCatagory] = useState(1)
  const [locationList, setLocationList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [serviceImgPath, setServiceImgPath] = useState('')
  const [loading, setLoading] = useState(false)
  const [featureList, setFeatureList] = useState([])
  const [featureImgPath, setFeatureImgPath] = useState('')
  const [name, setName] = useState('')

  const isLogin = JSON.parse(localStorage?.getItem('user'))

  useEffect(() => {
    getAgentList()
    getLocations()
    getCatagories()
    getServiceList()
    getFeatureList('')
  }, [])
  // get agent list
  const getAgentList = (name) => {
    let data = {
      limit: 10,
      offset: 0,
      name: name,
    }
    if (isLogin) {
      userService.SystemUserForUsers(data).then(
        (res) => {
          if (res?.data?.success) {
            setAgentList(res?.data)
            setImgPath(res?.data?.imageResizeFolderPath)
          } else {
            setAgentList([])
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
    } else {
      userService.publicSystemUser(data).then(
        (res) => {
          if (res?.data?.success) {
            setAgentList(res?.data)
            setImgPath(res?.data?.imageResizeFolderPath)
          } else {
            setAgentList([])
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
    }
  }
  // get feature list
  const getFeatureList = () => {
    let data = {
      limit: 5,
      offset: 0,
    }
    propertyService.getFeatureList(data).then(
      (res) => {
        if (res?.data?.success) {
          setFeatureList(res?.data?.data)
          setFeatureImgPath(res?.data?.imageFolderPath)
        } else {
          setFeatureList([])
        }
      },
      (err) => {
        setFeatureList([])
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/150'
  }

  // get agent list
  const getCatagories = () => {
    categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data)
        } else {
          setCatagoriesList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }

  // get locations
  const getLocations = () => {
    locationService.getLocationList().then((res) => {
      setLocationList(res?.data?.data)
    })
  }

  // get services
  const getServiceList = () => {
    services.getActiveServiceList().then((res) => {
      setServiceList(res?.data?.data)
      setServiceImgPath(res?.data?.imageFolderPath)
    })
  }
  return (
    <>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">All Agents</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="grid_list_search_result style2">
                  <div className="col-sm-12 col-md-4 col-lg-3 col-xl-3">
                    <div className="left_area">
                      <p>{agentList?.count} Search results</p>
                    </div>
                  </div>
                </div>
              </div>
              {agentList?.data?.length === 0 && (
                <p className="alert alert-info">Sorry, No Agent Found</p>
              )}
              <div className="row">
                {agentList?.data?.map((item, index) => {
                  return (
                    <>
                      <div className="col-md-6 col-lg-6">
                        <div className="feat_property home7 agent">
                          <div className="thumb">
                            <img
                              className="img-whp"
                              src={
                                agentList?.image_folder_path +
                                '/' +
                                item?.profile_image
                              }
                              alt={item?.name}
                              onError={handleImageError}
                            />
                            {/* <div className="thmb_cntnt">
                              <ul className="tag mb0">
                                <li className="list-inline-item dn"></li>
                                <li className="list-inline-item">
                                  <a href="#">2 Listings</a>
                                </li>
                              </ul>
                            </div> */}
                          </div>
                          <div className="details">
                            <div className="tc_content">
                              <Link to={'/agent-detail/' + item?.user_id}>
                                <h4>{item?.name}</h4>
                                <p className="text-thm">{item?.role_name}</p>
                              </Link>
                            </div>
                            <div className="fp_footer">
                              <Link to={'/agent-detail/' + item?.user_id}>
                                <div className="fp_pdate float-right text-thm">
                                  View My Listings{' '}
                                  <i className="fa fa-angle-right"></i>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}

                {/* <div className="col-md-6 col-lg-6">
                  <div className="feat_property home7 agent">
                    <div className="thumb">
                      <img
                        className="img-whp"
                        src="images/team/12.jpg"
                        alt="12.jpg"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">2 Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <Link to="/agent-detail">
                          <h4>Anna Harrison</h4>
                          <p className="text-thm">Agent</p>
                        </Link>
                      </div>
                      <div className="fp_footer">
                        <Link to="/agent-detail">
                          <div className="fp_pdate float-right text-thm">
                            View My Listings <i className="fa fa-angle-right"></i>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="feat_property home7 agent">
                    <div className="thumb">
                      <img
                        className="img-whp"
                        src="images/team/13.jpg"
                        alt="13.jpg"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">2 Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4>Luxury Family Home</h4>
                        <p className="text-thm">Agent</p>
                      </div>
                      <div className="fp_footer">
                        <div className="fp_pdate float-right text-thm">
                          4 years ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="feat_property home7 agent">
                    <div className="thumb">
                      <img
                        className="img-whp"
                        src="images/team/14.jpg"
                        alt="14.jpg"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">2 Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4>Luxury Family Home</h4>
                        <p className="text-thm">Agent</p>
                      </div>
                      <div className="fp_footer">
                        <div className="fp_pdate float-right text-thm">
                          View My Listings <i className="fa fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="feat_property home7 agent">
                    <div className="thumb">
                      <img
                        className="img-whp"
                        src="images/team/15.jpg"
                        alt="15.jpg"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">2 Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4>Renovated Apartment</h4>
                        <p className="text-thm">Agent</p>
                      </div>
                      <div className="fp_footer">
                        <div className="fp_pdate float-right text-thm">
                          View My Listings <i className="fa fa-angle-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="feat_property home7 agent">
                    <div className="thumb">
                      <img
                        className="img-whp"
                        src="images/team/16.jpg"
                        alt="16.jpg"
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item dn"></li>
                          <li className="list-inline-item">
                            <a href="#">2 Listings</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4>Renovated Apartment</h4>
                        <p className="text-thm">Agent</p>
                      </div>
                      <div className="fp_footer">
                        <div className="fp_pdate float-right text-thm">
                          4 years ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <ul className="page_navigation">
                      <li className="page-item disabled">
                        <a
                          className="page-link"
                          href="#"
                          tabindex="-1"
                          aria-disabled="true">
                          {' '}
                          <span className="flaticon-left-arrow"></span> Prev
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item active" aria-current="page">
                        <a className="page-link" href="#">
                          2 <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          ...
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          29
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <span className="flaticon-right-arrow"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar_listing_grid1">
                <div className="sidebar_listing_list">
                  <div className="sidebar_advanced_search_widget">
                    <h4 className="mb25">Find Agent</h4>
                    <ul className="sasw_list mb0">
                      <li className="search_area">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputName1"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e?.target?.value)}
                          />
                        </div>
                      </li>
                      {/* <li>
                        <div className="search_option_two">
                          <div className="candidate_revew_select">
                            <select className="selectpicker w100 show-tick">
                              <option>Location</option>
                              <option>Dhaka</option>
                              <option>Savar</option>
                              <option>Sylhet</option>
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="search_option_two">
                          <div className="candidate_revew_select">
                            <select className="selectpicker w100 show-tick">
                              <option>Area</option>
                              <option>Mirpur</option>
                              <option>Bannani</option>
                              <option>Uttara</option>
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="search_option_two">
                          <div className="candidate_revew_select">
                            <select className="selectpicker w100 show-tick">
                              <option>Services</option>
                              <option>Construction Management</option>
                              <option>Design and Development</option>
                              <option>Sales and Marketing Support</option>
                              <option>Investment Management</option>
                            </select>
                          </div>
                        </div>
                      </li> */}
                      <li>
                        <div className="search_option_button">
                          <button
                            type="button"
                            className="btn btn-block btn-thm"
                            onClick={() => getAgentList(name)}
                          >
                            Search
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="terms_condition_widget">
                  <h4 className="title">Featured Properties</h4>
                  <div className="sidebar_feature_property_slider">
                    <div className="item">
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="images/property/fp1.jpg"
                            alt="fp1.jpg"
                          />
                          <div className="thmb_cntnt">
                            <ul className="tag mb0">
                              <li className="list-inline-item">
                                <a href="#">For Rent</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Featured</a>
                              </li>
                            </ul>
                            <a className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </a>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="images/property/fp2.jpg"
                            alt="fp2.jpg"
                          />
                          <div className="thmb_cntnt">
                            <ul className="tag mb0">
                              <li className="list-inline-item">
                                <a href="#">For Rent</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Featured</a>
                              </li>
                            </ul>
                            <a className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </a>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="images/property/fp3.jpg"
                            alt="fp3.jpg"
                          />
                          <div className="thmb_cntnt">
                            <ul className="tag mb0">
                              <li className="list-inline-item">
                                <a href="#">For Rent</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Featured</a>
                              </li>
                            </ul>
                            <a className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </a>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="images/property/fp4.jpg"
                            alt="fp4.jpg"
                          />
                          <div className="thmb_cntnt">
                            <ul className="tag mb0">
                              <li className="list-inline-item">
                                <a href="#">For Rent</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Featured</a>
                              </li>
                            </ul>
                            <a className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </a>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item">
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            className="img-whp"
                            src="images/property/fp5.jpg"
                            alt="fp5.jpg"
                          />
                          <div className="thmb_cntnt">
                            <ul className="tag mb0">
                              <li className="list-inline-item">
                                <a href="#">For Rent</a>
                              </li>
                              <li className="list-inline-item">
                                <a href="#">Featured</a>
                              </li>
                            </ul>
                            <a className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </a>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* List Feature Component */}
                <ListingFeature
                  data={featureList}
                  imageFolderPath={featureImgPath}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AllAgents
