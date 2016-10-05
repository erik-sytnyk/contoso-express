import * as types from './actionTypes';
import _ from 'lodash';
import {beginAjaxCall} from './ajaxStatusActions';
import instructorService from '../services/instructorService';
import dateFormatter from '../formatters/dateFormatter';

export function loadInstructorsSuccess(instructors) {
    return {type: types.LOAD_INSTRUCTORS_SUCCESS, instructors};
}

export function loadInstructorSuccess(instructor) {
    return {type: types.LOAD_INSTRUCTOR_SUCCESS, instructor};
}

export function createInstructorSuccess(instructor) {
    return {type: types.CREATE_INSTRUCTOR_SUCCESS, instructor};
}

export function updateInstructorSuccess(instructor) {
    return {type: types.UPDATE_INSTRUCTOR_SUCCESS, instructor};
}

export function deleteInstructorSuccess(id) {
    return {type: types.DELETE_INSTRUCTOR_SUCCESS, id};
}

export function loadInstructors() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return instructorService.getInstructors()
            .then(instructors => {
                dispatch(loadInstructorsSuccess(instructors));
            }).catch(error => {
                throw(error);
            });
    };
}

export function loadInstructor(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        let action = Promise.resolve(null);

        if (_.isNumber(id)) {
            action = instructorService.getInstructor(id);
        }

        return action
            .then(instructor => {
                if (!instructor) {
                    instructor = {
                        firstName: '',
                        lastName: '',
                        hireDate: dateFormatter.currentDate(),
                        officeAssignment: {
                            location: ''
                        },
                        courses: []
                    };
                } else {
                    if (!instructor.officeAssignment) {
                        instructor.officeAssignment = {
                            location: ''
                        };
                    }
                }

                dispatch(loadInstructorSuccess(instructor));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function saveInstructor(instructor) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return instructorService.saveInstructor(instructor)
            .then((data) => {
                instructor.id ? dispatch(updateInstructorSuccess(data)) : dispatch(createInstructorSuccess(data));
            }).catch(error => {
                throw(error);
            });
    };
}

export function deleteInstructor(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return instructorService.deleteInstructor(id)
            .then(() => {
                dispatch(deleteInstructorSuccess(id));
            }).catch(error => {
                throw(error);
            });
    };
}