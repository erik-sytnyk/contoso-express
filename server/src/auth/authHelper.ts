import config from '../config';
import emailHelper from '../helpers/emailHelper';
import errorHelper from '../helpers/errorHelper';
import AppError from '../appError';
import textValue from '../helpers/textValueHelper';
import controllerHelper from '../controllers/_controllerHelper';

export default {
    renderView,
    setStatusMessage,
    handleError,
    redirectToLogIn,
    sendAuthErrorMessage,
    sendAuthMessage,
    sendResetPasswordEmail,
    sendActivationEmail,
    isValidEmail,
    isValidPassword
};

function renderView(viewName, viewModel, req, res) {
    let statusMessage = null;

    let flashArray = req.flash('statusMessage');
    if (flashArray && flashArray.length > 0) {
        statusMessage = flashArray[0];
    }

    if (statusMessage) {
        viewModel.statusMessage = statusMessage;
    }

    return controllerHelper.renderView(viewName, viewModel, res);
}

function setStatusMessage(req, message: string, type?: string) {
    if (!type) {
        type = 'error';
    }

    let uiClass = '';

    switch (type) {
        case 'error':
            uiClass = 'alert-danger';
            break;
        case 'success':
            uiClass = 'alert-success';
            break;
        case 'info':
            uiClass = 'alert-info';
            break;
        case 'warning':
            uiClass = 'alert-warning';
            break;
        default:
            throw new AppError(`Not supported status message type: '${type}'`);
    }

    let statusMessage = {
        message: message,
        uiClass: uiClass
    };

    req.flash('statusMessage', statusMessage);
}

function redirectToLogIn(message, type, req, res) {
    setStatusMessage(req, message, type);
    res.redirect('/login');
}

function sendAuthErrorMessage(message, done, req) {
    return done(null, false, setStatusMessage(req, message));
}

function sendAuthMessage(message, type, done, req) {
    if (message) return done(null, false, setStatusMessage(req, message, type));

    return done();
}

function sendResetPasswordEmail(email, token) {
    let data = {
        token,
        siteRootUrl: config.app.rootUrl
    };

    return emailHelper.sendEmailTemplate('password_reset', data, {
        to: email,
        from: config.email.fromNoReply
    });
}

function sendActivationEmail(email, token) {
    let data = {
        token,
        siteRootUrl: config.app.rootUrl
    };

    return emailHelper.sendEmailTemplate('activation', data, {
        to: email,
        from: config.email.fromNoReply
    });
}

function isValidEmail(email) {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function isValidPassword(password) {
    let message = '';
    const minMaxLength = /^[\s\S]{8,16}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        hasNumber = /[0-9]/,
        hasSpecial = /[ !'#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (!minMaxLength.test(password)) {
        message = textValue.warning('auth', 'password_length');
        return message;
    }

    //NOTE add additional password rules if required

    return message;
}

function handleError(error) {
    errorHelper.logError(error);

    let errorMessage = errorHelper.getErrorMessage(error);

    if (!errorMessage) return 'Auth Error'; //Cannot find error description

    return errorMessage;
}