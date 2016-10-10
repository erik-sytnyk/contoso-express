import '../styles/app.css';

import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import routes from './routes';
import {loadDepartments} from './actions/departmentActions';
import {loadInstructors} from './actions/instructorActions';
import {loadUser} from './actions/userActions';

const store = configureStore();

function loadInitialData() {
    store.dispatch(loadUser());
    store.dispatch(loadDepartments());
    store.dispatch(loadInstructors());
}

loadInitialData();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);
