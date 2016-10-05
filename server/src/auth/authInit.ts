import userRepository from '../repositories/userRepository';
import googleAuth from './providers/googleAuth';
import facebookAuth from './providers/facebookAuth';
import authControllerInit from './authController';

export default initPassport;

function initPassport(passport) {
    authControllerInit(passport);

    // passport session setup
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        userRepository.getById(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });
    
    googleAuth.init(passport);
    facebookAuth.init(passport);
}