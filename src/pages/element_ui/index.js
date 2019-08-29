import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './index.scss';
import App from './App.vue';
Vue.use(ElementUI);

new Vue({
    el: '#root',
    render: h => h(App)
});
