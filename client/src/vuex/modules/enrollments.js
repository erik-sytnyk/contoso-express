import {
    LOAD_ENROLLMENTS
} from '../mutationTypes';

// initial state
const state = {
    list: []
};

// mutations
const mutations = {
    [LOAD_ENROLLMENTS] (state, enrollments) {
        state.list = enrollments;
    },
};

export default {
    state,
    mutations
};