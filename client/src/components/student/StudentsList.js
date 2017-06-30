import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

import StudentRow from './StudentRow';

const StudentsList = ({students, onSortClick, onSaveClick, onDetailsClick, onDeleteClick}) => {
    let showTable = _.isEmpty(students) ? {display: 'none'} : {};

    return (
        <table className="table" style={showTable}>
            <thead>
                <tr>
                    <th>
                        <Button bsStyle="link" value="name" onClick={onSortClick}>Last Name</Button>
                    </th>
                    <th>First Name</th>
                    <th>
                        <Button bsStyle="link" value="date" onClick={onSortClick}>Enrollment Date</Button>
                    </th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                    <StudentRow key={student.id} student={student}
                                onSaveClick={() => onSaveClick(student.id)}
                                onDetailsClick={() => onDetailsClick(student.id)}
                                onDeleteClick={() => onDeleteClick(student.id)}
                    />
                )}
            </tbody>
        </table>
    );
};

StudentsList.propTypes = {
    students: PropTypes.array.isRequired,
    onSortClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onDetailsClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default StudentsList;
