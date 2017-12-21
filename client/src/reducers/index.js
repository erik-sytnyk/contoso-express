import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import student from './studentReducer';
import department from './departmentReducer';
import instructor from './instructorReducer';
import course from './courseReducer';
import enrollment from './enrollmentReducer';

const rootReducer = combineReducers({
  student,
  department,
  instructor,
  course,
  enrollment,
  ajaxCallsInProgress
});

export default rootReducer;
