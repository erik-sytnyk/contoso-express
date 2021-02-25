import * as winston from 'winston';
import * as _ from 'lodash';
import * as fs from 'fs-extra';
import pathHelper from './helpers/pathHelper';

let errorLogger = null;
let generalLogger = null;

export default {
  error: logError,
  info
};

async function initLoggers() {
  let logPath = pathHelper.getLocalRelative('./logs');

  await fs.ensureDirSync(logPath);

  let errorLogPath = pathHelper.getLocalRelative('./logs/errors.log');
  let infoLogPath = pathHelper.getLocalRelative('./logs/info.log');

  errorLogger = winston.createLogger({
    transports: [new winston.transports.File({filename: errorLogPath})]
  });

  winston.exceptions.handle(new winston.transports.File({filename: errorLogPath}));

  generalLogger = winston.createLogger({
    transports: [new winston.transports.File({filename: infoLogPath})]
  });
}

//initLoggers();

function logError(err) {
  console.log(err);

  if (_.isError(err)) {
    return errorLogger.error('Error', {errorMessage: err.message, stack: err.stack});
  } else {
    errorLogger.error(err);
  }
}

function info(message, metadata = {}) {
  generalLogger.info(message, metadata);
}
