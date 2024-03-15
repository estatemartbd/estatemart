/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'
const user = JSON.parse(localStorage.getItem('user'))
const directions_id = localStorage.getItem('directions_id')
const token = JSON.parse(localStorage.getItem('user'))?.token
const getActivePropertyList = (data) => {
  // return axios.get(API_URL + '/property/activeList', { headers: authHeader() })
  return axios.post(API_URL + '/property/list', data, {
    headers: authHeader(),
  })
}

const getSimilarPropertyList = (data) => {
  return axios.post(API_URL + '/property/similar-property', data, {
    headers: authHeader(),
  })
}

const getPropertyDetails = (id, directionID) => {
  return axios.post(
    API_URL + '/property/details',
    { id: id },
    {
      headers: {
        'x-access-token': token,
        directions_id: directionID || localStorage?.getItem('direction_id'),
      },
    },
  )
}
const getPropertyList = () => {
  return axios.get(API_URL + '/property/list', { headers: authHeader() })
}

const propertyAdd = (data) => {
  console.log('data == ', data)
  return axios.post(API_URL + '/property/add', data, { headers: authHeader() })
}
const propertyDetails = (data) => {
  console.log('data == ', data)
  return axios.post(
    API_URL + '/property/publicDetails',
    { id: data },
    {
      headers: {
        'x-access-token': user.token,
        directions_id: directions_id,
      },
    },
  )
}

const detailsForAdminPanel = (data) => {
  console.log('data == ', data)
  return axios.post(
    API_URL + '/property/detailsForAdminPanel',
    { id: data },
    {
      headers: {
        'x-access-token': user.token,
        directions_id: directions_id,
      },
    },
  )
}

const propertyDetailsPublic = (data) => {
  return axios.post(
    API_URL + '/property/publicDetails',
    { id: data },
    {
      headers: {
        // 'x-access-token': user.token,
        directions_id: directions_id,
      },
    },
  )
}
const propertyDetailsUser = (data) => {
  return axios.post(
    API_URL + '/property/publicDetails',
    { id: data },
    {
      headers: {
        'x-access-token': user.token,
        directions_id: directions_id,
      },
    },
  )
}
const serviceEdit = (data) => {
  return axios.put(API_URL + '/service/update', data, {
    headers: authHeader(),
  })
}
const deleteService = (id) => {
  return axios.delete(API_URL + '/service/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/service/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}
const markFeatured = (data) => {
  return axios.post(
    API_URL + '/property/make-feature',
    {
      property_id: data.property_id,
      is_featured: data.is_featured,
      from_date: data.from_date,
      to_date: data.to_date,
    },
    { headers: authHeader() },
  )
}

const getServiceDetails = (id) => {
  return axios.get(API_URL + '/service/details/' + id, {
    headers: authHeader(),
  })
}

const makeFavourite = (id) => {
  return axios.post(
    API_URL + '/favourite/make-favourite',
    { property_id: id },
    { headers: authHeader() },
  )
}

const getMyFavorites = (data) => {
  return axios.post(API_URL + '/favourite/my-favourite-properties', data, {
    headers: authHeader(),
  })
}
const getAllFavorites = (data) => {
  return axios.post(API_URL + '/favourite/all-favourite-properties', data, {
    headers: authHeader(),
  })
}

const getFeatureList = (data) => {
  return axios.post(API_URL + '/property/feature-list', data, {
    headers: authHeader(),
  })
}
const getSearchAgentList = (data) => {
  return axios.post(API_URL + '/system-user/public-agent-list', data, {
    headers: authHeader(),
  })
}

const searchProperty = (data) => {
  return axios.post(API_URL + '/property/property-list', data, {
    headers: authHeader(),
  })
}

const propertyPublishToggle = (id) => {
  return axios.put(
    API_URL + '/property/publish',
    {
      id: id,
    },
    {
      headers: authHeader(),
    },
  )
}

const propertySoldOutToggle = (id) => {
  return axios.put(
    API_URL + '/property/sold-out',
    {
      id: id,
    },
    {
      headers: authHeader(),
    },
  )
}
export default {
  propertyDetailsUser,
  getSearchAgentList,
  getActivePropertyList,
  getPropertyDetails,
  propertyDetailsPublic,
  getPropertyList,
  propertyDetails,
  propertyAdd,
  deleteService,
  changeStatus,
  getServiceDetails,
  serviceEdit,
  markFeatured,
  makeFavourite,
  getMyFavorites,
  getAllFavorites,
  getFeatureList,
  searchProperty,
  getSimilarPropertyList,
  propertyPublishToggle,
  propertySoldOutToggle,
  detailsForAdminPanel
}
