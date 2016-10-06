const navigation = require('./navigation.vue');
import dateFormatter from '../formatters/dateFormatter';

export default {
    components: {navigation},
    computed: {
        date() {
            return dateFormatter.currentYear();
        }
    }
};