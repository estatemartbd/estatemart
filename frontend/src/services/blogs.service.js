import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getBlogsList = () => {
  return axios.get(API_URL + '/blog/list', { headers: authHeader() })
}
const getActiveBlogsList = () => {
  return axios.get(API_URL + '/blog/activeList', { headers: authHeader() })
}

const blogAdd = (data) => {
  return axios.post(API_URL + '/blog/add', data, { headers: authHeader() })
}

const blogEdit = (data) => {
  return axios.put(API_URL + '/blog/update', data, { headers: authHeader() })
}
const deleteBlogs = (id) => {
  return axios.delete(API_URL + '/blog/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/blog/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getBlogsDetails = (id) => {
  return axios.get(API_URL + '/blog/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getBlogsList,
  getActiveBlogsList,
  blogAdd,
  deleteBlogs,
  changeStatus,
  getBlogsDetails,
  blogEdit,
}
