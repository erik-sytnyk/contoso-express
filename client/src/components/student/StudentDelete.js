import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import helper from '../../helpers/uiHelper';
import _ from 'lodash';
import * as studentActions from '../../actions/studentActions';
import Confirm from '../common/Confirm';

class StudentDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: _.assign({}, props.student),
            visible: props.visible,
            close: props.close
        };
        
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(event) {
        event.preventDefault();

        this.props.actions.deleteStudent(this.props.student.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Student deleted');
            });
    }

    render() {
        return (
            <div>
                <Confirm visible={this.props.visible} action={this.deleteStudent} close={this.props.close} />
            </div>
        );
    }
}

StudentDelete.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentDelete);