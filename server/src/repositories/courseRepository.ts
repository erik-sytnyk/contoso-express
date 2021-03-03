import dbInit from '../database/database';
import AppError from '../appError';

import {Course} from '../../typings/models/CourseModel';

export default {
  init,
  getCourses,
  getCourseById,
  updateCourse,
  addCourse,
  deleteCourse
};

const db = dbInit.init();
let courseModel = db.models.Course;
let departmentModel = db.models.Department;

function init(db) {
  courseModel = db.models.Course;
  departmentModel = db.models.Department;
}

async function getCourses(departmentId): Promise<Course[]> {
  let options = {
    include: departmentModel,
    where: {}
  };

  if (departmentId && departmentId !== 'null') {
    options.where = {departmentId: departmentId};
  }

  return await courseModel.findAll(options);
}

async function getCourseById(id): Promise<Course> {
  return await courseModel.findByPk(id, {
    include: departmentModel
  });
}

async function updateCourse(courseData): Promise<Course> {
  let course = await courseModel.findByPk(courseData.id);

  if (!course) throw new AppError('app', 'course_not_found');

  course.number = courseData.number;
  course.title = courseData.title;
  course.credits = courseData.credits;
  course.departmentId = courseData.departmentId;

  return await course.save();
}

async function addCourse(course): Promise<Course> {
  return await courseModel.create(course);
}

async function deleteCourse(id): Promise<void> {
  let course = await courseModel.findByPk(id);

  if (!course) throw new AppError('app', 'course_not_found');

  await course.destroy();
}
