import dbInit from '../database/database';
import * as Promise from 'bluebird';
import {Enrollment} from '../../typings/app/models';

export default {
    init: init,
    getEnrollmentsByCourseId: getEnrollmentsByCourseId
};

const db = dbInit.init();
let enrollmentModel = db.models.Enrollment;
let studentModel = db.models.Student;

function init(db) {
    enrollmentModel = db.models.Enrollment;
    studentModel = db.models.Student;
}


function getEnrollmentsByCourseId(courseId): Promise<Array<Enrollment>> {
    let options = {
        where: {courseId: courseId},
        include: studentModel
    };
    
    return enrollmentModel.findAll(options);
}