<script>
import LoginAPI from '../services/loginAPI' 
export default {
    inject:['GlobalState'],
    data(){
       return {
           toggle:false,
           doctors:[
               "Roger",
               "Lipton",
               "SomChai",
               "Lillie",
               "Light"
           ]
       }
   }, 
   methods: {
      logout(){
        LoginAPI.logout()
        this.$router.push({name:'LandingPage'})
      } 
   },
}
</script>
<template>
    <nav class="bg-white shadow dark:bg-gray-800">
        <div  class="container px-6 py-4 mx-auto">
            <div v-if="GlobalState.currentUser != null" class="md:flex md:items-center md:justify-between">
                
                <div class="flex items-center justify-between">
                    <div class="text-xl font-semibold text-gray-700">
                        <router-link class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700" to="/home">SE331</router-link>
                    </div>
                </div>

                <div class="flex-1 md:flex md:items-center md:justify-between">
                    <div class="flex flex-row -mx-4 md:flex-row md:items-center md:mx-8">
                        <router-link to="/home" class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 hover:bg-gray-300">Home</router-link>
                    </div>
                    <div class="flex items-right mt-4 md:mt-0 relative">
                            <button @click="logout" 
                            class="relative z-10 block p-2 bg-white rounded-md hover:text-green-600">
                                Logout 
                            </button>
                    </div>
                </div>
            </div>

            <div v-else class="md:flex md:items-center md:justify-between">
                
                <div class="flex items-center justify-between">
                    <div class="text-xl font-semibold text-gray-700">
                        <router-link class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700" to="/">SE331</router-link>
                    </div>
                </div>

                <div class="flex-1 md:flex md:items-center md:justify-between">
                    <div class="flex flex-row -mx-4 md:flex-row md:items-center md:mx-8">
                        <router-link to="/" class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 hover:bg-gray-300">Home</router-link>
                    </div>

                    <div class="flex items-right mt-4 md:mt-0 relative">
                        <router-link class="relative z-10 block p-2 bg-white rounded-md hover:text-green-600" to="/login">
                           Login 
                        </router-link>
                        <router-link class="relative z-10 block p-2 bg-white rounded-md hover:text-green-600" to="/register">
                            Reigster 
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>