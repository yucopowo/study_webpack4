const axios = require("axios");
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
require('handlebars-helpers')({
    handlebars: handlebars
});
const config = require('./config.js');
const helpers = {
    json: function(object) {
        return JSON.stringify(object);
    }
};

function reload(modulepath) {
    delete require.cache[require.resolve(modulepath)];
    return require(modulepath);
}

// config.pages = config.pages.map((p)=>require(p));
// Object.keys(config.routes).forEach(function (url) {
//     config.routes[url]= require(config.routes[url]);
// });

function base() {
    const args = Array.prototype.slice.call(arguments);
    // args.unshift('../');
    // args.unshift(__dirname);
    return path.resolve.apply(null, [__dirname, '../'].concat(args));
}

// async function requestManifest() {
//     if(Object.keys(manifest).length>0) {
//         return manifest;
//     }
//     const response = await axios.get('http://127.0.0.1:8080/manifest.json');
//     Object.assign(manifest, response.data);
//     return manifest;
// }

module.exports = {
    overlay: true,
    // hot: true,
    hot: false,
    hotOnly: false,
    inline: false,
    // lazy: true,
    host: '0.0.0.0',
    contentBase: [
        base('cache'),
        base('dist'),
        base('public')
    ],
    // filename: 'list.bundle.js',
    before: function(app, server) {
        const dll_manifest = {};
        async function requestManifest(req, res, next) {
            // if( !(req.url.indexOf('/manifest.json')!==-1) && Object.keys(manifest).length === 0 ){
            //     const response = await axios.get(`http://127.0.0.1:${server.options.port}/manifest.json`);
            //     Object.assign(manifest, response.data);
            //
            //     // const dll_response = await axios.get(`http://127.0.0.1:${server.options.port}/dll.manifest.json`);
            //     // Object.assign(dll_manifest, dll_response.data);
            //
            //     const dll_response = fs.readFileSync(base('cache', 'dll.manifest.json'), 'utf-8');
            //     Object.assign(manifest, JSON.parse(dll_response));
            //
            // }
            const manifest = {};

            if( !(req.url.indexOf('/manifest.json')!==-1) ){
                const response1 = fs.readFileSync(base('dist', 'manifest.json'), 'utf-8');
                Object.assign(manifest, JSON.parse(response1));

                const response2 = fs.readFileSync(base('cache', 'dll.manifest.json'), 'utf-8');
                Object.assign(manifest, JSON.parse(response2));
            }

            // console.log(manifest);

            req.manifest = manifest;

            next();
        }
        app.use(requestManifest);

        app.engine('handlebars', exphbs({
            handlebars: handlebars,
            layoutsDir: base('views/layouts/'),
            partialsDir: base('views/partials/'),
            defaultLayout: 'default',
            helpers: helpers
        }));
        // app.set('views', path.join(__dirname, 'views'));
        app.set('views', base('views/templates/'));

        app.set('view engine', 'handlebars');
        app.disable('view cache');

        // app.get('/home', function (req, res) {
        //     res.render('home/index');
        // });

        app.get('/', function (req, res) {
            res.render('index', {
                pages: config.pages
            });
        });


        config.pages.forEach(function (page) {
            app.get(page.url, async function (req, res) {
                res.render(page.template, {
                    manifest: req.manifest,
                    dll_manifest: dll_manifest,
                    title: page.title || '',
                    data: page.data ?
                        (typeof page.data === 'function')?page.data():page.data
                        : {}
                });
            });

            // app.use(page.url, page.router);

        });

        Object.keys(config.routes).forEach(function (url) {
            app.use(url, config.routes[url]);
        });



        // (function () {
        //     const page = require('./mock/pages/detail');
        //
        //     app.get(page.url, async function (req, res) {
        //         // const data = reload(path.resolve(__dirname, './mock/pages/detail'));
        //         res.render(page.template, {
        //             manifest: manifest,
        //             title: page.title || '',
        //             data: page.data ?
        //                 (typeof page.data === 'function')?page.data():page.data
        //                 : {}
        //         });
        //     });
        //
        //     app.use(page.url, page.router);
        //
        //     // app.get('/detail', function (req, res) {
        //     //     const data = reload(path.resolve(__dirname, './mock/pages/detail'));
        //     //     res.render('detail/index', {
        //     //         title: 'detail',
        //     //         data: data()
        //     //     });
        //     // });
        //     //
        //     // app.use('/detail', require('./mock/pages/'))
        //
        // })();



    }
};

