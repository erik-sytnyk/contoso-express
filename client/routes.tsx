import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/AppContainer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import StudentsPage from './components/StudentsPage';
import InstructorsPage from './components/InstructorsPage';
import DepartmentsPage from './components/DepartmentsPage';
import NotFountPage from './components/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="courses" component={CoursesPage} />
        <Route path="students" component={StudentsPage} />
        <Route path="instructors" component={InstructorsPage} />
        <Route path="departments" component={DepartmentsPage} />
        <Route path="*" component={NotFountPage}/>
    </Route>
);
