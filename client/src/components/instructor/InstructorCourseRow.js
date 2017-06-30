import React from 'react';
import PropTypes from 'prop-types';

const InstructorCourseRow = (props) => {
    let course = props.course;

    let activeClass = props.selectedCourseId === course.id ? 'success' : '';

    return (
        <tr className={activeClass}>
            <td className="tools">
                <a href="#" onClick={props.onSelectClick}><i className="fa fa-hand-o-up fa-lg"></i></a>
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
