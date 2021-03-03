import dbInit from '../database/database';
import AppError from '../appError';

import {Department} from '../../typings/models/DepartmentModel';

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

async function getDepartments(): Promise<Department[]> {
  return await departmentModel.findAll({
    include: instructorModel
  });
}

async function getDepartmentById(id): Promise<Department> {
  return await departmentModel.findByPk(id, {
    include: instructorModel
  });
}

async function updateDepartment(departmentData): Promise<Department> {
  let department = await departmentModel.findByPk(departmentData.id);

  if (!department) throw new AppError('app', 'department_not_found');

  department.name = departmentData.name;
  department.budget = departmentData.budget;
  department.startDate = departmentData.startDate;
  department.instructorId = departmentData.instructorId;

  return await department.save();
}

async function addDepartment(department): Promise<Department> {
  return await departmentModel.create(department);
}

async function deleteDepartment(id): Promise<void> {
  let department = await departmentModel.findByPk(id);

  if (!department) throw new AppError('app', 'department_not_found');

  await department.destroy();
}
