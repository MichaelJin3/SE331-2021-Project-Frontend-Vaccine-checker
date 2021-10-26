<template>
    <router-link to="/home">
        <div class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img class="object-cover w-full h-56" :src="user.imageUrls[0]" alt="avatar">
            <div class="py-5 text-center">
                <router-link :to="{name:'Home'}" class="block text-2xl font-bold text-gray-800 hover:text-green-500">{{user.firstname}} {{user.lastname}}</router-link>

                <router-link to="/home"
                  class="text-sm text-gray-700 hover:text-green-300">
                     {{ date }}
                </router-link>
            </div>
        </div>
    </router-link>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'DoctorCard',
  props: {
      user: {
          type: Object,
          required: true,
      },
  },
  data(){
      return {
          date: ''
      }
  },
    created() {
        const d = dayjs(this.user.date_of_birth);
        this.date = d.format('dddd MMMM D, YYYY');
    }
}
</script>