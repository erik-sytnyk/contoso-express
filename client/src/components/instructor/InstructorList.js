import React from 'react';
import PropTypes from 'prop-types';

import InstructorRow from './InstructorRow';

const InstructorList = ({
  instructors,
  selectedInstructorId,
  onSelectClick,
  onSaveClick,
  onDetailsClick,
  onDeleteClick
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Hire Date</th>
          <th>Office</th>
          <th>Courses</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {instructors.map(instructor => (
          <InstructorRow
            key={instructor.id}
            instructor={instructor}
            selectedInstructorId={selectedInstructorId}
            onSelectClick={() => onSelectClick(instructor.id)}
            onSaveClick={() => onSaveClick(instructor.id)}
            onDetailsClick={() => onDetailsClick(instructor.id)}
            onDeleteClick={() => onDeleteClick(instructor.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

InstructorList.propTypes = {
  instructors: PropTypes.array.isRequired,
  selectedInstructorId: PropTypes.number.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default InstructorList;
