import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import student from './studentReducer';
import department from './departmentReducer';
import instructor from './instructorReducer';
import course from './courseReducer';
import enrollment from './enrollmentReducer';
import user from './userReduces';

const rootReducer = combineReducers({
    student,
    department,
    instructor,
    course,
    enrollment,
    ajaxCallsInProgress,
    user
});

export default rootReducer;
