const path = require('path');
module.exports = function (__basename) {
    return function () {
        const args = Array.prototype.slice.call(arguments);
        return path.resolve.apply(null, [__basename].concat(args));
    }
};

