import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './basePath'

const getPackageList = () => {
  return axios.get(API_URL + '/package/list', { headers: authHeader() })
}

const packageAdd = (data) => {
  return axios.post(API_URL + '/package/add', data, { headers: authHeader() })
}

const packageEdit = (data) => {
  return axios.put(API_URL + '/package/update', data, { headers: authHeader() })
}
const deletePackage = (id) => {
  return axios.delete(API_URL + '/package/delete', {
    headers: authHeader(),
    data: {
      id: id,
    },
  })
}

const changeStatus = (id) => {
  return axios.put(
    API_URL + '/package/changeStatus',
    {
      id: id,
    },
    { headers: authHeader() },
  )
}

const getPackageDetails = (id) => {
  return axios.get(API_URL + '/package/details/' + id, {
    headers: authHeader(),
  })
}

export default {
  getPackageList,
  packageAdd,
  deletePackage,
  changeStatus,
  getPackageDetails,
  packageEdit,
}
