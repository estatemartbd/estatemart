import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import blogsService from '../../../services/blogs.service'
import moment from 'moment'
import ListingFeature from '../../../common/public/listingFeature'
import propertyService from '../../../services/property.service'

function ArticlePage() {
  const [articleList, setArticleList] = useState([])
  const [imagePath, setImgPath] = useState('')
  const [featureList, setFeatureList] = useState([])
  const [featureImgPath, setFeatureImgPath] = useState('')
  // get property list
  const getArticleList = () => {
    let data = {
      // limit: 6,
      // offset: 0,
      // type: 1,
    }
    blogsService.getActiveBlogsList(data).then(
      (res) => {
        if (res?.data?.success) {
          setArticleList(res?.data?.data)
          setImgPath(res?.data?.imageFolderPath)
        } else {
          setArticleList([])
        }
      },
      (err) => {
        toast.error(err?.response?.data?.message, { theme: 'dark' })
      },
    )
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

  // init
  useEffect(() => {
    getArticleList()
    getFeatureList()
  }, [])

  // render
  return (
    <>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">All Articles</h1>
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
                {articleList?.map((i, index) => (
                  <div className="col-lg-6" key={index}>
                    <Link to={`/article/details/${i?.id}`}>
                      <div className="feat_property home7 agent">
                        <div className="thumb">
                          <img
                            style={{ height: 340 }}
                            className="img-whp"
                            src={
                              imagePath + '/' + i?.image || 'images/blog/1.jpg'
                            }
                            // src="images/blog/1.jpg"
                            alt="1.jpg"
                          />
                          {/* <div className="blog_tag m-2">Construction</div> */}
                        </div>
                        <div className="thmb_cntnt">
                          <div className="tc_content px-3">
                            <h4>{i?.title}</h4>

                            <ul className="bpg_meta">
                              <li className="list-inline-item">
                                <Link href="#">
                                  <i className="flaticon-calendar"></i>
                                </Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">
                                  {moment(i?.create_at).format('MMMM DD, YYYY')}
                                </Link>
                                {/* <Link href="#">January 16, 2020</Link> */}
                              </li>
                            </ul>
                          </div>
                          {/* <div className="fp_footer">
                          <ul className="fp_meta float-left mb0">
                            <li className="list-inline-item">
                              <Link href="#">
                                <img
                                  src="images/property/pposter1.png"
                                  alt="pposter1.png"
                                />
                              </Link>
                            </li>
                            <li className="list-inline-item">
                              <Link href="#">Ali Tufan</Link>
                            </li>
                          </ul>
                          <Link
                            to={`/article/${index}/details`}
                            className="fp_pdate float-right text-thm"
                          >
                            Read More <span className="flaticon-next"></span>
                          </Link>
                        </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {/* Pagging */}
                {/* <div className="col-lg-12 mt20">
                  <div className="mbp_pagination">
                    <ul className="page_navigation">
                      <li className="page-item disabled">
                        <Link
                          className="page-link"
                          href="#"
                          tabindex="-1"
                          aria-disabled="true"
                        >
                          {' '}
                          <span className="flaticon-left-arrow"></span> Prev
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          1
                        </Link>
                      </li>
                      <li className="page-item active" aria-current="page">
                        <Link className="page-link" href="#">
                          2 <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          ...
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          29
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" href="#">
                          <span className="flaticon-right-arrow"></span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar_search_widget">
                <div className="blog_search_widget">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Here"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                      >
                        <span className="flaticon-magnifying-glass"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* List Feature Component */}
              <ListingFeature data={featureList} imageFolderPath={featureImgPath} />
            </div>
            {/* <div className="col-lg-4 col-xl-4">
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
                            placeholder="Enter Agent Name"
                          />
                        </div>
                      </li>
                      <li>
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
                      </li>
                      <li>
                        <div className="search_option_button">
                          <button type="submit" className="btn btn-block btn-thm">
                            Search
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="terms_condition_widget">
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
                                <Link href="#">For Rent</Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">Featured</Link>
                              </li>
                            </ul>
                            <Link className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </Link>
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
                                <Link href="#">For Rent</Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">Featured</Link>
                              </li>
                            </ul>
                            <Link className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </Link>
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
                                <Link href="#">For Rent</Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">Featured</Link>
                              </li>
                            </ul>
                            <Link className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </Link>
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
                                <Link href="#">For Rent</Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">Featured</Link>
                              </li>
                            </ul>
                            <Link className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </Link>
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
                                <Link href="#">For Rent</Link>
                              </li>
                              <li className="list-inline-item">
                                <Link href="#">Featured</Link>
                              </li>
                            </ul>
                            <Link className="fp_price" href="#">
                              $13,000<small>/mo</small>
                            </Link>
                            <h4 className="posr color-white">
                              Renovated Apartment
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default ArticlePage
