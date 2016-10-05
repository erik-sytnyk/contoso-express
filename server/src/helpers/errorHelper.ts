import logger from '../logger';
import textValue from './textValueHelper';
import config from '../config';

export default {
    logError,
    getErrorMessage
};

function getErrorMessage(error): string {
    if (!error) return '';

    if (error.isAppError) {
        if (!error.message) {
            let message = textValue.error(error.type, error.code, error.data);

            if (!message) message = `Cannot find error message for type:${error.type} code:${error.code}`;

            error.message = message;
        }

        if (error.uiShow) return error.message;
    }

    if (config.app.isDevLocal) {
        return error.message || error;
    }

    return 'Server Error';
}

function logError(error) {
    if (!config.app.logErrors) return;

    if (error.isAppError && !error.log) return;

    logger.error(error);
}