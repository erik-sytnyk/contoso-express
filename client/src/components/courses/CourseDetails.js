import React from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import DisplayRow from '../common/DisplayRow';

class CourseDetails extends React.Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      course: _.assign({}, props.course),
      visible: props.visible,
      close: props.close
    };

    autoBind(this);
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

function mapStateToProps(state) {
  return {
    course: _.cloneDeep(state.course.current)
  };
}

export default connect(mapStateToProps)(CourseDetails);
