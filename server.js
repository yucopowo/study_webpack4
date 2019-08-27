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



    }
};

