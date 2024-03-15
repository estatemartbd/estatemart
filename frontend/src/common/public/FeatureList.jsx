/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function FeatureList({propertyList,imagePath, handleImageError}) {
  return (
    <div className="terms_condition_widget">
    <h4 className="title">Featured Properties</h4>
    <div className="sidebar_feature_property_slider">
      {propertyList?.slice(0,4)?.map((e) => (
        <div className="item my-2">
          <div className="feat_property home7 agent">
            <div className="thumb">
              <img
                className="img-whp"
                src={imagePath + "/" + e?.property_image[1]?.name}
                alt="fp1.jpg"
                onError={handleImageError}
              />
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  {e?.purpose === 2 && (
                    <li className="list-inline-item">
                      <a href="#">For Rent</a>
                    </li>
                  )}
                  {e?.purpose === 1 && (
                    <li className="list-inline-item">
                      <a href="#">For Sale</a>
                    </li>
                  )}
                  {e?.is_featured === 1 && (
                    <li className="list-inline-item">
                      <a href="#">Featured</a>
                    </li>
                  )}
                </ul>
                <a
                  className="fp_price"
                  href="#"
                  style={{ color: "#3e4c66" }}
                >
                  {e?.total_price
                    ? e?.total_price + " BDT"
                    : "0 BDT"}{" "}
                  {e?.purpose === 2 && <small>/mo</small>}
                </a>
                <h4 className="posr color-white ctText">
                  {e?.property_name}
                </h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default FeatureList