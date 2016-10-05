import React from 'react';
import TextInput from '../common/TextInput';
import DateTimePicker from '../common/DateTimePicker';
import CheckBox from '../common/CheckBox';
import _ from 'lodash';

const InstructorForm = ({instructor, allCourses, onChange, errors}) => {
    let office = instructor.officeAssignment ? instructor.officeAssignment.location : '';

    function isCheckedCourse(courseId) {
        let exist = _.find(instructor.courses, (course) => {
           return course.id === courseId;
        });

        return exist ? true : false;
    }

    return (
        <form style={{paddingBottom: 100 + 'px'}}>
            <TextInput
                name="lastName"
                label="Last Name"
                value={instructor.lastName}
                onChange={onChange}
                placeholder="Last Name"
                error={errors.lastName}
            />

            <TextInput
                name="firstName"
                label="First Name"
                value={instructor.firstName}
                onChange={onChange}
                placeholder="First Name"
                error={errors.firstName}
            />

            <DateTimePicker
                name="hireDate"
                label="Hire Date"
                value={instructor.hireDate}
                onChange={onChange}
                error={errors.hireDate}
            />

            <TextInput
                name="location"
                label="Office Location"
                value={office}
                onChange={onChange}
                placeholder="Office Location"
                error={errors.location}
            />

            {allCourses.map(course =>
                <CheckBox
                    key={course.value}
                    name={course.value}
                    label={course.text}
                    value={isCheckedCourse(course.value)}
                    onChange={onChange}
                />
            )}
        </form>
    );
};

InstructorForm.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    allCourses: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
};

export default InstructorForm;