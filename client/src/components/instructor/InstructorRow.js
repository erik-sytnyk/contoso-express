import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

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
                <Button bsStyle="link" onClick={props.onSelectClick}>
                    <i className="fa fa-hand-o-up fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={props.onSaveClick}>
                    <i className="fa fa-pencil fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={props.onDetailsClick}>
                    <i className="fa fa-info fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={props.onDeleteClick}>
                    <i className="fa fa-trash-o fa-lg"/>
                </Button>
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
