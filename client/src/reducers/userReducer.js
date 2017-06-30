import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOAD_CURRENT_USER_SUCCESS:
            return _.assign({}, state, {current: action.user});

        default:
            return state;
    }
}