import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';

import DepartmentsList from './department/DepartmentsList';
import DepartmentSave from './department/DepartmentSave';
import DepartmentDetails from './department/DepartmentDetails';
import DepartmentDelete from './department/DepartmentDelete';
import * as departmentActions from '../actions/departmentActions';

class DepartmentsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            departments: props.departments,
            saveModalVisible: false,
            detailsModalVisible: false,
            confirmationVisible: false
        };

        autoBind(this);
    }

    showSaveModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({saveModalVisible: true});
            });
    }

    closeSaveModal() {
        this.setState({saveModalVisible: false});
    }

    showDetailsModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({detailsModalVisible: true});
            });
    }

    closeDetailsModal() {
        this.setState({detailsModalVisible: false});
    }

    showConfirmationModal(departmentId) {
        this.props.actions.loadDepartment(departmentId)
            .then(() => {
                this.setState({confirmationVisible: true});
            });
    }

    closeConfirmationModal() {
        this.setState({confirmationVisible: false});
    }

    render() {
        return (
            <div className="container">
                <h2>Departments</h2>
                <a href="#" onClick={this.showSaveModal}>Create New</a>

                <DepartmentsList departments={this.props.departments} 
                                 onSaveClick={this.showSaveModal} 
                                 onDetailsClick={this.showDetailsModal} 
                                 onDeleteClick={this.showConfirmationModal}
                />

                <DepartmentSave visible={this.state.saveModalVisible}
                                close={this.closeSaveModal}
                />
                
                <DepartmentDetails visible={this.state.detailsModalVisible}
                                   close={this.closeDetailsModal}
                />
                
                <DepartmentDelete visible={this.state.confirmationVisible}
                                  close={this.closeConfirmationModal}
                />
            </div>
        );
    }
}

DepartmentsPage.propTypes = {
    departments: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        departments: state.department.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(departmentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentsPage);