/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getPublicContent = () => {
  return axios.get(API_URL + 'all')
}

const getUserBoard = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() })
}
const getMeInfo = () => {
  return axios.get(API_URL + '/user/me', { headers: authHeader() })
}

const getModeratorBoard = () => {
  return axios.get(API_URL + '/expert/list', { headers: authHeader() })
}

const getAdminBoard = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() })
}

const getSystemUserList = () => {
  return axios.get(API_URL + '/system-user/list', { headers: authHeader() })
}
const getSystemUserDetails = (id) => {
  return axios.get(API_URL + '/system-user/details/' + id, {
    headers: authHeader(),
  })
}
const getSystemUserPublicDetails = (id) => {
  return axios.get(API_URL + '/system-user/agent-public-details/' + id, {
    headers: authHeader(),
  })
}
const changeSystemUserStatus = (id) => {
  return axios.put(
    API_URL + '/system-user/changeStatus',
    { id: id },
    { headers: authHeader() },
  )
}

const updateSystemUser = (data) => {
  return axios.post(API_URL + '/system-user/update-profile', data, {
    headers: authHeader(),
  })
}
const agentWiseProperties = (data) => {
  return axios.post(API_URL + '/property/agent-wise-property-list', data, {
    headers: authHeader(),
  })
}
const publicSystemUser = (data) => {
  return axios.post(API_URL + '/system-user/public-agent-list', data, {
    // headers: authHeader(),
  })
}
const SystemUserForUsers = (data) => {
  return axios.post(API_URL + '/system-user/agent-list', data, {
    headers: authHeader(),
  })
}
const contactUs = (data) => {
  return axios.post(API_URL + '/contact-us/submit', data, {
    headers: authHeader(),
  })
}

const deleteSystemUser = (id) => {
  return axios.delete(API_URL + '/system-user/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const uploadImage = (data) => {
  return axios.put(API_URL + '/user/update-profile-picture', data, {
    headers: authHeader(),
  })
}

const resetpassword = (id) => {
  return axios.put(
    API_URL + '/system-user/reset',
    { id: id },
    { headers: authHeader() },
  )
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getSystemUserList,
  getSystemUserDetails,
  changeSystemUserStatus,
  updateSystemUser,
  deleteSystemUser,
  getMeInfo,
  publicSystemUser,
  SystemUserForUsers,
  getSystemUserPublicDetails,
  contactUs,
  agentWiseProperties,
  uploadImage,
  resetpassword,
}
