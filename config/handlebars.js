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



module.exports = function (app) {

};
