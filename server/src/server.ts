import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as _ from 'lodash';

import config from './config';
import pathHelper from './helpers/pathHelper';
import routes from './routes/routes';
import logger from './logger';
import auth from './auth/authInit';

const app = express();

export default {
    start
};

function start(options: any) {
    initExpress();

    initViewEngine();

    const passport = require('passport');

    routes.init(app, passport);

    //should be after routes.init
    initErrorHandling(app);

    app.listen(config.web.port, function () {
        console.log(`Server is listening on port ${config.web.port}!`);
    });
}

function initExpress() {
    if (config.app.isDevLocal) app.use(morgan('dev')); //log requests

    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/static', express.static(pathHelper.getRelative('../client/build/static')));

    app.use(compression());

    if (config.app.isDevLocal) app.use(cors());

    //NOTE following required for auth only

    initSession();

    initAuth();
}

function initViewEngine() {
    const hbs = require('express-hbs');
    const viewsDir = pathHelper.getRelative('views');
    const entities = require('entities');

    // Hook in express-hbs and tell it where known directories reside
    app.engine('hbs', hbs.express4({
        partialsDir: pathHelper.getRelative('views/partials'),
        layoutsDir: pathHelper.getRelative('views/layouts'),
        defaultLayout: pathHelper.getRelative('views/layouts/auth.hbs')
    }));

    hbs.registerHelper('json', function(obj) {
        let jsonValue = JSON.stringify(obj);

        let val = entities.encodeHTML(jsonValue);

        return new hbs.SafeString(val);
    });

    app.set('view engine', 'hbs');
    app.set('views', viewsDir);
}

function initAuth() {
    const flash = require('connect-flash');
    app.use(flash());

    const passport = require('passport');

    auth(passport);

    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    return passport;
}

function initSession() {
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    const session = require('cookie-session');
    app.use(session({
        secret: config.web.sessionSecret
    }));
}

function initErrorHandling(app: express.Application) {
    //log unhandled errors
    (app as any).use(function (err, req, res, next) {
        logger.error(err);

        console.log(err);

        let message = _.isError(err) ? err.message : err;
        message = config.app.isDevLocal ? message : 'Server Error';

        res.status(500).send({error: message});
    });

    process.on('uncaughtException', function (err) {
        logger.error(err);
    });
}