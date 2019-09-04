const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const dir = require('node-dir');
const fs = require('fs');
// const webpackConfig = require("./webpack.config.js");
const ManifestPlugin = require('webpack-manifest-plugin');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
require('handlebars-helpers')({
    handlebars: handlebars
});
const helpers = {
    json: function(object) {
        return JSON.stringify(object);
    }
};

const MFS  = require('./config/mfs');
const base = require('./config/base')(__dirname);

function vendor() {
    return new Promise( (resolve, reject) => {

        const vendorConfig = {
            mode:'none',
            entry: {
                echarts: ['echarts'],
                vue: ['vue','vue-router','vuex'],
                element_ui: ['element-ui', 'element-ui/lib/theme-chalk/index.css'],
                simple: [
                    'jquery',
                    'lodash',
                ]
            },
            module: {
                rules: [
                    {
                        test: /\.(sa|sc|c)ss$/i,
                        use: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                }
                            },
                            'postcss-loader',
                            'sass-loader',
                        ]
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
                        }
                    }
                ]
            },
            output: {
                library: '_dll_[name]',
                filename: '[name].vendor.js',
                path: base('dist/dll')
            },
            plugins: [

                new webpack.DllPlugin({
                    name: '_dll_[name]',
                    path: base("cache/dll/[name].manifest.json"),
                    context: base('node_modules'),
                }),

                new ManifestPlugin({
                    // writeToFileEmit:true,
                    fileName: base('cache/dll.manifest.json'),

                    generate: function(seed, files){
                        // debugger

                        return files.reduce(function (manifest, file) {

                            // console.log(file);

                            // manifest[file.name] = file.path;

                            let name = file.name;
                            if(name.endsWith('.css')){
                                name = name.replace(/.css$/, '');
                            }
                            else if(name.endsWith('.js')){
                                name = name.replace(/.js$/, '');
                            }

                            manifest[name] = file.path;

                            return manifest;
                        }, seed);
                    }

                    // publicPath: publicPath,
                    // serialize: function(manifest) {
                    //
                    //     console.log('\n================');
                    //     console.log(manifest);
                    //     console.log('================');
                    //
                    //
                    //     const obj = {
                    //         css:{},
                    //         js:{},
                    //         unknown: {}
                    //     };
                    //
                    //     Object.keys(manifest).forEach(function (k) {
                    //         if(k.endsWith('.css')){
                    //             const key = k.replace(/\.[a-z0-9.]*css$/,'');
                    //             obj.css[key] = manifest[k];
                    //         }
                    //         else if(k.endsWith('.js')){
                    //             const key = k.replace(/\.[a-z0-9.]*js$/,'');
                    //             obj.js[key] = manifest[k];
                    //         }
                    //         else{
                    //             obj.unknown[k] = manifest[k];
                    //         }
                    //     });
                    //     return JSON.stringify(obj, null, 2);
                    // },
                }),

            ]
        };

        const compiler = webpack(vendorConfig);

        compiler.run((error, stats) => {
            resolve();
        });
    });
}

function getDllReferences() {

    return dir.files(base('cache/dll'), 'file', function(err, files) {
        if (err) throw err;
    }, {
        sync:true
    }).map(f=>new webpack.DllReferencePlugin({
        context: base('node_modules'),
        manifest: require(f)
    }));

}
(async ()=>{

    await vendor();

    const vendor_manifest = JSON.parse(fs.readFileSync(base('cache', 'dll.manifest.json'), 'utf-8'));

    const bundleConfig = {
        mode:'none',
        output: {
            filename: '[name].bundle.js'
        },
        entry: {
            simple: base('src/pages/simple/index.js')
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/i,
                    use: [
                        'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        'postcss-loader',
                        'sass-loader',
                    ]
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
                    }
                }
            ]
        },
        plugins: [

            ...getDllReferences(),

            new ManifestPlugin({
                generate: function(seed, files){
                    return files.reduce(function (manifest, file) {
                        let name = file.name;
                        if(name.endsWith('.css')){
                            name = name.replace(/.css$/, '');
                        }
                        else if(name.endsWith('.js')){
                            name = name.replace(/.js$/, '');
                        }
                        manifest[name] = file.path;
                        return manifest;
                    }, seed);
                }
            }),

            // new webpack.DllReferencePlugin({
            //     context: base('node_modules'),
            //     manifest: require(base('cache/dll/', "simple_vendor.manifest.json"))
            // }),
        ]
    };

    const server = new WebpackDevServer(webpack(bundleConfig), {

        hot: false,
        inline: false,

        host: '0.0.0.0',
        contentBase: [
            base('public'),
            base('dist/dll')
        ],

        before: function(app, server) {

            const mfs = new MFS(server);

            app.engine('handlebars', exphbs({
                handlebars: handlebars,
                layoutsDir: base('views/layouts/'),
                partialsDir: base('views/partials/'),
                defaultLayout: 'default',
                helpers: helpers
            }));
            app.set('views', base('views/templates/'));
            app.set('view engine', 'handlebars');
            app.disable('view cache');

            app.get('/', function (req, res) {
                res.render('index', {
                    pages: []
                });
            });

            app.get('/simple', function (req, res) {
                const bundle_manifest = JSON.parse(mfs.readFileSync('manifest.json'));



                res.render('simple', {
                    // vendor_manifest: dll_manifest,
                    // bundle_manifest: manifest,
                    manifest: {
                        vendor: vendor_manifest,
                        bundle: bundle_manifest,
                    },
                    pages: []
                });
            });

        },

        // contentBase: "app",
        // host: "notice.worksmobile.com",
        // publicPath: '/assets/',
        // stats: {
        //     hot: true,
        //     colors: true
        // }
    }).listen(8080, "0.0.0.0", function(err) {
        // if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // gutil.log("[webpack-dev-server]", "http://localhost:80/webpack-dev-server/index.html");
    });

})();





