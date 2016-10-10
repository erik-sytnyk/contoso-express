import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import helper from '../../helpers/uiHelper';
import * as studentActions from '../../actions/studentActions';
import StudentForm from './StudentForm';

class StudentSave extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: _.assign({}, props.student),
            errors: {},
            saving: false,
            visible: props.visible,
            close: props.close
        };

        this.updateStudentState = this.updateStudentState.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({student: _.assign({}, nextProps.student)});
    }

    updateStudentState(event) {
        let student = this.state.student;

        //for date picker change
        if (_.isString(event)) {
            student.enrollmentDate = event;
        } else {
            const field = event.target.name;
            student[field] = event.target.value;
        }

        return this.setState({student: student});
    }

    studentFormIsValid() {
        let student = this.state.student;
        let formIsValid = true;
        let errors = {};

        if (!student.firstName) {
            errors.firstName = 'The First Name field is required.';
            formIsValid = false;
        }

        if (!student.lastName) {
            errors.lastName = 'The Last Name field is required.';
            formIsValid = false;
        }

        if (student.enrollmentDate === 'Invalid date') {
            errors.date = 'Invalid Enrollment Date.';
            formIsValid = false;
        }
        
        this.setState({errors: errors});
        return formIsValid;
    }
    
    saveStudent(event) {
        event.preventDefault();

        if (!this.studentFormIsValid()) {
            return;
        }

        this.setState({saving: true});

        this.props.actions.saveStudent(this.state.student)
            .then(() => {
                this.props.close();

                let message = this.state.student.id ? 'Student updated' : 'Student added';
                helper.showMessage(message);
            })
            .catch(err => {
                this.setState({saving: false});
            });
    }

    render() {
        let header = this.props.student.id ? 'Edit Student' : 'Create Student';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{header}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <StudentForm
                            student={this.state.student}
                            onChange={this.updateStudentState}
                            errors={this.state.errors}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.saveStudent}>
                            {this.props.saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

StudentSave.propTypes = {
    student: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        student: _.cloneDeep(state.student.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSave);