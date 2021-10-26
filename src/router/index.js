import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import NotFound from '../pages/NotFound.vue'
import NetWorkErr from '../pages/NetworkErr.vue'
import VaccinatedInfo from '../pages/VaccinatedInfo.vue'
import DoctorInfo from '../pages/DoctorInfo.vue'
import VaccinatedProfileCard from '../components/VaccinatedProfileCard.vue'
import VaccinatedVaccineCard from '../components/VaccinatedVaccineCard.vue'
import PatientList from '../components/adminComponent/PatientList.vue'
import DoctorList from '../components/adminComponent/DoctorList.vue'
import UnverifyList from '../components/adminComponent/UnverifyList.vue'
import PatientInCareList from '../components/adminComponent/PatientInCareList.vue'
import VaccinatedAllInfo from '../components/VaccinatedAllInfo.vue'
import LandingPage from '../pages/LandingPage.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import NProgress from 'nprogress'
import patientAPI from '../services/patientAPI'
import doctorAPI from '../services/doctorAPI'
import GlobalState from '../store/index'

const name = ['Roger', 'Lipton', 'SomChai', 'Lillie', 'Light']

function isValidDoctor(DocName) {
    for (let i of name) {
        if (DocName === i) {
            return true
        }
    }
    return false
}

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/register',
        name: 'Register',
        component: Register 
    },
    {
        path: '/login',
        name: 'Login',
        component: Login 
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        beforeEnter: (to) =>{
            if(GlobalState.currentUser.authorities[0] !== "ROLE_ADMIN" && GlobalState.currentUser.authorities[0] !== "ROLE_DOCTOR"){
                return {name : 'LandingPage'}
            }
        },
        children : [
            {
                path: '',
                name: 'GetPatient',
                props: (route) => ({ page: parseInt(route.query.page) || 1 }),
                component: PatientList
            },
            {
                path: 'doctor',
                name: 'GetDoctor',
                props: (route) => ({ page: parseInt(route.query.page) || 1 }),
                component: DoctorList 
            },
            {
                path: 'unverify',
                name: 'GetUnverifyUser',
                props: (route) => ({ page: parseInt(route.query.page) || 1 }),
                component: UnverifyList
            },
            {
                path: 'patient-in-care',
                name: 'GetPatientInCare',
                props: (route) => ({ page: parseInt(route.query.page) || 1 }),
                component: PatientInCareList 
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/vaccinated/:id',
        name: 'Vaccinated',
        component: VaccinatedInfo,
        props: true,
        beforeEnter: (to) => {
            if(GlobalState.currentUser.authorities[0] === "ROLE_DOCTOR"){
                return doctorAPI.getSpecificPatient(to.params.id).then((res) => {
                    GlobalState.vaccinatedPerson = res.data    
                }).catch((err) => {
                    if (error.response && error.response.status == 404) {
                        return {
                            name: '404Resource',
                            params: { resource: 'event' },
                        }
                    } else {
                        return { name: 'NetworkError' }
                    }
                }) 
            }
            return patientAPI 
                .getPatient(to.params.id)
                .then((res) => {
                    console.log(res.data)
                    GlobalState.vaccinatedPerson = res.data    
                })
                .catch((err) => {
                    if (error.response && error.response.status == 404) {
                        return {
                            name: '404Resource',
                            params: { resource: 'event' },
                        }
                    } else {
                        return { name: 'NetworkError' }
                    }
                })
        },
        children: [
            {
                path: '',
                name: 'VaccinatedAllInfo',
                component: VaccinatedAllInfo,
            },
            {
                path: 'info',
                name: 'VaccinatedInfo',
                component: VaccinatedProfileCard,
            },
            {
                path: 'vaccine',
                name: 'VaccinatedVaccine',
                component: VaccinatedVaccineCard,
            },
        ],
    },
    {
        path: '/doctor/:id',
        name: 'Doctor',
        component: DoctorInfo ,
        beforeEnter: (to) => {
            return doctorAPI 
                .getDoctor(to.params.id)
                .then((res) => {
                    console.log(res.data)
                    GlobalState.doctor = res.data    
                })
                .catch((err) => {
                    if (error.response && error.response.status == 404) {
                        return {
                            name: '404Resource',
                            params: { resource: 'event' },
                        }
                    } else {
                        return { name: 'NetworkError' }
                    }
                })
        },
    },
    {
        path: '/404/:resource',
        name: '404Resource',
        component: NotFound,
        props: true,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound,
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetWorkErr,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(() => {
    NProgress.start()
})

router.beforeEach(() => {
    NProgress.done()
})

export default router
