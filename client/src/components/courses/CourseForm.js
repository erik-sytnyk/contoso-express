import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import NumberInput from '../common/NumbertInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allDepartments, onChange, errors}) => {
  return (
    <form>
      <NumberInput
        name="number"
        label="Number"
        value={course.number.toString()}
        onChange={onChange}
        error={errors.number}
      />

      <TextInput
        name="title"
        label="Title"
        value={course.title}
        onChange={onChange}
        placeholder="Title"
        error={errors.title}
      />

      <NumberInput
        name="credits"
        label="Credits"
        value={course.credits.toString()}
        onChange={onChange}
        error={errors.credits}
      />

      <SelectInput
        name="departmentId"
        label="Department"
        value={course.departmentId.toString()}
        defaultOption="Select Department"
        options={allDepartments}
        onChange={onChange}
        error={errors.departmentId}
      />
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  allDepartments: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default CourseForm;
