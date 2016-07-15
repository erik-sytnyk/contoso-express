import * as React from 'react';

const CoursesRow = ({course, onSaveClick, onDetailsClick, onDeleteClick}) => {
    return (
        <tr>
            <td>{course.number}</td>
            <td>{course.title}</td>
            <td>{course.credits}</td>
            <td>{course.department.name}</td>
            <td className="tools">
                <a href="#" onClick={onSaveClick}><i className="fa fa-pencil fa-lg"></i></a>
                
                <a href="#" onClick={onDetailsClick}><i className="fa fa-info fa-lg"></i></a>

                <a href="#" onClick={onDeleteClick}><i className="fa fa-trash-o fa-lg"></i></a>
            </td>
        </tr>
    );
};

(CoursesRow as any).propTypes = {
    course: React.PropTypes.object.isRequired,
    onSaveClick: React.PropTypes.func.isRequired,
    onDetailsClick: React.PropTypes.func.isRequired,
    onDeleteClick: React.PropTypes.func.isRequired
};

export default CoursesRow;
