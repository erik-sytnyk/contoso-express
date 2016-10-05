import _ from 'lodash';

function loadConfig() {
    let configData = require('../../config/config.json');

    return configData;
}

let configValues = loadConfig();

export default configValues;

