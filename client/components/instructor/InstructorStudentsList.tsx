import * as React from 'react';
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

(InstructorStudentsList as any).propTypes = {
    visible: React.PropTypes.bool.isRequired,
    enrollments: React.PropTypes.array.isRequired
};

export default InstructorStudentsList;
