import React from 'react';

const StudentEnrollmentsRow = ({enrollment}) => {
    let grade = enrollment.grade ? enrollment.grade : 'No grade';

    return (
        <tr>
            <td>{enrollment.course.title}</td>
            <td>{grade}</td>
        </tr>
    );
};

StudentEnrollmentsRow.propTypes = {
    enrollment: React.PropTypes.object.isRequired
};

export default StudentEnrollmentsRow;
