import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as _ from 'lodash';

import db from './database/database';
import config from './config';
import routes from './routes/routes';
import logger from './logger';
import pathHelper from './helpers/pathHelper';

const app = express();

export default {
  start
};

function start(port) {
  initExpress();

  routes.init(app);

  initErrorHandling(app);

  db.init();

  if (config.isDevLocal) {
    app.use(morgan('dev'));
  }

  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      return resolve(port);
    });
  });
}

function initExpress() {
  if (config.isDevLocal) app.use(morgan('dev')); //log requests

  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/', express.static(pathHelper.getClientRelative('/')));

  app.use(cors());

  initSession();
}

function initSession() {
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());

  const session = require('cookie-session');
  app.use(
    session({
      secret: 'tm_app_secret_!!!',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    })
  );
}

function initErrorHandling(app) {
  //log unhandled errors
  app.use(function (err, req, res, next) {
    logger.error(err);

    console.log(err);

    let message = _.isError(err) ? err.message : err;
    message = config.isDevLocal ? message : 'Server Error';

    res.status(500).send({error: message});
  });
}
