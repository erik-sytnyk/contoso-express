import React from 'react';
import PropTypes from 'prop-types';

import DepartmentRow from './DepartmentRow';

const DepartmentsList = ({departments, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Start Date</th>
                <th>Administrator</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {departments.map(department =>
                <DepartmentRow key={department.id} department={department} 
                               onSaveClick={() => onSaveClick(department.id)}
                               onDetailsClick={() => onDetailsClick(department.id)}
                               onDeleteClick={() => onDeleteClick(department.id)}
                />
            )}
            </tbody>
        </table>
    );
};

DepartmentsList.propTypes = {
    departments: PropTypes.array.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onDetailsClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default DepartmentsList;
