import React from 'react';
import PropTypes from 'prop-types';

import dateFormatter from '../../formatters/dateFormatter';

const StudentRow = ({student, onSaveClick, onDetailsClick, onDeleteClick}) => {
    let enrollmentDateDisplay = dateFormatter.date(student.enrollmentDate);

    return (
        <tr>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
            <td>{enrollmentDateDisplay}</td>
            <td className="tools">
                <a href="#" onClick={onSaveClick}><i className="fa fa-pencil fa-lg"></i></a>
                
                <a href="#" onClick={onDetailsClick}><i className="fa fa-info fa-lg"></i></a>

                <a href="#" onClick={onDeleteClick}><i className="fa fa-trash-o fa-lg"></i></a>
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
