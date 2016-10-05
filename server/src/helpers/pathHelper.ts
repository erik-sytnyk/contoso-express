import * as path from 'path';
import * as _ from 'lodash';

let rootPath = path.join(__dirname, '../..');
let defaultDataPath = path.join(rootPath, 'data');

export default {
    path,
    getRelative: getRelativePath,
    getDataRelative: getDataRelativePath
};

function getRelativePath(...paths: string[]) {
    let args = _.toArray(arguments);

    args.unshift(rootPath);

    return path.join.apply(this, args);
}

function getDataRelativePath(...paths: string[]) {
    let args = _.toArray(arguments);

    args.unshift(getDataPath());

    return path.join.apply(this, args);
}

function getDataPath() {
    if (process.env['NODE_DATA_DIR']) {
        return process.env['NODE_DATA_DIR'];
    }

    return defaultDataPath;
}