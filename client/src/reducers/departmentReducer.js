import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function departmentReducer(state = initialState.department, action) {
  switch (action.type) {
    case types.LOAD_DEPARTMENTS_SUCCESS:
      return _.assign({}, state, {list: action.departments});

    case types.LOAD_DEPARTMENT_SUCCESS:
      return _.assign({}, state, {current: action.department});

    case types.CREATE_DEPARTMENT_SUCCESS:
      let result = _.assign({}, state, {
        list: [...state.list, _.assign({}, action.department)]
      });

      return result;

    case types.UPDATE_DEPARTMENT_SUCCESS:
      return _.assign({}, state, {
        list: [
          ...state.list.filter(department => department.id !== action.department.id),
          _.assign({}, action.department)
        ]
      });

    case types.DELETE_DEPARTMENT_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list.filter(department => department.id !== action.id)]
      });

    default:
      return state;
  }
}
