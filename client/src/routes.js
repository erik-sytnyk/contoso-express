import React from 'react';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import CoursesPage from './components/CoursesPage';
import StudentsPage from './components/StudentsPage';
import InstructorsPage from './components/InstructorsPage';
import DepartmentsPage from './components/DepartmentsPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import PasswordForgotPage from './components/auth/PasswordForgotPage';
import PasswordResetPage from './components/auth/PasswordResetPage';
import ActivationPage from './components/auth/ActivationPage';
import NotFoundPage from './components/NotFoundPage';

export const routes = [
    {
        path: '/',
        exact: true,
        main: (props) => <HomePage {...props} />
    },
    {
        path: '/about',
        main: (props) => <AboutPage {...props} />
    },
    {
        path: '/courses',
        main: (props) => <CoursesPage {...props} />
    },
    {
        path: '/students',
        main: (props) => <StudentsPage {...props} />
    },
    {
        path: '/instructors',
        main: (props) => <InstructorsPage {...props} />
    },
    {
        path: '/departments',
        main: (props) => <DepartmentsPage {...props} />
    },
    {
        path: '/login',
        main: (props) => <LoginPage {...props} />
    },
    {
        path: '/signup',
        main: (props) => <SignUpPage {...props} />
    },
    {
        path: '/password-forgot',
        main: (props) => <PasswordForgotPage {...props} />
    },
    {
        path: '/password-reset/:token',
        main: (props) => <PasswordResetPage {...props} />
    },
    {
        path: '/activate/:token',
        main: (props) => <ActivationPage {...props} />
    },
    {
        path: '/*',
        main: (props) => <NotFoundPage {...props} />
    }
];