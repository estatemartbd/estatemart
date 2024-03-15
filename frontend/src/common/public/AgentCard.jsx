import React from 'react'
import { Link } from 'react-router-dom'

function AgentCard({ item, imageFolderPath, handleImageError }) {
  let name = item.user_type === 2 ? item.organization_name : item.name;
  let otherName = "otherName";

  return (
    <div className="feat_property home7 agent">
      <div className="thumb">
        <img
          className="img-whp"
          src={imageFolderPath + '/' + item?.profile_image}
          alt={item?.name}
          onError={handleImageError}
          style={{ height: 300 }}
        />
      </div>
      <div className="details">
        <div className="tc_content">
          {/* <h4>{item?.name}</h4> */}
          <h4 >{name}</h4>
          <p className="text-thm">{item?.role_name}</p>
        </div>
        <div className="fp_footer">
          <Link to={'/agent-detail/' + item?.user_id}>
            <div className="fp_pdate text-center text-thm">
              View My Listings <i className="fa fa-angle-right"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AgentCard
