import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import helper from '../../helpers/uiHelper';
import * as instructorActions from '../../actions/instructorActions';
import {loadCourses} from '../../actions/courseActions';
import InstructorForm from './InstructorForm';
import {courseSelectListItem} from '../../formatters/entityFromatter';

class InstructorSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructor: _.assign({}, props.instructor),
            errors: {},
            saving: false,
            visible: props.visible,
            close: props.close
        };

        this.updateInstructorState = this.updateInstructorState.bind(this);
        this.saveInstructor = this.saveInstructor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({instructor: _.assign({}, nextProps.instructor)});
    }

    componentWillMount() {
        this.props.loadCourses();
    }

    updateInstructorState(event) {
        let instructor = this.state.instructor;
        let officeAssignment = instructor.officeAssignment;
        let courses = instructor.courses;

        //for date picker change
        if (_.isString(event)) {
            instructor.hireDate = event;
        } else {
            const field = event.target.name;

            if (field === 'location') {
                officeAssignment.location = event.target.value;
                instructor.officeAssignment = officeAssignment;
            } else if (!_.isNaN(parseInt(field, 10))) {
                let id = parseInt(field, 10);

                let exist = _.find(courses, (item) => {
                   return item.id === id;
                });

                if (exist) {
                    instructor.courses = _.filter(courses, (course) => {
                       return course.id !== id;
                    });
                } else {
                    courses.push({id: id});
                }
            } else {
                instructor[field] = event.target.value;
            }
        }

        return this.setState({instructor: instructor});
    }

    instructorFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (!this.state.instructor.firstName) {
            errors.firstName = 'The First Name field is required.';
            formIsValid = false;
        }

        if (!this.state.instructor.lastName) {
            errors.lastName = 'The Last Name field is required.';
            formIsValid = false;
        }

        if (!this.state.instructor.hireDate) {
            errors.hireDate = 'The Hire Date field is required.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    saveInstructor(event) {
        event.preventDefault();

        if (!this.instructorFormIsValid()) {
            return;
        }

        this.setState({saving: true});
        
        this.props.actions.saveInstructor(this.state.instructor)
            .then(() => {
                this.props.close();

                let message = this.state.instructor.id ? 'Instructor updated' : 'Instructor added';
                helper.showMessage(message);
            })
            .catch(err => {
                this.setState({saving: false});
            });
    }

    render() {
        let header = this.props.instructor.id ? 'Edit Instructor' : 'Create Instructor';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InstructorForm
                            instructor={this.state.instructor}
                            allCourses={this.props.courses}
                            onChange={this.updateInstructorState}
                            errors={this.state.errors}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveInstructor}>
                            {this.props.saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

InstructorSave.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        instructor: _.cloneDeep(state.instructor.current),
        courses: courseSelectListItem(state.course.list)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(instructorActions, dispatch),
        loadCourses: () => loadCourses(null)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorSave);