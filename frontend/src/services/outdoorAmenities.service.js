import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getList = () => {
  return axios.get(API_URL + '/outdoor-amenities/list', { headers: authHeader() })
}
const getActiveOutdoorAmenList = () => {
  return axios.get(API_URL + '/outdoor-amenities/activeList', { headers: authHeader() })
}
const outdoorAmenitiesAdd = (data) => {
  return axios.post(API_URL + '/outdoor-amenities/add', data, { headers: authHeader() })
}

const outdoorAmenitiesEdit = (data) => {
  return axios.put(API_URL + '/outdoor-amenities/update', data, { headers: authHeader() })
}
const outdoorAmenitiesDelete = (id) => {
  return axios.delete(API_URL + '/outdoor-amenities/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/outdoor-amenities/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getDetails = (id) => {
  return axios.get(API_URL + '/outdoor-amenities/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getList,
  outdoorAmenitiesAdd,
  outdoorAmenitiesDelete,
  changeStatus,
  getDetails,
  outdoorAmenitiesEdit,
  getActiveOutdoorAmenList
}
