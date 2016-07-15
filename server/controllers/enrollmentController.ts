import helper from './_controllerHelper';
import enrollmentRepository from '../repositories/enrollmentRepository';

export default {
    getEnrollmentsByCourse: getEnrollmentsByCourse
};

async function getEnrollmentsByCourse(req, res) {
    try {
        let courseId = req.query.courseId;

        let enrollments = await enrollmentRepository.getEnrollmentsByCourseId(courseId);

        return helper.sendData({data: enrollments}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}