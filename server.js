const WebpackDevServer = require("webpack-dev-server");
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require("webpack");
const merge = require("webpack-merge");
const MemoryFileSystem = require("memory-fs");
const handlebars = require('./config/handlebars');
const baseConfig = require('./config/webpack.config.base');
const base = require('./config/base')(__dirname, './');

function vendor(entry) {

    return new Promise(function (resolve, reject) {

        const vendorConfig = merge(baseConfig, {
            // entry: () => new Promise((resolve) => {
            //     resolve(entry);
            // }),
            entry,
            output: {
                library: '_dll_[name]'
            },
            plugins: [
                new webpack.DllPlugin({
                    name: '_dll_[name]',
                    path: base("dll/[name].manifest.json"),
                    context: base('node_modules'),
                }),

                new ManifestPlugin({
                    // writeToFileEmit:true,
                    fileName: 'vendor_manifest.json',
                    // publicPath: publicPath,
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
                    },
                    serialize1: function(manifest) {

                        console.log('\n================');
                        console.log(manifest);
                        console.log('================');


                        const obj = {
                            css:{},
                            js:{},
                            unknown: {}
                        };

                        Object.keys(manifest).forEach(function (k) {
                            if(k.endsWith('.css')){
                                const key = k.replace(/\.[a-z0-9.]*css$/,'');
                                obj.css[key] = manifest[k];
                            }
                            else if(k.endsWith('.js')){
                                const key = k.replace(/\.[a-z0-9.]*js$/,'');
                                obj.js[key] = manifest[k];
                            }
                            else{
                                obj.unknown[k] = manifest[k];
                            }
                        });






                        return JSON.stringify(obj, null, 2);
                        // const obj = {};
                        //
                        // Object.keys(manifest).forEach(function (k) {
                        //     if(k.endsWith('_dll.css') || k.endsWith('_dll.js')){
                        //         obj[k.replace(/\.[a-z0-9]+/,'')] = manifest[k];
                        //     }
                        //     else{
                        //         obj[k] = manifest[k];
                        //     }
                        // });
                        //
                        // const css = {};
                        // const js = {};
                        //
                        // Object.keys(obj).forEach(function (k) {
                        //     if(k.endsWith('.css')){
                        //         const key = k.substring(0, k.length-4);
                        //         css[key] = obj[k];
                        //     }
                        //     else if(k.endsWith('.js')){
                        //         const key = k.substring(0, k.length-3);
                        //         js[key] = obj[k];
                        //     }
                        //     else{
                        //     }
                        // });
                        //
                        //
                        // Object.assign(obj, {
                        //     css: css,
                        //     js: js
                        // });
                        //
                        // return JSON.stringify(obj, null, 2);
                    },
                }),
            ]
        });

        // webpack(vendorConfig).run(()=>{});

        const compiler = webpack(vendorConfig);
        const fs = new MemoryFileSystem();
        compiler.outputFileSystem = fs;

        compiler.run((err, stats) => {
            // Read the output later:
            // const dll_manifest = JSON.parse(fs.readFileSync(base('cache/dll.manifest.json'), 'utf-8'));

            console.log('==================================');

            console.log(err);
            // const data = fs.data;
            //
            // console.log(data);
            //

            //
            const manifest = JSON.parse(fs.readFileSync(base('dist/vendor_manifest.json'), 'utf-8'));

            const files = fs.readdirSync(base('dll/'));

            const manifests =  files.map(function (file) {
                const content = fs.readFileSync(base('dll/',file), 'utf-8');
                return JSON.parse(content);
            });

            // console.log(files);


            //
            resolve({
                manifest, manifests, fs
            });


        });

    });

}

(async ()=>{

    const vendor_manifest = {};
    const pages = [
        require('./mock/pages/demo_test/page'),
        require('./mock/pages/simple/page')

    ];

    const entry = {
        vendor: {

        },
        bundle:{
            index: '@pages/index/index.js'
        }
    };

    // Object.assign(entry.vendor, pages[0].vendor);
    const bundleConfig = merge(baseConfig, {
        entry: () => new Promise((resolve) => {
            resolve(entry.bundle);
        }),
        plugins: [
            new ManifestPlugin({
                // writeToFileEmit:true,
                fileName: 'bundle_manifest.json',
                // publicPath: publicPath,
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
                },
                serialize1: function(manifest) {

                    console.log('\n================');
                    console.log(manifest);
                    console.log('================');


                    const obj = {
                        css:{},
                        js:{},
                        unknown: {}
                    };

                    Object.keys(manifest).forEach(function (k) {
                        if(k.endsWith('.css')){
                            const key = k.replace(/\.[a-z0-9.]*css$/,'');
                            obj.css[key] = manifest[k];
                        }
                        else if(k.endsWith('.js')){
                            const key = k.replace(/\.[a-z0-9.]*js$/,'');
                            obj.js[key] = manifest[k];
                        }
                        else{
                            obj.unknown[k] = manifest[k];
                        }
                    });






                    return JSON.stringify(obj, null, 2);
                    // const obj = {};
                    //
                    // Object.keys(manifest).forEach(function (k) {
                    //     if(k.endsWith('_dll.css') || k.endsWith('_dll.js')){
                    //         obj[k.replace(/\.[a-z0-9]+/,'')] = manifest[k];
                    //     }
                    //     else{
                    //         obj[k] = manifest[k];
                    //     }
                    // });
                    //
                    // const css = {};
                    // const js = {};
                    //
                    // Object.keys(obj).forEach(function (k) {
                    //     if(k.endsWith('.css')){
                    //         const key = k.substring(0, k.length-4);
                    //         css[key] = obj[k];
                    //     }
                    //     else if(k.endsWith('.js')){
                    //         const key = k.substring(0, k.length-3);
                    //         js[key] = obj[k];
                    //     }
                    //     else{
                    //     }
                    // });
                    //
                    //
                    // Object.assign(obj, {
                    //     css: css,
                    //     js: js
                    // });
                    //
                    // return JSON.stringify(obj, null, 2);
                },
            })
        ]
    });


    const compiler = webpack(bundleConfig);

    function recompile() {
        const changes = [];
        const removals = [];
        compiler.watchFileSystem.watcher.emit("aggregated", changes, removals);
    }

    const server = new WebpackDevServer(compiler, {
        // writeToDisk: true,

        progress: true,
        // lazy: true,
        // filename: "simple.bundle.js",

        // hot: false,
        // inline: false,
        hot: true,
        inline: true,


        host: '0.0.0.0',
        contentBase: [
            base('public')
        ],

        before: function(app, server) {

            const fs = compiler.outputFileSystem;

            console.log(fs);

            handlebars(app);

            app.get('/', function (req, res) {
                res.render('index', {
                    pages: []
                });
            });

            pages.forEach(function (page) {
                app.get(page.url, function (req, res) {

                    if(!page._compiled) {
                        Object.assign(entry.bundle, page.bundle);
                        Object.assign(entry.vendor, page.vendor);

                        vendor(entry.vendor).then(function (result) {
                            // console.log('=====================');
                            // console.log(result);

                            Object.assign(vendor_manifest, result.manifest);

                            fs.data = merge(fs.data, result.fs.data);

                            const manifests = result.manifests;

                            console.log('manifests');

                            console.log(manifests);

                            manifests.forEach(function (manifest) {

                                // plugins.push(
                                //
                                //
                                //
                                //
                                //
                                // );

                                const plugin = new webpack.DllReferencePlugin({
                                    context: base('node_modules'),
                                    manifest: manifest
                                });

                                plugin.apply(compiler);


                            });

                            recompile();

                        });


                        page._compiled = true;
                        res.send('loading...');
                        return;
                    }

                    const bundle_manifest = JSON.parse(fs.readFileSync(base('dist/bundle_manifest.json')));

                    res.render(page.template, {
                        manifest: {
                            bundle: bundle_manifest,
                            vendor: vendor_manifest,
                        }
                    });
                });
            });

            // const page = require('./mock/pages/demo_test/page');

        },

    }).listen(8080, "0.0.0.0", function(err) {


    });



})();





