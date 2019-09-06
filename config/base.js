const path = require('path');
module.exports = function () {
    const args0 = Array.prototype.slice.call(arguments);
    return function () {
        const args1 = Array.prototype.slice.call(arguments);
        return path.join.apply(null, [].concat(args0).concat(args1));
    }
};

