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

function start(port) {
    initExpress();

    const passport = require('passport');

    routes.init(app, passport);

    //should be after routes.init
    initErrorHandling(app);

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            return resolve(port);
        });
    });
}

function initExpress() {
    if (config.app.isDevLocal) app.use(morgan('dev')); //log requests

    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(compression());

    if (config.app.isDevLocal) app.use(cors());

    //NOTE following required for auth only

    initSession();

    initAuth();
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