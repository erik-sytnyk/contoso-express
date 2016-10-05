import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as _ from 'lodash';

export default function courseReducer(state = initialState.course, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return _.assign({}, state, {list: action.courses});

        case types.LOAD_COURSE_SUCCESS:
            return _.assign({}, state, {current: action.course});

        case types.CREATE_COURSE_SUCCESS:
            let result = _.assign({}, state, {list: [
                ...state.list,
                _.assign({}, action.course)
            ]});

            return result;

        case types.UPDATE_COURSE_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(course => course.id !== action.course.id),
                _.assign({}, action.course)
            ]});

        case types.DELETE_COURSE_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(course => course.id !== action.id)
            ]});

        default:
            return state;
    }
}