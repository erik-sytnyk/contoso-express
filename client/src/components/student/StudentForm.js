import React from 'react';
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
    student: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
};

export default StudentForm;