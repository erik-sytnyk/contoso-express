import * as types from './actionTypes';
import * as _ from 'lodash';
import {beginAjaxCall} from './ajaxStatusActions';
import studentService from '../services/studentService';
import dateFormatter from '../formatters/dateFormatter';

export function loadStudentsStatisticsSuccess(statistics) {
    return {type: types.LOAD_STUDENTS_STATISTICS_SUCCESS, statistics};
}

export function loadStudentsSuccess(students) {
    return {type: types.LOAD_STUDENTS_SUCCESS, students};
}

export function loadStudentSuccess(student) {
    return {type: types.LOAD_STUDENT_SUCCESS, student};
}

export function countStudentsSuccess(count) {
    return {type: types.COUNT_STUDENTS_SUCCCESS, count};
}

export function createStudentSuccess(student) {
    return {type: types.CREATE_STUDENT_SUCCESS, student};
}

export function updateStudentSuccess(student) {
    return {type: types.UPDATE_STUDENT_SUCCESS, student};
}

export function deleteStudentSuccess(id) {
    return {type: types.DELETE_STUDENT_SUCCESS, id};
}

export function loadStudentsStatistics() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return studentService.getStudentsStatistics()
            .then(statistics => {
                dispatch(loadStudentsStatisticsSuccess(statistics));
            }).catch(error => {
                throw(error);
            });
    };
}

export function loadStudents(search, sortOrder, pageNumber, pageSize) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return studentService.getStudents(search, sortOrder, pageNumber, pageSize)
            .then(data => {
                dispatch(loadStudentsSuccess(data.rows));
                dispatch(countStudentsSuccess(data.count));
            }).catch(error => {
                throw(error);
            });
    };
}

export function loadStudent(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        let action: any = Promise.resolve(null);

        if (_.isNumber(id)) {
            action = studentService.getStudent(id);
        }

        return action
            .then(student => {
                if (!student) {
                    student = {
                        firstName: '',
                        lastName: '',
                        enrollmentDate: dateFormatter.currentDate()
                    };
                }

                dispatch(loadStudentSuccess(student));
            })
            .catch(error => {
                throw(error);
            });
    };
}

export function saveStudent(student) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return studentService.saveStudent(student)
            .then((stud: any) => {
                student.id ? dispatch(updateStudentSuccess(stud)) : dispatch(createStudentSuccess(stud));
            }).catch(error => {
                throw(error);
            });
    };
}

export function deleteStudent(id) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return studentService.deleteStudent(id)
            .then(() => {
                dispatch(deleteStudentSuccess(id));
            }).catch(error => {
                throw(error);
            });
    };
}