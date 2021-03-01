import {Model, ModelCtor} from 'sequelize';
import {Course} from './CourseModel';

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  hireDate: Date;
  courses?: Course[];
  getFullName(): string;
  setCourses: (coursesIds: number[], options?: any) => void;
}

interface InstructorInstance extends Model, Instructor {}

export interface InstructorModel extends ModelCtor<InstructorInstance> {}
