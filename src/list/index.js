import Vue from 'vue';
import './components';
import './index.scss';
import App from './App.vue';

new Vue({
    el: '#root',
    render(h) {
        return h(App)
    }
});
