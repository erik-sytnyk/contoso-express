import * as _ from 'lodash';
import config from '../config';
let app = null;
let passport = null;

export default init;

function init(expressApp, passportAuth) {
    app = expressApp;
    passport = passportAuth;
    return {
        app,
        isLoggedIn,
        get: httpGet,
        post: httpPost,
        put: httpPut,
        delete: httpDelete
    };
}

interface AccessMode {
    auth?: boolean,
    view?: boolean
}

function httpGet(path, handler, accessMode?: AccessMode) {
    const args = getRouteArguments(path, handler, accessMode);
    app.get.apply(app, args);
}

function httpPost(path, handler, accessMode?: AccessMode) {
    const args = getRouteArguments(path, handler, accessMode);
    app.post.apply(app, args);
}

function httpPut(path, handler, accessMode?: AccessMode) {
    const args = getRouteArguments(path, handler, accessMode);
    app.put.apply(app, args);
}

function httpDelete(path, handler, accessMode?: AccessMode) {
    const args = getRouteArguments(path, handler, accessMode);
    app.delete.apply(app, args);
}

function getRouteArguments(path, handler, accessMode) {
    let result = [];

    accessMode = normalizeAccessMode(accessMode);

    result.push(path);
    let accessHandlers = getAccessCheck(accessMode);
    result = result.concat(accessHandlers);
    result.push(handler);

    return result;
}

function normalizeAccessMode(accessMode?: AccessMode): AccessMode {
    if (!accessMode) {
        return {
            auth: true,
            view: false
        };
    }

    if (_.isUndefined(accessMode.auth)) {
        accessMode.auth = true;
    }

    return accessMode;
}

function getAccessCheck(accessMode: AccessMode) {
    if (!accessMode.auth) return [];

    if (accessMode.view) {
        return [isLoggedInView];
    }
    else {
        return [isLoggedIn];
    }
}

function isLoggedIn(req, res, next) {
    if (!config.auth.useAuth) return next();

    if (req.isAuthenticated()) return next();

    res.send(401, 'Unauthorized');
}

function isLoggedInView(req, res, next) {
    if (!config.auth.useAuth) return next();

    if (req.isAuthenticated()) return next();

    res.redirect('/login');
}