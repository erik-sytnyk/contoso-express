import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import helper from '../../helpers/uiHelper';
import _ from 'lodash';
import * as departmentActions from '../../actions/departmentActions';
import Confirm from '../common/Confirm';

class DepartmentDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department: _.assign({}, props.department),
            visible: props.visible,
            close: props.close
        };
        
        this.deleteDepartment = this.deleteDepartment.bind(this);
    }

    deleteDepartment(event) {
        event.preventDefault();

        this.props.actions.deleteDepartment(this.props.department.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Department deleted');
            });
    }

    render() {
        return (
            <div>
                <Confirm visible={this.props.visible} action={this.deleteDepartment} close={this.props.close} />
            </div>
        );
    }
}

DepartmentDelete.propTypes = {
    department: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

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