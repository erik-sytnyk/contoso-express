import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import PropTypes from 'prop-types';

import config from '../../helpers/clientConfig';
import dateFormatter from '../../formatters/dateFormatter';

const DateTimePicker = ({name, label, onChange, value, error}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }

    let dateValue = null;

    if (dateFormatter.isValid(value)) {
        dateValue = dateFormatter.date(value);
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <DateTimeField
                    dateTime={dateValue}
                    format={config.format.date}
                    inputFormat={config.format.date}
                    onChange={onChange}
                    viewMode="date"
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

DateTimePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

export default DateTimePicker;