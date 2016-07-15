import * as React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import * as _ from 'lodash';
import DisplayRow from '../common/DisplayRow';

class CourseDetails extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            course: _.assign({}, props.course),
            visible: props.visible,
            close: props.close
        };
    }

    render() {
        let course = this.props.course;
        let department = course.department;
        let departmentName = department ? department.name : '';
        let courseNumber = course.number ? course.number.toString() : '';
        let courseCredits = course.credits ? course.credits.toString() : '';

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Course Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-horizontal">
                            <DisplayRow label="Department" value={departmentName} />

                            <DisplayRow label="Number" value={courseNumber} />

                            <DisplayRow label="Title" value={course.title} />

                            <DisplayRow label="Credits" value={courseCredits} />
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

(CourseDetails as any).propTypes = {
    course: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        course: _.cloneDeep(state.course.current)
    };
}

export default connect(mapStateToProps)(CourseDetails);