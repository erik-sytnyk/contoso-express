import {loadDepartments, deleteDepartment, loadDepartment} from '../../vuex/actions';
const departmentRow = require('./departmentRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');
const departmentDetails = require('./departmentDetails.vue');
const departmentSave = require('./departmentSave.vue');

export default {
    components: {departmentRow, simpleConfirm, departmentDetails, departmentSave},
    data() {
        return {
            showConfirm: false,
            confirmAction: null,
            showDetailsModal: false,
            showEditModal: false
        };
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list,
            department: ({departments}) => departments.department
        },
        actions: {
            loadDepartments,
            deleteDepartment,
            loadDepartment
        }
    },
    created() {
        this.loadDepartments();
    },
    methods: {
        deleteDepartmentAction(departmentId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteDepartment(departmentId);
            };
        },
        departmentDetailsAction(departmentId) {
            this.loadDepartment(departmentId);
            this.showDetailsModal = true;
        },
        editDepartmentAction(departmentId) {
            this.loadDepartment(departmentId);
            this.showEditModal = true;
        }
    }
};