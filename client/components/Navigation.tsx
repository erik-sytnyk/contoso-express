import * as React from 'react';
import {IndexLink } from 'react-router';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component<any, any> {
    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <IndexLink to="/" className="navbar-brand">Contoso University</IndexLink>
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
                        <NavItem eventKey={1} href="/logout">LogOut   <i className="fa fa-sign-out fa-lg"></i></NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;