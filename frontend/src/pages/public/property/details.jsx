import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import propertyService from '../../../services/property.service'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import inqueryService from '../../../services/inquery.service'
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import services from '../../../services/services.service'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import bannerService from '../../../services/banner.service'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropertyCard from '../../../common/propertyCard'
import PropertyDetailAd from '../../../common/public/banner/propertyDetailAd'
import Swal from 'sweetalert2'
import TopBanner from '../../../common/public/banner/topBanner'
import RightBanner from '../../../common/public/banner/rightBanner'
import userService from '../../../services/user.service'
import LoginModal from '../../../common/LoginModal'

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]
function PropertyDetails() {
  const [propertyDetails, setPropertyDetails] = useState({})
  const [directionID, setDirectionID] = useState()
  const [bannerActiveList, setBannerList] = useState([])
  const [rightBannerList, setRightBanner] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [bannerImagePath, setBannerImgPath] = useState('')
  const [inqueryData, setInqueryData] = useState({})
  const [catagoriesList, setCatagoriesList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [similarPropertyList, setSimilarPropertyList] = useState([])
  const [propertyImage, setPropertyImage] = useState(images)
  const [imagePathResize, setImgPathResize] = useState('')
  const [selectedCatagory, setSelectedCatagory] = useState(1)
  const [locationList, setLocationList] = useState([])
  // const [serviceList, setServiceList] = useState([]);
  const [serviceImgPath, setServiceImgPath] = useState('')
  const [loading, setLoading] = useState(false)

  const url = window.location.href
  var propertyID = url.substring(url.lastIndexOf('/') + 1)
  const isLogin = JSON.parse(localStorage?.getItem('user'))
  const [isLoginModalVisible, setLoginModalVissible] = useState(false)

  const handleOpenLoginModal = () => {
    setLoginModalVissible(true)
  }

  const handleCloseLoginModal = () => {
    setLoginModalVissible(false)
  }
  useEffect(() => {
    // console.log("id", propertyID);
    if (localStorage?.getItem('direction_id')) {
      let dID = localStorage?.getItem('direction_id')
      setDirectionID(dID)
      getPropertDetails(dID)
    } else {
      setDirectionID(uuidv4())
      localStorage.setItem('direction_id', uuidv4())
      getPropertDetails(propertyID)
    }
    getLocations()
    // getPropertyList()
    getSimilarPropertyList()
    getCatagories()
    getBannerActiveList()
    getAndSetUserInfo()
    // getServiceList();
  }, [])

  const getAndSetUserInfo = () => {
    let user = localStorage.getItem('user')

    let tempData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      details: '',
    }

    if (user) {
      user = JSON.parse(user)

      tempData = {
        name: user.profile.name,
        email: user.email,
        phone: user.profile.phone,
        address: user.profile?.address,
        details: '',
      }
    }

    setInqueryData(tempData)
  }

  // get active banner list
  const getBannerActiveList = () => {
    bannerService.getActiveList().then(
      (res) => {
        if (res?.data?.success) {
          setBannerList(
            res?.data?.data
              ?.map((e) => e?.banner_type === 3 && e)
              .filter(Boolean),
          )
          setRightBanner(
            res?.data?.data
              ?.map((e) => e?.banner_type === 2 && e)
              .filter(Boolean),
          )
          setBannerImgPath(res?.data?.imageFolderPath)
        } else {
          setBannerList([])
          setRightBanner([])
          setBannerImgPath('')
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
      },
    )
  }

  //   get property details
  const getPropertDetails = () => {
    if (isLogin) {
      propertyService.propertyDetailsUser(Number(propertyID)).then(
        (res) => {
          if (res?.data?.success) {
            setPropertyDetails(res?.data)
            setPropertyImage(
              res?.data?.data?.property_image?.map((image, index) => {
                return {
                  original: res?.data?.imageFolderPath + '/' + image.name,
                  thumbnail:
                    res?.data?.imageResizeFolderPath + '/' + image.name,
                }
              }),
            )
          } else {
            setPropertyDetails({})
            toast.error(res?.data?.message, { theme: 'dark' })
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
    } else {
      propertyService.propertyDetailsPublic(Number(propertyID)).then(
        (res) => {
          if (res?.data?.success) {
            setPropertyDetails(res?.data)
            setPropertyImage(
              res?.data?.data?.property_image?.map((image, index) => {
                return {
                  original: res?.data?.imageFolderPath + '/' + image.name,
                  thumbnail:
                    res?.data?.imageResizeFolderPath + '/' + image.name,
                }
              }),
            )
          } else {
            setPropertyDetails({})
            toast.error(res?.data?.message, { theme: 'dark' })
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
    }
  }

  // const getPropertyList = () => {
  //   let data = {
  //     limit: 10,
  //     offset: 0,
  //   }
  //   propertyService.getActivePropertyList(data).then(
  //     (res) => {
  //       if (res?.data?.success) {
  //         setPropertyList(
  //           res?.data?.data
  //             ?.map((i) => i.is_featured === 1 && i)
  //             .filter(Boolean),
  //         )
  //         setImgPath(res?.data?.imageResizeFolderPath)
  //       } else {
  //         setPropertyList([])
  //       }
  //     },
  //     (err) => {
  //       toast.error(err?.response?.data?.message, { theme: 'dark' })
  //     },
  //   )
  // }

  const getSimilarPropertyList = () => {
    let data = {
      id: Number(propertyID),
    }
    propertyService.getSimilarPropertyList(data).then(
      (res) => {
        if (res?.data?.success) {
          setPropertyList(
            res?.data?.data
              ?.map((i) => i.is_featured === 1 && i)
              .filter(Boolean),
          )
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

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/150'
  }

  // get property list
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
  // const getServiceList = () => {
  //   services.getActiveServiceList().then((res) => {
  //     setServiceList(res?.data?.data);
  //     setServiceImgPath(res?.data?.imageFolderPath);
  //   });
  // };
  // make favorite
  const makeFavoriteProperty = (id) => {
    propertyService.makeFavourite(id).then(
      (res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message)
          // getPropertyList(selectedCatagory)
        } else {
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
      },
    )
  }
  // send inquery
  const onSubmitInquery = () => {
    if (!inqueryData?.name) {
      toast.error('Name is required', {
        theme: 'dark',
      })
    } else if (!inqueryData?.email) {
      toast.error('Email is required', {
        theme: 'dark',
      })
    } else if (!inqueryData?.phone) {
      toast.error('Phone is required', {
        theme: 'dark',
      })
    } else {
      let data = {
        // id: id,
        property_id: propertyID,
        name: inqueryData?.name,
        phone: inqueryData?.phone,
        email: inqueryData?.email,
        address: inqueryData?.address,
        details: inqueryData?.details,
      }
      inqueryService.submitInquery(data).then(
        (res) => {
          if (res.data.success) {
            toast.success(res.data.message, {
              theme: 'dark',
            })

            // redirect
            window.location.replace('/auth/submitted-inqueries')
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
      <Helmet>
        <title>{propertyDetails?.data?.property_name}</title>


        <meta name="keywords" content={propertyDetails?.data?.meta_tag} />
        <link rel="canonical" href={propertyDetails?.data?.meta_canonical_url} />

        <meta
          name="description"
          content={`${
            propertyDetails?.data?.property_name
          }.  Find your dream home in
          ${propertyDetails?.data?.address}! This stunning. Buy
          ${catagoriesList
            ?.filter((d) => d?.id == propertyDetails?.data?.category)
            .map((i) => i?.title.toString().toLowerCase())} in ${
            propertyDetails?.data?.address
          }, ${locationList
            ?.map((l) => l?.id === propertyDetails?.data?.area && l?.title)
            .filter(Boolean)} - estatemartbd.com`}
        />
        <meta
          property="og:description"
          content={`${
            propertyDetails?.data?.property_name
          }.  Find your dream home in
          ${propertyDetails?.data?.address}! This stunning. Buy
          ${catagoriesList
            ?.filter((d) => d?.id == propertyDetails?.data?.category)
            .map((i) => i?.title.toString().toLowerCase())} in ${
            propertyDetails?.data?.address
          }, ${locationList
            ?.map((l) => l?.id === propertyDetails?.data?.area && l?.title)
            .filter(Boolean)} - estatemartbd.com`}
        />
      </Helmet>
      {/* slider */}
      <section className="p0 allAdds mb-5">
        <div className="container p0">
          <div className="home8-slider vh-100">
            <PropertyDetailAd
              bannerImgPath={bannerImagePath}
              bannerData={bannerActiveList?.filter(
                (e) => e?.banner_type === 3 && e,
              )}
            />
          </div>
        </div>
      </section>

      <section className="listing-title-area pb-0">
        <div className="container">
          <div className="row mb30">
            <div className="col-lg-7 col-xl-8">
              <div className="single_property_title mt30-767">
                <h2>{propertyDetails?.data?.property_name}</h2>
                <p>
                  {propertyDetails?.data?.address}
                  {' , '}
                  {locationList
                    ?.map(
                      (l) => l?.id === propertyDetails?.data?.area && l?.title,
                    )
                    .filter(Boolean)}
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="single_property_social_share">
                <div className="price float-right fn-400">
                  <h2>
                    {propertyDetails?.data?.total_price
                      ? propertyDetails?.data?.total_price + ' BDT'
                      : '0 BDT'}{' '}
                    {propertyDetails?.data?.purpose === 2 && <small>/mo</small>}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-7 col-lg-8">
              <div className="row">
                <div className="col-lg-12">
                  <div className="spls_style_two mb30-520">
                    <ImageGallery
                      items={propertyImage}
                      onErrorImageURL={'https://via.placeholder.com/500'}
                      showFullscreenButton={false}
                      showNav={false}
                      showPlayButton={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-5 col-lg-4">
              <div className="sidebar_listing_list">
                <div className="sidebar_advanced_search_widget">
                  <div className="sl_creator">
                    <h4 className="mb25">Listed By</h4>
                    <div className="media">
                      {/* <a className="text-thm" href={'/property-details/' + propertyDetails?.id}> */}
                      <img
                        className="mr-3 agent_image"
                        src={
                          propertyDetails?.data?.post_owner_info
                            ?.image_folder_path +
                          '/' +
                          propertyDetails?.data?.post_owner_info?.profile_image
                        }
                        alt="profilePhoto"
                        onError={handleImageError}
                        style={{ borderRadius: '50%' }}
                      />
                      {/* </a> */}
                      <div className="media-body agent-body">
                        {/* <a className="text-thm" href={'/property-details/' + propertyDetails?.id}> */}
                        <h5 className="mt-0 mb0">
                          {propertyDetails?.data?.post_owner_info?.name}
                        </h5>
                        {/* </a> */}
                        <Link
                          className="text-thm"
                          to={
                            '/agent-detail/' +
                            propertyDetails?.data?.post_owner_id
                          }
                        >
                          View My Listing
                        </Link>
                      </div>
                    </div>
                    {isLogin ? (
                      <p className="d-flex justify-content-center mt-5">
                        <button
                          type="button"
                          className="btn dbxshad btn-sm btn-thm circle white"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          Get Contact Information
                        </button>
                      </p>
                    ) : (
                      <p className="d-flex justify-content-center mt-5">
                        <button
                          type="button"
                          className="btn dbxshad btn-sm btn-thm circle white"
                          // data-toggle="modal"
                          // data-target="#exampleModalCenter"
                          onClick={handleOpenLoginModal}
                        >
                          Get Contact Information
                        </button>
                      </p>
                    )}
                  </div>
                  <div
                    className="sign_up_modal modal fade bd-example-modal-lg"
                    id="exampleModalCenter"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="sasw_list mb0">
                            <li className="search_area">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputName1"
                                  placeholder="Name"
                                  value={inqueryData.name}
                                  onChange={(e) =>
                                    setInqueryData({
                                      ...inqueryData,
                                      name: e?.target?.value,
                                    })
                                  }
                                />
                              </div>
                            </li>

                            <li className="search_area">
                              <div className="form-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="exampleInputName2"
                                  placeholder="Phone"
                                  value={inqueryData.phone}
                                  onChange={(e) =>
                                    setInqueryData({
                                      ...inqueryData,
                                      phone: e?.target?.value,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li className="search_area">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputEmail"
                                  placeholder="Email"
                                  value={inqueryData.email}
                                  onChange={(e) =>
                                    setInqueryData({
                                      ...inqueryData,
                                      email: e?.target?.value,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li className="search_area">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputAddress"
                                  placeholder="Address"
                                  value={inqueryData.address}
                                  onChange={(e) =>
                                    setInqueryData({
                                      ...inqueryData,
                                      address: e?.target?.value,
                                    })
                                  }
                                />
                              </div>
                            </li>
                            <li className="search_area">
                              <div className="form-group">
                                <textarea
                                  id="form_message"
                                  name="form_message"
                                  className="form-control required"
                                  rows="5"
                                  required="required"
                                  value={inqueryData.details}
                                  placeholder="I'm interest in this product"
                                  onChange={(e) =>
                                    setInqueryData({
                                      ...inqueryData,
                                      details: e?.target?.value,
                                    })
                                  }
                                ></textarea>
                              </div>
                            </li>
                            <li>
                              <div className="search_option_button">
                                <button
                                  type="button"
                                  onClick={onSubmitInquery}
                                  className="btn btn-block btn-thm"
                                >
                                  Send Message
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="sticky_heading h60 p0">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="sticky-nav-tabs">
                <ul className="sticky-nav-tabs-container">
                  <li className="list-inline-item nav-item active">
                    <a className="sticky-nav-tab" href="#tab-1">
                      Details
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="sticky-nav-tab" href="#tab-2">
                      Features
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="sticky-nav-tab" href="#tab-3">
                      Locations
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="sticky-nav-tab" href="#tab-4">
                      Plans
                    </a>
                  </li>
                  <li className="list-inline-item nav-item">
                    <a className="sticky-nav-tab" href="#tab-5">
                      Video
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="our-listing-single bgc-f7 pb30-991 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8 mt35">
              <div className="row">
                <div className="col-lg-12">
                  <div className="additional_details">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4 className="mb15">Property Details</h4>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-4">
                        <ul className="list-inline-item">
                          <li>
                            <p>City :</p>
                          </li>
                          <li>
                            <p>Bedrooms :</p>
                          </li>
                          <li>
                            <p>Property Size :</p>
                          </li>
                        </ul>
                        <ul className="list-inline-item">
                          <li>
                            <p>
                              <span>
                                {locationList
                                  ?.map(
                                    (l) =>
                                      l?.id === propertyDetails?.data?.area &&
                                      l?.title,
                                  )
                                  .filter(Boolean)}
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span>{propertyDetails?.data?.bedroom}</span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span>{propertyDetails?.data?.size} Sq Ft</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-4">
                        <ul className="list-inline-item">
                          <li>
                            <p>Floor: </p>
                          </li>
                          <li>
                            <p>Bathroom :</p>
                          </li>
                          <li>
                            <p>Total Price :</p>
                          </li>
                        </ul>
                        <ul className="list-inline-item">
                          <li>
                            <p>
                              <span>{propertyDetails?.data?.floor}</span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span>{propertyDetails?.data?.bathroom}</span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span>
                                {propertyDetails?.data?.total_price
                                  ? propertyDetails?.data?.total_price + ' BDT'
                                  : '0 BDT'}{' '}
                                {propertyDetails?.data?.purpose === 2 && (
                                  <small>/mo</small>
                                )}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-4">
                        <ul className="list-inline-item">
                          <li>
                            <p>Property Type :</p>
                          </li>
                          <li>
                            <p>Property Status :</p>
                          </li>
                        </ul>
                        <ul className="list-inline-item">
                          <li>
                            <p>
                              <span>
                                {catagoriesList?.map(
                                  (d) =>
                                    d?.id === propertyDetails?.data?.category &&
                                    d?.title,
                                )}
                              </span>
                            </p>
                          </li>
                          <li>
                            <p>
                              <span>
                                {propertyDetails?.data?.purpose === 1 ? (
                                  <div>For Sale</div>
                                ) : (
                                  <div>For Rent</div>
                                )}
                              </span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {propertyDetails?.data?.description && (
                  <div id="tab-1" className="col-lg-12">
                    <div className="listing_single_description">
                      {/* <div className="lsd_list">
                      <ul className="mb0">
                        <li className="list-inline-item">
                          {catagoriesList?.map(
                            (d) =>
                              d?.id === propertyDetails?.data?.category &&
                              d?.title
                          )}
                        </li>
                        <li className="list-inline-item">
                          <img
                            alt=""
                            src="images/resource/bedroom_icon.png"
                            className="mr-2"
                          />
                          Beds: {propertyDetails?.data?.bedroom}
                        </li>
                        <li className="list-inline-item">
                          <img
                            alt=""
                            src="images/resource/bathroom_icon.png"
                            className="mr-2"
                          />
                          Baths: {propertyDetails?.data?.bathroom}
                        </li>
                        <li className="list-inline-item">
                          <img
                            alt=""
                            src="images/resource/katha.svg"
                            className="mr-2"
                            style={{ width: "25px" }}
                          />
                          <a href="#">Sq Ft: {propertyDetails?.data?.size}</a>
                        </li>
                      </ul>
                    </div> */}
                      <h4 className="mb30">Description</h4>
                      <div
                        className="mb25"
                        dangerouslySetInnerHTML={{
                          __html: propertyDetails?.data?.description,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                {(propertyDetails?.data?.indoor_amenities?.length > 0 ||
                  propertyDetails?.data?.outdoor_amenities?.length > 0) && (
                  <div id="tab-2" className="col-lg-12">
                    <div className="application_statics mt30">
                      {propertyDetails?.data?.indoor_amenities?.length > 0 && (
                        <div className="row">
                          <div className="col-lg-12">
                            <h4 className="mb10">Indoor Features</h4>
                          </div>

                          {propertyDetails?.data?.indoor_amenities?.map(
                            (item, index) => {
                              return (
                                <>
                                  <div className="col-sm-6 col-md-6 col-lg-4">
                                    <ul className="order_list list-inline-item">
                                      <li key={index}>
                                        <a href="#">
                                          <span className="flaticon-tick"></span>
                                          {item?.title}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              )
                            },
                          )}
                        </div>
                      )}
                      {propertyDetails?.data?.outdoor_amenities?.length > 0 && (
                        <div className="row">
                          <div className="col-lg-12">
                            <h4 className="mb10">Outdoor Features</h4>
                          </div>

                          {propertyDetails?.data?.outdoor_amenities?.map(
                            (item, index) => {
                              return (
                                <>
                                  <div className="col-sm-6 col-md-6 col-lg-4">
                                    <ul className="order_list list-inline-item">
                                      <li key={index}>
                                        <a href="#">
                                          <span className="flaticon-tick"></span>
                                          {item?.title}
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              )
                            },
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {propertyDetails?.data?.floor_image.length > 0 && (
                  <div className="col-lg-12">
                    <div id="tab-4" className="application_statics mt30">
                      <h4 className="mb30">Floor plans</h4>
                      <div className="faq_according style2">
                        <div className="accordion" id="accordionExample">
                          <div className="card floor_plan">
                            <div
                              id="collapseOne"
                              className="collapse show"
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                              // style=""
                            >
                              <div className="card-body text-center">
                                <img
                                  className="img-fluid"
                                  src={
                                    propertyDetails?.imageFolderPath +
                                    '/' +
                                    propertyDetails?.data?.floor_image[0]?.name
                                  }
                                  alt="floor_plan.png"
                                  onError={handleImageError}
                                  style={{ height: 250 }}
                                />
                                {/* <p>
                                Plan description. Lorem ipsum dolor sit amet,
                                consectetuer adipiscing elit, sed diam nonummy
                                nibh euismod tincidunt ut laoreet dolore magna
                                aliquam erat volutpat. Ut wisi enim ad minim
                                veniam, quis nostrud exerci tation ullamcorper
                                suscipit lobortis nisl ut aliquip ex ea commodo
                                consequat.
                              </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {rightBannerList?.length > 0 && (
              <div
                className="sticky-ad-tabs col-lg-4 border-0 px-0 mt-4 shadow-none"
                id="new"
              >
                <div
                  className="col-12 sticky-ad-tabs-container"
                  style={{ top: '1rem' }}
                  // style={{ position: 'static' }}
                >
                  <div className="sidebar_listing_grid1 dn-991">
                    <div className="terms_condition_widget">
                      <div className="sidebar_feature_property_slider owl-carousel owl-theme owl-loaded">
                        <RightBanner
                          bannerData={rightBannerList}
                          bannerImgPath={bannerImagePath}
                        />
                        {/* <TopBanner
                                bannerImgPath={bannerImagePath}
                                bannerData={bannerActiveList?.filter(
                                  (e) => e?.banner_type === 2 && e,
                                )}
                              /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {propertyList.length > 0 && (
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mt30 mb30">Similar Properties</h4>
              </div>
              {propertyList?.map((e) => (
                <div className="col-md-6 col-lg-4">
                  <div className="item" key={e?.id}>
                    <PropertyCard
                      id={e?.id}
                      total_price={e?.total_price}
                      is_featured={e?.is_featured}
                      purpose={e?.purpose}
                      create_at={e?.create_at}
                      property_name={e?.property_name}
                      locationList={locationList}
                      area={e?.area}
                      bedroom={e?.bedroom}
                      bathroom={e?.bathroom}
                      catagoriesList={catagoriesList}
                      category={e?.category}
                      imagePath={imagePath}
                      property_image={e?.property_image}
                      is_favourite={e?.is_favourite}
                      makeFavoriteProperty={makeFavoriteProperty}
                      canUpdateFavorite={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="row col-lg-12 mt30"> </div>
        <LoginModal
          handleCloseLoginModal={handleCloseLoginModal}
          isLoginModalVisible={isLoginModalVisible}
        />
      </section>
    </>
  )
}

export default PropertyDetails
