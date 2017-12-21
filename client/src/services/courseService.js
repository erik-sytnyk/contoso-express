import httpHelper from '../helpers/httpHelper';

export default {
  getCourses,
  getCourse,
  saveCourse,
  deleteCourse
};

function getCourses(departmentId) {
  return httpHelper.get('/api/course/list', {departmentId});
}

function getCourse(id) {
  return httpHelper.get('/api/course/getCourse', {id});
}

function saveCourse(course) {
  return httpHelper.post('/api/course/save', {course});
}

function deleteCourse(id) {
  return httpHelper.delete('/api/course/delete', {id});
}
