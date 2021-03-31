import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        campLocation: ''
    },
    getters: {
        campLocation: state => {
            return state.campLocation;
        }
    },
    mutations: {
        changeLocation(state, location) {
            state.campLocation = location;
        }
    },
    actions: {
        changeLocation({ commit }, location) {
            commit('changeLocation', location);
        }
    },
    strict: process.env.NODE_ENV !== 'production'
});

export default store;