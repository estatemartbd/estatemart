/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function QuickLink({ myAccount, logOutAction }) {
  const role = JSON.parse(localStorage?.getItem('user'))?.role?.role_id

  return (
    <div className="user_setting_content">
      <a
        className="dropdown-item active"
        href={role !== 1 ? '/auth/favorites' : '/auth/all-favorites'}
      >
        {role !== 1 ? 'My Favorites' : 'All Favorites'}
      </a>
      <a
        className="dropdown-item"
        style={{ cursor: 'pointer' }}
        onClick={myAccount}
      >
        My Account
      </a>
      {/* <a className="dropdown-item" href="#">
        Purchase history
      </a> */}
      {/* <a className="dropdown-item" href="#">
        Help
      </a> */}
      <a className="dropdown-item" href="#" onClick={logOutAction}>
      Sign out
      </a>
    </div>
  )
}

export default QuickLink
