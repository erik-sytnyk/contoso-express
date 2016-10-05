import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import helper from '../../helpers/uiHelper';
import * as _ from 'lodash';
import * as departmentActions from '../../actions/departmentActions';

class DepartmentDelete extends React.Component<any, any> {
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

(DepartmentDelete as any).propTypes = {
    department: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        department: _.cloneDeep(state.department.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (bindActionCreators as any)(departmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDelete);