import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {Button} from 'react-bootstrap';

import * as courseActions from '../actions/courseActions';
import {departmentSelectListItem} from '../formatters/entityFromatter';
import CoursesList from './courses/CoursesList';
import CourseSave from './courses/CourseSave';
import CourseDetails from './courses/CourseDetails';
import CourseDelete from './courses/CourseDelete';
import CoursesFilter from './courses/CoursesFilter';

class CoursesPage extends React.Component {
    static propTypes = {
        courses: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            courses: props.courses,
            selectedDepartmentId: '',
            saveModalVisible: false,
            detailsModalVisible: false,
            confirmationVisible: false
        };

        autoBind(this);
    }

    componentWillMount() {
        this.props.loadCourses();
    }

    changeDepartmentState(event) {
        let departmentId = event.target.value;
        
        return this.setState({selectedDepartmentId: departmentId});
    }

    filterCourses() {
        this.props.actions.loadCourses(this.state.selectedDepartmentId);
    }
    
    showSaveModal(courseId) {
        this.props.actions.loadCourse(courseId)
            .then(() => {
                this.setState({saveModalVisible: true});
            });
    }

    closeSaveModal() {
        this.setState({saveModalVisible: false});
    }

    showDetailsModal(courseId) {
        this.props.actions.loadCourse(courseId)
            .then(() => {
                this.setState({detailsModalVisible: true});
            });
    }

    closeDetailsModal() {
        this.setState({detailsModalVisible: false});
    }

    showConfirmationModal(courseId) {
        this.props.actions.loadCourse(courseId)
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
                <h2>Courses</h2>

                <Button bsStyle="link" onClick={this.showSaveModal}>Create New</Button>

                <CoursesFilter departmentId={this.state.selectedDepartmentId}
                               departments={this.props.departments}
                               onChange={this.changeDepartmentState}
                               onClick={this.filterCourses}
                />

                <CoursesList courses={this.props.courses} 
                             onSaveClick={this.showSaveModal}
                             onDetailsClick={this.showDetailsModal}
                             onDeleteClick={this.showConfirmationModal}
                />

                <CourseSave visible={this.state.saveModalVisible} 
                            close={this.closeSaveModal}
                />
                
                <CourseDetails visible={this.state.detailsModalVisible}
                               close={this.closeDetailsModal}
                />

                <CourseDelete visible={this.state.confirmationVisible}
                               close={this.closeConfirmationModal}
                />
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        courses: state.course.list,
        departments: departmentSelectListItem(state.department.list)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch),
        loadCourses: () => courseActions.loadCourses(null)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);