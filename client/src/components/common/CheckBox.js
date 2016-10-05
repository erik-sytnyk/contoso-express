import React from 'react';

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
    name: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
};

export default CheckBox;