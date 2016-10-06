import {
    LOAD_DEPARTMENTS,
    LOAD_DEPARTMENT
} from '../mutationTypes';

// initial state
const state = {
    list: [],
    department: {
        startDate: null
    }
};

// mutations
const mutations = {
    [LOAD_DEPARTMENTS] (state, departments) {
        state.list = departments;
    },
    [LOAD_DEPARTMENT] (state, department) {
        state.department = department;
    }
};

export default {
    state,
    mutations
};