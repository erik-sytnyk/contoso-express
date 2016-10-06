import dateFormatter from '../../formatters/dateFormatter';

export default {
    props: {
        instructor: {
            type: Object
        },
        selectedInstructorId: {
            type: Number
        },
        selectInstructorAction: {
            type: Function
        },
        deleteInstructorAction: {
            type: Function
        },
        instructorDetailsAction: {
            type: Function
        },
        editInstructorAction: {
            type: Function
        }
    },
    computed: {
        office() {
            return this.instructor.officeAssignment ? this.instructor.officeAssignment.location : '';
        },
        hireDateDisplay() {
            return dateFormatter.date(this.instructor.hireDate);   
        },
        active() {
            return this.selectedInstructorId === this.instructor.id ? true : false;
        }
    },
    methods: {
        selectInstructor() {
            this.selectInstructorAction(this.instructor.id);
        },
        deleteInstructor() {
            this.deleteInstructorAction(this.instructor.id);
        },
        showDetails() {
            this.instructorDetailsAction(this.instructor.id);
        },
        showEdit() {
            this.editInstructorAction(this.instructor.id);
        }
    }
};