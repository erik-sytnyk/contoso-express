import React from 'react';
import PropTypes from 'prop-types';

import dateFormatter from '../../formatters/dateFormatter';

const StudentStatisticsRow = ({statistic}) => {
  let enrollmentDateDisplay = dateFormatter.date(statistic.enrollmentDate);

  return (
    <tr>
      <td>{enrollmentDateDisplay}</td>
      <td>{statistic.studentCount}</td>
    </tr>
  );
};

StudentStatisticsRow.propTypes = {
  statistic: PropTypes.object.isRequired
};

export default StudentStatisticsRow;
