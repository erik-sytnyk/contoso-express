import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as _ from 'lodash';

export default function studentReducer(state = initialState.student, action) {
    switch (action.type) {
        case types.LOAD_STUDENTS_STATISTICS_SUCCESS:
            return _.assign({}, state, {statisticsList: action.statistics});

        case types.LOAD_STUDENTS_SUCCESS:
            return _.assign({}, state, {list: action.students});
        
        case types.COUNT_STUDENTS_SUCCCESS:
            return _.assign({}, state, {totalCount: action.count});

        case types.LOAD_STUDENT_SUCCESS:
            return _.assign({}, state, {current: action.student});

        case types.CREATE_STUDENT_SUCCESS:
            let result = _.assign({}, state, {list: [
                ...state.list,
                _.assign({}, action.student)
            ]});

            return result;

        case types.UPDATE_STUDENT_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(student => student.id !== action.student.id),
                _.assign({}, action.student)
            ]});

        case types.DELETE_STUDENT_SUCCESS:
            return _.assign({}, state, {list: [
                ...state.list.filter(student => student.id !== action.id)
            ]});
        
        default:
            return state;
    }
}