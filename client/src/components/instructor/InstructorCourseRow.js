import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const InstructorCourseRow = props => {
  let course = props.course;

  let activeClass = props.selectedCourseId === course.id ? 'success' : '';

  return (
    <tr className={activeClass}>
      <td className="tools">
        <Button bsStyle="link" onClick={props.onSelectClick}>
          <i className="fa fa-hand-o-up fa-lg" />
        </Button>
      </td>
      <td>{course.number}</td>
      <td>{course.title}</td>
      <td>{course.department.name}</td>
    </tr>
  );
};

InstructorCourseRow.propTypes = {
  course: PropTypes.object.isRequired,
  selectedCourseId: PropTypes.number.isRequired,
  onSelectClick: PropTypes.func.isRequired
};

export default InstructorCourseRow;
