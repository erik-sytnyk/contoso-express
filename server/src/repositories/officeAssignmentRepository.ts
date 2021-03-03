import dbInit from '../database/database';

import {OfficeAssignment} from '../../typings/models/OfficeAssignmentModel';

export default {
  init,
  saveOfficeAssignment,
  deleteOfficeAssignmentByInstructorId
};

const db = dbInit.init();
let officeAssignmentModel = db.models.OfficeAssignment;

function init(db) {
  officeAssignmentModel = db.models.OfficeAssignment;
}

async function getOfficeAssignmentByInstructorId(instructorId) {
  let options = {
    where: {instructorId: instructorId}
  };

  return await officeAssignmentModel.findOne(options);
}

async function saveOfficeAssignment(officeAssignment, instructorId): Promise<OfficeAssignment> {
  let office = await getOfficeAssignmentByInstructorId(instructorId);

  if (office) {
    office.location = officeAssignment.location;

    return await office.save();
  }

  if (!office && officeAssignment.location) {
    let officeData = {
      location: officeAssignment.location,
      instructorId: instructorId
    };

    return await officeAssignmentModel.create(officeData);
  }

  return await Promise.resolve(null);
}

async function deleteOfficeAssignmentByInstructorId(instructorId): Promise<void> {
  let office = await getOfficeAssignmentByInstructorId(instructorId);

  if (office) {
    return await office.destroy();
  }

  return await Promise.resolve(null);
}
