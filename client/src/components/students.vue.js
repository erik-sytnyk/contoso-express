const studentsList = require('./student/studentsList.vue');
const studentSave = require('./student/studentSave.vue');
const vuePagination = require('./elements/vuePagination.vue');
import { loadStudent, loadStudents, changePage, searchStudents } from '../vuex/actions';
import _ from 'lodash';

export default {
    components: {studentsList, studentSave, vuePagination},
    data() {
        return {
            showAddModal: false,
            searchString: ''
        };
    },
    vuex: {
        getters: {
            student: ({students}) => students.student,
            students: ({students}) => students.list,
            totalCount: ({students}) => students.totalCount,
            pageSize: ({students}) => students.pageSize,
            pageNumber: ({students}) => students.pageNumber,
            sortOrder: ({students}) => students.sortOrder
        },
        actions: {
            loadStudent,
            loadStudents,
            changePage,
            searchStudents
        }
    },
    computed: {
        isAnyStudents() {
            return _.isEmpty(this.students) ? false : true;
        },
        numberOfPages() {
            return Math.ceil(this.totalCount / this.pageSize);
        }
    },
    methods: {
        showAdd() {
            this.loadStudent(null);
            this.showAddModal = true;
        },
        pageSelect(eventKey) {
            this.changePage(eventKey);
        },
        search() {
            this.searchStudents(this.searchString);
        }
    },
    watch: {
        pageNumber() {
            this.loadStudents();
        },
        numberOfPages() {
            if (this.numberOfPages < this.pageNumber && this.pageNumber > 1) {
                this.changePage(this.pageNumber - 1);
            }
        }
    }
};