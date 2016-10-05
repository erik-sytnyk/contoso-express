import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import * as instructorActions from '../../actions/instructorActions';
import InstructorCourseRow from './InstructorCourseRow';

class InstructorCoursesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            instructor: _.assign({}, props.instructor),
            visible: props.visible
        };
    }
    
    render() {
        let instructor = this.props.instructor;
        let courses = (instructor && instructor.courses) ? instructor.courses : [];

        let style = this.props.visible ? {display: 'block'} : {display: 'none'};

        return (
            <div style={style}>
                <h3>Courses Taught by Selected Instructor</h3>

                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Number</th>
                            <th>Title</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course =>
                            <InstructorCourseRow key={course.id} course={course}
                                                 selectedCourseId={this.props.selectedCourseId}
                                                 onSelectClick={() => this.props.onSelectClick(course.id)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

InstructorCoursesList.propTypes = {
    instructor: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    selectedCourseId: React.PropTypes.number.isRequired,
    onSelectClick: React.PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(InstructorCoursesList);