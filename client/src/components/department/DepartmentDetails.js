import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import DisplayRow from '../common/DisplayRow';
import dateFormatter from '../../formatters/dateFormatter';
import currencyFormatter from '../../formatters/currencyFormatter';

class DepartmentDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department: _.assign({}, props.department),
            visible: props.visible,
            close: props.close
        };
    }

    render() {
        let department = this.props.department;
        let instructor = department.instructor;
        let instructorName = instructor ? `${instructor.lastName}, ${instructor.firstName}` : '';
        let startDate = dateFormatter.date(department.startDate);
        let budgetDisplay = currencyFormatter.money(department.budget);

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Department Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <DisplayRow label="Name" value={department.name} />

                            <DisplayRow label="Budget" value={budgetDisplay} />

                            <DisplayRow label="Start Date" value={startDate} />

                            <DisplayRow label="Administrator" value={instructorName} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

DepartmentDetails.propTypes = {
    department: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        department: _.cloneDeep(state.department.current)
    };
}

export default connect(mapStateToProps)(DepartmentDetails);