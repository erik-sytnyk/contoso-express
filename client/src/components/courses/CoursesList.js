import React from 'react';
import PropTypes from 'prop-types';

import CoursesRow from './CoursesRow';

const CoursesList = ({courses, onSaveClick, onDetailsClick, onDeleteClick}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Credits</th>
          <th>Department</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CoursesRow
            key={course.id}
            course={course}
            onSaveClick={() => onSaveClick(course.id)}
            onDetailsClick={() => onDetailsClick(course.id)}
            onDeleteClick={() => onDeleteClick(course.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CoursesList;
