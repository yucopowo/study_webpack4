const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const AutoDllPlugin = require('autodll-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

// const { isDevelopment, isProduction } = require('webpack-mode');
const config = require('./config/config.js');

const isDevelopment = (process.env.NODE_ENV === 'development');
const isProduction = (process.env.NODE_ENV === 'production');
const isBuild = (process.env.NODE_ENV === 'build');
const cache = (process.env.CACHE === 'true');

function base() {
    const args = Array.prototype.slice.call(arguments);
    return path.resolve.apply(null, [__dirname, './'].concat(args));
}





module.exports = [



];





// module.exports = {
//     mode: 'development',
//     entry: config.entry,
//     output: {
//         path: base('dist'),
//         filename: isProduction?'[name].[contenthash].js':'[name].js',
//         chunkFilename: isProduction?'[name].[contenthash].chunk.js':'[name].chunk.js'
//     },
//     devServer: require('./config/server'),
//     module: {
//         noParse: [/.elm$/],
//         rules: [
//             {
//                 test: /\.riot$/,
//                 exclude: /node_modules/,
//                 use: [{
//                     loader: '@riotjs/webpack-loader',
//                     options: {
//                         hot: true
//                     }
//                 }]
//             },
//
//             {
//                 test: /\.elm$/,
//                 exclude: [/elm-stuff/, /node_modules/],
//                 use: 'elm-webpack-loader'
//             },
//
//             {
//                 test: /\.tsx?$/,
//                 loader: 'ts-loader',
//                 exclude: /node_modules/,
//                 options: { appendTsSuffixTo: [/\.vue$/] }
//             },
//
//             {
//                 test: /\.(hbs|handlebars)$/,
//                 loader: "handlebars-loader",
//                 options: {
//                     // precompileOptions: {
//                     //     knownHelpersOnly: false,
//                     // },
//                     partialDirs: [
//                         base('views', 'partials')
//                     ],
//                     helperDirs: [
//                         // path.resolve(__dirname, 'node_modules/handlebars-helpers/lib'),
//                         base('views', 'helpers'),
//                     ],
//                     // helperResolver: function(helper, callback) {
//                     //     // loop through handlebarsHelpers and pass to callback
//                     //
//                     //     console.log(helper);
//                     //
//                     // }
//                 }
//             },
//
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader',
//                 exclude: /node_modules/,
//                 options: {
//                     hotReload: !isProduction
//                 }
//             },
//             {
//                 test: /\.jsx?$/,
//                 loader: "babel-loader",
//                 options: {
//                     cacheDirectory: true
//                 },
//                 // exclude: /node_modules/,
//                 exclude: file => (
//                     /node_modules/.test(file) &&
//                     !/\.vue\.js/.test(file)
//                 )
//             },
//             // {
//             //     test: /\.css$/,
//             //     use: [
//             //         {
//             //             loader: MiniCssExtractPlugin.loader,
//             //             options: {
//             //                 hmr: !isDevelopment,
//             //             },
//             //         },
//             //         // isDevelopment?'vue-style-loader':{
//             //         //     loader: MiniCssExtractPlugin.loader,
//             //         //     options: {
//             //         //         hmr: !isProduction,
//             //         //     },
//             //         // },
//             //         // isProduction?{
//             //         //     loader: MiniCssExtractPlugin.loader,
//             //         //     options: {
//             //         //         hmr: !isProduction,
//             //         //     },
//             //         // }:'vue-style-loader',
//             //         'css-loader',
//             //     ]
//             // },
//
//             // {
//             //     test: /\.css$/,
//             //     use: [
//             //         MiniCssExtractPlugin.loader,
//             //         // isProduction?MiniCssExtractPlugin.loader:'vue-style-loader',
//             //         'css-loader'
//             //     ]
//             // },
//             {
//                 test: /\.(sa|sc|c)ss$/i,
//                 use: [
//
//                     isDevelopment?'vue-style-loader':MiniCssExtractPlugin.loader,
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             importLoaders: 1,
//                         }
//                     },
//                     'postcss-loader',
//                     'sass-loader',
//
//
//
//                     // {
//                     //     loader: MiniCssExtractPlugin.loader,
//                     //     options: {
//                     //         hmr: isDevelopment
//                     //     },
//                     // },
//
//
//                     // MiniCssExtractPlugin.loader,
//                     // isProduction?MiniCssExtractPlugin.loader:'vue-style-loader',
//
//
//                     // {
//                     //     loader: MiniCssExtractPlugin.loader,
//                     //     options: {
//                     //         hmr: !isDevelopment,
//                     //     },
//                     // },
//
//                     // isDevelopment?'vue-style-loader':{
//                     //     loader: MiniCssExtractPlugin.loader,
//                     //     options: {
//                     //         hmr: !isProduction,
//                     //     },
//                     // },
//                     // isProduction?{
//                     //     loader: MiniCssExtractPlugin.loader,
//                     //     options: {
//                     //         hmr: !isProduction,
//                     //     },
//                     // }:'vue-style-loader',
//                     // MiniCssExtractPlugin.loader,
//
//                 ],
//                 // exclude: /node_modules/,
//             },
//
//
//             {
//                 test: /\.(png|jpe?g|gif)$/i,
//                 loader: 'file-loader',
//                 options: {
//                     outputPath: 'images',
//                 },
//             },
//             {
//                 test: /\.(eot|woff2?|ttf|svg)$/i,
//                 loader: 'file-loader',
//                 options: {
//                     outputPath: 'fonts',
//                 },
//             },
//
//
//             // {
//             //     test: /\.(eot|woff2?|ttf|svg)$/,
//             //     use: [
//             //         {
//             //             loader: "url-loader",
//             //             options: {
//             //
//             //
//             //                 name: '[path][name].[ext]',
//             //                 // outputPath: "fonts/"
//             //
//             //
//             //                 // name: isProduction?'[contenthash].[ext]':'[path][name].[ext]',
//             //                 // name: isProduction?"[name].[hash].[ext]":'[name].[ext]',
//             //                 // limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
//             //                 // publicPath: "fonts/",
//             //                 // outputPath: "fonts/"
//             //             }
//             //         }
//             //     ]
//             // },
//             // {
//             //     test: /\.(png|jpe?g|gif)$/,
//             //     use: [
//             //         {
//             //             loader: "url-loader",
//             //             options: {
//             //                 name: '[path][name].[ext]',
//             //                 // outputPath: "images/"
//             //             }
//             //         }
//             //     ]
//             // },
//
//             // {
//             //     test: /\.(png|jpe?g|gif)$/i,
//             //     loader: 'url-loader',
//             //     options: {
//             //         name: '[path][name].[ext]',
//             //         outputPath: 'images/',
//             //
//             //
//             //         // name: isProduction?'[contenthash].[ext]':'[path][name].[ext]',
//             //         // outputPath: 'images/',
//             //         // limit: 8192
//             //     }
//             // }
//             // {
//             //     test: /\.css$/,
//             //     use: ["style-loader", "css-loader"],
//             //     exclude: /node_modules/,
//             // }
//         ]
//     },
//
//     // externals: {
//     //     'vue': 'Vue',
//     //     'react': 'React',
//     //     'lodash': '_',
//     // },
//
//     // externals: {
//     //     'react': 'React'
//     // },
//
//     resolve: {
//         alias: {
//             '@images': base('assets/images'),
//             '@pages': base('src/pages'),
//             '@components': base('src/components'),
//             '@utils': base('src/utils')
//         },
//         extensions: ['*', '.js', '.jsx', '.vue', '.tsx', '.ts', '.elm', '.css', '.scss']
//     },
//     plugins: [
//
//         ...[].concat(isDevelopment?[
//
//             new webpack.HotModuleReplacementPlugin()
//
//         ]:[]),
//
//
//         ...[].concat(cache?[
//
//             new HardSourceWebpackPlugin({
//                 cacheDirectory: base('./.cache/[confighash]'),
//                 info: {
//                     // 'none' or 'test'.
//                     mode: 'none',
//                     // 'debug', 'log', 'info', 'warn', or 'error'.
//                     level: 'debug',
//                 },
//             }),
//             new HardSourceWebpackPlugin.ExcludeModulePlugin([
//                 {
//                     // HardSource works with mini-css-extract-plugin but due to how
//                     // mini-css emits assets, assets are not emitted on repeated builds with
//                     // mini-css and hard-source together. Ignoring the mini-css loader
//                     // modules, but not the other css loader modules, excludes the modules
//                     // that mini-css needs rebuilt to output assets every time.
//                     test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
//                 },
//             ]),
//
//         ]:[]),
//
//
//
//
//         // !isProduction?new webpack.HotModuleReplacementPlugin():null
//
//         // ...[
//         //     !isProduction[]
//         // ],
//
//         // new BundleAnalyzerPlugin(),
//
//
//
//         new VueLoaderPlugin(),
//
//
//         ...[].concat(isBuild||isProduction?[
//             new CleanWebpackPlugin({
//                 verbose: true,
//             }),
//         ]:[]),
//
//
//
//         new MiniCssExtractPlugin({
//             filename: isProduction?'[name].[contenthash].css':'[name].css',
//             chunkFilename: isProduction?'[name].[contenthash].chunk.css':'[name].chunk.css',
//             ignoreOrder: false
//         }),
//
//         new ManifestPlugin({
//             // writeToFileEmit:true,
//             // fileName: 'manifest.json',
//             // publicPath: publicPath,
//             serialize1: function(manifest) {
//
//                 console.log('\n================');
//                 console.log(manifest);
//                 console.log('================');
//
//
//                 const obj = {
//                     css:{},
//                     js:{},
//                     unknown: {}
//                 };
//
//                 Object.keys(manifest).forEach(function (k) {
//                     if(k.endsWith('.css')){
//                         const key = k.replace(/\.[a-z0-9.]*css$/,'');
//                         obj.css[key] = manifest[k];
//                     }
//                     else if(k.endsWith('.js')){
//                         const key = k.replace(/\.[a-z0-9.]*js$/,'');
//                         obj.js[key] = manifest[k];
//                     }
//                     else{
//                         obj.unknown[k] = manifest[k];
//                     }
//                 });
//
//
//
//
//
//
//                 return JSON.stringify(obj, null, 2);
//                 // const obj = {};
//                 //
//                 // Object.keys(manifest).forEach(function (k) {
//                 //     if(k.endsWith('_dll.css') || k.endsWith('_dll.js')){
//                 //         obj[k.replace(/\.[a-z0-9]+/,'')] = manifest[k];
//                 //     }
//                 //     else{
//                 //         obj[k] = manifest[k];
//                 //     }
//                 // });
//                 //
//                 // const css = {};
//                 // const js = {};
//                 //
//                 // Object.keys(obj).forEach(function (k) {
//                 //     if(k.endsWith('.css')){
//                 //         const key = k.substring(0, k.length-4);
//                 //         css[key] = obj[k];
//                 //     }
//                 //     else if(k.endsWith('.js')){
//                 //         const key = k.substring(0, k.length-3);
//                 //         js[key] = obj[k];
//                 //     }
//                 //     else{
//                 //     }
//                 // });
//                 //
//                 //
//                 // Object.assign(obj, {
//                 //     css: css,
//                 //     js: js
//                 // });
//                 //
//                 // return JSON.stringify(obj, null, 2);
//             },
//         }),
//
//
//
//         ...[].concat(isProduction?[
//
//
//         ]:[]),
//
//         // new AutoDllPlugin({
//         //     // debug: true,
//         //     // filename: '[name].dll.js',
//         //     filename: isProduction?'[name].[contenthash].js':'[name].js',
//         //     // path: base('../cache'),
//         //     // path: './dll',
//         //     entry: config.dll || {
//         //         // detail: ['axios'],
//         //
//         //         // detail_
//         //
//         //         // vendor: [
//         //         //     'axios'
//         //         //     // 'react',
//         //         //     // 'react-dom'
//         //         // ]
//         //     },
//         //     inherit: true,
//         //     // webpack: {
//         //     //     module: {
//         //     //         rules: [
//         //     //             {
//         //     //                 test: /\.(sa|sc|c)ss$/i,
//         //     //                 use: [
//         //     //                     isDevelopment?'vue-style-loader':MiniCssExtractPlugin.loader,
//         //     //                     {
//         //     //                         loader: 'css-loader',
//         //     //                         options: {
//         //     //                             importLoaders: 1,
//         //     //                         }
//         //     //                     },
//         //     //                     'postcss-loader',
//         //     //                     'sass-loader',
//         //     //                 ],
//         //     //             }
//         //     //         ]
//         //     //     },
//         //     // },
//         //
//         //
//         //     plugins: [
//         //
//         //
//         //         new MiniCssExtractPlugin({
//         //             filename: isProduction?'[name].[contenthash].css':'[name].css',
//         //             chunkFilename: isProduction?'[name].[contenthash].chunk.css':'[name].chunk.css',
//         //             ignoreOrder: false
//         //         }),
//         //
//         //         // new ManifestPlugin({
//         //         //     // generate,
//         //         //     // seed
//         //         //     // serialize: (manifest) => JSON.stringify(manifest, null, 4)
//         //         //
//         //         //     serialize: function(manifest) {
//         //         //
//         //         //         console.log('================');
//         //         //
//         //         //
//         //         //         return JSON.stringify(manifest, null, 2);
//         //         //     },
//         //         //
//         //         // }),
//         //
//         //
//         //
//         //
//         //     ]
//         // })
//
//
//
//         // ...[].concat(
//         //     (()=>{
//         //
//         //
//         //         const dir = require('node-dir');
//         //
//         //         const files = dir.files(path.resolve(__dirname, '../', 'cache'), 'file', function(err, files) {
//         //             if (err) throw err;
//         //         }, {
//         //             sync:true
//         //         }).filter(function (file) {
//         //             return file.endsWith('.dll.manifest.json');
//         //         }).map(f=>new webpack.DllReferencePlugin({
//         //             context: path.resolve(__dirname, '../node_modules'),
//         //             manifest: require(f)
//         //         }));
//         //
//         //         console.log(files);
//         //
//         //         return files;
//         //     })()
//         // ),
//
//
//
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "react.dll.manifest.json"))
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "jquery.dll.manifest.json"))
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "bulma.dll.manifest.json"))
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "bootstrap.dll.manifest.json"))
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "compressorjs.dll.manifest.json"))
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     context: path.resolve(__dirname, '../node_modules'),
//         //     manifest: require(path.resolve(__dirname, '../cache/', "axios.dll.manifest.json"))
//         // }),
//
//
//
//
//
//
//
//         // new webpack.DllReferencePlugin({
//         //     // context: __dirname,
//         //     context: path.resolve(__dirname, '.'),
//         //     manifest: require("./cache/lodash.dll.manifest.json")
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     // context: __dirname,
//         //     context: path.resolve(__dirname, '.'),
//         //     manifest: require("./cache/react.dll.manifest.json")
//         // }),
//         // new webpack.DllReferencePlugin({
//         //     // context: __dirname,
//         //     context: path.resolve(__dirname, '.'),
//         //     manifest: require("./cache/vue.dll.manifest.json")
//         // }),
//
//
//
//
//
//         // new HtmlWebpackPlugin({
//         //     inject: true,
//         //     title: 'index',
//         //     filename: "index.html",
//         //     template: _path('./index.html'),
//         //     chunks: []
//         // }),
//         // new HtmlWebpackPlugin({
//         //     inject: true,
//         //     title: 'login',
//         //     filename: "login.html",
//         //     template: _path('./src/login/index.html'),
//         //     chunks: ["login"],
//         // }),
//         // new HtmlWebpackPlugin({
//         //     inject: true,
//         //     title: 'register',
//         //     filename: "register.html",
//         //     template: _path('./src/register/index.html'),
//         //     chunks: ["register"],
//         // }),
//         // new HtmlWebpackPlugin({
//         //     title: 'list',
//         //     filename: "list.html",
//         //     template: _path('./src/list/index.html'),
//         //     chunks: ["list"],
//         // }),
//         // new HtmlWebpackPlugin({
//         //     inject: true,
//         //     title: 'home',
//         //     filename: "home.html",
//         //     template: _path('./src/home/index.handlebars'),
//         //     chunks: ["home"],
//         //     templateParameters: function () {
//         //         return {
//         //             'foo': {test:'bar'}
//         //         };
//         //     }
//         // }),
//
//
//     ],
//
//     // optimization: {
//     //     splitChunks: {
//     //         chunks: 'all'
//     //     }
//     // }
//
//     // optimization: {
//     //
//     //     splitChunks: {
//     //         cacheGroups: {
//     //             vendors: {
//     //                 test: /[\\/]node_modules[\\/]/,
//     //                 name: "vendors",
//     //                 chunks: "all"
//     //             }
//     //             // commons: {
//     //             //     name: "commons",
//     //             //     chunks: "initial",
//     //             //     minChunks: 2
//     //             // }
//     //         }
//     //     }
//     //
//     // }
//
//     // optimization:{
//     //
//     //     cacheGroups: {
//     //         common: {
//     //             name: "common",
//     //             chunks: "all",
//     //             minChunks: 2,
//     //             priority: 10,
//     //         }
//     //     }
//     //
//     //     // splitChunks: {
//     //     //     chunks: 'all',
//     //     //     name: false,
//     //     // },
//     //
//     //     // splitChunks:{
//     //     //     // chunks:"all",
//     //     //     // maxSize: 1024*1024*1024,
//     //     //     cacheGroups: {
//     //     //         vendor: {
//     //     //             test: /[\\/]node_modules[\\/]/,
//     //     //             name: "vendor",
//     //     //             minChunks: 2,
//     //     //             maxInitialRequests: 5,
//     //     //             chunks: "all",
//     //     //             minSize: 20000
//     //     //         }
//     //     //     }
//     //     // }
//     // }
//     // optimization: {
//     //     splitChunks: {
//     //         chunks: 'async',
//     //         minSize: 30000,
//     //         minChunks: 1,
//     //         maxAsyncRequests: 5,
//     //         maxInitialRequests: 3,
//     //         automaticNameDelimiter: '~',
//     //         name: true,
//     //         cacheGroups: {
//     //             vendors: {
//     //                 test: /[\\/]node_modules[\\/]/,
//     //                 priority: -10
//     //             },
//     //             default: {
//     //                 minChunks: 2,
//     //                 priority: -20,
//     //                 reuseExistingChunk: true
//     //             }
//     //         }
//     //     },
//     // },
//     // optimization: {
//     //     splitChunks: {
//     //         cacheGroups: {
//     //             react: {
//     //                 test: /\.js$/,
//     //                 chunks: 'all',
//     //                 enforce: true
//     //             },
//     //
//     //             // lib1: {
//     //             //     chunks: "initial",
//     //             //     name: "react",
//     //             //     enforce: true
//     //             // },
//     //             // styles: {
//     //             //     name: "styles",
//     //             //     test: /\.css$/,
//     //             //     chunks: "all",
//     //             //     enforce: true
//     //             // }
//     //             // loginStyles: {
//     //             //     name: 'login',
//     //             //     // test: (m, c, entry = 'login') =>
//     //             //     //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
//     //             //     test: /\.css$/,
//     //             //     chunks: 'initial',
//     //             //     enforce: true,
//     //             // },
//     //             // registerStyles: {
//     //             //     name: 'register',
//     //             //     // test: (m, c, entry = 'register') =>
//     //             //     //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
//     //             //     test: /\.css$/,
//     //             //     chunks: 'initial',
//     //             //     enforce: true,
//     //             // },
//     //         }
//     //     }
//     // }
// }
