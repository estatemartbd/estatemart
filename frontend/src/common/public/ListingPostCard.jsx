import React from 'react'
import defaultImage from '../../assets/images/150.png'

function ListingPostCard({ data, item, location, category, imagePath }) {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = defaultImage
  }
  console.log('data===', data);
  console.log('item===', imagePath+item?.property_image[0]?.path +  item?.property_image[0]?.name);
  return (
    <a href={'/property-details/' + item?.id}>
      <div className="feat_property d-lg-flex d-block list style2 hvr-bxshd bdrrn mb10">
        <div className="thumb">
          <img
            className="img-whp"
            src={
              imagePath +'/'+ item?.property_image[0]?.name
            }
            alt={item?.name}
            onError={handleImageError}
          />
          <div className="thmb_cntnt">
            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <div className="dtls_headr">
              <ul className="tag">
                {/* {item?.purpose === 2 && (
                  <li className="list-inline-item">
                    <a href="#">For Rent</a>
                  </li>
                )}
                {item?.purpose === 1 && (
                  <li className="list-inline-item">
                    <a href="#">For Sale</a>
                  </li>
                )} */}
                {item?.is_featured === 1 && (
                  <li className="list-inline-item">
                    <a href="#">Featured</a>
                  </li>
                )}
              </ul>
              <a className="fp_price" href="#">
                {item?.total_price ? item?.total_price + ' BDT' : '0 BDT'}{' '}
                {item?.purpose === 2 && <small>/mo</small>}
              </a>
            </div>
            <p className="text-thm">Apartment</p>
            <h4>{item.property_name}</h4>
            <p>
              <span className="flaticon-placeholder"></span> {location}
            </p>
            <div className="propert_info">
              <ul className="row">
                <li className="col-4">
                  <div className="proprty_icon">
                    <img alt="" src="images/resource/bedroom_icon.png" />
                  </div>
                  <h5>Bedrooms {item?.bedroom}</h5>
                </li>
                <li className="col-4">
                  <div className="proprty_icon">
                    <img alt="" src="images/resource/bathroom_icon.png" />
                  </div>
                  <h5>Bathrooms {item?.bathroom}</h5>
                </li>
                <li className="col-4">
                  <div className="proprty_icon">
                    <img alt="" src="images/resource/garage_icon.png" />
                  </div>
                  <h5>Garage 1</h5>
                </li>
              </ul>
            </div>
            <div className="rent_info">
              <div className="apart ctPadding">{category}</div>
              {item?.purpose === 1 ? (
                <div className="sale ctPadding">For Sale</div>
              ) : (
                <div className="sale ctPadding">For Rent</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default ListingPostCard
