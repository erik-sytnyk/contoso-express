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

function initRoutes(app, passport) {
    let helper = helperInit(app, passport);

    helper.get('/', homeController.home, {view: true});
    helper.get('/api/student/statistics', studentController.getStudentsStatistics, {view: true});
    helper.get('/api/student/list', studentController.getStudents, {view: true});
    helper.get('/api/student/getStudent', studentController.getStudent, {view: true});
    helper.post('/api/student/save', studentController.saveStudent, {view: true});
    helper.post('/api/student/delete', studentController.deleteStudent, {view: true});

    helper.get('/api/department/list', departmentController.getDepartments, {view: true});
    helper.get('/api/department/getDepartment', departmentController.getDepartment, {view: true});
    helper.post('/api/department/save', departmentController.saveDepartment, {view: true});
    helper.post('/api/department/delete', departmentController.deleteDepartment, {view: true});

    helper.get('/api/instructor/list', instructorController.getInstructors, {view: true});
    helper.get('/api/instructor/getInstructor', instructorController.getInstructor, {view: true});
    helper.post('/api/instructor/save', instructorController.saveInstructor, {view: true});
    helper.post('/api/instructor/delete', instructorController.deleteInstructor, {view: true});

    helper.get('/api/course/list', courseController.getCourses, {view: true});
    helper.get('/api/course/getCourse', courseController.getCourse, {view: true});
    helper.post('/api/course/save', courseController.saveCourse, {view: true});
    helper.post('/api/course/delete', courseController.deleteCourse, {view: true});

    helper.get('/api/enrollment/list', enrollmentController.getEnrollmentsByCourse, {view: true});

    initAuthRoutes(helper, passport);

    //all other routes are rendered as home (for client side routing)
    helper.get('*', homeController.home, {view: true});
}

//TODO TS i-sense for helper
function initAuthRoutes(helper, passport) {
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