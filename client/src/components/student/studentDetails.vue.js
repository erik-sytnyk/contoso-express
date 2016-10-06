import { modal } from 'vue-strap';
const displayRow = require('../elements/displayRow.vue');
const studentEnrollmentsList = require('./studentEnrollmentsList.vue');
import dateFormatter from '../../formatters/dateFormatter';
import _ from 'lodash';

export default{
    components: {modal, displayRow, studentEnrollmentsList},
    props: {
        student: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        enrollmentDate() {
            return dateFormatter.date(this.student.enrollmentDate);
        },
        enrollments() {
            return (this.student && this.student.enrollments) ? this.student.enrollments : [];
        },
        isAnyEnrollments() {
            return _.isEmpty(this.enrollments) ? false : true;
        }
    },
    methods: {
        cancel() {
            this.show = false;
        }
    }
};