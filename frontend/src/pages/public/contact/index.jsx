import React from 'react'
import { Link } from 'react-router-dom'
import CompanyDetailsCard from '../../../common/public/companyDetailsCard'
import ContactUs from '../../../common/contactUs'
function ContactPage() {
  return (
    <>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">Contact Us</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Contact page */}
      <section className="our-contact pb0 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <ContactUs />
            </div>
            <div className="col-lg-5 col-xl-4">
              <CompanyDetailsCard />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
