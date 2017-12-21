import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

import dateFormatter from '../../formatters/dateFormatter';
import personFormat from '../../formatters/personFormatter';
import currencyFormatter from '../../formatters/currencyFormatter';

const DepartmentRow = ({department, onSaveClick, onDetailsClick, onDeleteClick}) => {
  let instructor = department.instructor;

  let fullName = instructor ? personFormat.fullName(instructor.firstName, instructor.lastName) : '';

  let startDateDisplay = dateFormatter.date(department.startDate);
  let budgetDisplay = currencyFormatter.money(department.budget);

  return (
    <tr>
      <td>{department.name}</td>
      <td>{budgetDisplay}</td>
      <td>{startDateDisplay}</td>
      <td>{fullName}</td>

      <td className="tools">
        <Button bsStyle="link" onClick={onSaveClick}>
          <i className="fa fa-pencil fa-lg" />
        </Button>

        <Button bsStyle="link" onClick={onDetailsClick}>
          <i className="fa fa-info fa-lg" />
        </Button>
        <Button bsStyle="link" onClick={onDeleteClick}>
          <i className="fa fa-trash-o fa-lg" />
        </Button>
      </td>
    </tr>
  );
};

DepartmentRow.propTypes = {
  department: PropTypes.object.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onDetailsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default DepartmentRow;
