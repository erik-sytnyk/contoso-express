import React from 'react';
import InstructorRow from './InstructorRow';

const InstructorList = ({instructors, user, selectedInstructorId, onSelectClick, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Hire Date</th>
                <th>Office</th>
                <th>Courses</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {instructors.map(instructor =>
                <InstructorRow key={instructor.id} instructor={instructor} user={user}
                               selectedInstructorId={selectedInstructorId}
                               onSelectClick={() => onSelectClick(instructor.id)}
                               onSaveClick={() => onSaveClick(instructor.id)}
                               onDetailsClick={() => onDetailsClick(instructor.id)}
                               onDeleteClick={() => onDeleteClick(instructor.id)}
                />
            )}
            </tbody>
        </table>
    );
};

InstructorList.propTypes = {
    instructors: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    selectedInstructorId: React.PropTypes.number.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onSelectClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default InstructorList;
