import React from 'react';
import PropTypes from 'prop-types';

import StudentEnrollmentsRow from './StudentEnrollmentsRow';

const StudentEnrollmentsList = ({enrollments}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Course Title</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
                {enrollments.map(enrollment =>
                    <StudentEnrollmentsRow key={enrollment.id} enrollment={enrollment} />
                )}
            </tbody>
        </table>
    );
};

StudentEnrollmentsList.propTypes = {
    enrollments: PropTypes.array.isRequired
};

export default StudentEnrollmentsList;
