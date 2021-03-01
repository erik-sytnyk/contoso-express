import * as Promise from 'bluebird';

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

function getCourses(departmentId): Promise<Course[]> {
  let options = {
    include: departmentModel,
    where: {}
  };

  if (departmentId && departmentId !== 'null') {
    options.where = {departmentId: departmentId};
  }

  return courseModel.findAll(options);
}

function getCourseById(id): Promise<Course> {
  return courseModel.findByPk(id, {
    include: departmentModel
  });
}

function updateCourse(courseData): Promise<Course> {
  return courseModel.findByPk(courseData.id).then(course => {
    if (!course) throw new AppError('app', 'course_not_found');

    course.number = courseData.number;
    course.title = courseData.title;
    course.credits = courseData.credits;
    course.departmentId = courseData.departmentId;

    return course.save();
  });
}

function addCourse(course): Promise<Course> {
  return courseModel.create(course);
}

function deleteCourse(id): Promise<Course> {
  return courseModel.findByPk(id).then(course => {
    if (!course) throw new AppError('app', 'course_not_found');

    return course.destroy();
  });
}
