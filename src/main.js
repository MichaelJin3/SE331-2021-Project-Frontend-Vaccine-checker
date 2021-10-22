import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import css from './assets/css/style.css';

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import http from './utils/http'



const app = createApp(App)

// 挂载到全局
app.config.globalProperties.$axios = http
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')