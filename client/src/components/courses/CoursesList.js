import React from 'react';
import _ from 'lodash';
import CoursesRow from './CoursesRow';

const CoursesList = ({courses, user, onSaveClick, onDetailsClick, onDeleteClick}) => {
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
                <CoursesRow key={course.id} course={course} user={user}
                            onSaveClick={() => onSaveClick(course.id)}
                            onDetailsClick={() => onDetailsClick(course.id)}
                            onDeleteClick={() => onDeleteClick(course.id)}
                />
            )}
            </tbody>
        </table>
    );
};

CoursesList.propTypes = {
    courses: React.PropTypes.array.isRequired,
    user: React.PropTypes.object.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default CoursesList;
