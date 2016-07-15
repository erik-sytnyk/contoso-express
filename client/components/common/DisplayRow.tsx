import * as React from 'react';

const DisplayRow = ({label, value}) => {

    return (
        <div className="form-group">
            <label className="col-xs-3 form-label">{label}:</label>
            
            <div className="col-xs-9">{value}</div>
        </div>
    );
};

(DisplayRow as any).propTypes = {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
};

export default DisplayRow;