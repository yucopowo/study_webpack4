const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const base = require('./base')(__dirname, '../');

require('handlebars-helpers')({
    handlebars: handlebars
});
const helpers = {
    json: function(object) {
        return JSON.stringify(object);
    }
};

module.exports = function (app) {
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
};
