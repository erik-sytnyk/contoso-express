import {Strategy as LocalStrategy} from 'passport-local';
import userRepository from '../repositories/userRepository';
import textValue from '../helpers/textValueHelper';
import * as moment from 'moment';
import AppError from '../appError';
import helper from './authHelper';

export default function init(passport) {
    let strategySettings = {
        usernameField: 'email',
        passwordField: 'password',
        // allows to pass in the express req
        passReqToCallback: true
    };

    let routes = {
        home: '/',
        logIn: 'login',
        signUp: '/signup'
    };

    passport.use('local-signup', new LocalStrategy(strategySettings, signUpPostLocal));
    passport.use('local-login', new LocalStrategy(strategySettings, logInPostLocal));

    return {
        logIn: logIn,
        logInPost: passport.authenticate('local-login', {
            successRedirect: routes.home,
            failureRedirect: routes.logIn,
            failureFlash: true
        }),
        logOut: logOut,
        signUp: signUp,
        signUpPost: passport.authenticate('local-signup', {
            successRedirect: routes.home,
            failureRedirect: routes.signUp,
            failureFlash: true
        }),
        activate: activate,
        forgotPassword: forgotPassword,
        forgotPasswordPost: forgotPasswordPost,
        resetPassword: resetPassword,
        resetPasswordPost: resetPasswordPost,
        facebook: passport.authenticate('facebook', {scope: 'email'}),
        facebookCallback: passport.authenticate('facebook', {
            successRedirect: routes.home,
            failureRedirect: routes.logIn
        }),
        google: passport.authenticate('google', {scope: ['profile', 'email']}),
        googleCallback: passport.authenticate('google', {
            successRedirect: routes.home,
            failureRedirect: routes.logIn
        })
    };
}

async function logIn(req, res) {
    let viewModel = {};
    helper.renderView('login', viewModel, req, res);
}

async function logInPostLocal(req, email, password, done) {
    if (email) email = email.toLowerCase();

    try {
        let user = await userRepository.getLocalUserByEmail(email);

        // if no user is found
        if (!user) throw new AppError('auth', 'user_not_found');
        
        if (!user.profile.local.isActivated) {
            throw new AppError('auth', 'account_not_activated');
        }

        let isCorrectPassword = await userRepository.comparePasswords(user.id, password);

        if (!isCorrectPassword) throw new AppError('auth', 'wrong_password');

        //all is ok!
        return done(null, user);
    }
    catch (err) {
        let errorMessage = helper.handleError(err);
        helper.sendAuthErrorMessage(errorMessage, done, req);
    }
}

async function signUp(req, res) {
    let viewModel = {};
    helper.renderView('signup', viewModel, req, res);
}

async function signUpPostLocal(req, email, password, done) {
    try {
        let validationMessage = validateSingUpModel(req.body);

        if (validationMessage) return helper.sendAuthMessage(validationMessage, 'warning', done, req);

        //Use lower-case e-mails to avoid case-sensitive e-mail matching
        if (email) email = email.toLowerCase();

        if (req.user) throw new AppError('auth', 'already_logged_in');

        let localUser = await userRepository.getLocalUserByEmail(email);

        let alreadyActivated = localUser && localUser.profile.local.isActivated;
        if (alreadyActivated) throw new AppError('auth', 'email_activated');

        let user = await userRepository.findUserWithEmail(email);

        user = await userRepository.saveLocalAccount(user, email, password);

        await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

        let message = textValue.info('auth', 'activation_email_confirmation');
        return helper.sendAuthMessage(message, 'success', done, req);
    }
    catch (err) {
        let errorMessage = helper.handleError(err);
        helper.sendAuthErrorMessage(errorMessage, done, req);
    }
}

function validateSingUpModel(model) {
    if (!model.email) return textValue.warning('auth', 'required_field', {name: 'Email'});

    if (!helper.isValidEmail(model.email)) return textValue.warning('auth', 'email_not_valid');

    if (!model.password) return textValue.warning('auth', 'required_field', {name: 'Password'});

    if (!model['confirm_password']) return textValue.warning('auth', 'required_field', {name: 'Confirm Password'});

    if (model.password !== model['confirm_password']) return textValue.warning('auth', 'passwords_not_match');

    return helper.isValidPassword(model.password);
}

async function activate(req, res) {
    try {
        let token = req.params.token;

        if (!token) throw new AppError('auth', 'activation:no_token');

        let localUser = await userRepository.getUserByActivationToken(token);

        if (!localUser) throw new AppError('auth', 'wrong_activation_token');

        let activationTime = localUser.profile.local.activation.created;
        let isTokenExpired = moment().diff(activationTime, 'hours') > 24;

        if (isTokenExpired) {
            let user = await userRepository.refreshActivationToken(localUser.id);

            await helper.sendActivationEmail(user.email, user.profile.local.activation.token);

            throw new AppError('auth', 'activation:expired_token');
        } else {
            await userRepository.activateUser(localUser.id);

            let message = textValue.info('auth', 'activation_success');
            return helper.redirectToLogIn(message, 'info', req, res);
        }
    } catch (err) {
        let errorMessage = helper.handleError(err);
        return helper.redirectToLogIn(errorMessage, 'error', req, res);
    }
}

async function logOut(req, res) {
    req.logOut();
    res.redirect('/login');
}

async function forgotPassword(req, res) {
    let viewModel = {};
    helper.renderView('password-forgot', viewModel, req, res);
}

async function forgotPasswordPost(req, res) {
    let viewModel = req.body;

    try {
        let email = req.body.email.toLowerCase();

        let localUser = await userRepository.getLocalUserByEmail(email);

        if (!localUser) throw new AppError('auth', 'forgot_password:no_email');

        let updatedUser = await userRepository.resetPassword(localUser.id);

        await helper.sendResetPasswordEmail(updatedUser.email, updatedUser.profile.local.reset.token);

        let message = textValue.info('auth', 'reset_password_email_confirmation');
        helper.setStatusMessage(req, message, 'success');
        return helper.renderView('password-forgot', viewModel, req, res);

    } catch (err) {
        let errorMessage = helper.handleError(err);
        helper.setStatusMessage(req, errorMessage, 'error');
        return helper.renderView('password-forgot', viewModel, req, res);
    }
}

async function resetPassword(req, res) {
    try {
        let token = req.params.token;

        let localUser = await getUserByResetToken(token);

        return helper.renderView('password-reset', {email: localUser.email, token: token}, req, res);

    } catch (err) {
        let errorMessage = helper.handleError(err);

        return helper.renderView('password-reset', {message: errorMessage}, req, res);
    }
}

async function resetPasswordPost(req, res) {
    try {
        let token = req.body.token;
        let password = req.body.password;

        let localUser = await getUserByResetToken(token);

        await userRepository.updateUserPassword(localUser.id, password);

        let message = textValue.info('auth', 'reset_password_success');
        helper.redirectToLogIn(message, 'success', req, res);

    } catch (err) {
        let errorMessage = helper.handleError(err);
        return helper.renderView('password-reset', {message: errorMessage}, req, res);
    }
}

async function getUserByResetToken(token) {
    if (!token) throw new AppError('auth', 'reset_password:no_token');

    let localUser = await userRepository.getUserByResetToken(token);

    if (!localUser) throw new AppError('auth', 'reset_password:wrong_token');

    let activationTime = localUser.profile.local.reset.created;
    let isTokenExpired = moment().diff(activationTime, 'hours') > 24;

    if (isTokenExpired) {
        let user = await userRepository.refreshResetToken(localUser.id);

        await helper.sendResetPasswordEmail(user.email, user.profile.local.reset.token);

        throw new AppError('auth', 'reset_password:expired_token');
    }

    return localUser;
}