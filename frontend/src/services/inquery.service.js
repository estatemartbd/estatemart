/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const submitInquery = (data) => {
  return axios.put(API_URL + '/inquiry/submit-inquiry', data, {
    headers: authHeader(),
  })
}
const getSubmittedInqueries = () => {
  return axios.get(API_URL + '/inquiry/my-submitted-list', {
    headers: authHeader(),
  })
}
const getRecievedInqueries = () => {
  return axios.get(API_URL + '/inquiry/my-received-list', {
    headers: authHeader(),
  })
}
const getInquiryListForAdmin = () => {
  return axios.get(API_URL + '/inquiry/list-admin', { headers: authHeader() })
}

const getInqueryDetails = (id) => {
  return axios.get(API_URL + '/inquiry/details/' + id, {
    headers: authHeader(),
  })
}
const markRead = (id) => {
  return axios.post(
    API_URL + '/inquiry/read-inquiry',
    { id: id },
    {
      headers: authHeader(),
    },
  )
}
const inqueryDelete = (id) => {
  return axios.delete(API_URL + '/inquiry/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

export default {
  submitInquery,
  getSubmittedInqueries,
  getRecievedInqueries,
  getInquiryListForAdmin,
  getInqueryDetails,
  markRead,
  inqueryDelete,
}
