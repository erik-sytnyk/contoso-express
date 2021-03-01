import * as Promise from 'bluebird';

import dbInit from '../database/database';

import {Enrollment} from '../../typings/models/EnrollmentModel';

export default {
  init,
  getEnrollmentsByCourseId
};

const db = dbInit.init();
let enrollmentModel = db.models.Enrollment;
let studentModel = db.models.Student;

function init(db) {
  enrollmentModel = db.models.Enrollment;
  studentModel = db.models.Student;
}

function getEnrollmentsByCourseId(courseId): Promise<Enrollment[]> {
  let options = {
    where: {courseId: courseId},
    include: studentModel
  };

  return enrollmentModel.findAll(options);
}
