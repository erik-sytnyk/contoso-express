import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import config from '../../helpers/clientConfig';
import dateFormatter from '../../formatters/dateFormatter';

const DateTimePicker = ({name, label, onChange, value, error}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' ' + 'has-error';
    }
    
    let dateValue = dateFormatter.date(value);

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
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    error: React.PropTypes.string
};

export default DateTimePicker;