import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import autoBind from 'react-autobind';

import helper from '../../helpers/uiHelper';
import * as courseActions from '../../actions/courseActions';
import Confirm from '../common/Confirm';

class CourseDelete extends React.Component {
  static propTypes = {
    course: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
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

  deleteCourse(event) {
    event.preventDefault();

    this.props.actions.deleteCourse(this.props.course.id).then(() => {
      this.props.close();

      helper.showMessage('Course deleted');
    });
  }

  render() {
    return <Confirm visible={this.props.visible} action={this.deleteCourse} close={this.props.close} />;
  }
}

function mapStateToProps(state) {
  return {
    course: _.cloneDeep(state.course.current)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDelete);
