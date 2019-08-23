const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const { isDevelopment, isProduction } = require('webpack-mode');

function _path(p) {
    return path.resolve(__dirname, p);
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

const publicPath = 'http://127.0.0.1:8080/';
module.exports = {
    mode: 'development',
    // mode: 'none',

    entry: {
        // react: ['react','react-dom'],

        login:      _path('./src/login/index.js'),
        register:   _path('./src/register/index.js'),
        list:       _path('./src/list/index.js')

    },
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
        rules: [
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
                    isDevelopment?'vue-style-loader':{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
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
                    isDevelopment?'vue-style-loader':{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                        },
                    },
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
    // resolve: {
    //     extensions: ['*', '.js', '.vue']
    // },
    plugins: [
        new VueLoaderPlugin(),
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new MiniCssExtractPlugin({

            filename: isProduction?'[name].[contenthash].css':'[name].css',
            chunkFilename: isProduction?'[id].[name].[contenthash].chunk.css':'[id].[name].chunk.css',
            ignoreOrder: false
        }),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'index',
            filename: "index.html",
            template: _path('./index.html'),
            chunks: []
        }),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'login',
            filename: "login.html",
            template: _path('./src/login/index.html'),
            chunks: ["login"],
        }),
        new HtmlWebpackPlugin({
            inject: true,
            title: 'register',
            filename: "register.html",
            template: _path('./src/register/index.html'),
            // chunks: ["register"],
        }),
        new HtmlWebpackPlugin({
            title: 'list',
            filename: "list.html",
            template: _path('./src/list/index.html'),
            chunks: ["list"],

        }),
        new ManifestPlugin({
            fileName: 'manifest.json',
            // fileName: 'asset-manifest.json',
            publicPath: publicPath,
        }),

        new webpack.DllReferencePlugin({
            // context: __dirname,
            manifest: require("./cache/vue.dll.manifest.json")
        }),
        new webpack.DllReferencePlugin({
            // context: __dirname,
            manifest: require("./cache/lodash.dll.manifest.json")
        }),
        new webpack.DllReferencePlugin({
            // context: __dirname,
            manifest: require("./cache/react.dll.manifest.json")
        })
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