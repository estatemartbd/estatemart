/* eslint-disable no-unused-vars */
import React from 'react'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { useEffect } from 'react'
import propertyService from '../../../services/property.service'
import { toast } from 'react-toastify'
import categoriesService from '../../../services/categories.service'
import locationService from '../../../services/location.service'
import services from '../../../services/services.service'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import bannerService from '../../../services/banner.service'
import TopBanner from '../../../common/public/banner/topBanner'
import RightBanner from '../../../common/public/banner/rightBanner'
import MainSearch from '../../../common/public/MainSearch'
import PropertyCard from '../../../common/propertyCard'
import pageMetaService from '../../../services/pageMetaService'
import ListingPostCard from '../../../common/public/ListingPostCard'
import VerticalPropertyCard from '../../../common/VerticalPropertyCard'

function AllAds() {
  const [selectedTab, setSelectedTab] = useState(1)
  const [catagoriesList, setCatagoriesList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [bannerActiveList, setBannerList] = useState([])
  const [rightBannerList, setRightBanner] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [bannerImagePath, setBannerImgPath] = useState('')
  const [selectedCatagory, setSelectedCatagory] = useState(1)
  const [locationList, setLocationList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [serviceImgPath, setServiceImgPath] = useState('')
  const [loading, setLoading] = useState(false)
  // Search state
  const [searchTitle, setSearchTitle] = useState()
  const [categoryId, setCategoryId] = useState()
  const [categoriesData, setCategoryData] = useState()
  const [parentLocationData, setParentLocationData] = useState()

  const [searchClear, setSearchClear] = useState(false)
  const [pageMeta, setPageMeta] = useState()

  // make favorite
  const makeFavoriteProperty = async (id) => {
    await propertyService.makeFavourite(id).then(
      (res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message)
          getPropertyList(selectedCatagory)
        } else {
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message)
      },
    )
  }
  // search states
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    getLocations()
    getCatagories()
    getPropertyList()
    getServiceList()
    getBannerActiveList()
  }, [])

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
  // get property list
  const getPropertyList = () => {
    let data = {
      limit: 10,
      offset: 0,
    }
    propertyService.getActivePropertyList(data).then(
      (res) => {
        if (res?.data?.success) {
          let arr = [...res?.data?.data]
          setPropertyList(arr)
          setImgPath(res?.data?.imageResizeFolderPath)
          setOffset(offset + 10)
        } else {
          setPropertyList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }

  // get property list
  const getCatagories = () => {
    categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data)
          let filterData = res?.data?.data
          setCategoryData(
            filterData.map((e) => {
              return {
                ...e,
                value: e.id,
                label: e.title,
              }
            }),
          )
        } else {
          setCatagoriesList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }
  // make favorite

  // get locations
  const getLocations = () => {
    locationService.getLocationList().then((res) => {
      setLocationList(res?.data?.data)
      let filterData = res?.data?.data
      setParentLocationData(
        filterData.map((e) => {
          return {
            ...e,
            value: e.id,
            label: e.title,
          }
        }),
      )
    })
  }

  // get services
  const getServiceList = () => {
    services.getActiveServiceList().then((res) => {
      setServiceList(res?.data?.data)
      setServiceImgPath(res?.data?.imageFolderPath)
    })
  }

  const handleLoadMore = () => {
    let data = {
      limit: 10,
      offset: offset,
      category: categoryId,
    }
    propertyService
      .getActivePropertyList(data)
      .then(
        (res) => {
          if (res?.data?.success) {
            setOffset(offset + 10)
            setSearchClear(true)
            let arr = [...propertyList, ...res?.data?.data]
            console.log('arr', arr)
            setPropertyList(arr)
            setImgPath(res?.data?.imageResizeFolderPath)
          } else {
            setPropertyList([])
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: 'dark' })
        },
      )
      .catch((error) => {
        console.log(error)
      })
  }


  // get MetaData list
  const getMetaData = () => {
    let pageId = 2 // home
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
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
  }

  // console.log('page data', pageMeta?.meta_title)
  // console.log('propertyList==', propertyList)
  return (
    <>
      <Helmet>
      <title>{pageMeta?.meta_title}</title>
        <meta name="description" content={pageMeta?.meta_description} />
        <meta property="og:description" content={pageMeta?.meta_description} />
        <meta name="keywords" content={pageMeta?.meta_tag} />
        <link rel="canonical" href={pageMeta?.meta_canonical_url} />
      </Helmet>
      {/* Slider */}

      <TopBanner
        bannerImgPath={bannerImagePath}
        bannerData={bannerActiveList?.filter((e) => e?.banner_type === 3 && e)}
      />
      {/* Search */}
      <section
        className="adSearch parallax pt30-520 home-four4"
        data-stellar-background-ratio="0.2"
        style={{
          backgroundColor: '#f7f7f7',
          backgroundPosition: '50% -121.44px',
        }}
      >
        <div className="container">
          <MainSearch setPropertyList={setPropertyList} setSelectedCatagory={setSelectedCatagory}/>
        </div>
      </section>

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">All ADS</h1>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            {/* Property Data */}
            <div className="col-md-12 col-lg-8">
              <div className="row">
                <div className="grid_list_search_result">
                  <div className="col-sm-12 col-md-4 col-lg-4 col-xl-5">
                    <div className="left_area tac-xsd">
                      <p>{propertyList?.length} Search results</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="listView">
                <div className="row">
                  {/* {propertyList?.map((e) => (
                    <div className="col-md-12 col-lg-12" key={e?.id}>
                      <ListingPostCard
                        data={propertyList}
                        item={e}
                        location={locationList
                          ?.map((l) => l?.id === e?.area && l?.title)
                          .filter(Boolean)}
                        category={catagoriesList?.map(
                          (d) => d?.id === e?.category && d?.title,
                        )}
                        imagePath={imagePath}
                      />
                    </div>
                  ))} */}

                  {propertyList?.length > 0 && (
                    <div className="col-12">
                      {propertyList?.map((e) => (
                        <div className="item" key={e?.id}>
                          <VerticalPropertyCard
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
                      ))}
                    </div>
                  )}
                </div>
                <div className="row" style={{ justifyContent: 'center' }}>
                  {propertyList?.length > 10 && (
                    <button
                      type="button"
                      className="btn btn-thm3"
                      onClick={handleLoadMore}
                      style={{ padding: '1rem 2rem', fontSize: 'large' }}
                    >
                      Load More
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side Adv */}
            <div className="col-lg-4 col-xl-4">
              {rightBannerList?.length > 0 && (
                <div className="sticky-ad-tabs" id="new">
                  <div className="col-12 sticky-ad-tabs-container">
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
          </div>
        </div>
      </section>
    </>
  )
}

export default AllAds
