import axios from 'axios'
import { API_URL } from './basePath'

// const register = (username, email, password) => {
//   return axios.post(API_URL + 'signup', {
//     username,
//     email,
//     password,
//   })
// }
const register = (data) => {
  return axios.post(API_URL + '/user/registration', data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
const login = (email, password) => {
  return axios
    .post(
      API_URL + '/authentication/login',
      {
        user_email_or_phone: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
    .then((response) => {
      console.log(response.data)
      if (response.data.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('formData')
}

export default {
  register,
  login,
  logout,
}
