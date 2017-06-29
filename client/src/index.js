import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';

import configureStore from './store/configureStore';
import routes from './routes';
import {loadDepartments} from './actions/departmentActions';
import {loadInstructors} from './actions/instructorActions';

import 'bootstrap/dist/css/bootstrap.css';
import 'toastr/build/toastr.css';
import 'font-awesome/css/font-awesome.min.css';
import './app.css';

const store = configureStore();

//TODO move into componentWillMount (as for about page)
store.dispatch(loadDepartments());
store.dispatch(loadInstructors());

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
