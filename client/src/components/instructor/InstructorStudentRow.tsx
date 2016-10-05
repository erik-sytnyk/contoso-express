import * as React from 'react';
import personFormat from '../../formatters/personFormatter';

const InstructorStudentRow = (props) => {
    let enrollment = props.enrollment;

    let fullName = enrollment ? personFormat.fullName(enrollment.student.firstName, enrollment.student.lastName) : '';
    let grade = enrollment.grade ? enrollment.grade : 'No grade';
    
    return (
        <tr>
            <td>{fullName}</td>
            <td>{grade}</td>
        </tr>
    );
};

(InstructorStudentRow as any).propTypes = {
    enrollment: React.PropTypes.object.isRequired
};

export default InstructorStudentRow;
