import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import DateTimePicker from '../common/DateTimePicker';

const StudentForm = ({student, onChange, errors}) => {
    return (
        <form>
            <TextInput
                name="lastName"
                label="Last Name"
                value={student.lastName}
                onChange={onChange}
                placeholder="Last Name"
                error={errors.lastName}
            />

            <TextInput
                name="firstName"
                label="First Name"
                value={student.firstName}
                onChange={onChange}
                placeholder="First Name"
                error={errors.firstName}
            />

            <DateTimePicker
                name="date"
                label="Enrollment Date"
                value={student.enrollmentDate}
                onChange={onChange}
                error={errors.date}
            />
        </form>
    );
};

StudentForm.propTypes = {
    student: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default StudentForm;