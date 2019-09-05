const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const MemoryFS = require("memory-fs");
const path = require('path');
// const dir = require('node-dir');
// const fs = require('fs');
const ManifestPlugin = require('webpack-manifest-plugin');
// const MFS  = require('./config/mfs');
const base = require('./config/base')(__dirname);


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



function vendor() {
    return new Promise( (resolve, reject) => {



        // const compiler = webpack(vendorConfig);
        //
        // compiler.run((error, stats) => {
        //     resolve();
        // });


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
                }),

            ]
        };

        const fs = new MemoryFS();
        const compiler = webpack(vendorConfig);

        compiler.outputFileSystem = fs;
        compiler.run((err, stats) => {
            // Read the output later:
            const dll_manifest = JSON.parse(fs.readFileSync(base('cache/dll.manifest.json'), 'utf-8'));

            // console.log(content);
            // console.log(fs);
            // debugger
            const files = fs.readdirSync(base('cache/dll/'));
            // console.log(files);

            // const manifest = [];

            const manifests =  files.map(function (file) {
                const content = fs.readFileSync(base('cache/dll/',file), 'utf-8');
                return JSON.parse(content);
            });




            resolve({
                dll_manifest, manifests, fs
            });



        });


    });
}

(async ()=>{


    const { dll_manifest, manifests, fs} = await vendor();

    // console.log(dll_manifest);
    // console.log(manifests);

    // const vendors = fs.readdirSync(base('dist/dll/')).map((x)=>(x.endsWith('.css')||x.endsWith('.js')));
    // console.log(vendors);

    const vendor_manifest = dll_manifest;


    const bundleConfig = {
        mode:'none',
        output: {
            path: base('dist'),
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


            ...(function () {

                return manifests.map(manifest=>new webpack.DllReferencePlugin({
                    context: base('node_modules'),
                    manifest: manifest
                }));

            })()

        ]
    };

    // const compiler = webpack(bundleConfig);
    //
    // compiler.run((err, stats) => {
    //
    //
    // });


    const server = new WebpackDevServer(webpack(bundleConfig), {

        hot: false,
        inline: false,

        host: '0.0.0.0',
        contentBase: [
            base('public'),
            // base('dist/dll')
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

            function dll(req, res, next) {
                const url = req.url;
                const p = path.join(__dirname, 'dist/dll/', url);
                console.log('================');
                console.log('url=',url);
                console.log(p);


                if(fs.existsSync(p)){
                    res.setHeader('content-type','application/x-javascript');
                    res.status(200);
                    const content = fs.readFileSync(p);
                    res.send(content);
                    return;
                }

                next();
            }

            app.use(dll);


            app.get('/', function (req, res) {
                res.render('index', {
                    pages: []
                });
            });

            // const scripts = ['simple.vendor.js','echarts.vendor.js','vue.vendor.js','element_ui.vendor.js'];
            //
            // scripts.forEach(function (script) {
            //     app.get('/'+script, function (req, res) {
            //         const content = fs.readFileSync(base('dist/dll/'+script), 'utf-8');
            //         res.setHeader('content-type','application/x-javascript');
            //         res.send(content);
            //     });
            // });



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





