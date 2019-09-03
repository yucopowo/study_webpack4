module.exports = {
    title: 'demo_all',
    url: '/demo_all',
    template: 'demo_all',
    dll: {
        demo_all_vendor: [
            'jquery','lodash',
            'vue','vue-router','vuex',
            'echarts',
            'element-ui',
            //'element-ui/lib/theme-chalk/index.css'
        ],
    },
    entry: {
        demo_all_bundle: '@pages/demo_all/index.js'
    },
    data: {

    }
};
