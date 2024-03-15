import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CompanyDetailsCard from '../../../common/public/companyDetailsCard'
import servicesService from '../../../services/services.service'
import ContactUs from '../../../common/contactUs'
import { Helmet } from "react-helmet";
import pageMetaService from "../../../services/pageMetaService";

function ServicePage() {
  const [serviceID, setServiceID] = useState()
  const [title, setTitle] = useState()
  const [details, setDetails] = useState()
  const [image, setImage] = useState()
  const [shortDesc, setShortDesc] = useState()
  const [pageMeta, setPageMeta] = useState();

  useEffect(() => {
    var url = window.location.href
    var id = url.substring(url.lastIndexOf('/') + 1)
    setServiceID(Number(id))
    getMetaData()

    servicesService.getServiceDetails(Number(id)).then((res) => {
      let filterData = res?.data?.data
      setTitle(filterData?.title)
      setDetails(filterData?.details)
      setShortDesc(filterData?.short_description)
    })
  }, [])
  // get MetaData list
  const getMetaData =() => {
    let pageId = 1 // home
    pageMetaService.getDetails(pageId).then(
      (res) => {
        if (res?.data?.success) {
          if(res?.data?.data.status == 1){
            setPageMeta(res?.data?.data);
          }

        } else {
          setPageMeta();
        }
      },
      (err) => {
        console.log(err?.response?.data?.message);
      }
    );
  };
  return (
    <>
    <Helmet>
        <title>{pageMeta?.meta_title}</title>
        <meta
          name="description"
          content={pageMeta?.meta_description}
        />
        <meta
          property="og:description"
          content={pageMeta?.meta_description}
        />
        <link href={pageMeta?.meta_canonical_url}/>
      </Helmet>
      {/* <!-- Inner Page Breadcrumb --> */}
      <section className="inner_page_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="breadcrumb_content mt-0">
                <h1 className="breadcrumb_title">{title}</h1>
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
              <div className="row">
                <div className="col-12">
                  <div className="form_grid">
                    <h4 className="mb5">Service Details</h4>
                    <p>{shortDesc}</p>
                    <hr />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: details ? details : '--',
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <ContactUs />
                </div>
              </div>
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

export default ServicePage
