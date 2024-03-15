import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import inqueryService from '../../../services/inquery.service'
import { Helmet } from "react-helmet";
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import userService from '../../../services/user.service'
import services from '../../../services/services.service'
import { toast } from 'react-toastify'
import ListingFeature from '../../../common/public/listingFeature'
import propertyService from '../../../services/property.service'
import AgentSearch from '../../../common/public/AgentSearch'
import AgentCard from '../../../common/public/AgentCard'
import pageMetaService from "../../../services/pageMetaService";

function PersonalAgents() {
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
  const isLogin = JSON.parse(localStorage?.getItem('user'))
  const [searchNameText, setSearchNameText] = useState('')
  const [searchEmailText, setSearchEmailText] = useState('')
  const [searchPhoneText, setSearchPhoneText] = useState('')
  const [searchClear, setSearchClear] = useState(false)
  const [pageMeta, setPageMeta] = useState();

  useEffect(() => {
    getAgentList('', '', '')
    getLocations()
    getCatagories()
    getServiceList()
    getFeatureList()
    getMetaData()
  }, [])
  // get agent list
  // const getAgentList = () => {
  //   let data = {
  //     limit: 10,
  //     offset: 0,
  //   }
  //   userService.publicSystemUser(data).then(
  //     (res) => {
  //       if (res?.data?.success) {
  //         setAgentList(res?.data)
  //         setImgPath(res?.data?.imageResizeFolderPath)
  //       } else {
  //         setAgentList([])
  //       }
  //     },
  //     (err) => {
  //       toast.error(err?.response?.data?.message, { theme: 'dark' })
  //     },
  //   )
  // }

  // get agent list
  const getAgentList = (name, email, phone) => {
    let data = {
      limit: 10,
      offset: 0,
      area: phone,
      location: name,
      // name: name,
      // email: email,
      // phone: phone,
    }
    if (isLogin) {
      // userService.SystemUserForUsers(data).then(
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

  const getMetaData = () => {
    let pageId = 4 // Business Agents
    pageMetaService.getDetails(pageId).then(
      (res) => {
        if (res?.data?.success) {
          if (res?.data?.data.status == 1) {
            setPageMeta(res?.data?.data); 
          }

        } else {
          setPageMeta();
        }
      },
      (err) => {
        console.log(err?.response?.data?.message);
      } 
    );
  };

  const allSearchHandler = (data) => {
    getAgentList(searchNameText, searchEmailText, searchPhoneText)
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
  const filteredAgentList = (data) => {
    console.log('data', data)
    setAgentList(data)
    setImgPath(data?.imageResizeFolderPath)
  }
  return (
    <>
      <Helmet>
        <title>{pageMeta?.meta_title}</title>
        <meta name="description" content={pageMeta?.meta_description} />
        <meta property="og:description" content={pageMeta?.meta_description} />
        <meta name="keywords" content={pageMeta?.meta_tag} />
        <link rel="canonical" href={pageMeta?.meta_canonical_url} />
      </Helmet>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">All Regular Agent</h1>
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
                      <p>
                        {
                          agentList?.data?.filter(
                            (i) => i.role_name == 'Personal Agent',
                          ).length
                        }{' '}
                        Search results
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {agentList?.data
                  ?.filter((i) => i.role_name == 'Personal Agent')
                  ?.map((item, index) => {
                    return (
                      <>
                        <div className="col-md-6 col-lg-6">
                          <AgentCard
                            item={item}
                            imageFolderPath={agentList?.image_folder_path}
                            handleImageError={handleImageError}
                          />
                        </div>
                      </>
                    )
                  })}
              </div>
            </div>
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar_listing_grid1">
                <div className="sidebar_listing_list">
                  <div className="sidebar_advanced_search_widget">
                    <h4 className="mb25">Find Agent</h4>
                    <AgentSearch
                      searchNameText={searchNameText}
                      searchEmailText={searchEmailText}
                      searchPhoneText={searchPhoneText}
                      setSearchNameText={setSearchNameText}
                      setSearchEmailText={setSearchEmailText}
                      setSearchPhoneText={setSearchPhoneText}
                      setSearchClear={setSearchClear}
                      searchClear={searchClear}
                      allSearchHandler={allSearchHandler}
                      getAgentList={getAgentList}
                    />
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

export default PersonalAgents
