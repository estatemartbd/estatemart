import React from 'react';

const Dashboard = () => {
  return (
    <>
      <div className="row">
        {/* <div className="col-lg-12">
          <div className="dashboard_navigationbar dn db-992">
            <div className="dropdown">
              <button onclick="myFunction()" className="dropbtn">
                <i className="fa fa-bars pr10"></i> Dashboard Navigation
              </button>
              <ul id="myDropdown" className="dropdown-content">
                <li className="active">
                  <a href="page-dashboard.html">
                    <span className="flaticon-layers"></span>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="page-message.html">
                    <span className="flaticon-envelope"></span> Message
                  </a>
                </li>
                <li>
                  <a href="page-my-properties.html">
                    <span className="flaticon-home"></span> My Properties
                  </a>
                </li>
                <li>
                  <a href="page-my-favorites.html">
                    <span className="flaticon-heart"></span> My Favorites
                  </a>
                </li>
                <li>
                  <a href="page-my-savesearch.html">
                    <span className="flaticon-magnifying-glass"></span> Saved
                    Search
                  </a>
                </li>
                <li>
                  <a href="page-my-review.html">
                    <span className="flaticon-chat"></span> My Reviews
                  </a>
                </li>
                <li>
                  <a href="page-my-packages.html">
                    <span className="flaticon-box"></span> My Package
                  </a>
                </li>
                <li>
                  <a href="page-my-profile.html">
                    <span className="flaticon-user"></span> My Profile
                  </a>
                </li>
                <li>
                  <a href="page-add-new-property.html">
                    <span className="flaticon-filter-results-button"></span> Add
                    New Listing
                  </a>
                </li>
                <li>
                  <a href="page-login.html">
                    <span className="flaticon-logout"></span> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        {/* <div className="col-lg-12 mb10">
          <div className="breadcrumb_content style2">
            <h2 className="breadcrumb_title">Howdy, Ali!</h2>
            <p>We are glad to see you again!</p>
          </div>
        </div> */}
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
          <div className="ff_one">
            <div className="icon">
              <span className="flaticon-home"></span>
            </div>
            <div className="detais">
              <div className="timer">37</div>
              <p>All Properties</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
          <div className="ff_one style2">
            <div className="icon">
              <span className="flaticon-view"></span>
            </div>
            <div className="detais">
              <div className="timer">24</div>
              <p>Total Views</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
          <div className="ff_one style3">
            <div className="icon">
              <span className="flaticon-chat"></span>
            </div>
            <div className="detais">
              <div className="timer">12</div>
              <p>Total Visitor Reviews</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3">
          <div className="ff_one style4">
            <div className="icon">
              <span className="flaticon-heart"></span>
            </div>
            <div className="detais">
              <div className="timer">18</div>
              <p>Total Favorites</p>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="recent_job_activity">
            <h4 className="title">Area Wise Post List</h4>
            <div className="grid">
              <ul>
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Your listing <strong>Luxury Family Home</strong> has been
                    approved!.
                  </p>
                </li>
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Kathy Brown left a review on{' '}
                    <strong>Renovated Apartment</strong>
                  </p>
                </li>
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Someone favorites your{' '}
                    <strong>Gorgeous Villa Bay View</strong> listing!
                  </p>
                </li>
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Your listing <strong>Luxury Family Home</strong> has been
                    approved!
                  </p>
                </li>
              </ul>
            </div>
            <div className="grid">
              <ul>
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Kathy Brown left a review on{' '}
                    <strong>Renovated Apartment</strong>
                  </p>
                </li>
              </ul>
            </div>
            <div className="grid mb0">
              <ul className="pb0 mb0 bb_none">
                <li className="list-inline-item">
                  <div className="icon">
                    <span className="flaticon-maps-and-flags"></span>
                  </div>
                </li>
                <li className="list-inline-item">
                  <p>
                    Someone favorites your <strong>Gorgeous Villa Bay</strong>{' '}
                    View listing!
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
