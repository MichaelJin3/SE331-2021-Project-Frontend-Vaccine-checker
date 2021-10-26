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
            <UnverifyCard v-for="People in unverifyPeople" :key="People.id" :user="People" />
        </div>
    </DefaultLayout>
    <div v-if="GlobalState.isdoctor" class="flex justify-between justify-items-center py-5 px-36">
        <router-link id="page-prev" :to="{ name: 'Doctor',params:{name:GlobalState.doctorName} ,query: { page: page - 1 } }" rel="prev" v-if="page != 1">
            Prev</router-link
        >
        <div></div>
        <router-link id="page-next" :to="{ name: 'Doctor',params:{name:GlobalState.doctorName} ,query: { page: page + 1 } }" rel="next" v-if="hasNextPage">
            Next</router-link
        >
    </div>
    <div v-else class="flex justify-between justify-items-center py-5 px-36">
        <router-link id="page-prev" :to="{ name: 'Home', query: { page: page - 1 } }" rel="prev" v-if="page != 1">
            Prev</router-link
        >
        <div></div>
        <router-link id="page-next" :to="{ name: 'Home', query: { page: page + 1 } }" rel="next" v-if="hasNextPage">
            Next</router-link
        >
    </div>
</template>
<script>
import UnverifyCard from '../UnverifyCard.vue'
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
        UnverifyCard,
        DefaultLayout,
    },
    data() {
        return {
            unverifyPeople: null,
            totalPeople: 0,
        }
    },
    created() {
        watchEffect(() => {
            AdminAPI.getUnverify(3, this.page)
                .then((response) => {
                    this.unverifyPeople = response.data
                    this.totalPeople = response.headers['x-total-count']
                })
                .catch(() => {
                    console.log('err')
                })
        })
    },
    computed: {
        hasNextPage() {
            let totalPages = Math.ceil(this.totalPeople / 3) // 2 is events per page
            return this.page < totalPages
        },
    },
}
</script>