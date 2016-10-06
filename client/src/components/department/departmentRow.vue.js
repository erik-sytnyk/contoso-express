import personFormat from '../../formatters/personFormatter';
import currencyFormatter from '../../formatters/currencyFormatter';
import dateFormatter from '../../formatters/dateFormatter';

export default {
    props: {
        department: {
            type: Object
        },
        deleteDepartmentAction: {
            type: Function
        },
        departmentDetailsAction: {
            type: Function
        },
        editDepartmentAction: {
            type: Function
        }
    },
    computed: {
        fullName() {
            let instructor = this.department.instructor;
            return instructor ? personFormat.fullName(instructor.firstName, instructor.lastName) : '';
        },
        budgetDisplay() {
            return currencyFormatter.money(this.department.budget);
        },
        startDateDisplay() {
            return dateFormatter.date(this.department.startDate);
        }
    }, 
    methods: {
        deleteDepartment() {
            this.deleteDepartmentAction(this.department.id);
        },
        showDetails() {
            this.departmentDetailsAction(this.department.id);
        },
        showEdit() {
            this.editDepartmentAction(this.department.id);
        }
    }
};