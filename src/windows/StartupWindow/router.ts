import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/startup/Welcome.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    fallback: true,
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: Welcome,
        },
        {
            path: '/new',
            name: 'newCamp',
            component: () => import(/* webpackChunkName: "newCamp" */ '@/views/startup/NewCamp.vue'),
        },
    ],
});

export default router;
