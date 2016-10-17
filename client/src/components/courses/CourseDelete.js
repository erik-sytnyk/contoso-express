import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import helper from '../../helpers/uiHelper';
import _ from 'lodash';
import * as courseActions from '../../actions/courseActions';
import Confirm from '../common/Confirm';

class CourseDelete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: _.assign({}, props.course),
            visible: props.visible,
            close: props.close
        };

        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(event) {
        event.preventDefault();

        this.props.actions.deleteCourse(this.props.course.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Course deleted');
            });
    }

    render() {
        return (
            <div>
                <Confirm visible={this.props.visible} action={this.deleteCourse} close={this.props.close} />
            </div>
        );
    }
}

CourseDelete.propTypes = {
    course: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

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