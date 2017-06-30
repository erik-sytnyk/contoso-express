import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';

import helper from '../../helpers/uiHelper';
import * as departmentActions from '../../actions/departmentActions';

class DepartmentDelete extends React.Component {
    static propTypes = {
        department: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        visible: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            department: _.assign({}, props.department),
            visible: props.visible,
            close: props.close
        };
        
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    deleteDepartment(event) {
        event.preventDefault();

        this.props.actions.deleteDepartment(this.props.department.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Department deleted');
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
                        <Button bsStyle="danger" onClick={this.deleteDepartment}>Delete</Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        department: _.cloneDeep(state.department.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(departmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDelete);