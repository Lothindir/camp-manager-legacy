import Vue from 'vue';
import Router from 'vue-router';
import Config from '../../views/Config.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Config,
        },
    ],
});

export default router;
