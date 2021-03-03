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

let helper = helperInit(null);

function initRoutes(app) {
  helper = helperInit(app);

  helper.get('/', homeController.home);

  initStudentRoutes();

  initDepartmentRoutes();

  initInstructorRoutes();

  initCourseRoutes();

  helper.get('/api/enrollment/list', enrollmentController.getEnrollmentsByCourse);

  //all other routes are rendered as home (for client side routing)
  helper.get('*', homeController.home);
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
