import React from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

class Navigation extends React.Component {
  render() {
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
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
