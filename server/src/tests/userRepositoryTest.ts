import helper from './_testHelper';
import userRepository from '../repositories/userRepository';
import {expect} from 'chai';

let user: any = null;
let userId: number = null;
const email = 'test@gmail.com';
const password = 'password';

describe('User Repository', () => {
    before((done) => {
        helper.initTestDb()
            .then((db) => {
                userRepository.init(db);
                done();
            });
    });

    describe('Local Profile', () => {
        it('create local account', (done) => {
            return userRepository.saveLocalAccount(null, email, password)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by email', (done) => {
            return userRepository.getLocalUserByEmail(email)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    user = data;
                    userId = user.id;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('compare passwords success', (done) => {
            return userRepository.comparePasswords(userId, password)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data).to.be.equal(true);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('compare passwords failure', (done) => {
            return userRepository.comparePasswords(userId, 'wrongPass')
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data).to.be.equal(false);
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by activation token', (done) => {
            let token = user.profile.local.activation.token;

            return userRepository.getUserByActivationToken(token)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('refresh activation token', (done) => {
            return userRepository.refreshActivationToken(userId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('activate', (done) => {
            return userRepository.activateUser(userId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    user = data;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('reset password', (done) => {
            return userRepository.resetPassword(userId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    user = data;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by reset token', (done) => {
            let token = user.profile.local.reset.token;

            return userRepository.getUserByResetToken(token)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('refresh reset token', (done) => {
            return userRepository.refreshResetToken(userId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('update password', (done) => {
            let newPassword = 'newPassword';

            return userRepository.updateUserPassword(userId, newPassword)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Google Profile', () => {
        it('get by google id failure', (done) => {
           return userRepository.findUserByAuthProviderId(1, 'google')
               .then((data) => {
                   expect(data).to.be.undefined;
                   done();
               })
               .catch(function(err) {
                   done(err);
               });
       });

        //TODO save google account (google token required)
    });

    describe('User', () => {
        it('get by id', (done) => {
            return userRepository.getById(userId)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });

        it('get by email', (done) => {
            return userRepository.findUserWithEmail(email)
                .then((data) => {
                    expect(data).not.to.be.null;
                    expect(data.email).to.be.equal(email);
                    expect(data.profile).not.to.be.null;
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });

    describe('Users', () => {
        it('get all', (done) => {
            return userRepository.getUsers()
                .then((users) => {
                    expect(users).not.to.be.null;
                    expect(users).to.have.length(1);
                    expect(users[0]).to.have.property('email');
                    done();
                })
                .catch(function(err) {
                    done(err);
                });
        });
    });
});