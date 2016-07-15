import * as $ from 'jquery';

interface ClientConfig {
    idDevLocal: boolean,
    dateFormat: string,
    yearFormat: string,
    currencySymbol: string
}

function loadConfig() {
    let jsonStr = $('#configVal').val();

    return JSON.parse(jsonStr);
}

let configValues: ClientConfig = loadConfig();

export default configValues;

