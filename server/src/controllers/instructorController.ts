import * as Joi from 'joi';
import config from '../config';
import helper from './_controllerHelper';
import instructorRepository from '../repositories/instructorRepository';
import officeAssignmentRepository from '../repositories/officeAssignmentRepository';

export default {
    getInstructors,
    getInstructor,
    saveInstructor,
    deleteInstructor
};

async function getInstructors(req, res) {
    try {
        let instructors = await instructorRepository.getInstructors();

        return helper.sendData({data: instructors}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getInstructor(req, res) {
    try {
        let id = req.query.id;

        let instructor = await instructorRepository.getInstructorById(id);

        return helper.sendData({data: instructor}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function saveInstructor(req, res) {
    try {
        let data = req.body.instructor;

        let schema = {
            id: Joi.number(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            hireDate: Joi.date(),
            courses: Joi.array().items(
                Joi.object().keys({
                    id: Joi.number().required()
                })
            ),
            officeAssignment: Joi.object().keys({
                id: Joi.number(),
                location: Joi.string().allow('')
            })
        };

        let result = null;

        let instructor = await helper.loadSchema(data, schema);

        instructor.userId = req.user ? req.user.id : null;

        if (instructor.id) {
            result = await instructorRepository.updateInstructor(instructor);
        } else {
            result = await instructorRepository.addInstructor(instructor);
        }

        await officeAssignmentRepository.saveOfficeAssignment(instructor.officeAssignment, result.id);
        
        instructor = await instructorRepository.getInstructorById(result.id);

        return helper.sendData({data: instructor}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function deleteInstructor(req, res) {
    try {
        let id = req.body.id;

        let userId = req.user ? req.user.id : null;

        await instructorRepository.deleteInstructor(id, userId);

        await officeAssignmentRepository.deleteOfficeAssignmentByInstructorId(id);

        return helper.sendData({}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}