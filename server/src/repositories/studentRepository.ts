import {Op} from 'sequelize';

import dbInit from '../database/database';
import AppError from '../appError';

import {Student} from '../../typings/models/StudentModel';

export default {
  init,
  getStudentStatistics,
  getStudents,
  getStudentById,
  updateStudent,
  addStudent,
  deleteStudent
};

const db = dbInit.init();
let studentModel = db.models.Student;
let enrollmentModel = db.models.Enrollment;
let courseModel = db.models.Course;

function init(db) {
  studentModel = db.models.Student;
  enrollmentModel = db.models.Enrollment;
  courseModel = db.models.Course;
}

async function getStudentStatistics() {
  let queryString = `SELECT enrollment_date as "enrollmentDate", COUNT(*) AS "studentCount" 
                            FROM student GROUP BY enrollment_date`;

  let data = await db.sequelize.query(queryString);

  return data ? data[0] : [];
}

async function getStudents(search, sortOrder, pageNumber, pageSize) {
  let orderParams = getSortOrder(sortOrder);

  let options: any = {
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
    order: [[orderParams.order, orderParams.direction]]
  };

  if (search) {
    options.where = {
      [Op.or]: [{firstName: {[Op.like]: `%${search}%`}}, {lastName: {[Op.like]: `%${search}%`}}]
    };
  }

  return await studentModel.findAndCountAll(options);
}

async function getStudentById(id): Promise<Student> {
  let options = {
    include: [{model: enrollmentModel, include: [courseModel]}]
  };

  return await studentModel.findByPk(id, options);
}

async function updateStudent(stud): Promise<Student> {
  let student = await studentModel.findByPk(stud.id);

  if (!student) throw new AppError('app', 'student_not_found');

  student.firstName = stud.firstName;
  student.lastName = stud.lastName;
  student.enrollmentDate = stud.enrollmentDate;

  return await student.save();
}

async function addStudent(student): Promise<Student> {
  return await studentModel.create(student);
}

async function deleteStudent(id): Promise<void> {
  let student = await studentModel.findByPk(id);

  if (!student) throw new AppError('app', 'student_not_found');

  await student.destroy();
}

//helper methods

function getSortOrder(sortOrder) {
  let result: any = {};

  switch (sortOrder) {
    case 'name':
      result = {order: 'lastName', direction: 'ASC'};
      break;
    case 'date':
      result = {order: 'enrollmentDate', direction: 'ASC'};
      break;
    case 'date_desc':
      result = {order: 'enrollmentDate', direction: 'DESC'};
      break;
    default:
      result = {order: 'lastName', direction: 'DESC'};
      break;
  }

  return result;
}
