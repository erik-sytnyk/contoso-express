import {Strategy} from 'passport-facebook';
import config from '../../config';
import userRepository from '../../repositories/userRepository';

export default {
    init
};

let providerName = 'facebook';

let strategySettings = {
    clientID: config.auth.facebook.clientID,
    clientSecret: config.auth.facebook.clientSecret,
    callbackURL: `${config.app.rootUrl}/auth/${providerName}/callback`,
    profileFields: ['id', 'emails', 'name']
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