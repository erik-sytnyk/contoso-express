import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import helper from '../../helpers/uiHelper';
import _ from 'lodash';
import * as instructorActions from '../../actions/instructorActions';
import Confirm from '../common/Confirm';

class InstructorDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructor: _.assign({}, props.instructor),
            visible: props.visible,
            close: props.close
        };

        this.deleteInstructor = this.deleteInstructor.bind(this);
    }

    deleteInstructor(event) {
        event.preventDefault();

        this.props.actions.deleteInstructor(this.props.instructor.id)
            .then(() => {
                this.props.close(true);
                
                helper.showMessage('Instructor deleted');
            });
    }

    render() {
        return (
            <div>
                <Confirm visible={this.props.visible} action={this.deleteInstructor} close={this.props.close} />
            </div>
        );
    }
}

InstructorDelete.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

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