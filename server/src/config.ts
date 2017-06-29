import * as fs from 'fs-extra';
import * as _ from 'lodash';

import pathHelper from './helpers/pathHelper';

let logConfig = true;

let config = {
    app: {
        appName: '',
        isDevLocal: process.env.NODE_ENV !== 'production',
        logErrors: true,
        rootUrl: 'http://localhost:3500',
        port: 3500
    },
    db: {
        host: 'localhost',
        dbName: 'contoso',
        username: '',
        password: ''
    },
    web: {
        sessionSecret: ''
    },
    email: {
        fromNoReply: ''
    },
    auth: {
        useAuth: true,
        google: {
            clientID: '',
            clientSecret: ''
        },
        facebook: {
            clientID: '',
            clientSecret: ''
        }
    },
    format: {
        date: '',
        year: '',
        currencySymbol: ''
    }
};

function tryReadConfigFile(path) {
    try {
        return fs.readJsonSync(path);
    } catch (err) {
        return {};
    }
}

let defaultFile = tryReadConfigFile(pathHelper.getDataRelative('config.json'));
_.merge(config, defaultFile);

let localFile = tryReadConfigFile(pathHelper.getLocalRelative('config.local.json'));
_.merge(config, localFile);

if (logConfig) {
    console.log('App configuration:');
    console.log(JSON.stringify(config, null, 2));
}

export default config;