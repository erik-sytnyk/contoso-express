const departmentsList = require('./department/departmentsList.vue');
const departmentSave = require('./department/departmentSave.vue');
import {loadDepartment} from '../vuex/actions';

export default {
    components: {departmentsList, departmentSave},
    data() {
        return {
            showAddModal: false
        };
    },
    vuex: {
        getters: {
            department: ({departments}) => departments.department
        },
        actions: {
            loadDepartment
        }
    },
    methods: {
        showAdd() {
            this.loadDepartment(null);
            this.showAddModal = true;
        }
    }
};