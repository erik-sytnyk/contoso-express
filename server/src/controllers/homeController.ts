import helper from './_controllerHelper';
import pathHelper from '../helpers/pathHelper';

export default {
    home,
    getUser
};

async function home(req, res) {
    try {
        return res.sendFile(pathHelper.getRelative('../client/build/index.html'));
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

function getUser(req, res) {
    return helper.sendData({data: req.user}, res);
}