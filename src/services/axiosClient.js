import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://54.146.210.137:8999",

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
export default apiClient