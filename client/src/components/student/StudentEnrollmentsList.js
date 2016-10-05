import React from 'react';
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
    enrollments: React.PropTypes.array.isRequired
};

export default StudentEnrollmentsList;
