import * as types from './actionTypes';
import _ from 'lodash';
import Promise from 'bluebird';
import {beginAjaxCall} from './ajaxStatusActions';
import departmentService from '../services/departmentService';
import dateFormatter from '../formatters/dateFormatter';

export function loadDepartmentsSuccess(departments) {
    return {type: types.LOAD_DEPARTMENTS_SUCCESS, departments};
}

export function loadDepartmentSuccess(department) {
    return {type: types.LOAD_DEPARTMENT_SUCCESS, department};
}

export function createDepartmentSuccess(department) {
    return {type: types.CREATE_DEPARTMENT_SUCCESS, department};
}

export function updateDepartmentSuccess(department) {
    return {type: types.UPDATE_DEPARTMENT_SUCCESS, department};
}

export function deleteDepartmentSuccess(id) {
    return {type: types.DELETE_DEPARTMENT_SUCCESS, id};
}

export function loadDepartments() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return departmentService.getDepartments()
            .then(departments => {
                dispatch(loadDepartmentsSuccess(departments));
            }).catch(error => {
                throw(error);
            });
    };
}

export function loadDepartment(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        let action = Promise.resolve(null);

        if (_.isNumber(id)) {
            action = departmentService.getDepartment(id);
        }

        return action
            .then(department => {
                if (!department) {
                    department = {
                        name: '',
                        budget: '',
                        startDate: dateFormatter.currentDate(),
                        instructorId: '',
                        Instructor: {lastName: '', firstName: ''}
                    };
                }

                dispatch(loadDepartmentSuccess(department));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function saveDepartment(department) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return departmentService.saveDepartment(department)
            .then((dep) => {
                department.id ? dispatch(updateDepartmentSuccess(dep)) : dispatch(createDepartmentSuccess(dep));
            }).catch(error => {
                throw(error);
            });
    };
}

export function deleteDepartment(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return departmentService.deleteDepartment(id)
            .then(() => {
                dispatch(deleteDepartmentSuccess(id));
            }).catch(error => {
                throw(error);
            });
    };
}
