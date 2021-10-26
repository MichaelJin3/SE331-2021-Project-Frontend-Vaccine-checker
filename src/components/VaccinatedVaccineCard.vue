<script>
import VaccineType from '../components/VaccineType.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AdminAPI from '../services/adminAPI'
export default {
    props: ['vaccinatedPerson'],
    inject: ['GlobalState'],
    components: {
        VaccineType,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            vaccine: yup.string().required('vaccine is required!'),
            date: yup.string().required('date is required!'),
        })
        return {
            schema
        }
    },
    methods : {
        updateVaccine(vaccine){
            let updateData = {
                "vaccinated_when":vaccine.date,
                "patient_id":this.vaccinatedPerson.id,
                "vaccine_id":vaccine.vaccine
            }
            AdminAPI.updateVaccine(updateData)
            .then(()=>{
                this.$router.push({name:'VaccinatedAllInfo', params: { id: this.vaccinatedPerson.id }})
            })
        }
    }
}
</script>
<template>
    <div>
        <h1 class="text-3xl font-bold pt-8 lg:pt-0">Receieved Vaccine</h1>

        <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

        <div class="pt-6 pb-8">
            <VaccineType
                v-for="vaccine in this.vaccinatedPerson.vaccinated_list"
                :key="vaccine.injected_vaccine"
                :vaccine="vaccine"
            />
        </div>
        <Form @submit="updateVaccine" v-if="GlobalState.currentUser.authorities[0] === 'ROLE_ADMIN'" :validation-schema="schema">
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="vaccine">update vaccine</label>
                <Field
                    name="vaccine"
                    as="select"
                    :v-slot="{ vaccine_id }"
                    class="
                        block
                        w-full
                        px-4
                        py-2
                        mt-2
                        text-gray-700
                        bg-white
                        border border-gray-300
                        rounded-md
                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                        focus:border-blue-500
                        dark:focus:border-blue-500
                        focus:outline-none focus:ring
                    "
                >
                    <option value="1">AstraZeneca</option>
                    <option value="2">Johnson and Johnson's Janssen</option>
                    <option value="3">Pfizer</option>
                    <option value="4">Modena</option>
                    <option value="5">Sinovac</option>
                    <option value="6">Novavax</option>
                </Field>
                <ErrorMessage name="vaccine" class="text-red-500" />
            </div>
            <div>
                <label class="text-gray-700 dark:text-gray-200" for="date">vaccinated date</label>
                <Field
                    name="date"
                    type="date"
                    min="2020-01-01"
                    class="
                        block
                        w-full
                        px-4
                        py-2
                        mt-2
                        text-gray-700
                        bg-white
                        border border-gray-300
                        rounded-md
                        dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600
                        focus:border-blue-500
                        dark:focus:border-blue-500
                        focus:outline-none focus:ring
                    "
                />
                <ErrorMessage name="date" class="text-red-500" />
            </div>
            <div class="flex justify-end mt-6">
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">update</button>
            </div>
        </Form>
    </div>
</template>