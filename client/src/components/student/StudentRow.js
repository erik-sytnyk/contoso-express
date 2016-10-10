import React from 'react';
import dateFormatter from '../../formatters/dateFormatter';

const StudentRow = ({student, user, onSaveClick, onDetailsClick, onDeleteClick}) => {
    let enrollmentDateDisplay = dateFormatter.date(student.enrollmentDate);

    let display = 'display-none';

    if(user.id === student.userId) {
        display = '';
    }
    
    return (
        <tr>
            <td>{student.lastName}</td>
            <td>{student.firstName}</td>
            <td>{enrollmentDateDisplay}</td>
            <td className="tools">
                <a href="#" onClick={onSaveClick} className={display}><i className="fa fa-pencil fa-lg"></i></a>
                
                <a href="#" onClick={onDetailsClick}><i className="fa fa-info fa-lg"></i></a>

                <a href="#" onClick={onDeleteClick} className={display}><i className="fa fa-trash-o fa-lg"></i></a>
            </td>
        </tr>
    );
};

StudentRow.propTypes = {
    student: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default StudentRow;
