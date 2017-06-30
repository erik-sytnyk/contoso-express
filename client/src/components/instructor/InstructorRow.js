import React from 'react';
import PropTypes from 'prop-types';

import dateFormatter from '../../formatters/dateFormatter';

const InstructorRow = (props) => {
    let instructor = props.instructor;

    let office = instructor.officeAssignment ? instructor.officeAssignment.location : '';
    let hireDateDisplay = dateFormatter.date(instructor.hireDate);

    let activeClass = props.selectedInstructorId === instructor.id ? 'success' : '';

    return (
        <tr className={activeClass}>
            <td>{instructor.lastName}</td>
            <td>{instructor.firstName}</td>
            <td>{hireDateDisplay}</td>
            <td>{office}</td>
            <td>{instructor.courses.map(course =>
                <div key={course.id}>{course.number}&nbsp;{course.title}</div>
            )}
            </td>
            <td className="tools">
                <a href="#" onClick={props.onSelectClick}><i className="fa fa-hand-o-up fa-lg"/></a>

                <a href="#" onClick={props.onSaveClick}><i className="fa fa-pencil fa-lg"/></a>

                <a href="#" onClick={props.onDetailsClick}><i className="fa fa-info fa-lg"/></a>

                <a href="#" onClick={props.onDeleteClick}><i className="fa fa-trash-o fa-lg"/></a>
            </td>
        </tr>
    );
};

InstructorRow.propTypes = {
    instructor: PropTypes.object.isRequired,
    selectedInstructorId: PropTypes.number.isRequired,
    onSelectClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onDetailsClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default InstructorRow;
