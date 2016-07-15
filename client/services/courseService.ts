import httpHelper from '../helpers/httpHelper';

export default {
    getCourses: getCourses,
    getCourse: getCourse,
    saveCourse: saveCourse,
    deleteCourse: deleteCourse
};

function getCourses(departmentId) {
    return httpHelper.get('/api/course/list', {departmentId});
}

function getCourse(id) {
    return httpHelper.get('/api/course/getCourse', {id});
}

function saveCourse(course) {
    return httpHelper.post('/api/course/save', {course});
}

function deleteCourse(id) {
    return httpHelper.post('/api/course/delete', {id});
}