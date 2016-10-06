import Vue from 'vue';
import Vuex from 'vuex';
import students from './modules/students';
import courses from './modules/courses';
import departments from './modules/departments';
import instructors from './modules/instructors';
import enrollments from './modules/enrollments';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        students,
        courses,
        departments,
        instructors,
        enrollments
    }
});