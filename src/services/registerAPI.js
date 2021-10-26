import apiClient from "./axiosClient";
import GlobalStorage from '../store'
export default{
    register(user){
        console.log(user)
        return apiClient.post('/registers',{
            "username" : user.username,
            "password" : user.password,
            "sex" : user.sex,
            "firstname" : user.firstname,
            "lastname" : user.lastname,
            "email" : user.email,
            "hometown" : user.hometown,
            "birthday": user.birthday
        }).then((response) => {
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('user',JSON.stringify(response.data.user))
            GlobalStorage.currentUser = response.data.user
            return Promise.resolve(response.data)           
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}