<template>
    <CustomerHeader />

    <DefaultLayout>
        <div v-if="GlobalState.currentUser.authorities[0] === 'ROLE_ADMIN'" class="divide-x-2 divide-green-500">
            <router-link :to="{name:'GetPatient'}" class="text-2xl px-2 font-medium hover:text-green-300"> Patient </router-link>
            <router-link :to="{name:'GetDoctor'}"  class="text-2xl px-2 font-medium hover:text-green-300"> Doctor </router-link>
            <router-link :to="{name:'GetUnverifyUser'}"  class="text-2xl px-2 font-medium hover:text-green-300"> Unverify User </router-link>
            <span></span>
        </div>
        <div v-if="GlobalState.currentUser.authorities[0] === 'ROLE_DOCTOR'">
            <router-link :to="{name:'GetPatientInCare'}" class="text-2xl px-2 font-medium hover:text-green-300"> Patient </router-link>
        </div>
    </DefaultLayout>

    <router-view />

</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import CustomerHeader from '../components/Header.vue'
export default {
    name: 'Home',
    inject:['GlobalState'],
    props: {
        page: {
            type: Number,
            required: true,
        },
    },
    components: {
        DefaultLayout,
        CustomerHeader,
    },
}
</script>