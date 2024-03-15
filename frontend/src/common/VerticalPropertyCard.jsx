import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../assets/images/150.png'

function VerticalPropertyCard({
  id,
  total_price,
  is_featured,
  purpose,
  create_at,
  property_name,
  locationList,
  area,
  bedroom,
  bathroom,
  catagoriesList,
  category,
  imagePath,
  property_image,
  is_favourite,
  makeFavoriteProperty,
  canUpdateFavorite,
}) {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = defaultImage
  }
  const isLogin = JSON.parse(localStorage?.getItem('user'))

  return (
    <>
      <div className="feat_property row d-lg-flex align-items-center">
        <div className="properti_city col-lg-5 px-0">
          <Link to={"/property-details/" + id}>
            <div className="thumb my-0">
              <img
                className="img-whp"
                style={{ height: 250 }}
                src={
                  property_image[0]?.name
                    ? imagePath + '/' + property_image[0]?.name
                    : ' '
                }
                alt="fp1.jpg"
                onError={handleImageError}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  {/* <li className="list-inline-item">
                  {purpose === 1 ? 'For Sale' : 'For Rent'}
                </li> */}
                  {is_featured === 1 && (
                    <li className="list-inline-item">Featured</li>
                  )}
                </ul>
                {isLogin && canUpdateFavorite === true && (
                  <ul className="icon mb0">
                    <li
                      className="list-inline-item"
                      style={{
                        background: is_favourite === true ? '#f7b806' : '',
                      }}
                    >
                      <button
                        style={{
                          background: 'transparent',
                          border: 'transparent',
                          height: 30,
                        }}
                        onClick={() => makeFavoriteProperty(id)}
                      >
                        {is_favourite === true ? (
                          <span className="flaticon-heart"></span>
                        ) : (
                          <span
                            className="flaticon-heart"
                            style={{ color: 'white' }}
                          ></span>
                        )}
                      </button>
                    </li>
                  </ul>
                )}
                <a className="fp_price" href={'/property-details/' + id}>
                  {total_price ? total_price.toString() + ' BDT' : '0 BDT'}
                  {purpose === 1 && <small>/mo</small>}
                </a>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-7 px-0">
          <a href={'/property-details/' + id}>
            <div className="details">
              <div className="tc_content">
                <p className="text-thm">
                  {moment(
                    moment(create_at).format('YYYYMMDD'),
                    'YYYYMMDD',
                  ).fromNow()}
                </p>
                <h4 className="text-capitalize">
                  {property_name || 'Title missing ...'}
                </h4>
                <p>
                  <span className="flaticon-placeholder"></span>{' '}
                  {locationList
                    ?.map((l) => l?.id === area && l?.title)
                    .filter(Boolean)}
                </p>
                <div className="propert_info">
                  <ul className="row">
                    <li className="col-4">
                      <div className="proprty_icon">
                        <img alt="" src="images/resource/bedroom_icon.png" />
                      </div>
                      <h5>Bedrooms {bedroom || 0}</h5>
                    </li>
                    <li className="col-4">
                      <div className="proprty_icon">
                        <img alt="" src="images/resource/bathroom_icon.png" />
                      </div>
                      <h5>Bathrooms {bathroom || 0}</h5>
                    </li>
                    <li className="col-4">
                      <div className="proprty_icon">
                        <img alt="" src="images/resource/garage_icon.png" />
                      </div>
                      <h5>Garage {bedroom || 0}</h5>
                    </li>
                  </ul>
                </div>
                <div className="rent_info">
                  <div className="apart">
                    {catagoriesList?.map((d) => d?.id === category && d?.title)}
                  </div>
                  {purpose === 1 ? (
                    <div className="sale">For Sale</div>
                  ) : (
                    <div className="sale">For Rent</div>
                  )}
                </div>
              </div>

            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default VerticalPropertyCard
