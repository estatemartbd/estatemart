import React from 'react'

function CompanyDetails({
  name,
  phone,
  email,
  fax,
  defaultLogo,
  role,
  address,
  footerOne,
  footerTwo,
  fbLink,
  youtubeLink,
  twitterLink,
  gpsCordinates,
  instagramLink,
}) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="my_dashboard_review">
          <div className="row">
            <div className="col-lg-12 col-xl-12 mb10">
              <div className="breadcrumb_content style2 mb30-991">
                <h2 className="breadcrumb_title">
                  {role === 1 ? 'Update Company Details' : 'Company Details'}
                </h2>
                {/* <p>We are glad to see you again!</p> */}
              </div>
            </div>

            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={name}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="propertyTitle"
                  value={email}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  id="propertyTitle"
                  value={phone}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Fax</label>
                <input
                  type="number"
                  className="form-control"
                  id="propertyTitle"
                  value={fax}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Facebook Link</label>
                <input
                  type="text"
                  placeholder="https://"
                  className="form-control"
                  id="propertyTitle"
                  value={fbLink}
                  readOnly
                />
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Twitter Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://"
                  id="propertyTitle"
                  value={twitterLink}
                  readOnly
                />
              </div>
            </div> */}
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Youtube Link</label>
                <input
                  type="text"
                  placeholder="https://"
                  className="form-control"
                  id="propertyTitle"
                  value={youtubeLink}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Instagram Link</label>
                <input
                  type="text"
                  placeholder="************"
                  className="form-control"
                  id="propertyTitle"
                  value={instagramLink}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-8" />
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Footer 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={footerOne}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Footer 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={footerTwo}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">GPS Co-ordinates</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={gpsCordinates}
                  readOnly
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div
                style={{
                  height: '5rem',
                  width: '100%',
                  border: '1px dashed #CDCDCD',
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${defaultLogo})`,
                }}
              ></div>
            </div>
            <div className="col-lg-12 mt-3">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="propertyTitle">Address</label>
                <textarea
                  style={{ minHeight: 150 }}
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={address}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  )
}

export default CompanyDetails
