import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getBannerList = () => {
  return axios.get(API_URL + '/banner/list', { headers: authHeader() })
}

const getBannerFrontendList = (data) => {
  return axios.post(API_URL + '/banner/bannerFrontendList', data)
}

const getActiveList = () => {
  return axios.get(API_URL + '/banner/activeList', { headers: authHeader() })
}
const bannerAdd = (data) => {
  return axios.post(API_URL + '/banner/add', data, { headers: authHeader() })
}
const bannerEdit = (data) => {
  return axios.put(API_URL + '/banner/update', data, { headers: authHeader() })
}
const deleteBanner = (id) => {
  return axios.delete(API_URL + '/banner/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/banner/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getBannerDetails = (id) => {
  return axios.get(API_URL + '/banner/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getBannerList,
  getActiveList,
  bannerAdd,
  deleteBanner,
  changeStatus,
  getBannerDetails,
  bannerEdit,
  getBannerFrontendList
}
