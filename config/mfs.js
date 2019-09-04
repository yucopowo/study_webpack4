const path = require('path');

class MFS {

    constructor(server) {
        this.mfs = server.middleware.context.fs;
        this.__basename = path.resolve(__dirname, '../dist')
    }

    readFileSync(_path) {
        return this.mfs.readFileSync(path.resolve(this.__basename, _path), 'utf-8');
    }

}

module.exports = MFS;
