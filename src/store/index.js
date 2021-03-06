import { reactive } from 'vue'

export default reactive(
    {
        flashMessage: '',
        details: null,
        vaccinatedPerson: null,
        doctor:null,
        isdoctor: false,
        doctorName: '',
        doctorComment: [],
        currentUser: JSON.parse(localStorage.getItem('user')),
    },
    { flashEdit: '' }
)
