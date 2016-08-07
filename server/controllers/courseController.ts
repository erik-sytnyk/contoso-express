import * as Joi from 'joi';
import helper from './_controllerHelper';
import courseRepository from '../repositories/courseRepository';

export default {
    getCourses,
    getCourse,
    saveCourse,
    deleteCourse
};

async function getCourses(req, res) {
    try {
        let departmentId = req.query.departmentId;
        
        let courses = await courseRepository.getCourses(departmentId);

        return helper.sendData({data: courses}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getCourse(req, res) {
    try {
        let id = req.query.id;

        let course = await courseRepository.getCourseById(id);

        return helper.sendData({data: course}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function saveCourse(req, res) {
    try {
        let courseData = req.body.course;

        let schema = {
            id: Joi.number(),
            number: Joi.number().required(),
            title: Joi.string().required(),
            credits: Joi.number().required(),
            departmentId: Joi.number().required()
        };

        let result = null;

        let course = await helper.loadSchema(courseData, schema);

        if (course.id) {
            result = await courseRepository.updateCourse(courseData);
        } else {
            result = await courseRepository.addCourse(courseData);
        }

        course = await courseRepository.getCourseById(result.id);

        return helper.sendData({data: course}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function deleteCourse(req, res) {
    try {
        let id = req.body.id;

        await courseRepository.deleteCourse(id);

        return helper.sendData({}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}