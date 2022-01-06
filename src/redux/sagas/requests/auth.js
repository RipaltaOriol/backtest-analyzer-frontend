import axios from 'axios'

const API = process.env.REACT_APP_API;

export function requestGetAuth(user) {
  return axios.request({
    method: 'post',
    url: API + '/login',
    data: user
  })
}