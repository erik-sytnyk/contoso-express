import React from 'react';
import PropTypes from 'prop-types';

const StudentSearch = ({search, onChange, onKeyPress, onClick}) => {
    let searchStyle = {marginTop: 10 + 'px'};
    let inputStyle = {marginRight: 10 + 'px', marginLeft: 10 + 'px'};

    return (
        <div style={searchStyle}>
            Find by name:
            <input type="text"
                   value={search}
                   onChange={onChange}
                   onKeyPress={onKeyPress}
                   style={inputStyle}>
            </input>

            <input type="submit" value="Search" onClick={onClick} />
        </div>
    );
};

StudentSearch.propTypes = {
    search: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default StudentSearch;
