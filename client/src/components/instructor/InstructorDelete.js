import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import autoBind from 'react-autobind';

import helper from '../../helpers/uiHelper';
import * as instructorActions from '../../actions/instructorActions';

class InstructorDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructor: _.assign({}, props.instructor),
            visible: props.visible,
            close: props.close
        };

        autoBind(this);
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

InstructorDelete.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

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