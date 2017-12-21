import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import configureStore from './store/configureStore';
import {routes} from './routes';
import AppContainer from './components/AppContainer';
import {loadDepartments} from './actions/departmentActions';
import {loadInstructors} from './actions/instructorActions';

import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-datetime/css/react-datetime.css';
import './app.css';

const store = configureStore();

//TODO move into componentWillMount (as for about page)
store.dispatch(loadDepartments());
store.dispatch(loadInstructors());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <AppContainer routes={routes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
