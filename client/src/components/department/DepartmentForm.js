import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import NumberInput from '../common/NumbertInput';
import SelectInput from '../common/SelectInput';
import DateTimePicker from '../common/DateTimePicker';

const DepartmentForm = ({department, allInstructors, onChange, errors}) => {
    return (
        <form>
            <TextInput
                name="name"
                label="Name"
                value={department.name}
                onChange={onChange}
                placeholder="Name"
                error={errors.name}
            />

            <NumberInput
                name="budget"
                label="Budget"
                value={department.budget.toString()}
                onChange={onChange}
                error={errors.budget}
            />

            <DateTimePicker
                name="date"
                label="Start Date"
                value={department.startDate}
                onChange={onChange}
                error={errors.date}
            />

            <SelectInput
                name="instructorId"
                label="Administrator"
                value={department.instructorId.toString()}
                defaultOption="Select Administrator"
                options={allInstructors}
                onChange={onChange}
                error={errors.instructorId}
            />
        </form>
    );
};

DepartmentForm.propTypes = {
    department: PropTypes.object.isRequired,
    allInstructors: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object
};

export default DepartmentForm;