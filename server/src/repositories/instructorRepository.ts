import * as _ from 'lodash';

import dbInit from '../database/database';
import AppError from '../appError';

import {Instructor} from '../../typings/models/InstructorModel';

export default {
  init,
  getInstructors,
  getInstructorById,
  updateInstructor,
  addInstructor,
  deleteInstructor
};

const db = dbInit.init();
let instructorModel = db.models.Instructor;
let courseModel = db.models.Course;
let departmentModel = db.models.Department;
let officeAssignmentModel = db.models.OfficeAssignment;

function init(db) {
  instructorModel = db.models.Instructor;
  courseModel = db.models.Course;
  departmentModel = db.models.Department;
  officeAssignmentModel = db.models.OfficeAssignment;
}

async function getInstructors(): Promise<Instructor[]> {
  let options = {
    include: [
      //include Course with Department
      {
        model: courseModel,
        include: [departmentModel]
      },
      officeAssignmentModel
    ]
  };

  return await instructorModel.findAll(options);
}

async function getInstructorById(id): Promise<Instructor> {
  let options = {
    include: [
      {
        model: courseModel,
        include: [departmentModel]
      },
      officeAssignmentModel
    ]
  };

  return await instructorModel.findByPk(id, options);
}

async function updateInstructor(instructorData): Promise<Instructor> {
  let instructor = await instructorModel.findByPk(instructorData.id);

  if (!instructor) throw new AppError('app', 'instructor_not_found');

  instructor.firstName = instructorData.firstName;
  instructor.lastName = instructorData.lastName;
  instructor.hireDate = instructorData.hireDate;

  await db.sequelize.transaction(tr => {
    let options = {transaction: tr};
    let coursesIds = _.map(instructorData.courses, c => (c as any).id);

    return Promise.all([instructor.save(options), instructor.setCourses(coursesIds, options)]);
  });

  return await instructor.save();
}

async function addInstructor(instructorData): Promise<Instructor> {
  let instructor = await instructorModel.create(instructorData);

  let coursesIds = _.map(instructorData.courses, c => (c as any).id);

  instructor.setCourses(coursesIds);

  return await instructor.save();
}

async function deleteInstructor(id): Promise<void> {
  let instructor = await instructorModel.findByPk(id);

  if (!instructor) throw new AppError('app', 'instructor_not_found');

  return await instructor.destroy();
}
