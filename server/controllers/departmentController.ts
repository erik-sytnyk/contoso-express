import helper from './_controllerHelper';
import departmentRepository from '../repositories/departmentRepository';
import * as Joi from 'joi';
import config from '../config';

export default {
    getDepartments: getDepartments,
    getDepartment: getDepartment,
    saveDepartment: saveDepartment,
    deleteDepartment: deleteDepartment
};

async function getDepartments(req, res) {
    try {
        let departments = await departmentRepository.getDepartments();

        return helper.sendData({data: departments}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function getDepartment(req, res) {
    try {
        let id = req.query.id;

        let department = await departmentRepository.getDepartmentById(id);

        return helper.sendData({data: department}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function saveDepartment(req, res) {
    try {
        let data = req.body.department;

        let schema = {
            id: Joi.number(),
            name: Joi.string().required(),
            budget: Joi.number().required(),
            startDate: Joi.date().format(config.format.date),
            instructorId: Joi.number().required()
        };

        let result = null;

        let department = await helper.loadSchema(data, schema);

        if (department.id) {
            result = await departmentRepository.updateDepartment(department);
        } else {
            result = await departmentRepository.addDepartment(department);
        }

        department = await departmentRepository.getDepartmentById(result.id);

        return helper.sendData({data: department}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}

async function deleteDepartment(req, res) {
    try {
        let id = req.body.id;

        await departmentRepository.deleteDepartment(id);

        return helper.sendData({}, res);
    } catch (err) {
        helper.sendFailureMessage(err, res);
    }
}