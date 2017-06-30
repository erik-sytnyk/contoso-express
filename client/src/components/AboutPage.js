import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import {withRouter} from 'react-router-dom';

import StudentStatisticsList from './student/StudentStatisticsList';
import {loadStudentsStatistics} from '../actions/studentActions';

class AboutPage extends React.Component {
    static propTypes = {
        statistics: PropTypes.array.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            statistics: props.statistics
        };

        autoBind(this);
    }

    componentWillMount() {
        this.props.loadStudentsStatistics();
    }

    render() {
        return (
            <div className="container">
                <h2>Student Body Statistics</h2>

                <div className="col-xs-3">
                    <StudentStatisticsList statistics={this.props.statistics}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        statistics: state.student.statisticsList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadStudentsStatistics: () => loadStudentsStatistics()(dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AboutPage));