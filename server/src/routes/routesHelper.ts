let app = null;
let passport = null;

export default {
    init,
    get: getRout,
    put: putRout,
    post: postRout,
    delete: deleteRout
};

function init(expressApp, passportAuth) {
    app = expressApp;
    passport = passportAuth;
}

function getRout(route, handler, options = {}) {
    let handlers = getHandlers(handler, options);

    app.get(route, handlers);
}

function putRout(route, handler, options = {}) {
    let handlers = getHandlers(handler, options);

    app.put(route, handlers);
}

function postRout(route, handler, options = {}) {
    let handlers = getHandlers(handler, options);

    app.post(route, handlers);
}

function deleteRout(route, handler, options = {}) {
    let handlers = getHandlers(handler, options);

    app.delete(route, handlers);
}

function getHandlers(handler, options) {
    setOptionsDefaults(options);

    let handlers = [];

    if (options.auth) {
        handlers.push(getAuthenticatedCheckHandler());
    }

    handlers.push(handler);

    return handlers;
}

function setOptionsDefaults(options) {
    //require auth by default
    if (options.auth === undefined) {
        options.auth = true;
    }
}

function getAuthenticatedCheckHandler() {
    return (req, res, next) => {
        let isAuthenticated = !!req.session.user;

        if (isAuthenticated) return next();

        res.status(401).send('Unauthorized');
    };
}