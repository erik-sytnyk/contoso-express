import {
    LOAD_COURSES,
    CHANGE_SELECTED_DEPARTMENT,
LOAD_COURSE
} from '../mutationTypes';

// initial state
const state = {
    list: [],
    course: {},
    departmentId: ''
};

// mutations
const mutations = {
    [LOAD_COURSES] (state, courses) {
        state.list = courses;
    },
    [CHANGE_SELECTED_DEPARTMENT] (state, departmentId) {
        state.departmentId = departmentId;
    },
    [LOAD_COURSE] (state, course) {
        state.course = course;
    }
};

export default {
    state,
    mutations
};