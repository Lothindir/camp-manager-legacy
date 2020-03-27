import Vue from 'vue';
import Router from 'vue-router';
import Planification from '@/views/Planification.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'planification',
            component: Planification,
        },
        {
            path: '/participants',
            name: 'participants',
            component: () => import(/* webpackChunkName: "participants" */ '../../views/Participants.vue'),
        },
        {
            path: '/config',
            name: 'config',
            component: () => import(/* webpackChunkName: "config" */ '../../views/Config.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ '../../views/Profile.vue'),
        },
    ],
});

export default router;
