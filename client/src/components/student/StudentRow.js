import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

import dateFormatter from '../../formatters/dateFormatter';

const StudentRow = ({student, onSaveClick, onDetailsClick, onDeleteClick}) => {
    let enrollmentDateDisplay = dateFormatter.date(student.enrollmentDate);

    return (
        <tr>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
            <td>{enrollmentDateDisplay}</td>

            <td className="tools">
                <Button bsStyle="link" onClick={onSaveClick}>
                    <i className="fa fa-pencil fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={onDetailsClick}>
                    <i className="fa fa-info fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={onDeleteClick}>
                    <i className="fa fa-trash-o fa-lg"/>
                </Button>
            </td>
        </tr>
    );
};

StudentRow.propTypes = {
    student: PropTypes.object.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onDetailsClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default StudentRow;
