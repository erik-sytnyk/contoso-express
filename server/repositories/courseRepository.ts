import dbInit from '../database/database';
import * as Promise from 'bluebird';
import {Course} from '../../typings/app/models';
import AppError from '../appError';

export default {
    init: init,
    getCourses: getCourses,
    getCourseById: getCourseById,
    updateCourse: updateCourse,
    addCourse: addCourse,
    deleteCourse: deleteCourse
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

    if (departmentId) {
        options.where = {departmentId: departmentId};
    }

    return courseModel.findAll(options);
}

function getCourseById(id): Promise<Course> {
    return courseModel.findById(id, {
        include: departmentModel
    });
}

function updateCourse(courseData): Promise<Course> {
    return courseModel.findById(courseData.id)
        .then((course) => {
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
    return courseModel.findById(id)
        .then(function(course) {
            if (!course) throw new AppError('app', 'course_not_found');

            return course.destroy();
        });
}