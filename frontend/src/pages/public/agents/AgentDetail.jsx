import React, { useState, useEffect } from 'react'
import userService from '../../../services/user.service'
import { toast } from 'react-toastify'
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import propertyService from '../../../services/property.service'
import pageMetaService from '../../../services/pageMetaService'
import { Helmet } from 'react-helmet'
import FeatureList from '../../../common/public/FeatureList'
import ListPropertyCard from './AgentDetailsIndex'
import AgentDetailsIndex from './AgentDetailsIndex'
import ListingFeature from '../../../common/public/listingFeature'

function AgentDetail() {
  const [agentDetails, setAgentDetails] = useState({})
  const [agentProperties, setAgentProperties] = useState()
  // const [catagoriesList, setCatagoriesList] = useState([])
  // const [locationList, setLocationList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [pageMeta, setPageMeta] = useState()

  const url = window.location.href
  var agentID = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    getAgentDetails()
    getAgentListing()
    // getCatagories()
    // getLocations()
    getPropertyList()
    getMetaData()
  }, [])

  // get MetaData list
  const getMetaData = () => {
    let pageId = 5 // AgentDetails
    pageMetaService.getDetails(pageId).then(
      (res) => {
        if (res?.data?.success) {
          if (res?.data?.data.status == 1) {
            setPageMeta(res?.data?.data)
          }
        } else {
          setPageMeta()
        }
      },
      (err) => {
        console.log(err?.response?.data?.message)
      },
    )
  }

  //   get property details
  const getAgentDetails = () => {
    userService.getSystemUserPublicDetails(Number(agentID)).then(
      (res) => {
        if (res?.data?.success) {
          setAgentDetails(res?.data)
        } else {
          setAgentDetails({})
          toast.error(res?.data?.message, { theme: 'dark' })
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  const getAgentListing = () => {
    let data = {
      limit: 10,
      offset: 0,
      user_id: agentID,
    }
    userService.agentWiseProperties(data).then(
      (res) => {
        if (res?.data?.success) {
          setAgentProperties(res?.data)
        } else {
          setAgentProperties({})
          toast.error(res?.data?.message, { theme: 'dark' })
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  // // get property list
  // const getCatagories = () => {
  //   categoriesService.getCategoriesList().then(
  //     (res) => {
  //       if (res?.data?.success) {
  //         setCatagoriesList(res?.data?.data)
  //       } else {
  //         setCatagoriesList([])
  //       }
  //     },
  //     (err) => {
  //       toast.error(err?.response?.data?.message, { theme: 'dark' })
  //     },
  //   )
  // }

  const getPropertyList = () => {
    let data = {
      limit: 10,
      offset: 0,
    }
    propertyService.getActivePropertyList(data).then(
      (res) => {
        if (res?.data?.success) {
          setPropertyList(res?.data?.data.filter((i) => i.is_featured == 1))
          setImgPath(res?.data?.imageResizeFolderPath)
        } else {
          setPropertyList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }

  // // get locations
  // const getLocations = () => {
  //   locationService.getLocationList().then((res) => {
  //     setLocationList(res?.data?.data)
  //   })
  // }
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/150'
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
                <h1 className="breadcrumb_title">
                  {agentDetails?.data?.role_name
                    ? agentDetails?.data?.role_name
                    : 'Agent Details'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="shop_single_tab_content style2 mt30">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="description-tab"
                          data-toggle="tab"
                          href="#description"
                          role="tab"
                          aria-controls="description"
                          aria-selected="true"
                        >
                          {agentDetails?.data?.name
                            ? agentDetails?.data?.name
                            : 'Description'}
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent2">
                      <div
                        className="tab-pane fade show active"
                        id="description"
                        role="tabpanel"
                        aria-labelledby="description-tab"
                      >
                        <div className="product_single_content">
                          <div className="mbp_pagination_comments">
                            <div className="mbp_first media">
                              <div className="media-body">
                                <p className="mb25">
                                  {agentDetails?.data?.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="shop_single_tab_content style2 mt30">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="listing-tab"
                          data-toggle="tab"
                          href="#listing"
                          role="tab"
                          aria-controls="listing"
                          aria-selected="false"
                        >
                          Listing
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent2">
                      <div
                        className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199  show active"
                        id="listing"
                        role="tabpanel"
                        aria-labelledby="listing-tab"
                      >
                        {agentProperties?.data?.length > 0 ? (
                          <AgentDetailsIndex />
                        ) : (
                          <div>
                            <div className="col-lg-12">
                              <div className="text-center feat_property list style2 hvr-bxshd bdrrn pt-5">
                                <h4>No Property Listed !</h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-xl-4">
              <div className="feat_property agent">
                <div className="thumb">
                  <img
                    className="img-whp"
                    src={
                      agentDetails?.image_folder_path +
                      '/' +
                      agentDetails?.data?.profile_image
                    }
                    onError={handleImageError}
                    alt="11.jpg"
                  />
                  <div className="thmb_cntnt">
                    <ul className="tag mb0">
                      <li className="list-inline-item dn"></li>
                      <li className="list-inline-item">
                        <a href="#">{agentProperties?.count} Listings</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="details">
                  <div className="tc_content">
                    <h4>{agentDetails?.data?.name}</h4>
                    <p className="text-thm">{agentDetails?.data?.role_name}</p>
                  </div>
                </div>
              </div>
              <div className="sidebar_listing_grid1">
                {/* <FeatureList
                  handleImageError={handleImageError}
                  imagePath={imagePath}
                  propertyList={propertyList}
                /> */}
                <ListingFeature
                  data={propertyList}
                  imageFolderPath={imagePath}
                  isAgentDetails={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AgentDetail
