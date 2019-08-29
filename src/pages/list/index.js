import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import './components';
import './index.scss';
import App from './App.vue';

new Vue({
    el: '#root',
    render(h) {
        return h(App)
    }
});
