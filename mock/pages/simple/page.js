module.exports = {
    title: 'simple',
    url: '/simple',
    template: 'simple',
    vendor: {
        // echarts: ['echarts'],
        // vue: ['vue','vue-router','vuex'],
        // element_ui: ['element-ui', 'element-ui/lib/theme-chalk/index.css'],
        // simple: [
        //     'jquery',
        //     'lodash',
        // ]

        simple_vendor: [
            'vue','vue-router','vuex',

            'element-ui/lib/index.js',
            'element-ui/lib/theme-chalk/index.css',


            'jquery',
            'lodash',

            'echarts',
        ]
    },
    bundle: {
        simple_bundle: '@pages/simple/index.js'
    },
    data: {

    }
};
