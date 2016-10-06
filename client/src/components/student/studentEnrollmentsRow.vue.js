export default {
    props: {
        enrollment: {
            type: Object
        }
    },
    computed: {
        grade() {
            return this.enrollment.grade ? this.enrollment.grade : 'No grade';
        }
    }
};