const instructorStudentsRow = require('./instructorStudentRow.vue');

export default {
    components: {instructorStudentsRow},
    props: {
        selectedCourseId: {
            type: Number
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    vuex: {
        getters: {
            enrollments: ({enrollments}) => enrollments.list  
        }
    }
};