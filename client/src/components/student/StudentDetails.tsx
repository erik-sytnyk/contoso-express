import * as React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import * as _ from 'lodash';
import dateFormatter from '../../formatters/dateFormatter';
import StudentEnrollmentsList from './StudentEnrollmentsList';
import DisplayRow from '../common/DisplayRow';

class StudentDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            student: _.assign({}, props.student),
            visible: props.visible,
            close: props.close
        };
    }

    render() {
        let student = this.props.student;

        let enrollmentDate = dateFormatter.date(student.enrollmentDate);
        let enrollments = (student && student.enrollments) ? student.enrollments : [];
        let enrollmentsStyle = _.isEmpty(enrollments) ? {display: 'none'} : {};

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Student Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <DisplayRow label="Last Name" value={student.lastName} />

                            <DisplayRow label="First Name" value={student.firstName} />

                            <DisplayRow label="Enrollment Date" value={enrollmentDate} />
                            
                            <div className="form-group" style={enrollmentsStyle}>
                                <label className="col-xs-3 form-label">Enrollments:</label>
                                <div className="col-xs-9">
                                    <StudentEnrollmentsList enrollments={enrollments} />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

(StudentDetails as any).propTypes = {
    student: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        student: _.cloneDeep(state.student.current)
    };
}

export default connect(mapStateToProps)(StudentDetails);