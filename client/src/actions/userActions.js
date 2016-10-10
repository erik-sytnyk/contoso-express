import * as types from './actionTypes';
import userService from '../services/userService';

export function loadUserSuccess(user) {
    return {type: types.LOAD_USER, user};
}

export function loadUser() {
    return dispatch => {
        return userService.getUser()
            .then(user => {
                dispatch(loadUserSuccess(user));
            }).catch(error => {
                throw(error);
            });
    };
}