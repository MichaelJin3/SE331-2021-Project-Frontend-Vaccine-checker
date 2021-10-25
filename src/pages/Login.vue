<template>
    <DefaultLayout>
        This is the Login page
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
export default {
    name:"Register",
    inject:['GlobalState'],
    components:{
        DefaultLayout
    }
}
</script>