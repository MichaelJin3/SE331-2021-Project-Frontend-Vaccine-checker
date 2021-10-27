import axios from 'axios'

const apiClient = axios.create({
  baseURL: "http://54.146.210.137:8999",
  // baseURL:"http://localhost:8080",

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    // headers: { "Access-Control-Allow-Origin": "*" }
  }
})
export default apiClient