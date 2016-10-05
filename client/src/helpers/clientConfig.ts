import * as _ from 'lodash';

interface ClientConfig {
    idDevLocal: boolean,
    format: {
        date: string,
        year: string,
        currencySymbol: string
    }
}

function loadConfig() {
    let configData = require('../../config/config.json');

    return configData;
}

let configValues: ClientConfig = loadConfig();

export default configValues;

