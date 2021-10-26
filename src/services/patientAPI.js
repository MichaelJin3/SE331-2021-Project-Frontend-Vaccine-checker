import apiClient from "./axiosClient";
import GlobalStorage from '../store'

export default {
    getPatients(perPage, page){
        return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
    },
    getPatient(id){
        return apiClient.get('/patients/' + id)
    }
}