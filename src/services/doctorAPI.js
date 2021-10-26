import apiClient from "./axiosClient";
import GlobalStorage from '../store'

export default {
    getDoctor(id){
        return apiClient.get('/doctors/' + id)
    }
}