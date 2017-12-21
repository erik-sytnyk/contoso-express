import React from 'react';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import StudentsPage from './components/StudentsPage';
import InstructorsPage from './components/InstructorsPage';
import DepartmentsPage from './components/DepartmentsPage';
import NotFoundPage from './components/NotFoundPage';

export const routes = [
  {
    path: '/',
    exact: true,
    main: props => <HomePage {...props} />
  },
  {
    path: '/about',
    main: props => <AboutPage {...props} />
  },
  {
    path: '/courses',
    main: props => <CoursesPage {...props} />
  },
  {
    path: '/students',
    main: props => <StudentsPage {...props} />
  },
  {
    path: '/instructors',
    main: props => <InstructorsPage {...props} />
  },
  {
    path: '/departments',
    main: props => <DepartmentsPage {...props} />
  },
  {
    path: '/*',
    main: props => <NotFoundPage {...props} />
  }
];
