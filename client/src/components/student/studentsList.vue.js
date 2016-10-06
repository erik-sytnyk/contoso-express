import { loadStudents, deleteStudent, loadStudent, changeSortOrder } from '../../vuex/actions';
const studentRow = require('./studentRow.vue');
const simpleConfirm = require('./../elements/simpleConfirm.vue');
const studentDetails = require('./studentDetails.vue');
const studentSave = require('./studentSave.vue');
import _ from 'lodash';

export default {
    components: {studentRow, simpleConfirm, studentDetails, studentSave},
    data () {
        return {
            showConfirm: false,
            confirmAction: null,
            showDetailsModal: false,
            showEditModal: false
        };
    },
    vuex: {
        getters: {
            students: ({students}) => students.list,
            student: ({students}) => students.student,
            totalCount: ({students}) => students.totalCount,
            sortOrder: ({students}) => students.sortOrder
        },
        actions: {
            loadStudents,
            deleteStudent,
            loadStudent,
            changeSortOrder
        }
    },
    computed: {
        isAnyStudents() {
            return _.isEmpty(this.students) ? false : true;
        },
        infoMessage() {
            return this.totalCount > 0 ? 'Sorry, Nothing was Found.' : 'There is no students.';
        }
    },
    created() {
        this.loadStudents('', '', 1, 3);
    },
    methods: {
        deleteStudentAction(studentId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteStudent(studentId);
            };
        },
        studentDetailsAction(studentId) {
            this.loadStudent(studentId);
            this.showDetailsModal = true;
        },
        editStudentAction(studentId) {
            this.loadStudent(studentId);
            this.showEditModal = true;
        }
    }
};