<script>
import doctorAPI from '../services/doctorAPI'
export default {
    inject:['GlobalState'],
    data(){
        return {
            msg:""
        }
    },
    methods:{
        comment(){
            let data = {
                "content": this.msg,
                "comment_by": this.GlobalState.currentUser.id,
                "comment_to": this.GlobalState.vaccinatedPerson.id
            }
            doctorAPI.postSugession(data).then(()=>{
                this.$router.push({name:'VaccinatedAllInfo', params: { id: this.GlobalState.vaccinatedPerson.id }})
            })
        }
    } 
}
</script>
<template>
    <section class="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-3xl font-semibold text-left text-gray-800 dark:text-white">Doctor. {{GlobalState.doctorName}} comment</h2>
        
        <div class="mt-6 ">
            <div class="w-full mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Message</label>

                <textarea v-model="msg" class="block w-full h-20 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
            </div>

            <div class="flex justify-center mt-6">
                <button class="px-4 py-2 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600" @click="comment()">Send Comment</button>
            </div>
        </div>
    </section>
</template>