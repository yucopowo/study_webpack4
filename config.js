const path = require('path');
function _path() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(__dirname);
    return path.resolve.apply(null, args);
}

module.exports = {
    pages: [
        _path('./mock/pages/detail/page')
    ],
    routes: {
        '/company': _path('./mock/dict/company'),
        '/detail': _path('./mock/pages/detail/router'),
    }
};

