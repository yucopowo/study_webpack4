const path = require('path');
function _path() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.resolve.apply(null, args);
}

module.exports = {
    entry: {
        home:       _path('./src/home/index.js'),
        login:      _path('./src/login/index.js'),
        register:   _path('./src/register/index.js'),
        list:       _path('./src/list/index.js'),
        detail:     _path('./src/detail/index.js'),
        about:      _path('./src/about/index.tsx'),
        book:       _path('./src/book/index.js'),
        introduce:  _path('./src/introduce/index.js'),
        pdf:        _path('./src/pdf/index.js'),
        pdf_worker:'pdfjs-dist/build/pdf.worker.entry',

        video:      _path('./src/video/index.js'),
        echarts:    _path('./src/echarts/index.js'),
        vue:        _path('./src/vue/index.js'),
        redux:      _path('./src/redux/index.js'),
        elm:        _path('./src/elm/index.js'),
        compressorjs:_path('./src/compressorjs/index.js'),

    },
    pages: [
        _path('./mock/pages/detail/page'),
        _path('./mock/pages/about/page'),
        _path('./mock/pages/list/page'),
        _path('./mock/pages/book/page'),
        _path('./mock/pages/introduce/page'),
        _path('./mock/pages/pdf/page'),
        _path('./mock/pages/video/page'),
        _path('./mock/pages/echarts/page'),
        _path('./mock/pages/vue/page'),
        _path('./mock/pages/redux/page'),
        _path('./mock/pages/elm/page'),
        _path('./mock/pages/compressorjs/page'),

    ],
    routes: {
        '/company':     _path('./mock/dict/company'),
        '/detail':      _path('./mock/pages/detail/router'),
        '/about':       _path('./mock/pages/about/router'),
        '/list':        _path('./mock/pages/list/router'),
        '/book':        _path('./mock/pages/book/router'),
        '/introduce':   _path('./mock/pages/introduce/router'),
        '/pdf':         _path('./mock/pages/pdf/router'),
        '/redux':       _path('./mock/pages/redux/router'),

    }
};

