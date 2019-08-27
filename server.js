const axios = require("axios");
const fs = require("fs");
const path = require('path');
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

function reload(modulepath) {
    delete require.cache[require.resolve(modulepath)];
    return require(modulepath);
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
    hot: false,
    hotOnly: false,
    inline: false,
    // lazy: true,
    contentBase: ['./cache','./dist'],
    // filename: 'list.bundle.js',
    before: function(app, server) {
        // app.get('/some/path', function(req, res) {
        //     res.json({ custom: 'response' });
        // });
        const manifest = {};
        async function requestManifest(req, res, next) {
            if( !(req.url.indexOf('/manifest.json')!==-1) && Object.keys(manifest).length === 0 ){
                const response = await axios.get('http://127.0.0.1:8080/manifest.json');
                Object.assign(manifest, response.data);
            }
            next();
        }
        app.use(requestManifest);

        app.engine('handlebars', exphbs({
            handlebars: handlebars,
            layoutsDir: path.join(__dirname, './views/layouts/'),
            partialsDir: path.join(__dirname, './views/partials/'),
            defaultLayout: 'default',
            helpers: helpers
        }));
        // app.set('views', path.join(__dirname, 'views'));
        app.set('views', path.join(__dirname, 'src'));

        app.set('view engine', 'handlebars');
        app.disable('view cache');

        app.get('/home', function (req, res) {
            res.render('home/index');
        });

        // app.get('/', function (req, res) {
        //     res.render('pages/home');
        // });



        (function () {
            const page = require('./mock/pages/detail');

            app.get(page.url, async function (req, res) {
                // const data = reload(path.resolve(__dirname, './mock/pages/detail'));
                res.render(page.template, {
                    manifest: manifest,
                    title: page.title || '',
                    data: page.data ?
                        (typeof page.data === 'function')?page.data():page.data
                        : {}
                });
            });

            app.use(page.url, page.router);

            // app.get('/detail', function (req, res) {
            //     const data = reload(path.resolve(__dirname, './mock/pages/detail'));
            //     res.render('detail/index', {
            //         title: 'detail',
            //         data: data()
            //     });
            // });
            //
            // app.use('/detail', require('./mock/pages/'))

        })();



    }
};

