import React from 'react';

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
    course: React.PropTypes.object.isRequired,
    selectedCourseId: React.PropTypes.number.isRequired,
    onSelectClick: React.PropTypes.func.isRequired
};

export default InstructorCourseRow;
