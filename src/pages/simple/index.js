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

new Vue({
    el: '#root',
    render(h) {

        return h('div', {}, [

            h('el-button',{}, '=====1333')

        ]);

    },
    mounted() {

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
