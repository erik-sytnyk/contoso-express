import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import helper from '../../helpers/uiHelper';
import * as instructorActions from '../../actions/instructorActions';

class InstructorDelete extends React.Component {
    static propTypes = {
        instructor: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
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

        this.deleteInstructor = this.deleteInstructor.bind(this);
    }

    deleteInstructor(event) {
        event.preventDefault();

        this.props.actions.deleteInstructor(this.props.instructor.id)
            .then(() => {
                this.props.close(true);
                
                helper.showMessage('Instructor deleted');
            });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.deleteInstructor}>Delete</Button>
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

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(instructorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDelete);