<template>
        <DefaultLayout>
        <div
            class="
                grid
                xl:grid-rows-1 xl:grid-cols-3
                xl:gap-4
                md:grid-rows-2 md:grid-cols-2
                md:gap-4
                sm:grid-rows-1 sm:grid-cols-1
                sm:gap-4
                grid-flow-row
            "
        >
            <DoctorCard v-for="People in doctorList" :key="People.id" :doctor="People" />
        </div>
    </DefaultLayout>
    <div class="flex justify-between justify-items-center py-5 px-36">
        <router-link id="page-prev" :to="{ name: 'GetDoctor', query: { page: page - 1 } }" rel="prev">
            Prev</router-link
        >
        <div></div>
        <router-link id="page-next" :to="{ name: 'GetDoctor', query: { page: page + 1 } }" rel="next">
            Next</router-link
        >
    </div>
</template>
<script>
import DoctorCard from '../DoctorCard.vue'
import DefaultLayout from '../../layouts/DefaultLayout.vue'
import AdminAPI from '../../services/adminAPI'
import { watchEffect } from '@vue/runtime-core'
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
        DoctorCard,
        DefaultLayout,
    },
    data() {
        return {
            doctorList: null,
            totalPeople: 0,
        }
    },
    created() {
        watchEffect(() => {
            AdminAPI.getDoctors(3, this.page)
                .then((response) => {
                    this.doctorList = response.data
                    this.totalPeople = response.headers['x-total-count']
                    console.log(response.data)
                })
                .catch(() => {
                    console.log('err')
                })
        })
    },
    computed: {
        hasNextPage() {
            let totalPages = Math.ceil(this.totalPeople / 3) // 2 is events per page
            console.log(this.GlobalState)
            return this.page < totalPages
        },
    },
}
</script>