import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
// import checkIsActive from '../../helper/RouterHelpers';
export function getCurrentUrl(pathname) {
  return pathname.split(/[?#]/)[0]
}
const checkIsActive = (pathname, url) => {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}
const AsideMenu = ({
  // children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className='menu-item'>
      <Link className={clsx({leftMenuActived: isActive})} to={to}>
      {fontIcon && <i className={clsx(fontIcon)}></i>}
        <span> {title}</span>
      </Link>
      {/* {children} */}
    </div>
  )
}

export {AsideMenu}
