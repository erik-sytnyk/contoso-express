import httpHelper from '../helpers/httpHelper';

export default {
    getDepartments,
    getDepartment,
    saveDepartment,
    deleteDepartment
};

function getDepartments() {
    return httpHelper.get('/api/department/list', {});
}

function getDepartment(id) {
    return httpHelper.get('/api/department/getDepartment', {id});
}

function saveDepartment(department) {
    return httpHelper.post('/api/department/save', {department});
}

function deleteDepartment(id) {
    return httpHelper.delete('/api/department/delete', {id});
}