import apiClient from "./axiosClient";
import GlobalStorage from '../store'

export default {
    getPatient(id){
        return apiClient.get('/patient/' + id)
    }
}