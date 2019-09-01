const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
function _path(p) {return path.resolve(__dirname, '../', p);}
// const { isProduction } = require('webpack-mode');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    // mode: 'development',
    mode: 'none',

    entry: {
        // lodash: ['lodash'],
        jquery: ['jquery'],
        vue: ['vue'],
        react: ['react', 'react-dom'],
        // element_ui: ['element-ui','element-ui/lib/theme-chalk/index.css'],
    },
    output: {
        library: '_dll_[name]',
        path: _path('cache'),
        filename: isProduction?'[name].[contenthash].dll.js':'[name].dll.js',
        chunkFilename: isProduction?'[name].[contenthash].chunk.dll.js':'[name].chunk.dll.js'
    },
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            // {
            //     test: /\.js$/,
            //     loader: "babel-loader",
            //     options: {
            //         cacheDirectory: true
            //     },
            //     exclude: /node_modules/
            // },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader
            //         },
            //         'css-loader',
            //     ]
            // },
            // {
            //     test: /\.(eot|woff2?|ttf|svg)$/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 name: isProduction?"[name].dll.[hash].[ext]":'[name].dll.[ext]',
            //                 limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            //                 publicPath: "fonts/",
            //                 outputPath: "fonts/"
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: 'url-loader?limit=8192'
            // }
        ]
    },
    externals: {
    },
    plugins: [
        new webpack.DllPlugin({
            // name: "[name]",
            name: '_dll_[name]',
            path: _path("cache/[name].dll.manifest.json"),
            // context: __dirname,
            context: path.resolve(__dirname, '../node_modules'),
        }),
        // new ManifestPlugin({
        //     fileName: 'dll.manifest.json',
        //     // publicPath: publicPath,
        // }),
        new WebpackAssetsManifest({
            output: _path('cache/dll.manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: isProduction?'[name].[contenthash].dll.css':'[name].dll.css',
            chunkFilename: isProduction?'[name].[contenthash].chunk.dll.css':'[name].chunk.dll.css',
            ignoreOrder: false
        }),
    ]
};
