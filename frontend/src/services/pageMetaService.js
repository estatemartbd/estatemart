/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getList = () => {
  return axios.get(API_URL + '/page-meta/list', {
    headers: authHeader(),
  })
}
const updateMeta = (data) => {
  return axios.put(API_URL + '/page-meta/update', data, {
    headers: authHeader(),
  })
}

const getDetails = (id) => {
  return axios.get(API_URL + '/page-meta/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getList,
  updateMeta,
  getDetails,
}
