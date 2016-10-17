import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';

import helper from '../../helpers/uiHelper';
import * as departmentActions from '../../actions/departmentActions';
import Confirm from '../common/Confirm';

class DepartmentDelete extends React.Component {
  static propTypes = {
    department: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      department: _.assign({}, props.department),
      visible: props.visible,
      close: props.close
    };

    autoBind(this);
  }

  deleteDepartment(event) {
    event.preventDefault();

    this.props.actions.deleteDepartment(this.props.department.id).then(() => {
      this.props.close();

      helper.showMessage('Department deleted');
    });
  }

  render() {
    return <Confirm visible={this.props.visible} action={this.deleteDepartment} close={this.props.close} />;
  }
}

function mapStateToProps(state) {
  return {
    department: _.cloneDeep(state.department.current)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(departmentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDelete);
