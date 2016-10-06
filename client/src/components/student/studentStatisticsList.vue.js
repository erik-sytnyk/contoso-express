import { loadStudentsStatistics } from '../../vuex/actions';
const studentStatisticsRow = require('../student/studentStatisticsRow.vue');

export default {
    components: {studentStatisticsRow},
    vuex: {
        getters: {
            statistics: ({ students }) => students.statisticsList
        },
        actions: {
            loadStudentsStatistics
        }
    },
    created() {
        this.loadStudentsStatistics();
    }
};