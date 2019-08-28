import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Vuex from 'vuex'
Vue.use(Vuex);

import './index.scss';
import App from './App.vue';

// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }
import AComponent from './components/AComponent.vue';
import BComponent from './components/BComponent.vue';
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/foo', component: AComponent },
    { path: '/bar', component: BComponent }
];

const router = new VueRouter({
    routes
});


const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
    }
});


new Vue({
    el: '#root',
    router,
    store,
    render(h) {
        return h(App)
    }
});
