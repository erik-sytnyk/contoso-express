import * as Joi from 'joi';

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
    let data = await helper.loadSchema(req.params, {
      id: Joi.number().required()
    });

    await officeAssignmentRepository.deleteOfficeAssignmentByInstructorId(data.id);

    await instructorRepository.deleteInstructor(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}
