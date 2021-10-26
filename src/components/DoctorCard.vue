<template>
    <router-link to="/home">
        <div class="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img class="object-cover w-full h-56" :src="doctor.imageUrls[0]" alt="avatar">
            <div class="py-5 text-center">
                <router-link :to="{name:'Home'}" class="block text-2xl font-bold text-gray-800 hover:text-green-500">{{doctor.firstname}} {{doctor.lastname}}</router-link>

                <router-link to="/home"
                  class="text-sm text-gray-700 hover:text-green-300">
                     {{ doctor.hospital }}
                </router-link>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
      doctor: {
          type: Object,
          required: true,
      },
  },
}
</script>