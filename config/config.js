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

    files.forEach(function (file) {

        const m = require(file);
        if(file.endsWith('/page.js')){
            pages.push(m);
            m.entry && Object.assign(entry, m.entry);
        }
        else if(file.endsWith('/router.js')){
            routes[m.url] = m;
        }

    });

    return {
        entry, pages, routes
    }
}

const {entry, pages, routes} = create();

console.log(entry);

module.exports = {
    // entry: entry,
    entry: {
        detail: path.resolve(__dirname, '../', 'src/pages/detail/index.js')
    },
    pages: pages,
    routes: routes,
};

