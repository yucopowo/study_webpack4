const path = require('path');
const dir = require('node-dir');

function create() {

    const files = dir.files(path.resolve(__dirname, '../', 'mock/pages'), 'file', function(err, files) {
        if (err) throw err;
    }, {
        sync:true
    });

    const entry = {};
    const pages = [];
    const routes = {};
    const dll = {};

    files.forEach(function (file) {

        const m = require(file);
        if(file.endsWith('/page.js')){
            pages.push(m);
            m.entry && Object.assign(entry, m.entry);
            m.dll && Object.assign(dll, m.dll);
        }
        else if(file.endsWith('/router.js')){

            if(m.base) {
                base.push(m);
            }
            else{
                const pagepath = file.replace('/router.js', '/page.js');
                const pagemodule = require(pagepath);
                routes[pagemodule.url] = m;
            }

        }

        // const m = require(file);
        // if(file.endsWith('/page.js')){
        //     pages.push(m);
        //     m.entry && Object.assign(entry, m.entry);
        // }
        // else if(file.endsWith('/router.js')){
        //
        //
        //
        //     routes[m.url] = m;
        // }

    });

    return {
        entry, pages, routes, dll
    }
}

const {entry, pages, routes, dll} = create();

console.log(dll);

module.exports = {
    // entry: entry,
    dll: dll,
    entry: {
        // demo_ie9: path.resolve(__dirname, '../', 'src/pages/demo_ie9/index.js')
        detail: path.resolve(__dirname, '../', 'src/pages/detail/index.js')

    },
    pages: pages,
    routes: routes,
};

