import {Model, ModelCtor} from 'sequelize';
import {Student} from './StudentModel';

interface Enrollment {
  id: number;
  grade: string;
  student?: Student;
}

interface EnrollmentInstance extends Model, Enrollment {}

export interface EnrollmentModel extends ModelCtor<EnrollmentInstance> {}
