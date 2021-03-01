import {Model, ModelCtor} from 'sequelize';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  enrollmentDate: Date;
  getFullName(): string;
}

interface StudentInstance extends Model, Student {}

export interface StudentModel extends ModelCtor<StudentInstance> {}
