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

async function getEnrollmentsByCourseId(courseId): Promise<Enrollment[]> {
  let options = {
    where: {courseId: courseId},
    include: studentModel
  };

  return await enrollmentModel.findAll(options);
}
