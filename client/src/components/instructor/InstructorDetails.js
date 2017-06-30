import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import DisplayRow from '../common/DisplayRow';
import dateFormatter from '../../formatters/dateFormatter';

class InstructorDetails extends React.Component {
    static propTypes = {
        instructor: PropTypes.object.isRequired,
        visible: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            instructor: _.assign({}, props.instructor),
            visible: props.visible,
            close: props.close
        };
    }

    render() {
        let instructor = this.props.instructor;

        let office = instructor.officeAssignment;
        let location = office ? office.location : 'No office';
        let hireDate = dateFormatter.date(instructor.hireDate);

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Instructor Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <DisplayRow label="Office Location" value={location} />

                            <DisplayRow label="Last Name" value={instructor.lastName} />

                            <DisplayRow label="First Name" value={instructor.firstName} />

                            <DisplayRow label="Hire Date" value={hireDate} />
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

function mapStateToProps(state) {
    return {
        instructor: _.cloneDeep(state.instructor.current)
    };
}

export default connect(mapStateToProps)(InstructorDetails);