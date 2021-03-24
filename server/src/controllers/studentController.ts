import * as Joi from 'joi';

import helper from './_controllerHelper';
import studentRepository from '../repositories/studentRepository';

export default {
  getStudentsStatistics,
  getStudents,
  getStudent,
  saveStudent,
  deleteStudent
};

async function getStudentsStatistics(req, res) {
  try {
    let studentStatistics = await studentRepository.getStudentStatistics();

    return helper.sendData({data: studentStatistics}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function getStudents(req, res) {
  try {
    let search = req.query.search;
    let sortOrder = req.query.sortOrder;
    let pageNumber = req.query.pageNumber;
    let pageSize = req.query.pageSize;

    let result = await studentRepository.getStudents(search, sortOrder, pageNumber, pageSize);

    return helper.sendData({data: result}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function getStudent(req, res) {
  try {
    let id = req.query.id;

    let student = await studentRepository.getStudentById(id);

    return helper.sendData({data: student}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function saveStudent(req, res) {
  try {
    let data = req.body.student;

    let schema = {
      id: Joi.number(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      enrollmentDate: Joi.date()
    };

    let result = null;

    let student = await helper.loadSchema(data, schema);

    if (student.id) {
      result = await studentRepository.updateStudent(student);
    } else {
      result = await studentRepository.addStudent(student);
    }

    return helper.sendData({data: result}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function deleteStudent(req, res) {
  try {
    let data = await helper.loadSchema(req.params, {
      id: Joi.number().required()
    });

    await studentRepository.deleteStudent(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}
