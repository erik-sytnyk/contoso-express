import helper from './_controllerHelper';

export default {
    home
};

async function home(req, res) {
    try {
        return helper.renderView('home', {}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}