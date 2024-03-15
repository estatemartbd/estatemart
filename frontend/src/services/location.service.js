import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getLocationList = () => {
  return axios.get(API_URL + '/area/list', { headers: authHeader() })
}

const getParentList = () => {
  return axios.get(API_URL + '/area/parentAreaList', { headers: authHeader() })
}
const getAreaById = (id) => {
  return axios.get(API_URL + '/area/childAreaList/' + id, {
    headers: authHeader(),
  })
}
const getArea = () => {
  return axios.get(API_URL + '/area/childAreaList/', {
    headers: authHeader(),
  })
}
const getChildAreaListById = (id) => {
  return axios.get(API_URL + '/area/childAreaList/' + id, {
    headers: authHeader(),
  })
}
const getGrandChildAreaListById = (id) => {
  return axios.get(API_URL + '/area/grandChildAreaList/' + id, {
    headers: authHeader(),
  })
}
const locationAdd = (data) => {
  return axios.post(API_URL + '/area/add', data, { headers: authHeader() })
}
const locationEdit = (data) => {
  return axios.put(API_URL + '/area/update', data, { headers: authHeader() })
}

const deleteLocation = (id) => {
  return axios.delete(API_URL + '/area/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/area/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getLocationDetails = (id) => {
  return axios.get(API_URL + '/area/details/' + id, {
    headers: authHeader(),
  })
}
const getChildList = (id) => {
  return axios.get(API_URL + '/area/childAreaList/' + id, {
    headers: authHeader(),
  })
}
export default {
  getArea,
  getLocationList,
  getChildAreaListById,
  getGrandChildAreaListById,
  locationAdd,
  deleteLocation,
  changeStatus,
  getLocationDetails,
  getParentList,
  getAreaById,
  getChildList,
  locationEdit,
}
