import axios from 'axios'

const API = process.env.REACT_APP_API;

export function requestGetFiles(token) {
  return axios.request({
    method: 'post',
    url: API + '/backtest',
    headers: { 'Authorization': 'Bearer ' + token }
  })
}