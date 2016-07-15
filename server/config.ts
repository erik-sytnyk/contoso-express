import pathHelper from './helpers/pathHelper';

interface IConfigValues {
    app: {
        appName: string,
        isDevLocal: boolean,
        logErrors: boolean,
        rootUrl: string
    },
    db: {
        host: string,
        dbName: string,
        username: string,
        password: string
    },
    web: {
        port: number,
        sessionSecret: string
    },
    email: {
        fromNoReply: string
    },
    auth: {
        useAuth: boolean,
        google: {
            clientID: string,
            clientSecret: string
        },
        facebook: {
            clientID: string,
            clientSecret: string
        }
    },
    format: {
        date: string,
        year: string,
        currencySymbol: string
    }
}

let configValues = <IConfigValues>{};

ensureConfigPath();

const configReader = require('config');

loadConfig();

export function getClientConfig() {
    return {
        isDevLocal: configValues.app.isDevLocal,
        dateFormat: configValues.format.date,
        yearFormat: configValues.format.year,
        currencySymbol: configValues.format.currencySymbol
    };
}

export function loadConfig() {

    (<any>configValues).app = {};
    configValues.app.appName = get('app.appName');
    configValues.app.isDevLocal = get('app.isDevLocal');
    configValues.app.logErrors = get('app.logErrors');
    configValues.app.rootUrl = get('app.rootUrl');

    (<any>configValues).db = {};
    configValues.db.host = get('db.host');
    configValues.db.dbName = get('db.dbName');
    configValues.db.username = get('db.username');
    configValues.db.password = get('db.password');

    (<any>configValues).web = {};
    configValues.web.port = get('web.port');
    configValues.web.sessionSecret = get('web.sessionSecret');

    (<any>configValues).email = {};
    configValues.email.fromNoReply = get('email.fromNoReply');

    (<any>configValues).auth = {};
    configValues.auth.useAuth = get('auth.useAuth');

    (<any>configValues).auth.google = {};
    configValues.auth.google.clientID = get('auth.google.clientID');
    configValues.auth.google.clientSecret = get('auth.google.clientSecret');

    (<any>configValues).auth.facebook = {};
    configValues.auth.facebook.clientID = get('auth.facebook.clientID');
    configValues.auth.facebook.clientSecret = get('auth.facebook.clientSecret');

    (<any>configValues).format = {};
    configValues.format.date = get('format.date');
    configValues.format.year = get('format.year');
    configValues.format.currencySymbol = get('format.currencySymbol');
}

function get(key) {
    return configReader.get(key);
}

function ensureConfigPath() {
    if (!process.env['NODE_CONFIG_DIR']) {
        let configPath = pathHelper.getDataRelative('config');
        process.env['NODE_CONFIG_DIR'] = configPath;
    }
}

export default configValues;