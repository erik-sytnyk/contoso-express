import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import _ from 'lodash';

import helper from '../../helpers/uiHelper';
import * as courseActions from '../../actions/courseActions';

class CourseDelete extends React.Component {
    static propTypes = {
        course: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        visible: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            course: _.assign({}, props.course),
            visible: props.visible,
            close: props.close
        };

        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(event) {
        event.preventDefault();

        this.props.actions.deleteCourse(this.props.course.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Course deleted');
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
                        <Button bsStyle="danger" onClick={this.deleteCourse}>Delete</Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        course: _.cloneDeep(state.course.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDelete);