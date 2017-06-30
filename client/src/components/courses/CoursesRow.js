import React from 'react';
import PropTypes from 'prop-types';

const CoursesRow = ({course, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <tr>
            <td>{course.number}</td>
            <td>{course.title}</td>
            <td>{course.credits}</td>
            <td>{course.department.name}</td>
            <td className="tools">
                <a href="#" onClick={onSaveClick}><i className="fa fa-pencil fa-lg"/></a>
                
                <a href="#" onClick={onDetailsClick}><i className="fa fa-info fa-lg"/></a>

                <a href="#" onClick={onDeleteClick}><i className="fa fa-trash-o fa-lg"/></a>
            </td>
        </tr>
    );
};

CoursesRow.propTypes = {
    course: PropTypes.object.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onDetailsClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired
};

export default CoursesRow;
