import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SvgIcon from 'vue-svgicon';
import 'typeface-quicksand';

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
    tagName: 'svgicon',
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
