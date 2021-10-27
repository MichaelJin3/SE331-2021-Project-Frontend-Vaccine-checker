<template>
    <div>
        <div class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img class="object-cover w-full h-56" :src="user.imageUrls[0]" alt="avatar" />
            <div class="py-5 text-center">
                <router-link :to="{ name: 'Home' }" class="block text-2xl font-bold text-gray-800 hover:text-green-500"
                    >{{ user.firstname }} {{ user.lastname }}</router-link
                >

                <router-link to="/home" class="text-sm text-gray-700 hover:text-green-300">
                    {{ date }}
                </router-link>

                
            </div>
            <div class="grid grid-cols-2 inline-flex">
                    <button @click="verifyAsPatient" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-l">
                        patient
                    </button>
                    <button @click="verifyAsDoctor" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                        doctor
                    </button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import AdminAPI from '../services/adminAPI'
export default {
    name: 'DoctorCard',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            date: '',
            user_id:''
        }
    },
    created() {
        const d = dayjs(this.user.date_of_birth)
        this.date = d.format('dddd MMMM D, YYYY')
    },
    methods:{
        verifyAsPatient(){
            AdminAPI.verifyAsPatient(this.user.id)
            this.$router.push({name:'GetPatient'})
        },
        verifyAsDoctor(){
            AdminAPI.verifyAsDoctor(this.user.id)
            this.$router.push({name:'GetDoctor'})
        }
    }
}
</script>