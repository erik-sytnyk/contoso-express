import { modal } from 'vue-strap';
const displayRow = require('../elements/displayRow.vue');

export default{
    components: {modal, displayRow},
    props: {
        course: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        departmentName() {
            let department = this.course.department;
            return department ? department.name : '';
        },
        courseNumber() {
            return this.course.number ? this.course.number.toString() : '';
        },
        courseCredits () {
            return this.course.credits ? this.course.credits.toString() : '';
        }
    },
    methods: {
        cancel() {
            this.show = false;
        }
    }
};