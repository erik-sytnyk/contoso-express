import React from 'react';
import dateFormatter from '../../formatters/dateFormatter';

const InstructorRow = (props) => {
    let instructor = props.instructor;

    let office = instructor.officeAssignment ? instructor.officeAssignment.location : '';
    let hireDateDisplay = dateFormatter.date(instructor.hireDate);

    let activeClass = props.selectedInstructorId === instructor.id ? 'success' : '';

    let display = 'display-none';

    if(props.user.id === instructor.userId) {
        display = '';
    }

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
                <a href="#" onClick={props.onSelectClick}><i className="fa fa-hand-o-up fa-lg"></i></a>

                <a href="#" onClick={props.onSaveClick} className={display}><i className="fa fa-pencil fa-lg"></i></a>

                <a href="#" onClick={props.onDetailsClick}><i className="fa fa-info fa-lg"></i></a>

                <a href="#" onClick={props.onDeleteClick} className={display}><i className="fa fa-trash-o fa-lg"></i></a>
            </td>
        </tr>
    );
};

InstructorRow.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    selectedInstructorId: React.PropTypes.number.isRequired,
    onSelectClick: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default InstructorRow;
