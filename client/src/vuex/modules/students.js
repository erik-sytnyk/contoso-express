import {
    LOAD_STUDENTS_STATISTICS,
    LOAD_STUDENTS,
    COUNT_STUDENTS,
    LOAD_STUDENT,
    CHANGE_PAGE,
    SEARCH_STUDENTS,
    CHANGE_SORT_ORDER
} from '../mutationTypes';


const PAGE_SIZES = [3, 5, 10];

// initial state
const state = {
    list: [],
    student: {
        enrollmentDate: null
    },
    statisticsList: [],
    totalCount: 0,
    pageSizes: PAGE_SIZES,
    pageSize: PAGE_SIZES[0],
    pageNumber: 1,
    search: '',
    sortOrder: 'name'
};

// mutations
const mutations = {
    [LOAD_STUDENTS_STATISTICS] (state, statistics) {
        state.statisticsList = statistics;
    },
    [LOAD_STUDENTS] (state, students) {
        state.list = students;
    },
    [COUNT_STUDENTS] (state, count) {
        state.totalCount = count;
    },
    [LOAD_STUDENT] (state, student) {
        state.student = student;
    },
    [CHANGE_PAGE] (state, newPageNumber) {
        state.pageNumber = newPageNumber;
    },
    [SEARCH_STUDENTS] (state, searchString) {
        state.search = searchString;
    },
    [CHANGE_SORT_ORDER] (state, sortOrder) {
        switch (sortOrder) {
            case 'name':
                state.sortOrder = state.sortOrder === 'name' ? 'name_desc' : 'name';
                break;
            case 'date':
                state.sortOrder = state.sortOrder === 'date' ? 'date_desc' : 'date';
                break;
        }
    }
};

export default {
    state,
    mutations
};