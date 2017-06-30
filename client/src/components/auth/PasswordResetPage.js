import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import toastr from 'toastr';

import TextInput from '../common/TextInput';
import * as userActions from '../../actions/userActions';

class PasswordResetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {
                email: '',
                password: '',
                confirmPassword: '',
                token: ''
            },
            errors: {}
        };

        autoBind(this);
    }

    componentWillMount() {
        this.checkResetToken();
    }

    onChange(event) {
        let user = this.state.userData;

        const field = event.target.name;

        user[field] = event.target.value;

        return this.setState({userData: user});
    }

    resetFormIsValid() {
        let user = this.state.userData;
        let errors = {};

        if (!user.email) {
            errors.email = 'Email field is required.';
        } else if(!this.isValidEmail(user.email)) {
            errors.email = 'Email is not valid.';
        }

        if (!user.password) {
            errors.password = 'Password field is required.';
        }

        if (!user.confirmPassword) {
            errors.confirmPassword = 'Please confirm the password.';
        }

        if (user.password && user.confirmPassword && user.password !== user.confirmPassword) {
            errors.confirmPassword = 'Wrong password.';
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    isValidEmail(email) {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    async checkResetToken() {
        let token = this.props.match.params.token;

        let data = await this.props.actions.checkResetToken(token);

        if (data) {
            this.setState({
                userData: Object.assign({}, {email: data.email, token: data.token})
            });
        }
    }

    async resetPassword() {
        if (!this.resetFormIsValid()) return;

        let response = await this.props.actions.resetPassword(this.state.userData);

        if (response && response.message) {
            toastr.success(response.message);

            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
                    <h1>Reset Password</h1>

                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        disabled={true}
                        value={this.state.userData.email}
                        onChange={this.onChange}
                        placeholder="Email"
                        error={this.state.errors.email}
                    />

                    <TextInput
                        name="password"
                        label="New Password"
                        type="password"
                        value={this.state.userData.password}
                        onChange={this.onChange}
                        placeholder="New password"
                        error={this.state.errors.password}
                    />

                    <TextInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={this.state.userData.confirmPassword}
                        onChange={this.onChange}
                        placeholder="Confirm password"
                        error={this.state.errors.confirmPassword}
                    />

                    <button className="btn btn-warning btn-lg" onClick={this.resetPassword}>Save Password</button>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage));