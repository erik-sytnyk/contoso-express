import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import helper from '../../helpers/uiHelper';
import * as departmentActions from '../../actions/departmentActions';
import DepartmentForm from './DepartmentForm';
import {instructorSelectListItem} from '../../formatters/entityFromatter';

class DepartmentSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department: _.assign({}, props.department),
            errors: {},
            saving: false,
            visible: props.visible,
            close: props.close
        };

        this.updateDepartmentState = this.updateDepartmentState.bind(this);
        this.saveDepartment = this.saveDepartment.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({department: _.assign({}, nextProps.department)});
    }

    updateDepartmentState(event) {
        let department = this.state.department;

        //for date picker change
        if (_.isString(event)) {
            department.startDate = event;
        } else {
            const field = event.target.name;
            department[field] = event.target.value;
        }

        return this.setState({department: department});
    }

    departmentFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.department.name.length < 5) {
            errors.name = 'Name must be at least 5 characters.';
            formIsValid = false;
        }
        
        if (this.state.department.startDate === 'Invalid date') {
            errors.date = 'Invalid Start Date.';
            formIsValid = false;
        }

        if (!this.state.department.instructorId) {
            errors.instructorId = 'Administrator is required.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    saveDepartment(event) {
        event.preventDefault();

        if (!this.departmentFormIsValid()) {
            return;
        }

        this.setState({saving: true});

        this.props.actions.saveDepartment(this.state.department)
            .then(() => {
                this.props.close();

                let message = this.state.department.id ? 'Department updated' : 'Department added';
                helper.showMessage(message);
            })
            .catch(err => {
                this.setState({saving: false});
            });
    }

    render() {
        let header = this.props.department.id ? 'Edit Department' : 'Create Department';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DepartmentForm
                            department={this.state.department}
                            allInstructors={this.props.instructors}
                            onChange={this.updateDepartmentState}
                            errors={this.state.errors}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveDepartment}>
                            {this.props.saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

DepartmentSave.propTypes = {
    department: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        department: _.cloneDeep(state.department.current),
        instructors: instructorSelectListItem(state.instructor.list)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(departmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentSave);