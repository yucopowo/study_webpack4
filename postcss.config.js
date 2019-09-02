const isProduction = (process.env.NODE_ENV === 'production');
const isIE = (process.env.BROWSER === 'ie');

module.exports = {
    plugins: [

        ...[].concat((isProduction||isIE)?[
            require('autoprefixer')
        ]:[]),

        ...[].concat((isProduction)?[
            require('cssnano')({
                preset: 'default',
            })
        ]:[]),

    ]
};