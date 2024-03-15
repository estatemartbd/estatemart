import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getList = () => {
  return axios.get(API_URL + '/indoor-amenities/list', { headers: authHeader() })
}
const getActiveIndoorAmenList = () => {
  return axios.get(API_URL + '/indoor-amenities/activeList', { headers: authHeader() })
}

const indoorAmenitiesAdd = (data) => {
  return axios.post(API_URL + '/indoor-amenities/add', data, { headers: authHeader() })
}

const indoorAmenitiesEdit = (data) => {
  return axios.put(API_URL + '/indoor-amenities/update', data, { headers: authHeader() })
}
const indoorAmenitiesDelete = (id) => {
  return axios.delete(API_URL + '/indoor-amenities/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/indoor-amenities/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getDetails = (id) => {
  return axios.get(API_URL + '/indoor-amenities/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getList,
  indoorAmenitiesAdd,
  indoorAmenitiesDelete,
  changeStatus,
  getDetails,
  indoorAmenitiesEdit,
  getActiveIndoorAmenList
}
