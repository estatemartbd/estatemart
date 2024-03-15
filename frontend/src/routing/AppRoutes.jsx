/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

// Public
import PublicLayout from "../layout/PublicLayout";
import AllAgents from "../pages/public/agents";
import BusinessAgents from "../pages/public/agents/BusinessAgents";
import PersonalAgents from "../pages/public/agents/PersonalAgents";
import AgentDetail from "../pages/public/agents/AgentDetail";
import HomePage from "../pages/public/home/HomePage";
import ArticlePage from "../pages/public/article";
import ArticleDetails from "../pages/public/article/ArticleDetails";
import AllAds from "../pages/public/ads";
import AllServices from "../pages/public/services/list";
import ServicePage from "../pages/public/services";
import ContactPage from "../pages/public/contact";
import PropertyDetails from "../pages/public/property/details";
import AddNewProperty from "../pages/private/property/AddProperty";
// Private
import PrivateLayout from "../layout/PrivateLayout";
import DashBoard from "../pages/private/dashboard/DashBoard";
import Inquiries from "../pages/private/inquery";
import Property from "../pages/private/property";
import UpdateProperty from "../pages/private/property/UpdateProperty";
import Banners from "../pages/private/banner";
import AddBanner from "../pages/private/banner/AddBanner";
import EditBanner from "../pages/private/banner/EditBanner";
import AddProperty from "../pages/private/property/AddProperty";
import Location from "../pages/private/location";
import AddLocation from "../pages/private/location/AddLocation";
import AgentAndUser from "../pages/private/agent";
import Package from "../pages/private/package";
import AddPackage from "../pages/private/package/AddPackage";
import AddAgentAndUser from "../pages/private/agent/AddAgent";
import EditPackage from "../pages/private/package/EditPackage";
import EditLocation from "../pages/private/location/EditLocation";
import Services from "../pages/private/services";
import AddService from "../pages/private/services/AddService";
import EditService from "../pages/private/services/EditService";
import BlogList from "../pages/private/blogs";
import AddBlog from "../pages/private/blogs/AddBlog";
import EditBlog from "../pages/private/blogs/EditBlog";
import IndoorAmenities from "../pages/private/amenities/indoor";
import IndoorAmenitiesAdd from "../pages/private/amenities/indoor/Add";
import IndoorAmenitiesEdit from "../pages/private/amenities/indoor/Edit";
import OutdoorAmenities from "../pages/private/amenities/outdoor";
import OutdoorAmenitiesAdd from "../pages/private/amenities/outdoor/Add";
import OutdoorAmenitiesEdit from "../pages/private/amenities/outdoor/Edit";
import Categories from "../pages/private/categories";
import SystemUser from "../pages/private/system_user";
import SystemUserUpdate from "../pages/private/system_user/Edit";
import EditMyProfile from "../pages/private/my_profile/Edit";
import InqueryData from "../pages/private/inquery";
import InqueryEdit from "../pages/private/inquery/Edit";
// import PublicInqueryData from '../pages/public/submitted_inquery'
// import PublicInqueryEdit from '../pages/public/submitted_inquery/Edit'
// import PublicRecievedInqueryData from '../pages/public/recieved_inquery'
// import PublicRecievedInqueryEdit from '../pages/public/recieved_inquery/Edit'
import SubmittedInqueries from "../pages/private/submitted_inquery";
import SubmittedInqueriesEdit from "../pages/private/submitted_inquery/Edit";
import RecievedInqueries from "../pages/private/recieved_inquery";
import RecievedInqueriesEdit from "../pages/private/recieved_inquery/Edit";
import MyFavorites from "../pages/private/property/myFavorites";
import AllFavorites from "../pages/private/property/AllFavorites";
import AllMessages from "../pages/private/Messages";

// Private

import { useState } from "react";
import { useSelector } from "react-redux";
import CompanyDetailsUpdate from "../pages/private/company/CompanyDetailsUpdate";
import SystemUserDetails from "../pages/private/system_user/Details";
import PageMeta from "../pages/private/page_meta";
import PageMetaEdit from "../pages/private/page_meta/Edit";
const { PUBLIC_URL } = process.env;

const AppRoutes = () => {
  // const [currentUser, setCurrentUser] = useState(null)
  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (localStorage.getItem('user')) {
  //     setCurrentUser(true)
  //   }
  // }, [currentUser])
  return (
    <Routes>
      {/* ***************   Public Routing */}
      <Route element={<PublicLayout />}>
        {/* <Route index path="/*" element={<Navigate to="/home" />} /> */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="home" element={<HomePage />} />
        <Route path="all-agents" element={<AllAgents />} />
        <Route path="all-agents/business" element={<BusinessAgents />} />
        <Route path="all-agents/personal" element={<PersonalAgents />} />
        <Route path="agent-detail/:id" element={<AgentDetail />} />
        <Route path="articles" element={<ArticlePage />} />
        <Route path="article/details/:id" element={<ArticleDetails />} />
        <Route path="all-ads" element={<AllAds />} />
        <Route path="add-property" element={<AddNewProperty />} />
        <Route path="all-service" element={<AllServices />} />
        <Route
          path="all-ads/:pur/:cat/:loc/:area/:bed/:bath/:minS/:maxS/:minP/:maxP"
          element={<AllAds />}
        />
        <Route path="contact-us" element={<ContactPage />} />
        <Route path="service-details/:id" element={<ServicePage />} />
        <Route path="property-details/:id" element={<PropertyDetails />} />
        {/* <Route path="submitted-inqueries" element={<PublicInqueryData />} /> */}
        {/* <Route path="submitted-inqueries/edit/:id" element={<PublicInqueryEdit />} /> */}
        {/* <Route path="recieved-inqueries" element={<PublicRecievedInqueryData />} /> */}
        {/* <Route path="recieved-inqueries/edit/:id" element={<PublicRecievedInqueryEdit />} /> */}
      </Route>
      {/***************  Private Routing */}
      <Route element={<PrivateLayout />}>
        {/* <Route path="/*" element={<Navigate to="/dashboard" />} /> */}
        <Route path="auth/dashboard" element={<DashBoard />} />
        <Route path="auth/inquiries" element={<Inquiries />} />
        <Route path="auth/properties" element={<Property />} />
        <Route path="auth/add-property" element={<AddProperty />} />
        <Route path="auth/update-property/:id" element={<UpdateProperty />} />
        <Route path="auth/locations" element={<Location />} />
        <Route path="auth/add-location" element={<AddLocation />} />
        <Route path="auth/location/edit/:id" element={<EditLocation />} />
        <Route path="auth/agent-user" element={<AgentAndUser />} />
        <Route path="auth/add-agent-user" element={<AddAgentAndUser />} />
        <Route path="auth/settings" element={<Property />} />
        <Route path="auth/sliders" element={<Property />} />
        <Route path="auth/banners" element={<Banners />} />
        <Route path="auth/banners/add" element={<AddBanner />} />
        <Route path="auth/banner/edit/:id" element={<EditBanner />} />
        <Route path="auth/statistics" element={<Property />} />
        <Route path="auth/features" element={<Property />} />
        <Route path="auth/packages" element={<Package />} />
        <Route path="auth/packages/add" element={<AddPackage />} />
        <Route path="auth/packages/edit/:id" element={<EditPackage />} />
        <Route path="auth/services" element={<Services />} />
        <Route path="auth/service/add" element={<AddService />} />
        <Route path="auth/service/edit/:id" element={<EditService />} />
        <Route path="auth/blogs" element={<BlogList />} />
        <Route path="auth/blogs/add" element={<AddBlog />} />
        <Route path="auth/blogs/edit/:id" element={<EditBlog />} />
        <Route path="auth/indoor-amenities" element={<IndoorAmenities />} />
        <Route
          path="auth/indoor-amenities/add"
          element={<IndoorAmenitiesAdd />}
        />
        <Route
          path="auth/indoor-amenities/edit/:id"
          element={<IndoorAmenitiesEdit />}
        />
        <Route path="auth/outdoor-amenities" element={<OutdoorAmenities />} />
        <Route
          path="auth/outdoor-amenities/add"
          element={<OutdoorAmenitiesAdd />}
        />
        <Route
          path="auth/page-meta"
          element={<PageMeta />}
        />
        <Route
          path="auth/page-meta/edit/:id"
          element={<PageMetaEdit />}
        />
        <Route
          path="auth/outdoor-amenities/edit/:id"
          element={<OutdoorAmenitiesEdit />}
        />
        <Route path="auth/categories" element={<Categories />} />
        <Route path="auth/company-details" element={<CompanyDetailsUpdate />} />
        <Route path="auth/system-users" element={<SystemUser />} />
          <Route
          path="auth/system-user/:id"
          element={<SystemUserDetails />}
        />
        <Route
          path="auth/system-user/edit/:id"
          element={<SystemUserUpdate />}
        />
        <Route path="auth/all-messages" element={<AllMessages />} />
        <Route path="auth/favorites" element={<MyFavorites />} />
        <Route path="auth/all-favorites" element={<AllFavorites />} />
        <Route path="auth/inqueries" element={<InqueryData />} />
        <Route path="auth/inquery/edit/:id" element={<InqueryEdit />} />
        <Route
          path="auth/submitted-inqueries"
          element={<SubmittedInqueries />}
        />
        <Route
          path="auth/submitted-inqueries/edit/:id"
          element={<SubmittedInqueriesEdit />}
        />
        <Route path="auth/received-inqueries" element={<RecievedInqueries />} />
        <Route
          path="auth/received-inqueries/edit/:id"
          element={<RecievedInqueriesEdit />}
        />
        <Route path="auth/my-profile" element={<EditMyProfile />} />
        {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
      </Route>
    </Routes>
  );
};

export { AppRoutes };
