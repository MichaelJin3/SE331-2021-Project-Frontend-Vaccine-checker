<template>
    <DefaultLayout>
        <div class="divide-x-2 divide-green-500">
            <p class="text-2xl px-2 font-medium hover:text-green-300">{{ GlobalState.doctor.firstname }}</p>
        </div>
    </DefaultLayout>
    <DefaultLayout>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
        
        <Form @submit="assignDoctorToPatient" :validation-schema="schema">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="patient">patient that didn't have doctor in care yet</label>
                    <Field name="patient" as="select" :v-slot="{patient_id}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >
                        <option v-for="Pat in patients" :key="Pat.id" :value="Pat.id">{{Pat.firstname}}</option>
                    </Field>
                    <ErrorMessage name="patient" class="text-red-500"/>
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">assign</button>
            </div>
        </Form>
    </section>
    </DefaultLayout>
</template>
<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import adminAPI from '../services/adminAPI'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
export default {
    inject: ['GlobalState'],
    components: {
        DefaultLayout,
        Form,
        Field,
        ErrorMessage
    },
    created() {
        adminAPI.get100Patients().then((res) => {
            for(let pat of res.data){
                if(pat.takeCare === null){
                    this.patients.push(pat)
                }
            }
        })
    },
    data(){
        const schema = yup.object().shape({
            patient : yup.string()
            .required("you need to assign some patient to doctor"),
        })
        return {
            patients:[],
            patient_id:'',
            schema
        }
    },
    methods : {
        assignDoctorToPatient(data){
            let serve = {
                "patient_id": data.patient,
                "doctor_id": this.GlobalState.doctor.id 
            }
            adminAPI.givePatientAService(serve).then(()=>{
                this.$router.push({name:'VaccinatedAllInfo', params: { id: data.patient }})
            })
        }
    }
}
</script>