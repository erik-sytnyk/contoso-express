import React, {Component} from 'react';
import autoBind from 'react-autobind';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import * as userActions from '../../actions/userActions';

import TextInput from '../common/TextInput';

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            errors: {}
        };

        autoBind(this);
    }

    onChange(event) {
        let user = this.state.user;

        const field = event.target.name;

        user[field] = event.target.value;

        return this.setState({user: user});
    }

    signUpFormIsValid() {
        let user = this.state.user;
        let errors = {};

        if (!user.firstName) {
            errors.firstName = 'First Name field is required.';
        }

        if (!user.lastName) {
            errors.lastName = 'Last Name field is required.';
        }

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

    async signUp() {
        if (!this.signUpFormIsValid()) return;

        let response = await this.props.actions.signUp(this.state.user);

        if (response && response.message) {
            toastr.success(response.message);

            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-xs-8 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
                    <h1><span className="fa fa-sign-in" /> Signup</h1>

                    <TextInput
                        name="firstName"
                        label="First Name"
                        value={this.state.user.firstName}
                        onChange={this.onChange}
                        placeholder="First Name"
                        error={this.state.errors.firstName}
                    />

                    <TextInput
                        name="lastName"
                        label="Last Name"
                        value={this.state.user.lastName}
                        onChange={this.onChange}
                        placeholder="Last Name"
                        error={this.state.errors.lastName}
                    />

                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        value={this.state.user.email}
                        onChange={this.onChange}
                        placeholder="Email"
                        error={this.state.errors.email}
                    />

                    <TextInput
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.user.password}
                        onChange={this.onChange}
                        placeholder="Password"
                        error={this.state.errors.password}
                    />

                    <TextInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={this.state.user.confirmPassword}
                        onChange={this.onChange}
                        placeholder="Confirm Password"
                        error={this.state.errors.confirmPassword}
                    />

                    <button className="btn btn-warning btn-lg" onClick={this.signUp}>Signup</button>

                    <hr />

                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage));