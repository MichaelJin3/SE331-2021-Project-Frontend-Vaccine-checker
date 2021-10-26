import apiClient from "./axiosClient";
import GlobalStorage from '../store'

export default {
    getPatients(perPage, page){
        return apiClient.get('/patients?_limit=' + perPage + '&_page=' + page)
    },
    getPatient(id){
        return apiClient.get('/patients/' + id)
    },
    getDoctors(perPage, page){
        return apiClient.get('/doctors?_limit=' + perPage + '&_page=' + page)
    },
    getDoctor(id){
        return apiClient.get('/doctors/' + id)
    },
    getUnverify(perPage, page){
        return apiClient.get('/un-verify-users?_limit=' + perPage + '&_page=' + page)
    },
    verifyAsDoctor(id){
        return apiClient.post('/verify-user/' + id + '/doctor' )
    },
    verifyAsPatient(id){
        return apiClient.post('/verify-user/' + id + '/patient' )
    },
    updateVaccine(data){
        return apiClient.post('/update-vaccine',{
            "vaccinated_when":data.vaccinated_when,
            "patient_id":data.patient_id,
            "vaccine_id":data.vaccine_id
        })
    }
}