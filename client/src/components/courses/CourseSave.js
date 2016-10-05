import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import helper from '../../helpers/uiHelper';
import * as courseActions from '../../actions/courseActions';
import {departmentSelectListItem} from '../../formatters/entityFromatter';
import CourseForm from './CourseForm';

class CourseSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: _.assign({}, props.course),
            errors: {},
            saving: false,
            visible: props.visible,
            close: props.close
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({course: _.assign({}, nextProps.course)});
    }

    updateCourseState(event) {
        let course = this.state.course;

        const field = event.target.name;
        course[field] = event.target.value;

        return this.setState({course: course});
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (!this.state.course.number) {
            errors.number = 'The Number field is required.';
            formIsValid = false;
        }

        if (!this.state.course.title) {
            errors.title = 'The Title field is required.';
            formIsValid = false;
        }

        if (!this.state.course.credits) {
            errors.credits = 'The Credits field is required.';
            formIsValid = false;
        }

        if (!_.inRange(this.state.course.credits, 0, 6)) {
            errors.credits = 'The field Credits must be between 0 and 5.';
            formIsValid = false;
        }

        if (!this.state.course.departmentId) {
            errors.departmentId = 'Department is required.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid()) {
            return;
        }

        this.setState({saving: true});

        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.props.close();

                let message = this.state.course.id ? 'Course updated' : 'Course added';
                helper.showMessage(message);
            })
            .catch(err => {
                this.setState({saving: false});
            });
    }

    render() {
        let header = this.props.course.id ? 'Edit Course' : 'Create Course';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CourseForm
                            course={this.state.course}
                            allDepartments={this.props.departments}
                            onChange={this.updateCourseState}
                            errors={this.state.errors}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveCourse}>
                            {this.props.saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

CourseSave.propTypes = {
    course: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        course: _.cloneDeep(state.course.current),
        departments: departmentSelectListItem(state.department.list)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSave);