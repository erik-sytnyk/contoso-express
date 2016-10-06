import { modal } from 'vue-strap';
const displayRow = require('../elements/displayRow.vue');
import currencyFormatter from '../../formatters/currencyFormatter';
import dateFormatter from '../../formatters/dateFormatter';

export default{
    components: {modal, displayRow},
    props: {
        department: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        budgetDisplay() {
            return currencyFormatter.money(this.department.budget);
        },
        startDate() {
            return dateFormatter.date(this.department.startDate);
        },
        instructorName() {
            let instructor = this.department.instructor;
            return instructor ? `${instructor.lastName}, ${instructor.firstName}` : '';
        }
    },
    methods: {
        cancel() {
            this.show = false;
        }
    }
};