import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import courseService from '../services/courseService';
import _ from 'lodash';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourseSuccess(course) {
  return {type: types.LOAD_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(id) {
  return {type: types.DELETE_COURSE_SUCCESS, id};
}

export function loadCourses(departmentId) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return courseService
      .getCourses(departmentId)
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadCourse(id) {
  return dispatch => {
    dispatch(beginAjaxCall());

    let action = Promise.resolve(null);

    if (_.isNumber(id)) {
      action = courseService.getCourse(id);
    }

    return action
      .then(course => {
        if (!course) {
          course = {
            number: '',
            title: '',
            credits: '',
            departmentId: '',
            department: {name: ''}
          };
        }

        dispatch(loadCourseSuccess(course));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return courseService
      .saveCourse(course)
      .then(data => {
        return course.id ? dispatch(updateCourseSuccess(data)) : dispatch(createCourseSuccess(data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteCourse(id) {
  return dispatch => {
    dispatch(beginAjaxCall());

    return courseService
      .deleteCourse(id)
      .then(() => {
        dispatch(deleteCourseSuccess(id));
      })
      .catch(error => {
        throw error;
      });
  };
}
