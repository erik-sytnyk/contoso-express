import * as React from 'react';
import * as _ from 'lodash';
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
                <th></th>
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

(DepartmentsList as any).propTypes = {
    departments: React.PropTypes.array.isRequired,
    onSaveClick: React.PropTypes.func.isRequired, 
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default DepartmentsList;
