import React from 'react'
import clsx from 'clsx'
import { Link, useLocation, NavLink } from 'react-router-dom'
import { AsideMenu } from './AsideMenu'

const AdminLeftSideNav = () => {
  const role = JSON.parse(localStorage?.getItem('user'))?.role?.role_id
  return (
    <div>
      <div className="dashboard_sidebar_menu dn-992">
        <ul className="sidebar-menu">
          {/* <li className="header">
            <img src="images/header-logo.png" alt="header-logo2.png" />
            EState Mart
          </li> */}

          <li className="treeview" style={{ marginTop: '10px' }}>
            <AsideMenu
              to="auth/dashboard"
              title="Dashboard"
              fontIcon="flaticon-home"
            />
          </li>
          <li className="treeview">
            <AsideMenu
              to="auth/company-details"
              title="Company Details"
              fontIcon="flaticon-view"
            />
          </li>
          <li className="treeview">
            <AsideMenu
              to="auth/page-meta"
              title="Page Meta"
              fontIcon="flaticon-view"
            />
          </li>
          {role !== 1 && (
            <li className="treeview">
              <AsideMenu
                to="auth/my-profile"
                title="My Profile"
                fontIcon="flaticon-view"
              />
            </li>
          )}
          <li className="treeview">
            <AsideMenu
              to="auth/categories"
              title="Categories"
              fontIcon="flaticon-chat"
            />
          </li>
          <li>
            <AsideMenu
              to="auth/system-users"
              title="System Users"
              fontIcon="flaticon-user"
            />
          </li>
          {role === 1 && (
            <li>
              <AsideMenu
                to="auth/all-messages"
                title="Email"
                fontIcon="flaticon-chat"
              />
            </li>
          )}

          <li className="title" style={{ marginTop: '10px' }}>
            <span>Manage Real States</span>
          </li>

          <li>
            <AsideMenu
              to="auth/properties"
              title="Properties"
              fontIcon="flaticon-home"
            />
          </li>
          <li>
            <AsideMenu
              to="auth/locations"
              title="Locations"
              fontIcon="flaticon-maps-and-flags"
            />
          </li>
          {role === 1 && (
            <>
              <li>
                <AsideMenu
                  to="auth/indoor-amenities"
                  title="Indoor Amenities"
                  fontIcon="flaticon-user"
                />
              </li>
              <li>
                <AsideMenu
                  to="auth/outdoor-amenities"
                  title="Outdoor Amenities"
                  fontIcon="flaticon-box"
                />
              </li>
              <li>
                <AsideMenu
                  to="auth/services"
                  title="Services"
                  fontIcon="flaticon-box"
                />
              </li>
              {/* <li>
                <AsideMenu
                  to="auth/all-favorites"
                  title="All Favorite Properties"
                  fontIcon="flaticon-star"
                />
              </li> */}
              {/* <li>
                <AsideMenu
                  to="auth/sliders"
                  title="Sliders"
                  fontIcon="flaticon-layers"
                />
              </li> */}
              <li>
                <AsideMenu
                  to="auth/banners"
                  title="Banners"
                  fontIcon="flaticon-layers"
                />
              </li>
              <li>
                <AsideMenu
                  to="auth/inqueries"
                  title="Inqueries"
                  fontIcon="flaticon-box"
                />
              </li>
              <li>
                <AsideMenu
                  to="auth/blogs"
                  title="Blogs"
                  fontIcon="flaticon-layers"
                />
              </li>
            </>
          )}
          <li>
            <AsideMenu
              to="auth/packages"
              title="Packages"
              fontIcon="flaticon-box"
            />
          </li>

          {(role === 2 || role === 3) && (
            <>
              <li className="treeview">
                <AsideMenu
                  to="auth/submitted-inqueries"
                  title="Submitted Inqueries"
                  fontIcon="flaticon-view"
                />
              </li>
              <li className="treeview">
                <AsideMenu
                  to="auth/received-inqueries"
                  title="Recieved Inqueries"
                  fontIcon="flaticon-chat"
                />
              </li>
            </>
          )}
          {/* <li>
            <a href="#">
              <i className="flaticon-home"></i> <span> Fields</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="flaticon-home"></i> <span> Dependent fields</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="flaticon-home"></i> <span> Location</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="flaticon-magnifying-glass"></i>{' '}
              <span> Search forms</span>
            </a>
          </li>
          <li className="title">
            <span>Manage Account</span>
          </li>
          <li>
            <a href="page-my-packages.html">
              <i className="flaticon-box"></i> <span>My Package</span>
            </a>
          </li>
          <li>
            <a href="page-my-profile.html">
              <i className="flaticon-user"></i> <span>My Profile</span>
            </a>
          </li>
          <li>
            <a href="page-login.html">
              <i className="flaticon-logout"></i> <span>Logout</span>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default AdminLeftSideNav
