const studentEnrollmentsRow = require('./studentEnrollmentsRow.vue');

export default {
    components: {studentEnrollmentsRow},
    props: {
        enrollments: {
            type: Array
        }
    }
};