import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const CoursesRow = ({course, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <tr>
            <td>{course.number}</td>
            <td>{course.title}</td>
            <td>{course.credits}</td>
            <td>{course.department.name}</td>

            <td className="tools">
                <Button bsStyle="link" onClick={onSaveClick}>
                    <i className="fa fa-pencil fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={onDetailsClick}>
                    <i className="fa fa-info fa-lg"/>
                </Button>

                <Button bsStyle="link" onClick={onDeleteClick}>
                    <i className="fa fa-trash-o fa-lg"/>
                </Button>
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
