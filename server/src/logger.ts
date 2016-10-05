import * as _ from 'lodash';
import * as moment from 'moment';
import * as winston from 'winston';
import pathHelper from './helpers/pathHelper';
import config from './config';
import AppError from './appError';

let errorLogger = null;
let performanceLogger = null;
let infoLogger = null;
let performanceCache = {};

export default {
    error: logError,
    info: logInfo,
    timeStart: logTimeStart,
    timeEnd: logTimeEnd,
    logMessage: logMessage
};

function initLoggers() {
    let getTransportFile = (logFileName) =>
        new winston.transports.File({filename: pathHelper.getDataRelative('logs', logFileName)});

    performanceLogger = new (winston.Logger)({
        transports: [
            getTransportFile('performance.log')
        ]
    });

    errorLogger = new (winston.Logger)({
        transports: [
            getTransportFile('errors.log')
        ]
    });

    if (config.app.logErrors) {
        winston.handleExceptions(
            (new (winston.transports.Console)()),
            getTransportFile('errors.log')
        );
    }

    infoLogger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            getTransportFile('info.log')
        ]
    });
}

initLoggers();

function logTimeStart(timerName) {
    if (!config.app.isDevLocal) return;

    if (performanceCache[timerName]) throw new AppError('Timer was already created. Timer name: ' + timerName);

    performanceCache[timerName] = new Date().getTime();

}

function logTimeEnd(timerName) {
    if (!config.app.isDevLocal) return;

    if (!performanceCache[timerName]) throw new AppError('Timer was not previously created. Timer name: ' + timerName);

    let endTime = new Date().getTime();
    let startTime = performanceCache[timerName];

    let ms = endTime - startTime;
    performanceLogger.info('Timer ' + timerName + ': ' + moment.utc(ms).format('HH:mm:ss.SSS'));

    performanceCache = _.omit(performanceCache, timerName);
}

function logError(err) {
    if (_.isError(err)) {
        errorLogger.error('Error', {errorMessage: err.message, stack: err.stack});
        return;
    }

    errorLogger.error(err);
}

function logInfo(message) {
    infoLogger.info(message);
}

function logMessage(message, metadata) {
    infoLogger.info(message, metadata);
}