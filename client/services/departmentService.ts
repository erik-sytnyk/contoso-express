import httpHelper from '../helpers/httpHelper';

export default {
    getDepartments: getDepartments,
    getDepartment: getDepartment,
    saveDepartment: saveDepartment,
    deleteDepartment: deleteDepartment
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
    return httpHelper.post('/api/department/delete', {id});
}