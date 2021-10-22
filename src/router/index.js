import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/Home')
    },
    {
        path: '/people_list',
        name: 'people_list',
        component: () =>
            import ('../views/people_list')
    },
    {
        path: '/people_show',
        name: 'people_show',
        component: () =>
            import ('../views/people_show')
    }, ,
    {
        path: '/people_input',
        name: 'people_input',
        component: () =>
            import ('../views/people_input')
    },

    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () =>
            import ('../views/404')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router