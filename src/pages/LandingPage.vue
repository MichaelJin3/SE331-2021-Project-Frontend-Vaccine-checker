<template>
    <DefaultLayout>
        <div class="pt-24">
            <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <p class="uppercase tracking-loose w-full">The Vaccinated Checker</p>
                    <h1 class="my-4 text-5xl font-bold leading-tight">Manage and check your vaccinated data today</h1>
                    <p class="leading-normal text-2xl mb-8">
                        You can use this application to manage your patient, check your data, or do your thing. 
                    </p>

                    <router-link to="/register">
                        <button 
                            class="
                            mx-auto
                            lg:mx-0
                            hover:underline
                            bg-green-500
                            text-gray-100
                            font-bold
                            rounded-full
                            my-6
                            py-4
                            px-8
                            shadow-lg
                            focus:outline-none focus:shadow-outline
                            transform
                            transition
                            hover:scale-105
                            duration-300
                            ease-in-out
                        ">
                        Register now 
                        </button>
                    </router-link>
                </div>
                <!--Right Col-->
                <div class="w-full md:w-3/5 py-6 text-center">
                    <img class="w-full md:w-4/5 z-50" src="https://image.freepik.com/free-vector/covid-19-vaccine-vector-doodle-illustration-vial-with-needle-doodle-clinical-trial_53876-136671.jpg" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
export default {
    name: 'Register',
    inject: ['GlobalState'],
    components: {
        DefaultLayout,
    },
}
</script>