import * as Promise from 'bluebird';

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

function getOfficeAssignmentByInstructorId(instructorId) {
  let options = {
    where: {instructorId: instructorId}
  };

  return officeAssignmentModel.findOne(options);
}

function saveOfficeAssignment(officeAssignment, instructorId): Promise<OfficeAssignment> {
  return getOfficeAssignmentByInstructorId(instructorId).then(office => {
    if (office) {
      office.location = officeAssignment.location;

      return office.save();
    }

    if (!office && officeAssignment.location) {
      let officeData = {
        location: officeAssignment.location,
        instructorId: instructorId
      };

      return officeAssignmentModel.create(officeData);
    }

    return Promise.resolve(null);
  });
}

function deleteOfficeAssignmentByInstructorId(instructorId): Promise<OfficeAssignment> {
  return getOfficeAssignmentByInstructorId(instructorId).then(office => {
    if (office) {
      return office.destroy();
    }

    return Promise.resolve(null);
  });
}
