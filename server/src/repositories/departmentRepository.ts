import dbInit from '../database/database';
import * as Promise from 'bluebird';
import {Department} from '../../typings/app/models';
import AppError from '../appError';

export default {
  init,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  addDepartment,
  deleteDepartment
};

const db = dbInit.init();
let departmentModel = db.models.Department;
let instructorModel = db.models.Instructor;

function init(db) {
  departmentModel = db.models.Department;
  instructorModel = db.models.Instructor;
}

function getDepartments(): Promise<Department[]> {
  return departmentModel.findAll({
    include: instructorModel
  });
}

function getDepartmentById(id): Promise<Department> {
  return departmentModel.findByPk(id, {
    include: instructorModel
  });
}

function updateDepartment(departmentData): Promise<Department> {
  return departmentModel.findByPk(departmentData.id).then(department => {
    if (!department) throw new AppError('app', 'department_not_found');

    department.name = departmentData.name;
    department.budget = departmentData.budget;
    department.startDate = departmentData.startDate;
    department.instructorId = departmentData.instructorId;

    return department.save();
  });
}

function addDepartment(department): Promise<Department> {
  return departmentModel.create(department);
}

function deleteDepartment(id): Promise<Department> {
  return departmentModel.findByPk(id).then(department => {
    if (!department) throw new AppError('app', 'department_not_found');

    return department.destroy();
  });
}
