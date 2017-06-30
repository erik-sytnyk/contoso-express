import React from 'react';
import PropTypes from 'prop-types';

const DisplayRow = ({label, value}) => {
    return (
        <div className="form-group">
            <label className="col-xs-3 form-label">{label}:</label>
            
            <div className="col-xs-9">{value}</div>
        </div>
    );
};

DisplayRow.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default DisplayRow;