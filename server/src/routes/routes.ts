import authControllerInit from '../auth/authController';
import homeController from '../controllers/homeController';
import studentController from '../controllers/studentController';
import departmentController from '../controllers/departmentController';
import instructorController from '../controllers/instructorController';
import courseController from '../controllers/courseController';
import enrollmentController from '../controllers/enrollmentController';
import helperInit from './routesHelper';

export default {
    init: initRoutes
};

let helper = helperInit(null, null);

function initRoutes(app, passport) {
    helper = helperInit(app, passport);

    initAuthRoutes(passport);

    helper.get('/', homeController.home, {view: true});

    initStudentRoutes();

    initDepartmentRoutes();

    initInstructorRoutes();

    initCourseRoutes();

    helper.get('/api/enrollment/list', enrollmentController.getEnrollmentsByCourse, {view: true});

    //all other routes are rendered as home (for client side routing)
    helper.get('*', homeController.home, {view: true});
}

function initStudentRoutes() {
    helper.get('/api/student/statistics', studentController.getStudentsStatistics);
    helper.get('/api/student/list', studentController.getStudents);
    helper.get('/api/student/getStudent', studentController.getStudent);
    helper.post('/api/student/save', studentController.saveStudent);
    helper.delete('/api/student/delete', studentController.deleteStudent);
}

function initDepartmentRoutes() {
    helper.get('/api/department/list', departmentController.getDepartments);
    helper.get('/api/department/getDepartment', departmentController.getDepartment);
    helper.post('/api/department/save', departmentController.saveDepartment);
    helper.delete('/api/department/delete', departmentController.deleteDepartment);
}

function initInstructorRoutes() {
    helper.get('/api/instructor/list', instructorController.getInstructors);
    helper.get('/api/instructor/getInstructor', instructorController.getInstructor);
    helper.post('/api/instructor/save', instructorController.saveInstructor);
    helper.delete('/api/instructor/delete', instructorController.deleteInstructor);
}

function initCourseRoutes() {
    helper.get('/api/course/list', courseController.getCourses);
    helper.get('/api/course/getCourse', courseController.getCourse);
    helper.post('/api/course/save', courseController.saveCourse);
    helper.delete('/api/course/delete', courseController.deleteCourse);
}

function initAuthRoutes(passport) {
    let authController = authControllerInit(passport);

    helper.get('/activate/:token', authController.activate, {auth: false});
    helper.get('/login', authController.logIn, {auth: false, view: true});
    helper.post('/login', authController.logInPost, {auth: false, view: true});
    helper.get('/signup', authController.signUp, {auth: false, view: true});
    helper.post('/signup', authController.signUpPost, {auth: false, view: true});
    helper.get('/logout', authController.logOut, {auth: false, view: true});
    helper.get('/passwordForgot', authController.forgotPassword, {auth: false, view: true});
    helper.post('/passwordForgot', authController.forgotPasswordPost, {auth: false, view: true});
    helper.get('/passwordReset/:token', authController.resetPassword, {auth: false, view: true});
    helper.post('/passwordReset/:token', authController.resetPasswordPost, {auth: false, view: true});

    helper.get('/auth/google', authController.google, {auth: false, view: true});
    helper.get('/auth/google/callback', authController.googleCallback, {auth: false, view: true});

    helper.get('/auth/facebook', authController.facebook, {auth: false, view: true});
    helper.get('/auth/facebook/callback', authController.facebookCallback, {auth: false, view: true});
}