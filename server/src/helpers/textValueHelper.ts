const _ = require('lodash');
import pathHelper from './/pathHelper';

const template = require('es6-template-strings');
const textValuesPath = pathHelper.getDataRelative('text', 'textValues.json');
const textValuesInfo = require(textValuesPath);

export default {
    byKey,
    error,
    info,
    warning
};

function byKey(key: string, data?: Object): string {
    let val = _.get(textValuesInfo, key);

    if (!val) return;

    let result = data ? template(val, data) : val;

    return result;
}

function error(type: string, code: string, data?: Object) {
    let key = `errors.${type}.${code}`;

    return byKey(key, data);
}

function info(type: string, code: string, data?: Object) {
    let key = `info.${type}.${code}`;

    return byKey(key, data);
}

function warning(type: string, code: string, data?: Object) {
    let key = `warning.${type}.${code}`;

    return byKey(key, data);
}