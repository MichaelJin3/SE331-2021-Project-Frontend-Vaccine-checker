import apiClient from "./axiosClient";
import GlobalStorage from '../store'

export default {
    getDoctor(id){
        return apiClient.get('/doctors/' + id)
    },
    getPatientInCare(id){
        return apiClient.get('/get-patients/' + id)
    },
    getSpecificPatient(id){
        return apiClient.get('/patient/' + id)
    },
    postSugession(data){
        return apiClient.post('/comment',{
            "content": data.content,
            "comment_by": data.comment_by,
            "comment_to": data.comment_to 
        })
    }
}