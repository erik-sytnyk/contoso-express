import dbInit from '../database/database';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import {User} from '../../typings/app/models';
const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
import AppError from '../appError';

export default {
    init,
    getUsers,
    getById,
    getLocalUserByEmail,
    findUserWithEmail,
    saveLocalAccount,
    getUserByActivationToken,
    refreshActivationToken,
    activateUser,
    comparePasswords,
    findUserByAuthProviderId,
    saveAuthProviderProfile,
    resetPassword,
    getUserByResetToken,
    refreshResetToken,
    updateUserPassword
};

const db = dbInit.init();
let userModel = db.models.User;

function init(db) {
    userModel = db.models.User;
}

function getUsers(): Promise<User[]> {
    return userModel.findAll();
}

function getById(id: number): Promise<User> {
    return userModel.findById(id);
}

function getLocalUserByEmail(email: string): Promise<User> {
    return findUserWithEmail(email)
        .then((user: User) => {
            let noLocalProfile = !user || !user.profile.local;

            if (noLocalProfile) return null;

            return user;
        });
}

function findUserWithEmail(email: string): Promise<User> {
    return userModel.findOne({where: {email: email}});
}

function saveLocalAccount(user: User, email: string, password: string): Promise<User> {
    let localProfile: any = {};

    localProfile.email = email;
    localProfile.password = userModel.generateHash(password);

    let activationToken = generateActivationToken();
    localProfile.activation = {
        token: activationToken,
        created: new Date()
    };

    localProfile.isActivated = false;

    if (user) {
        user.email = email;
        user.profile.local = localProfile;

        return updateUser(user);
    } else {
        return userModel.create({
            email: email,
            profile: {
                local: localProfile
            }
        });
    }
}

function getUserByActivationToken(token: string): Promise<User> {
    return getUsers()
        .then((users) => {
            let findUser = _.find(users, (user) => {
                return user.profile.local &&
                    user.profile.local.activation.token === token;
            });

            return findUser;
        });
}

function refreshActivationToken(userId: number): Promise<User> {
    return getById(userId)
        .then((user) => {
            if (!user) throw new AppError('auth', 'user_not_found');

            user.profile.local.activation = {
                token: generateActivationToken(),
                created: new Date().toString()
            };

            return updateUser(user);
        });
}

function activateUser(userId: number): Promise<User> {
    return getById(userId)
        .then((user) => {
            if (!user) throw new AppError('auth', 'user_not_found');

            let localProfile = user.profile.local;

            localProfile.activation = undefined;
            localProfile.isActivated = true;

            return updateUser(user);
        });
}

function comparePasswords(userId: number, password: string): Promise<boolean> {
    return getById(userId)
        .then((user) => {
            let actualPassword = user.profile.local.password;

            return bcrypt.compareSync(password, actualPassword);
        });
}

function findUserByAuthProviderId(id: number, provider: string): Promise<User> {
    return getUsers()
        .then((users) => {
            let findUser = _.find(users, (user) => {
                return user.profile[provider] &&
                    user.profile[provider].id === id;
            });

            return findUser;
        });
}

function saveAuthProviderProfile(user, profileData: {id: string, token: string, name: string, email: string}, provider: string): Promise<User> {
    if (user) {
        user.email = profileData.email;
        user.profile[provider] = profileData;

        return updateUser(user);
    } else {
        return userModel.create({
            email: profileData.email,
            profile: {
                [provider]: profileData
            }
        });
    }
}

function resetPassword(userId: number): Promise<User> {
    return getById(userId)
        .then((user) => {
            if (!user) throw new AppError('Cannot find user by Id');

            user.profile.local.reset = {
                token: generateActivationToken(),
                created: new Date().toString()
            };

            return updateUser(user);
        });
}

function getUserByResetToken(token: string): Promise<User> {
    return getUsers()
        .then((users) => {
            let findUser = _.find(users, (user) => {
                return user.profile.local &&
                    user.profile.local.reset.token === token;
            });

            return findUser;
        });
}

function refreshResetToken(userId: number): Promise<User> {
    return getById(userId)
        .then((user) => {
            if (!user) throw new AppError('Cannot find user');

            user.profile.local.reset = {
                token: generateActivationToken(),
                created: new Date().toString()
            };

            return updateUser(user);
        });
}

function updateUserPassword(userId: number, password: string): Promise<User> {
    return getById(userId)
        .then((user) => {
            if (!user) throw new AppError('Cannot find user');

            let localProfile = user.profile.local;

            localProfile.reset = undefined;
            localProfile.password = userModel.generateHash(password);

            return updateUser(user);
        });
}

function generateActivationToken(): string {
    let token = crypto.randomBytes(32).toString('hex');
    return token;
}

function updateUser(user) {
    //to notify sequelize that JSON field should be updated
    user.profile = _.clone(user.profile);

    return user.save();
}