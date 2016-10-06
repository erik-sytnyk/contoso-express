import dateFormatter from '../../formatters/dateFormatter';

export default {
    props: {
        statisticRow: {
            type: Object
        }
    },
    computed: {
        enrollmentDateDisplay() {
            return dateFormatter.date(this.statisticRow['enrollment_date']);
        }
    }
};