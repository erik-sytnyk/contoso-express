import { modal } from 'vue-strap';
const displayRow = require('../elements/displayRow.vue');
import dateFormatter from '../../formatters/dateFormatter';

export default{
    components: {modal, displayRow},
    props: {
        instructor: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        location() {
            let office = this.instructor.officeAssignment;
            return office ? office.location : 'No office';
        },
        hireDate() {
            return dateFormatter.date(this.instructor.hireDate);
        }
    },
    methods: {
        cancel() {
            this.show = false;
        }
    }
};