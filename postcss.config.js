const isProduction = (process.env.NODE_ENV === 'production');
const isBuild = (process.env.NODE_ENV === 'build');
const isIE = (process.env.BROWSER === 'ie');

module.exports = {
    plugins: [

        ...[].concat((isBuild||isProduction||isIE)?[
            require('autoprefixer')
        ]:[]),

        ...[].concat((isProduction)?[
            require('cssnano')({
                preset: 'default',
            })
        ]:[]),

    ]
};