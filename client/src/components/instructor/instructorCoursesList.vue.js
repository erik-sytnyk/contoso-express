const instructorCourseRow = require('./instructorCourseRow.vue');

export default {
    components: {instructorCourseRow},
    props: {
        instructor: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        },
        selectCourseAction: {
            type: Function
        },
        selectedCourseId: {
            type: Number
        }
    },
    computed: {
        courses() {
            return (this.instructor && this.instructor.courses) ? this.instructor.courses : [];
        }
    }
};