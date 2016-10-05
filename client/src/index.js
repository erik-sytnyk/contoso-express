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
