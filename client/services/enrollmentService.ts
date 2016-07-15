import httpHelper from '../helpers/httpHelper';

export default {
    getEnrollments: getEnrollments
};

function getEnrollments(courseId) {
    return httpHelper.get('/api/enrollment/list', {courseId});
}