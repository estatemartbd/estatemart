import React from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../assets/images/150.png'

function ListingFeature({ data, imageFolderPath, isAgentDetails = false }) {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = defaultImage
  }
  return (
    data?.length > 0 && (
      <div className="sidebar_feature_listing">
        <h4 className="title">Featured Listings</h4>
        {data?.slice(0, 5)?.map((e, index) => (
          <Link to={'/property-details/' + e?.id}>
          <div className="media" key={index}>
            <img
              className="align-self-start mr-3"
              src={
                isAgentDetails === false
                  ? imageFolderPath + '/' + e?.img_name[0]?.name
                  : imageFolderPath + '/' + e?.property_image[0]?.name
              }
              alt={e?.property_name}
              onError={handleImageError}
              height={80}
              width={90}
            />
            <div className="media-body">
              {/* <Link to={'/property-details/' + e?.id}> */}
                <h5 className="mt-0 post_title">
                  {e?.property_name ? e?.property_name : 'Title missing ...'}
                </h5>
              {/* </Link> */}
              <Link to={'#'}>
                {e?.total_price ? 'BDT ' + e?.total_price : '-'}/
                <small>/mo</small>
              </Link>
              <ul className="mb0">
                <li className="list-inline-item mr-1">
                  Beds: {e?.bedroom ? e?.bedroom : '-'}
                </li>
                <li className="list-inline-item mr-1">
                  Baths: {e?.bathroom ? e?.bathroom : '-'}
                </li>
                <li className="list-inline-item">
                  Sq Ft: {e?.size ? e?.size : '-'}
                </li>
              </ul>
            </div>
          </div>
          </Link>

        ))}
        {data?.length === 0 && <div className="media">No Data Found</div>}
      </div>
    )
  )
}

export default ListingFeature
