import React from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from '../actions/userActions';

class Navigation extends React.Component {
    async onLogOut() {
        await this.props.actions.logOut();

        this.props.history.push('/login');
    }

    render() {
        let user = this.props.user;

        let userFullName = '';

        if (user && user.profile && user.profile.local) {
            let local = user.profile.local;

            userFullName = `${local.firstName} ${local.lastName}`;
        }

        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Button bsStyle="link">Contoso University</Button>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <IndexLinkContainer to="/">
                            <NavItem eventKey={1}>Home</NavItem>
                        </IndexLinkContainer>

                        <LinkContainer to="/about">
                            <NavItem eventKey={2}>About</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/students">
                            <NavItem eventKey={3}>Students</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/courses">
                            <NavItem eventKey={4}>Courses</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/instructors">
                            <NavItem eventKey={5}>Instructors</NavItem>
                        </LinkContainer>

                        <LinkContainer to="/departments">
                            <NavItem eventKey={6}>Departments</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Logged as: <b>{userFullName}</b>
                        </NavItem>

                        <NavItem eventKey={2} href="/logout">
                            LogOut   <i className="fa fa-sign-out fa-lg"/>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));