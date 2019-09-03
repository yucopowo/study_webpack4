module.exports = {
    title: 'demo_bootstrap',
    url: '/demo_bootstrap',
    template: 'demo_bootstrap',
    dll: {
        demo_bootstrap_vendor: ['jquery','bootstrap', 'bootstrap/dist/css/bootstrap.css'],
    },
    entry: {
        demo_bootstrap_bundle: '@pages/demo_bootstrap/index.js'
    },
    data: {

    }
};
