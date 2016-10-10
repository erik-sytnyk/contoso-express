import React from 'react';
import _ from 'lodash';
import StudentRow from './StudentRow';

const StudentsList = ({students, user, onSortClick, onSaveClick, onDetailsClick, onDeleteClick}) => {
    let showTable = _.isEmpty(students) ? {display: 'none'} : {};

    return (
        <table className="table" style={showTable}>
            <thead>
                <tr>
                    <th>
                        <a href="#" value="name" onClick={onSortClick}>Last Name</a>
                    </th>
                    <th>First Name</th>
                    <th>
                        <a href="#" value="date" onClick={onSortClick}>Enrollment Date</a>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                    <StudentRow key={student.id} student={student} user={user}
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
    students: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    onSortClick: React.PropTypes.func.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default StudentsList;
