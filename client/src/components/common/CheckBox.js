import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({name, label, onChange, value}) => {
    return (
        <div className="col-xs-4">
            <input
                type="checkbox"
                name={name}
                checked={value}
                onChange={onChange}
            />

            <label htmlFor={name} style={{fontWeight: 'normal'}}>{label}</label>
        </div>
    );
};

CheckBox.propTypes = {
    name: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

export default CheckBox;