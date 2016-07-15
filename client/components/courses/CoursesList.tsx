import * as React from 'react';
import * as _ from 'lodash';
import CoursesRow from './CoursesRow';

const CoursesList = ({courses, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Credits</th>
                    <th>Department</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {courses.map(course =>
                <CoursesRow key={course.id} course={course} 
                            onSaveClick={() => onSaveClick(course.id)}
                            onDetailsClick={() => onDetailsClick(course.id)}
                            onDeleteClick={() => onDeleteClick(course.id)}
                />
            )}
            </tbody>
        </table>
    );
};

(CoursesList as any).propTypes = {
    courses: React.PropTypes.array.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default CoursesList;
