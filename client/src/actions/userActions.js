import toastr from 'toastr';

import * as types from './actionTypes';
import authService from '../services/authService';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadCurrentUserSuccess(user) {
    return {type: types.LOAD_CURRENT_USER_SUCCESS, user};
}

export function getCurrentUser() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.getCurrentUser()
            .then(user => {
                dispatch(loadCurrentUserSuccess(user));
            }).catch(error => {
                throw(error);
            });
    };
}

export function loginUser(user) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.login(user)
            .then(user => {
                dispatch(loadCurrentUserSuccess(user));
            }).catch(error => {
                throw(error);
            });
    }
}

export function logOut() {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.logOut()
            .then(() => {
                dispatch(loadCurrentUserSuccess(null));
            }).catch(error => {
                throw(error);
            });
    }
}

export function forgotPassword(email) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.passwordForgot(email)
            .then((data) => {
                if (data && data.message) toastr.success(data.message);
            })
            .catch(error => {
                throw(error);
            });
    }
}

export function resetPassword(userData) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.resetPassword(userData)
            .then((data) => {
                return data;
            })
            .catch(error => {
                throw(error);
            });
    }
}

export function activateUserAccount(token) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.activateAccount(token)
            .then((data) => {
                return data;
            })
            .catch(error => {
                throw(error);
            });
    }
}

export function signUp(user) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.signUp(user)
            .then((data) => {
                return data;
            })
            .catch(error => {
                throw(error);
            });
    }
}

export function checkResetToken(token) {
    return dispatch => {
        dispatch(beginAjaxCall());

        return authService.resetPasswordTokenCheck(token)
            .then((data) => {
                return data;
            })
            .catch(error => {
                throw(error);
            });
    }
}