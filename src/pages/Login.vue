<template>
    <DefaultLayout>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
        
        <Form @submit="handleLogin" :validation-schema="schema">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                    <Field name="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="username" class="text-red-500"/>
                </div>
                <div></div> 
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                    <Field name="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="password" class="text-red-500"/>
                </div>
            </div>
            <div class="flex justify-center mt-6">
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Sign up</button>
            </div>
        </Form>
        </section>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Login from '../services/loginAPI'
import * as yup from 'yup'
export default {
    name:"Login",
    inject:['GlobalState'],
    components:{
        DefaultLayout,
        Form,
        Field,
        ErrorMessage
    },
    data(){
        const schema = yup.object().shape({
            username:
            yup.string()
            .required('Username is required!'),
            password: 
            yup.string()
            .required("password is required")
        })
        return {
            schema
        }
    },
    methods:{
        handleLogin(user){
            Login.login(user)
            .then(()=>{
                this.$router.push({name:'Home'})
            }).catch(()=>{
                console.log("could not login")
            })            
        }
    }
}
</script>