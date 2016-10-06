import personFormat from '../../formatters/personFormatter';

export default {
    props: {
        enrollment: {
            type: Object
        }
    },
    computed: {
        fullName() {
            return this.enrollment ?
                personFormat.fullName(this.enrollment.student.firstName, this.enrollment.student.lastName) : '';
        },
        grade() {
            return this.enrollment.grade ? this.enrollment.grade : 'No grade';
        }
    }
};