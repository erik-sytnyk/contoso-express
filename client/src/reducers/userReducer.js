import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function userReducer(state = initialState.user, action) {
    if (action.type === types.LOAD_USER) {
        return _.assign({}, state, action.user);
    }
    
    return state;
}