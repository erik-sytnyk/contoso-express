import React from 'react';
import * as _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import Navigation from '../Navigation';
import * as userActions from '../../actions/userActions';

class PageContent extends React.Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    };

    componentWillMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.actions.getCurrentUser();
        }
    }

    render() {
        return (
            <div>
                <Navigation />

                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageContent));