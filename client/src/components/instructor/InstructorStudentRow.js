import React from 'react';
import PropTypes from 'prop-types';

import personFormat from '../../formatters/personFormatter';

const InstructorStudentRow = props => {
  let enrollment = props.enrollment;

  let fullName = enrollment ? personFormat.fullName(enrollment.student.firstName, enrollment.student.lastName) : '';
  let grade = enrollment.grade ? enrollment.grade : 'No grade';

  return (
    <tr>
      <td>{fullName}</td>
      <td>{grade}</td>
    </tr>
  );
};

InstructorStudentRow.propTypes = {
  enrollment: PropTypes.object.isRequired
};

export default InstructorStudentRow;
