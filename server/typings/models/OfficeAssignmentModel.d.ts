import {Model, ModelCtor} from 'sequelize';

interface OfficeAssignment {
  id: number;
  location: string;
  instructorId: number;
}

interface OfficeAssignmentInstance extends Model, OfficeAssignment {}

export interface OfficeAssignmentModel extends ModelCtor<OfficeAssignmentInstance> {}
