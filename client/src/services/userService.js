import httpHelper from '../helpers/httpHelper';

export default {
    getUser
};

function getUser() {
    return httpHelper.get('/api/user', {});
}