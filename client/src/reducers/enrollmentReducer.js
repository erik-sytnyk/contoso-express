import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function enrollmentReducer(state = initialState.enrollment, action) {
    switch (action.type) {
        case types.LOAD_ENROLLMENTS_SUCCESS:
            return _.assign({}, state, {list: action.enrollments});

        default:
            return state;
    }
}