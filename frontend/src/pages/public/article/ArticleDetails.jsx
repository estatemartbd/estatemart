/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import blogsService from '../../../services/blogs.service'
import { toast } from 'react-toastify'
import moment from 'moment'

function ArticleDetails() {
  const [articleDetails, setArticleDetails] = useState({})
  const [imgPath, setImgPath] = useState('')

  const url = window.location.href
  var articleID = url.substring(url.lastIndexOf('/') + 1)
  const isLogin = JSON.parse(localStorage?.getItem('user'))

  // get details
  const getArticleDetails = () => {
    blogsService.getBlogsDetails(Number(articleID)).then(
      (res) => {
        if (res?.data?.success) {
          setArticleDetails(res?.data?.data)
          setImgPath(res?.data?.imageFolderPath)
        } else {
          setArticleDetails({})
          toast.info(res?.data?.message)
        }
      },
      (err) => {
        toast.info(err?.response?.data?.message)
      },
    )
  }

  // init
  useEffect(() => {
    getArticleDetails()
  }, [])

  // error hangle image
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = 'https://via.placeholder.com/850x450'
  }

  return (
    <>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">Article Details</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--  Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  <h3 className="blog_sp_title">
                    {articleDetails?.title
                      ? articleDetails?.title
                      : 'Article Title is Missing ...'}
                  </h3>
                  <ul className="blog_sp_post_meta">
                    {/* <li className="list-inline-item">
                    <a href="#">
                        <img
                          src="../../../assets/images/property/pposter1.png"
                          alt="pposter1.png"
                        />
                      </a>
                    </li> */}
                    {/* <li className="list-inline-item">
                      <a href="#">Ali Tufan</a>
                    </li> */}
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        {moment(articleDetails?.created_at).format(
                          'MMMM Do, YYYY',
                        )}
                      </a>
                    </li>
                    {/* <li className="list-inline-item">
                      <a href="#"> 341 views</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-chat"></span>
                    </li> */}
                  </ul>
                  <div className="thumb">
                    <img
                      style={{ width: '100%', height: 'auto' }}
                      src={imgPath + '/' + articleDetails?.image}
                      alt="pposter1.png"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="details">
                    <p className="mb30">
                      {articleDetails?.details
                        ? articleDetails?.details
                        : 'No Description Found'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar_feature_listing">
                <h4 className="title">Featured Listings</h4>
                <div className="media">
                  <img
                    className="align-self-start mr-3"
                    src="images/blog/fls1.jpg"
                    alt="fls1.jpg"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 post_title">Nice Room With View</h5>
                    <a href="#">
                      $13,000/<small>/mo</small>
                    </a>
                    <ul className="mb0">
                      <li className="list-inline-item">Beds: 4</li>
                      <li className="list-inline-item">Baths: 2</li>
                      <li className="list-inline-item">Sq Ft: 5280</li>
                    </ul>
                  </div>
                </div>
                <div className="media">
                  <img
                    className="align-self-start mr-3"
                    src="images/blog/fls2.jpg"
                    alt="fls2.jpg"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 post_title">Villa called Archangel</h5>
                    <a href="#">
                      $13,000<small>/mo</small>
                    </a>
                    <ul className="mb0">
                      <li className="list-inline-item">Beds: 4</li>
                      <li className="list-inline-item">Baths: 2</li>
                      <li className="list-inline-item">Sq Ft: 5280</li>
                    </ul>
                  </div>
                </div>
                <div className="media">
                  <img
                    className="align-self-start mr-3"
                    src="images/blog/fls3.jpg"
                    alt="fls3.jpg"
                  />
                  <div className="media-body">
                    <h5 className="mt-0 post_title">Sunset Studio</h5>
                    <a href="#">
                      $13,000<small>/mo</small>
                    </a>
                    <ul className="mb0">
                      <li className="list-inline-item">Beds: 4</li>
                      <li className="list-inline-item">Baths: 2</li>
                      <li className="list-inline-item">Sq Ft: 5280</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="blog_tag_widget">
                <h4 className="title">Tags</h4>
                <ul className="tag_list">
                  <li className="list-inline-item">
                    <a href="#">Apartment</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Real Estate</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Estate</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Luxury</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Real</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArticleDetails
