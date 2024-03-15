import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getActiveServiceList = () => {
  return axios.get(API_URL + '/service/activeList', { headers: authHeader() })
}

const getServiceList = () => {
  return axios.get(API_URL + '/service/list', { headers: authHeader() })
}
// const getServiceDetails = () => {
//   return axios.get(API_URL + '/service/list', { headers: authHeader() })
// }
const serviceAdd = (data) => {
  return axios.post(API_URL + '/service/add', data, { headers: authHeader() })
}

const serviceEdit = (data) => {
  return axios.put(API_URL + '/service/update', data, { headers: authHeader() })
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

const getServiceDetails = (id) => {
  return axios.get(API_URL + '/service/details/' + id, {
    headers: authHeader(),
  })
}
const getCompanyDetails = (id) => {
  return axios.get(API_URL + '/company-info/details/' + id, {
    headers: authHeader(),
  })
}
const getAllMessages = () => {
  return axios.get(API_URL + '/contact-us/list-admin', {
    headers: authHeader(),
  })
}

const deleteMessage = (id) => {
  return axios.delete(API_URL + '/contact-us/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}
const readMessages = (id) => {
  return axios.post(
    API_URL + '/contact-us/mark-read',
    { id: id },
    {
      headers: authHeader(),
    },
  )
}

const searchMessage = (data) => {
  return axios.post(API_URL + '/contact-us/list-admin-search', data, {
    headers: authHeader(),
  })
}

const updateCompanyDetails = (data) => {
  return axios.put(API_URL + '/company-info/update', data, {
    headers: authHeader(),
  })
}

export default {
  getActiveServiceList,
  getServiceList,
  serviceAdd,
  deleteService,
  changeStatus,
  getServiceDetails,
  serviceEdit,
  getCompanyDetails,
  getAllMessages,
  deleteMessage,
  readMessages,
  searchMessage,
  updateCompanyDetails,
}
