import {OAuth2Strategy as Strategy} from 'passport-google-oauth';
import config from '../../config';
import userRepository from '../../repositories/userRepository';

export default {
    init
};

let providerName = 'google';

let strategySettings = {
    clientID: config.auth.google.clientID,
    clientSecret: config.auth.google.clientSecret,
    callbackURL: `${config.app.rootUrl}/auth/${providerName}/callback`
};

function init(passport) {
    passport.use(providerName, new Strategy(strategySettings, providerLogin));
}

async function providerLogin(token, refreshToken, profile, done) {
    try {
        let providerUser = await userRepository.findUserByAuthProviderId(profile.id, providerName);

        if (providerUser) {
            return done(null, providerUser);
        }

        let email = (profile.emails[0].value || '').toLowerCase();

        let user = await userRepository.findUserWithEmail(email);

        let profileData = {
            token,
            email,
            id: profile.id,
            name: profile.displayName
        };

        user = await userRepository.saveAuthProviderProfile(user, profileData, providerName);

        return done(null, user);

    } catch (err) {
        return done(err, null);
    }
}