const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
function _path(p) {return path.resolve(__dirname, p);}
const { isProduction } = require('webpack-mode');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: 'development',
    mode: 'none',

    entry: {
        lodash: ['lodash'],
        vue: ['vue'],
        react: ['react','react-dom'],
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
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: isProduction?"[name]-[hash].dll.[ext]":'[name].dll.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=8192'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new webpack.DllPlugin({
            // name: "[name]",
            name: '_dll_[name]',
            path: path.join(__dirname, "./cache/", "[name].dll.manifest.json"),
            // context: __dirname
        }),
        new ManifestPlugin({
            fileName: 'dll-manifest.json',
            // publicPath: publicPath,
        }),
        new MiniCssExtractPlugin({
            filename: isProduction?'[name].[contenthash].dll.css':'[name].dll.css',
            chunkFilename: isProduction?'[id].[name].[contenthash].chunk.dll.css':'[id].[name].chunk.dll.css',
            ignoreOrder: false
        }),
    ]
};
