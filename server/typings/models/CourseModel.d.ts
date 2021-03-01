import {Model, ModelCtor} from 'sequelize';

export interface Course {
  id: number;
  number: number;
  title: string;
  credits: number;
  departmentId?: number;
}

interface CourseInstance extends Model, Course {}

export interface CourseModel extends ModelCtor<CourseInstance> {}
