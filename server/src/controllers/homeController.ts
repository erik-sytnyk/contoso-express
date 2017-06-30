import helper from './_controllerHelper';
import pathHelper from '../helpers/pathHelper';
import userRepository from '../repositories/userRepository';

export default {
    home,
    currentUser
};

async function home(req, res) {
    try {
        return res.sendFile(pathHelper.getClientRelative('index.html'));
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function currentUser(req, res) {
    try {
        let userId = req.session.user.id;

        let user = await userRepository.getById(userId);

        return helper.sendData(user, res);
    } catch (err) {
        return helper.sendFailureMessage(err, res);
    }
}