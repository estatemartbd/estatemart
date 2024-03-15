import React from "react";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from "react";
import { useEffect } from "react";
import propertyService from "../../../services/property.service";
import { toast } from "react-toastify";
import categoriesService from "../../../services/categories.service";
import locationService from "../../../services/location.service";
import services from "../../../services/services.service";
import moment from "moment";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PropertyCard from "../../../common/propertyCard";
import MainSearch from "../../../common/public/MainSearch";
import HomeMainBanner from "../../../common/public/banner/homeMainBanner";
import bannerService from "../../../services/banner.service";
import pageMetaService from "../../../services/pageMetaService";

const HomePage = () => {
  const [catagoriesList, setCatagoriesList] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [imagePath, setImgPath] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState(1);
  const [locationList, setLocationList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceImgPath, setServiceImgPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [bannerImagePath, setBannerImgPath] = useState("");
  const [bannerActiveList, setBannerList] = useState([]);
  const [pageMeta, setPageMeta] = useState();
  const [preLoading, setPreloading] = useState(true);

  const isLogin = JSON.parse(localStorage?.getItem("user"));
  // get property list
  const getPropertyList = async (id) => {
    let data = {
      limit: 6,
      offset: 0,
      category: id ? id : 1,
    };
    setSelectedCatagory(id);
    if (!isLogin) {
      await categoriesService.getPropertyByCategory(data).then(
        (res) => {
          if (res?.data?.success) {
            setPropertyList(res?.data?.data);
            setImgPath(res?.data?.imageFolderPath);
          } else {
            setPropertyList([]);
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: "dark" });
        }
      );
    } else {
      await categoriesService.getPropertyByCategoryUser(data).then(
        (res) => {
          if (res?.data?.success) {
            setPropertyList(res?.data?.data);
            setImgPath(res?.data?.imageFolderPath);
          } else {
            setPropertyList([]);
          }
        },
        (err) => {
          toast.error(err?.response?.data?.message, { theme: "dark" });
        }
      );
    }
  };

  useEffect(() => {
    let uuid = uuidv4();
    localStorage.setItem("directions_id", uuid);
    localStorage.removeItem("searchData");
    getLocations();
    getCatagories();
    getPropertyList(selectedCatagory);
    getServiceList();
    getBannerFrontendList();
    getMetaData();
    // console.log(uuidv4())
  }, [preLoading]);

  // get active banner list
  const getBannerFrontendList = async () => {
    await bannerService.getBannerFrontendList({ "banner_type": 4 }).then(
      (res) => {
        if (res?.data?.success) {
          setBannerList(
            res?.data?.data
              ?.map((e) => e?.banner_type === 4 && e)
              .filter(Boolean)
          );

          setBannerImgPath(res?.data?.imageFolderPath);
          setPreloading(false);
        } else {
          // setBannerList([]);
          setBannerImgPath("");
          setPreloading(false);
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message);
      }
    );
  };



  // get property list
  const getCatagories = async () => {
    await categoriesService.getCategoriesList().then(
      (res) => {
        if (res?.data?.success) {
          setCatagoriesList(res?.data?.data);
        } else {
          setCatagoriesList([]);
        }
      },
      (err) => {
        console.log(err?.response?.data?.message);
      }
    );
  };
  // get MetaData list
  const getMetaData = async () => {
    let pageId = 1; // home
    await pageMetaService.getDetails(pageId).then(
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

  // on catagory select
  const selectCatagory = async (id) => {
    await getPropertyList(id);
  };

  // get locations
  const getLocations = async () => {
    await locationService.getLocationList().then((res) => {
      setLocationList(res?.data?.data);
    });
  };

  // get services
  const getServiceList = async () => {
    await services.getActiveServiceList().then((res) => {
      setServiceList(res?.data?.data);
      setServiceImgPath(res?.data?.imageFolderPath);
    });
  };

  // make favorite
  const makeFavoriteProperty = async (id) => {
    await propertyService.makeFavourite(id).then(
      (res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          getPropertyList(selectedCatagory);
        } else {
          toast.info(res?.data?.message);
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message);
      }
    );
  };

  // console.log('preloading',preLoading);
  // console.log('page data', pageMeta?.meta_title);
  console.log('selectedCatagory', selectedCatagory);
  return (
    <>
      <Helmet>
        <title>{pageMeta?.meta_title}</title>
        <meta name="description" content={pageMeta?.meta_description} />
        <meta property="og:description" content={pageMeta?.meta_description} />
        <meta name="keywords" content={pageMeta?.meta_tag} />
        <link rel="canonical" href={pageMeta?.meta_canonical_url} />
      </Helmet>
      <div>
        {preLoading && <div className="preloader"></div>}

        {/* <!-- 4th Home Slider --> */}
        <div className="home-four">
          <div className="container-fluid p0">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-banner-wrapper">

                  <HomeMainBanner
                    bannerImgPath={bannerImagePath}
                    bannerData={bannerActiveList?.filter(
                      (e) => e?.banner_type === 4 && e
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container home_iconbox_container">
            <MainSearch setPropertyList={setPropertyList} setSelectedCatagory={setSelectedCatagory}/>
          </div>
        </div>

        {/* <!-- Apartment Properties For Sell --> */}
        <section
          id="feature-property"
          className="feature-property-home6 home-tab"
        >
          <div className="container">
            <div className="shortcode_widget_tab">
              {/* <!-- <h4>Tabs</h4> --> */}
              <div className="ui_kit_tab mt30" id="myTAB">
                {/* <!-- Nav tabs --> */}
                <ul className="nav nav-tabs" id="myTab2" role="tablist">
                  {catagoriesList?.map(
                    (e) =>
                      e?.status === 1 && (
                        <li className="nav-item col" key={e?.id}>
                          <a
                            key={e?.id}
                            onClick={() => selectCatagory(e?.id)}
                            className={`nav-link ${e?.id === selectedCatagory ? "active" : ""
                              }`}
                            data-toggle="tab"
                            href={`#item-tab-${e?.id}`}
                          >
                            {e?.id === 6 ? e?.title : e?.title}
                          </a>
                        </li>
                      )
                  )}
                </ul>
                {/* <!-- Tab panes --> */}
                {/* {propertyListActive?.length !== 0 &&
                  (e?.category === selectedCatagory ? 'active' : '')} */}
                <div>
                  {/* {propertyListActive?.map((e) => ( */}
                  <div
                    // id={`item-tab-${e?.category}`}
                    className={`container tab-pane active`}
                  // key={e?.id}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        {propertyList?.length > 0 ? (
                          <div className="main-title mb40 mt-4">
                            <h2>
                              {catagoriesList?.map(
                                (d) => d?.id === selectedCatagory && d?.title
                              )}
                            </h2>
                            <p>
                              {catagoriesList?.map(
                                (d) => d?.id === selectedCatagory && d?.sub_title
                              )} .{" "}
                              {propertyList?.length >= 6 && (
                                <a className="float-right" href="all-ads">
                                  View All{" "}
                                  <span className="flaticon-next"></span>
                                </a>
                              )}
                            </p>
                          </div>
                        ) : (
                          <div className="main-title mb40 mt-4">
                            <h2>
                              Currently there are no properties available for {catagoriesList?.map(
                                (d) => d?.id === selectedCatagory && d?.title
                              )} category
                            </h2>
                            <p>Please find another category...</p>
                          </div>
                        )}
                      </div>

                      <div className="d-lg-flex flex-wrap w-100">
                          {propertyList?.map((e) => (
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
                          ))}
                        </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SERVICE */}
        <section id="comfort-place" className="comfort-place pb30 bb1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="main-title text-center">
                  <h2>Service You Need</h2>
                  <p>Explore Features</p>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              {serviceList?.map((e) => (
                <div className="col-6 col-lg-3" key={e?.id}>
                  <Link to={"/service-details/" + e?.id}>
                    <div
                      className="icon_hvr_img_box"
                      style={{
                        backgroundImage: `url(${serviceImgPath + "/" + e?.image
                          })`,
                      }}
                    >
                      <div className="overlay">
                        <div className="icon">
                          <span className="flaticon-house"></span>
                        </div>
                        <div className="details mx-2">
                          <h4 className="text-capitalize">
                            {e?.title || "Service name missing"}
                          </h4>
                          <p>{e?.short_description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
