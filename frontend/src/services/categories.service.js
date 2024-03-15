import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getCategoriesList = () => {
  return axios.get(API_URL + '/categories/list', { headers: authHeader() })
}

const deleteCategories = (id) => {
  return axios.delete(API_URL + '/categories/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/categories/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getCategoriesDetails = (id) => {
  return axios.get(API_URL + '/categories/details/' + id, {
    headers: authHeader(),
  })
}

const getPropertyByCategory = (data) => {
  return axios.post(API_URL + '/property/list', data, {
    headers: authHeader(),
  })
}

const getPropertyByCategoryUser = (data) => {
  return axios.post(API_URL + '/property/list-after-login', data, {
    headers: authHeader(),
  })
}
export default {
  getCategoriesList,
  deleteCategories,
  changeStatus,
  getCategoriesDetails,
  getPropertyByCategory,
  getPropertyByCategoryUser,
}
