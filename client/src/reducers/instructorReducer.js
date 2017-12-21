import * as types from '../actions/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

export default function instructorReducer(state = initialState.instructor, action) {
  switch (action.type) {
    case types.LOAD_INSTRUCTORS_SUCCESS:
      return _.assign({}, state, {list: action.instructors});

    case types.LOAD_INSTRUCTOR_SUCCESS:
      return _.assign({}, state, {current: action.instructor});

    case types.CREATE_INSTRUCTOR_SUCCESS:
      let result = _.assign({}, state, {
        list: [...state.list, _.assign({}, action.instructor)]
      });

      return result;

    case types.UPDATE_INSTRUCTOR_SUCCESS:
      return _.assign({}, state, {
        list: [
          ...state.list.filter(instructor => instructor.id !== action.instructor.id),
          _.assign({}, action.instructor)
        ]
      });

    case types.DELETE_INSTRUCTOR_SUCCESS:
      return _.assign({}, state, {
        list: [...state.list.filter(instructor => instructor.id !== action.id)]
      });

    default:
      return state;
  }
}
