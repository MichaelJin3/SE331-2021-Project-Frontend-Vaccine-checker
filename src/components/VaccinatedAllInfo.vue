<script>
import VaccineType from '../components/VaccineType.vue'
export default {
    props: ['vaccinatedPerson'],
    data() {
        return {
            age: 0,
        }
    },
    components: {
        VaccineType,
    },
    created() {
        const date = new Date()
        const current = new Date(this.vaccinatedPerson.date_of_birth)
        this.age = parseInt(date.getFullYear()) - parseInt(current.getFullYear())
    },
}
</script>
<template>
    <div>
        <h1 class="text-3xl font-bold pt-8 lg:pt-0">
            <span v-if="vaccinatedPerson.sex == 'male'">Mr. </span>
            <span v-else>Ms.</span>
            {{ this.vaccinatedPerson.firstname }} {{ this.vaccinatedPerson.lastname }}
        </h1>

        <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

        <p class="pt-4 text-base font-medium flex items-center justify-center lg:justify-start">
            <span class="font-bold px-1">Sex: </span> {{ this.vaccinatedPerson.sex }}
        </p>

        <p class="pt-4 text-base font-medium flex items-center justify-center lg:justify-start">
            <span class="font-bold px-1">Hometown: </span> {{ this.vaccinatedPerson.hometown }}
        </p>

        <p class="pt-4 text-base font-medium flex items-center justify-center lg:justify-start">
            <span class="font-bold px-1">Age: </span> {{ this.age }}
        </p>

        <p v-if="this.vaccinatedPerson.takeCare!=null" class="pt-4 text-base font-medium flex items-center justify-center lg:justify-start">
            <span class="font-bold px-1">take care by: </span>Dr. {{ this.vaccinatedPerson.takeCare.firstname }} {{ this.vaccinatedPerson.takeCare.lastname }}
        </p>
        <p v-else class="pt-4 text-base font-medium flex items-center justify-center lg:justify-start">
            <span class="font-bold px-1">take care by: not assign doctor yet </span>
        </p>
    </div>    
    <br />
    <div>
        <h1 class="text-3xl font-bold pt-8 lg:pt-0">Receieved Vaccine</h1>

        <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

        <div class="pt-6 pb-8">
            <VaccineType v-for="vaccine in this.vaccinatedPerson.vaccinated_list" :key="vaccine.injected_vaccine" :vaccine="vaccine" />
        </div>
    </div>
</template>

