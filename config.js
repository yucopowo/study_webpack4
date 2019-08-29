const path = require('path');
const dir = require('node-dir');

function _path() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.resolve.apply(null, args);
}

function create() {

    const files = dir.files(path.resolve(__dirname, './', 'mock/pages'), 'file', function(err, files) {
        if (err) throw err;
        console.log(files);



    }, {
        sync:true
    });

    // console.log(files);

    const pages = [];

    const routes = {};

    files.forEach(function (file) {

        const m = require(file);
        if(file.endsWith('/page.js')){
            pages.push(m);
        }
        else if(file.endsWith('/router.js')){
            // routes.push(file);
            routes[m.url] = m;
        }

    });

    return {
        pages, routes
    }

    // dir.readFiles(path.resolve(__dirname, './', 'mock/pages'), {
    //         match: /.(page|router)/
    //     },
    //     function(err, content, next) {
    //         if (err) throw err;
    //         next();
    //     },
    //     function(err, files){
    //         if (err) throw err;
    //         console.log('finished reading files:', files);
    //     });
}

const {pages, routes} = create();

console.log(routes);

module.exports = {
    entry: {
        home:           _path('./src/pages/home/index.js'),
        login:          _path('./src/pages/login/index.js'),
        register:       _path('./src/pages/register/index.js'),
        list:           _path('./src/pages/list/index.js'),
        detail:         _path('./src/pages/detail/index.js'),
        about:          _path('./src/pages/about/index.tsx'),
        book:           _path('./src/pages/book/index.js'),
        introduce:      _path('./src/pages/introduce/index.js'),
        pdf:            _path('./src/pages/pdf/index.js'),
        pdf_worker:     'pdfjs-dist/build/pdf.worker.entry',

        video:          _path('./src/pages/video/index.js'),
        echarts:        _path('./src/pages/echarts/index.js'),
        vue:            _path('./src/pages/vue/index.js'),
        redux:          _path('./src/pages/redux/index.js'),
        elm:            _path('./src/pages/elm/index.js'),
        compressorjs:   _path('./src/pages/compressorjs/index.js'),
        'element-ui':   _path('./src/pages/element_ui/index.js'),
        bootstrap:      _path('./src/pages/bootstrap/index.js'),

    },
    pages: pages,
    routes: routes,
    // pages: [
    //     _path('./mock/pages/detail/page'),
    //     _path('./mock/pages/about/page'),
    //     _path('./mock/pages/list/page'),
    //     _path('./mock/pages/book/page'),
    //     _path('./mock/pages/introduce/page'),
    //     _path('./mock/pages/pdf/page'),
    //     _path('./mock/pages/video/page'),
    //     _path('./mock/pages/echarts/page'),
    //     _path('./mock/pages/vue/page'),
    //     _path('./mock/pages/redux/page'),
    //     _path('./mock/pages/elm/page'),
    //     _path('./mock/pages/compressorjs/page'),
    //     _path('./mock/pages/element_ui/page'),
    //     _path('./mock/pages/bootstrap/page'),
    // ],
    // routes: {
    //     '/company':     _path('./mock/dict/company'),
    //     '/detail':      _path('./mock/pages/detail/router'),
    //     '/about':       _path('./mock/pages/about/router'),
    //     '/list':        _path('./mock/pages/list/router'),
    //     '/book':        _path('./mock/pages/book/router'),
    //     '/introduce':   _path('./mock/pages/introduce/router'),
    //     '/pdf':         _path('./mock/pages/pdf/router'),
    //     '/redux':       _path('./mock/pages/redux/router'),
    //
    // }
};

