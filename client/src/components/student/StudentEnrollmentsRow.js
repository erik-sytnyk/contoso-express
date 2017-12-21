import React from 'react';
import PropTypes from 'prop-types';

const StudentEnrollmentsRow = ({enrollment}) => {
  let grade = enrollment.grade ? enrollment.grade : 'No grade';

  return (
    <tr>
      <td>{enrollment.course.title}</td>
      <td>{grade}</td>
    </tr>
  );
};

StudentEnrollmentsRow.propTypes = {
  enrollment: PropTypes.object.isRequired
};

export default StudentEnrollmentsRow;
