import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Switch, Route, withRouter} from 'react-router-dom';

import Navigation from './Navigation';
import dateFormatter from '../formatters/dateFormatter';

class App extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  render() {
    let date = dateFormatter.currentYear();

    return (
      <div>
        <Navigation />
        <div id="page-body" className="container-fluid">
          <Switch>
            {this.props.routes.map((route, index) => (
              <Route key={index} exact={route.exact} path={route.path} component={route.main} />
            ))};
          </Switch>

          {this.props.children}

          <div className="container">
            <hr />

            <p>&copy; {date} - Contoso University</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

export default withRouter(connect(mapStateToProps)(App));
