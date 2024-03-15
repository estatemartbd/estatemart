import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import servicesService from '../../services/services.service'

const CompanyDetailsCard = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [fax, setFax] = useState()
  const [fbLink, setFBLink] = useState()
  const [youtubeLink, setYoutubeLink] = useState()
  const [twitterLink, setTwitterLink] = useState()
  const [youtubeVideoKey, setYoutubeVideoKey] = useState()
  const [footerOne, setFooterOne] = useState()
  const [footerTwo, setFooterTwo] = useState()
  const [gpsCordinates, setGpsCordinates] = useState()
  const [address, setAddress] = useState()
  const [logo, setLogo] = useState()
  const [defaultLogo, setDefaultLogo] = useState()

  //   get details
  useEffect(() => {
    servicesService.getCompanyDetails(1).then((res) => {
      if (res.data.success) {
        setName(res?.data?.data?.company_name)
        setEmail(res?.data?.data?.email)
        setPhone(res?.data?.data?.phone)
        setFax(res?.data?.data?.fax)
        setFBLink(res?.data?.data?.fb_link)
        setYoutubeLink(res?.data?.data?.youtube_link)
        setTwitterLink(res?.data?.data?.twitter_link)
        setYoutubeVideoKey(res?.data?.data?.youtube_video_key)
        setFooterOne(res?.data?.data?.footer_one)
        setFooterTwo(res?.data?.data?.footer_two)
        setAddress(res?.data?.data?.address)
        setGpsCordinates(res?.data?.data?.gps_coordinates)
        setDefaultLogo(res?.data?.imageFolderPath + '/' + res?.data?.data?.logo)
      }
    })
  }, [])

  //   render
  return (
    <div className="contact_localtion">
      <img
        className="my-3 mx-auto img-fluid"
        src={defaultLogo || 'images/header-logo2.png'}
        style={{
          height: '4rem',
        }}
        alt="header-logo.png"
      />

      <h4>{name}</h4>
      {address && (
        <div className="content_list">
          <h5>Address</h5>
          <p>{address}</p>
        </div>
      )}
      {phone && (
        <div className="content_list">
          <h5>Phone</h5>
          <p>{phone}</p>
        </div>
      )}
      {fax && fax !== 'null' && (
        <div className="content_list">
          <h5>Fax</h5>
          <p>{fax}</p>
        </div>
      )}
      {email && (
        <div className="content_list">
          <h5>Mail</h5>
          <p>{email}</p>
        </div>
      )}

      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <li className="list-inline-item">
          <a href={fbLink} target="_blank" rel="noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a href={twitterLink} target="_blank" rel="noreferrer">
            <i className="fa fa-twitter"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a href={youtubeLink} target="_blank" rel="noreferrer">
            <i className="fa fa-youtube"></i>
          </a>
        </li>
        {/* <li className="list-inline-item">
          <Link to="#">
            <i className="fa fa-instagram"></i>
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#">
            <i className="fa fa-google"></i>
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#">
            <i className="fa fa-pinterest"></i>
          </Link>
        </li> */}
      </ul>
    </div>
  )
}

export default CompanyDetailsCard
