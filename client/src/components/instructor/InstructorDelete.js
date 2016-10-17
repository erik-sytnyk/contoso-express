import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import helper from '../../helpers/uiHelper';
import * as instructorActions from '../../actions/instructorActions';
import Confirm from '../common/Confirm';

class InstructorDelete extends React.Component {
  static propTypes = {
    instructor: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      instructor: _.assign({}, props.instructor),
      visible: props.visible,
      close: props.close
    };

    autoBind(this);
  }

  deleteInstructor(event) {
    event.preventDefault();

    this.props.actions.deleteInstructor(this.props.instructor.id).then(() => {
      this.props.close(true);

      helper.showMessage('Instructor deleted');
    });
  }

  render() {
    return <Confirm visible={this.props.visible} action={this.deleteInstructor} close={this.props.close} />;
  }
}

function mapStateToProps(state) {
  return {
    instructor: _.cloneDeep(state.instructor.current)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(instructorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDelete);
