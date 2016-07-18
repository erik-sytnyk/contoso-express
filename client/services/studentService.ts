import httpHelper from '../helpers/httpHelper';

export default {
    getStudentsStatistics: getStudentsStatistics,
    getStudents: getStudents,
    getStudent: getStudent,
    saveStudent: saveStudent,
    deleteStudent: deleteStudent
};

function getStudentsStatistics() {
    return httpHelper.get('/api/student/statistics', {});
}

function getStudents(search, sortOrder, pageNumber, pageSize) {
    let data = {
        search,
        sortOrder,
        pageNumber,
        pageSize
    };
    
    return httpHelper.get('/api/student/list', data);
}

function getStudent(id) {
    return httpHelper.get('/api/student/getStudent', {id});
}

function saveStudent(student) {
    return httpHelper.post('/api/student/save', {student});
}

function deleteStudent(id) {
    return httpHelper.delete('/api/student/delete', {id});
}