import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from '../../actions/userActions';

class ActivationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activationData: {
                message: '',
                status: ''
            }
        };

        autoBind(this);
    }

    componentWillMount() {
        this.activateUserAccount();
    }

    async activateUserAccount() {
        let token = this.props.match.params.token;

        let data = await this.props.actions.activateUserAccount(token);

        if (data) {
            this.setState({
                activationData: Object.assign({}, data)
            });
        }
    }

    render() {
        let status = this.state.activationData.status;

        let alertClass = classnames({
            'alert': true,
            'alert-danger': status === 'error',
            'alert-success': status === 'success',
            'alert-warning': status === 'warning'
        });

        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
                    <h1>Activation Page</h1>

                    <br/>

                    {this.state.activationData.message &&
                        <div className={alertClass}>{this.state.activationData.message}</div>
                    }

                    <hr/>

                    <p>Redirect to login page: <Link to="/login">Login</Link></p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivationPage));