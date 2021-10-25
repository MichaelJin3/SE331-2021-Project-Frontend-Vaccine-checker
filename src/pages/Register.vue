<template>
    <DefaultLayout>
          <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>
        
        <Form @submit="handleRegister" :validation-schema="schema">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                    <Field name="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="username" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                    <Field name="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="emailAddress" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                    <Field name="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="password" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label>
                    <Field name="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="passwordConfirmation" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="firstname">Firstname</label>
                    <Field name="firstname" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="firstname" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="lastname">Lastname</label>
                    <Field name="lastname" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="lastname" class="text-red-500"/>
                </div>
                
                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="sex">sex</label>
                    <Field name="sex" as="select" :v-slot="{sex}" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </Field>
                    <ErrorMessage name="sex" class="text-red-500"/>
                </div>

                <div>
                    <label class="text-gray-700 dark:text-gray-200" for="hometown">Home town</label>
                    <Field name="hometown" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    <ErrorMessage name="hometown" class="text-red-500"/>
                </div>
            </div>

            <div class="flex justify-end mt-6">
                <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Sign up</button>
            </div>
        </Form>
    </section>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import RegisterService from '../services/registerAPI'
import * as yup from 'yup'
export default {
    name:"Register",
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
            .required('Username is required!')
            .min(3,'Must be at least 3 characters!')
            .max(20, 'Must be maximum 20 characters'),
            emailAddress : 
            yup.string()
            .required('Email is required!')
            .email("Email is invalid!")
            .max(50,"no longer than 50 character"),
            password: 
            yup.string()
            .required("password is required")
            .min(6,"Must be at least 6 character")
            .max(40,"no longer than 40 character"),
            passwordConfirmation: 
            yup.string()
            .required("you need to confirm you password")
            .oneOf([yup.ref("password")],"password is not match"),
            firstname :
            yup.string()
            .required("your firstname is required!")
            .min(2,'Your name need to be at least 2 character')
            .max(50,'No one have that much long firstname'),
            lastname : 
            yup.string()
            .required("your lastname is required!")
            .min(2,'Your lastname need to be at least 2 character')
            .max(50,'No one have that much long lastname'),
            sex : yup.string()
            .required("your sex is required!"),
            hometown : 
            yup.string()
            .required("your hometown is required!"),
        })
        return {
            sex: '',
            schema
        }
    },
    methods:{
        handleRegister(user){
            RegisterService.register(user)
            .then(()=>{
                this.$router.push({name:'LandingPage'})
            }).catch(()=>{
                console.log("could not register")
            })            
        }
    }
}
</script>