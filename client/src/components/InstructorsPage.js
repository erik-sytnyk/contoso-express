import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import InstructorList from './instructor/InstructorList';
import * as instructorActions from '../actions/instructorActions';
import * as enrollmentActions from '../actions/enrollmentActions';
import InstructorSave from './instructor/InstructorSave';
import InstructorDetails from './instructor/InstructorDetails';
import InstructorDelete from './instructor/InstructorDelete';
import InstructorCoursesList from './instructor/InstructorCoursesList';
import InstructorStudentsList from './instructor/InstructorStudentsList';

class InstructorsPage extends React.Component {
    static propTypes = {
        instructors: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired,
        enrollments: PropTypes.array.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            instructors: props.instructors,
            enrollments: props.enrollments,
            selectInstructorVisible: false,
            selectedInstructorId: 0,
            selectCourseVisible: false,
            selectedCourseId: 0,
            saveModalVisible: false,
            detailsModalVisible: false,
            confirmationVisible: false
        };

        this.showCoursesList = this.showCoursesList.bind(this);
        this.showStudentsList = this.showStudentsList.bind(this);
        this.showSaveModal = this.showSaveModal.bind(this);
        this.closeSaveModal = this.closeSaveModal.bind(this);
        this.showDetailsModal = this.showDetailsModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    }

    showCoursesList(instructorId) {
        this.props.actions.loadInstructor(instructorId)
            .then(() => {
                this.setState({
                    selectedInstructorId: instructorId,
                    selectInstructorVisible: true,
                    selectCourseVisible: false
                });
            });
    }

    showStudentsList(courseId) {
        this.props.actions.loadEnrollments(courseId)
            .then(() => {
                this.setState({
                    selectedCourseId: courseId,
                    selectCourseVisible: true
                });
            });
    }
    
    showSaveModal(instructorId) {
        this.props.actions.loadInstructor(instructorId)
            .then(() => {
                this.setState({saveModalVisible: true});
            });
    }

    closeSaveModal() {
        this.setState({saveModalVisible: false});
    }

    showDetailsModal(instructorId) {
        this.props.actions.loadInstructor(instructorId)
            .then(() => {
                this.setState({detailsModalVisible: true});
            });
    }

    closeDetailsModal() {
        this.setState({detailsModalVisible: false});
    }

    showConfirmationModal(instructorId) {
        this.props.actions.loadInstructor(instructorId)
            .then(() => {
                this.setState({confirmationVisible: true});
            });
    }

    closeConfirmationModal(isDeleted) {
        this.setState({confirmationVisible: false});

        if (isDeleted === true) {
            this.setState({selectInstructorVisible: false, selectCourseVisible: false});
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Instructors</h2>
                <a href="#" onClick={this.showSaveModal}>Create New</a>

                <InstructorList instructors={this.props.instructors}
                                selectedInstructorId={this.state.selectedInstructorId}
                                onSelectClick={this.showCoursesList}
                                onSaveClick={this.showSaveModal}
                                onDetailsClick={this.showDetailsModal}
                                onDeleteClick={this.showConfirmationModal}
                />
                
                <InstructorCoursesList visible={this.state.selectInstructorVisible}
                                       selectedCourseId={this.state.selectedCourseId}
                                       onSelectClick={this.showStudentsList}
                />

                <InstructorStudentsList visible={this.state.selectCourseVisible}
                                        enrollments={this.props.enrollments}
                />
                
                <InstructorSave visible={this.state.saveModalVisible}
                                close={this.closeSaveModal}
                />

                <InstructorDetails visible={this.state.detailsModalVisible}
                                   close={this.closeDetailsModal}
                />

                <InstructorDelete visible={this.state.confirmationVisible}
                                  close={this.closeConfirmationModal}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        instructors: state.instructor.list,
        enrollments: state.enrollment.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(_.assign({}, instructorActions, enrollmentActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorsPage);