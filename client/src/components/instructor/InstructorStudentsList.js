import React from 'react';
import PropTypes from 'prop-types';

import InstructorStudentRow from './InstructorStudentRow';

const InstructorStudentsList = ({enrollments, visible}) => {
    let style = visible ? {display: 'block'} : {display: 'none'};
    
    return (
        <div style={style}>
            <h3>Students Enrolled in Selected Course</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map(enrollment =>
                        <InstructorStudentRow key={enrollment.id} enrollment={enrollment} />
                    )}
                </tbody>
            </table>
        </div>
    );
};

InstructorStudentsList.propTypes = {
    visible: PropTypes.bool.isRequired,
    enrollments: PropTypes.array.isRequired
};

export default InstructorStudentsList;
