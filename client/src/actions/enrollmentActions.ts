import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import enrollmentService from '../services/enrollmentService';
import * as _ from 'lodash';

export function loadEnrollmentsSuccess(enrollments) {
    return {type: types.LOAD_ENROLLMENTS_SUCCESS, enrollments};
}

export function loadEnrollments(courseId) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return enrollmentService.getEnrollments(courseId)
            .then(enrollments => {
                dispatch(loadEnrollmentsSuccess(enrollments));
            }).catch(error => {
                throw(error);
            });
    };
}
