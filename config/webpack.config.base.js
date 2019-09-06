const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const isDevelopment = (process.env.NODE_ENV === 'development');
const isProduction = (process.env.NODE_ENV === 'production');
const isBuild = (process.env.NODE_ENV === 'build');
const cache = (process.env.CACHE === 'true');
const base = require('./base')(__dirname, '../');

module.exports = {
    // mode: 'development',
    mode: 'none',
    output: {
        path: base('dist'),
        filename: isProduction?'[name].[contenthash].js':'[name].js',
        chunkFilename: isProduction?'[name].[contenthash].chunk.js':'[name].chunk.js'
    },
    module: {
        noParse: [/.elm$/],
        rules: [
            {
                test: /\.riot$/,
                exclude: /node_modules/,
                use: [{
                    loader: '@riotjs/webpack-loader',
                    options: {
                        hot: true
                    }
                }]
            },

            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: 'elm-webpack-loader'
            },

            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: { appendTsSuffixTo: [/\.vue$/] }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    hotReload: !isProduction
                }
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                },
                // exclude: /node_modules/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },

            {
                test: /\.(sa|sc|c)ss$/i,
                use: [

                    isDevelopment?'vue-style-loader':MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader',
                    'sass-loader',

                ],
                // exclude: /node_modules/,
            },


            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
            },

        ]
    },
    resolve: {
        alias: {
            '@images': base('assets/images'),
            '@pages': base('src/pages'),
            '@components': base('src/components'),
            '@utils': base('src/utils')
        },
        extensions: ['*', '.js', '.jsx', '.vue', '.tsx', '.ts', '.elm', '.css', '.scss']
    },
    plugins: [

        ...[].concat(isDevelopment?[

            new webpack.HotModuleReplacementPlugin()

        ]:[]),


        ...[].concat(cache?[

            new HardSourceWebpackPlugin({
                cacheDirectory: base('./cache/[confighash]'),
                info: {
                    // 'none' or 'test'.
                    mode: 'none',
                    // 'debug', 'log', 'info', 'warn', or 'error'.
                    level: 'debug',
                },
            }),
            new HardSourceWebpackPlugin.ExcludeModulePlugin([
                {
                    // HardSource works with mini-css-extract-plugin but due to how
                    // mini-css emits assets, assets are not emitted on repeated builds with
                    // mini-css and hard-source together. Ignoring the mini-css loader
                    // modules, but not the other css loader modules, excludes the modules
                    // that mini-css needs rebuilt to output assets every time.
                    test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
                },
            ]),

        ]:[]),




        // !isProduction?new webpack.HotModuleReplacementPlugin():null

        // ...[
        //     !isProduction[]
        // ],

        // new BundleAnalyzerPlugin(),



        new VueLoaderPlugin(),


        ...[].concat(isBuild||isProduction?[
            new CleanWebpackPlugin({
                verbose: true,
            }),
        ]:[]),



        new MiniCssExtractPlugin({
            filename: isProduction?'[name].[contenthash].css':'[name].css',
            chunkFilename: isProduction?'[name].[contenthash].chunk.css':'[name].chunk.css',
            ignoreOrder: false
        }),

        // new ManifestPlugin({
        //     // writeToFileEmit:true,
        //     // fileName: 'manifest.json',
        //     // publicPath: publicPath,
        //     generate: function(seed, files){
        //         return files.reduce(function (manifest, file) {
        //             let name = file.name;
        //             if(name.endsWith('.css')){
        //                 name = name.replace(/.css$/, '');
        //             }
        //             else if(name.endsWith('.js')){
        //                 name = name.replace(/.js$/, '');
        //             }
        //             manifest[name] = file.path;
        //             return manifest;
        //         }, seed);
        //     },
        //     serialize1: function(manifest) {
        //
        //         console.log('\n================');
        //         console.log(manifest);
        //         console.log('================');
        //
        //
        //         const obj = {
        //             css:{},
        //             js:{},
        //             unknown: {}
        //         };
        //
        //         Object.keys(manifest).forEach(function (k) {
        //             if(k.endsWith('.css')){
        //                 const key = k.replace(/\.[a-z0-9.]*css$/,'');
        //                 obj.css[key] = manifest[k];
        //             }
        //             else if(k.endsWith('.js')){
        //                 const key = k.replace(/\.[a-z0-9.]*js$/,'');
        //                 obj.js[key] = manifest[k];
        //             }
        //             else{
        //                 obj.unknown[k] = manifest[k];
        //             }
        //         });
        //
        //
        //
        //
        //
        //
        //         return JSON.stringify(obj, null, 2);
        //         // const obj = {};
        //         //
        //         // Object.keys(manifest).forEach(function (k) {
        //         //     if(k.endsWith('_dll.css') || k.endsWith('_dll.js')){
        //         //         obj[k.replace(/\.[a-z0-9]+/,'')] = manifest[k];
        //         //     }
        //         //     else{
        //         //         obj[k] = manifest[k];
        //         //     }
        //         // });
        //         //
        //         // const css = {};
        //         // const js = {};
        //         //
        //         // Object.keys(obj).forEach(function (k) {
        //         //     if(k.endsWith('.css')){
        //         //         const key = k.substring(0, k.length-4);
        //         //         css[key] = obj[k];
        //         //     }
        //         //     else if(k.endsWith('.js')){
        //         //         const key = k.substring(0, k.length-3);
        //         //         js[key] = obj[k];
        //         //     }
        //         //     else{
        //         //     }
        //         // });
        //         //
        //         //
        //         // Object.assign(obj, {
        //         //     css: css,
        //         //     js: js
        //         // });
        //         //
        //         // return JSON.stringify(obj, null, 2);
        //     },
        // }),



        ...[].concat(isProduction?[


        ]:[]),

    ]

};

