import {Model, ModelCtor} from 'sequelize';

export interface Department {
  id: number;
  name: string;
  budget: number;
  startDate: Date;
  instructorId?: number;
}

interface DepartmentInstance extends Model, Department {}

export interface DepartmentModel extends ModelCtor<DepartmentInstance> {}
