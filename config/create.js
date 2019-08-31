const path = require('path');
const fs = require('fs');

console.log('create');

const mock = '';
const src = '';
const templates = '';

const name = 'riot';

fs.readFile(path.resolve(__dirname,'../views/templates/demo.handlebars'), 'utf-8', function (err, data) {
    const html = data
        .replace(`{{'demo.css'}}`,`{{'${name}.css'}}`)
        .replace(`{{'demo.js'}}`,`{{'${name}.js'}}`);
    fs.writeFile(path.resolve(__dirname, `../views/templates/${name}.handlebars`), html , function (err) {
        console.log(err);
    });
});