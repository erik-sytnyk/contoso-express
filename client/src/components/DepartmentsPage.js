import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import PageContent from './common/PageContent';
import DepartmentsList from './department/DepartmentsList';
import DepartmentSave from './department/DepartmentSave';
import DepartmentDetails from './department/DepartmentDetails';
import DepartmentDelete from './department/DepartmentDelete';
import * as departmentActions from '../actions/departmentActions';

class DepartmentsPage extends React.Component {
    static propTypes = {
        departments: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

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
            <PageContent>
                <div className="container">
                    <h2>Departments</h2>

                    <Button bsStyle="link" onClick={this.showSaveModal}>Create New</Button>

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
            </PageContent>
        );
    }
}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DepartmentsPage));