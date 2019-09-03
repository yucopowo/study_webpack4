import $ from 'jquery';
import _ from 'lodash';

import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Vuex from 'vuex'
Vue.use(Vuex);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import echarts from 'echarts';

import './index.scss';
import App from './App.vue';

import FooComponent from './components/AComponent.vue';
import BarComponent from './components/BComponent.vue';

const routes = [
    { path: '/foo', component: FooComponent },
    { path: '/bar', component: BarComponent  }
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
    },
    mounted() {

        $('#hello').append('<div>=======</div>');

        console.log(_.assign({}, {a:1}));



        const myChart = echarts.init(document.getElementById('main'));
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        myChart.setOption(option);
    }
});
