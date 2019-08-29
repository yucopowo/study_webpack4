const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const { isDevelopment, isProduction } = require('webpack-mode');
const config = require('./config');

function _path() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.resolve.apply(null, args);
}
function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const publicPath = '';
// const publicPath = 'http://127.0.0.1:8080/';
module.exports = {
    mode: 'development',

    entry: config.entry,
    // entry: {
    //     home:       _path('./src/home/index.js'),
    //     login:      _path('./src/login/index.js'),
    //     register:   _path('./src/register/index.js'),
    //     list:       _path('./src/list/index.js'),
    //     detail:     _path('./src/detail/index.js'),
    //     about:      _path('./src/about/index.tsx'),
    //     book:       _path('./src/book/index.js'),
    //     introduce:  _path('./src/introduce/index.js'),
    //     pdf:        _path('./src/pdf/index.js'),
    //     pdf_worker:'pdfjs-dist/build/pdf.worker.entry',
    // },


    // mode: 'none',

    // entry: {
    //     // react: ['react','react-dom'],
    //     // home:       _path('./src/home/index.js'),
    //     // login:      _path('./src/login/index.js'),
    //     // register:   _path('./src/register/index.js'),
    //     // list:       _path('./src/list/index.js'),
    //     // detail:     _path('./src/detail/index.js'),
    //
    // },
    // entry: () => new Promise((resolve) => {
    //     resolve(['./demo', './demo2']
    // })),
    // entry:(function () {
    //     const entry = {};
    //     config.pages.map(function (c) {
    //         return c.entry;
    //     })
    // })(),
    // entry: () => new Promise( function (resolve) {
    //     const entry = {};
    //     console.log('entry=============');
    //
    //
    //     config.pages.forEach(function (c) {
    //         const m = require(c);
    //         Object.assign(entry, m.entry);
    //     });
    //
    //     console.log(entry);
    //
    //     resolve(entry);
    // }),
    output: {
        path: _path('dist'),
        filename: isProduction?'[name].[contenthash].bundle.js':'[name].bundle.js',
        chunkFilename: isProduction?'[name].[contenthash].chunk.js':'[name].chunk.js'
    },
    // devtool: 'eval-source-map',
    // devServer: {
    //     lazy: true,
    //     contentBase: './dist'
    // },
    devServer: require('./server'),
    module: {
        noParse: [/.elm$/],
        rules: [

            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: 'elm-webpack-loader'
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(hbs|handlebars)$/,
                loader: "handlebars-loader",
                options: {
                    // precompileOptions: {
                    //     knownHelpersOnly: false,
                    // },
                    partialDirs: [
                        _path('views', 'partials')
                    ],
                    helperDirs: [
                        // path.resolve(__dirname, 'node_modules/handlebars-helpers/lib'),
                        _path('views', 'helpers'),
                    ],
                    // helperResolver: function(helper, callback) {
                    //     // loop through handlebarsHelpers and pass to callback
                    //
                    //     console.log(helper);
                    //
                    // }
                }
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isDevelopment,
                        },
                    },
                    // isDevelopment?'vue-style-loader':{
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: !isProduction,
                    //     },
                    // },
                    // isProduction?{
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: !isProduction,
                    //     },
                    // }:'vue-style-loader',
                    'css-loader',
                ]
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isDevelopment,
                        },
                    },

                    // isDevelopment?'vue-style-loader':{
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: !isProduction,
                    //     },
                    // },
                    // isProduction?{
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: !isProduction,
                    //     },
                    // }:'vue-style-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: isProduction?"[name]-[hash].[ext]":'[name].[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: "fonts/",
                            outputPath: "fonts/"
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader',
                options: {
                    limit:8192
                }
            }
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            //     exclude: /node_modules/,
            // }
        ]
    },
    // externals: {
    //     'vue': 'Vue',
    //     'react': 'React',
    //     'lodash': '_',
    // },

    resolve: {
        extensions: ['*', '.js', '.vue', '.tsx', '.ts', '.elm']
    },
    plugins: [
        new HardSourceWebpackPlugin({
            cacheDirectory: _path('./.cache/[confighash]'),
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





        // new BundleAnalyzerPlugin(),

        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: isProduction?'[name].[contenthash].bundle.css':'[name].bundle.css',
            chunkFilename: isProduction?'[id].[name].[contenthash].chunk.css':'[id].[name].chunk.css',
            ignoreOrder: false
        }),








        new ManifestPlugin({
            fileName: 'manifest.json',
            // fileName: 'asset-manifest.json',
            publicPath: publicPath,
        }),


        // new webpack.DllReferencePlugin({
        //     // context: __dirname,
        //     context: path.resolve(__dirname, '.'),
        //     manifest: require("./cache/lodash.dll.manifest.json")
        // }),
        // new webpack.DllReferencePlugin({
        //     // context: __dirname,
        //     context: path.resolve(__dirname, '.'),
        //     manifest: require("./cache/react.dll.manifest.json")
        // }),
        // new webpack.DllReferencePlugin({
        //     // context: __dirname,
        //     context: path.resolve(__dirname, '.'),
        //     manifest: require("./cache/vue.dll.manifest.json")
        // }),





        // new HtmlWebpackPlugin({
        //     inject: true,
        //     title: 'index',
        //     filename: "index.html",
        //     template: _path('./index.html'),
        //     chunks: []
        // }),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     title: 'login',
        //     filename: "login.html",
        //     template: _path('./src/login/index.html'),
        //     chunks: ["login"],
        // }),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     title: 'register',
        //     filename: "register.html",
        //     template: _path('./src/register/index.html'),
        //     chunks: ["register"],
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'list',
        //     filename: "list.html",
        //     template: _path('./src/list/index.html'),
        //     chunks: ["list"],
        // }),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     title: 'home',
        //     filename: "home.html",
        //     template: _path('./src/home/index.handlebars'),
        //     chunks: ["home"],
        //     templateParameters: function () {
        //         return {
        //             'foo': {test:'bar'}
        //         };
        //     }
        // }),


    ],

    // optimization: {
    //
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendors",
    //                 chunks: "all"
    //             }
    //             // commons: {
    //             //     name: "commons",
    //             //     chunks: "initial",
    //             //     minChunks: 2
    //             // }
    //         }
    //     }
    //
    // }

    // optimization:{
    //
    //     cacheGroups: {
    //         common: {
    //             name: "common",
    //             chunks: "all",
    //             minChunks: 2,
    //             priority: 10,
    //         }
    //     }
    //
    //     // splitChunks: {
    //     //     chunks: 'all',
    //     //     name: false,
    //     // },
    //
    //     // splitChunks:{
    //     //     // chunks:"all",
    //     //     // maxSize: 1024*1024*1024,
    //     //     cacheGroups: {
    //     //         vendor: {
    //     //             test: /[\\/]node_modules[\\/]/,
    //     //             name: "vendor",
    //     //             minChunks: 2,
    //     //             maxInitialRequests: 5,
    //     //             chunks: "all",
    //     //             minSize: 20000
    //     //         }
    //     //     }
    //     // }
    // }
    // optimization: {
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 30000,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: '~',
    //         name: true,
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     },
    // },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             react: {
    //                 test: /\.js$/,
    //                 chunks: 'all',
    //                 enforce: true
    //             },
    //
    //             // lib1: {
    //             //     chunks: "initial",
    //             //     name: "react",
    //             //     enforce: true
    //             // },
    //             // styles: {
    //             //     name: "styles",
    //             //     test: /\.css$/,
    //             //     chunks: "all",
    //             //     enforce: true
    //             // }
    //             // loginStyles: {
    //             //     name: 'login',
    //             //     // test: (m, c, entry = 'login') =>
    //             //     //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
    //             //     test: /\.css$/,
    //             //     chunks: 'initial',
    //             //     enforce: true,
    //             // },
    //             // registerStyles: {
    //             //     name: 'register',
    //             //     // test: (m, c, entry = 'register') =>
    //             //     //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
    //             //     test: /\.css$/,
    //             //     chunks: 'initial',
    //             //     enforce: true,
    //             // },
    //         }
    //     }
    // }
}
