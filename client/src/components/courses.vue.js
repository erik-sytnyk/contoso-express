const coursesList = require('./course/coursesList.vue');
const courseSave = require('./course/courseSave.vue');
import {loadDepartments, changeSelectedDepartment, loadCourses, loadCourse} from '../vuex/actions';
import {departmentSelectListItem} from '../formatters/entityFromatter';

export default {
    components: {coursesList, courseSave},
    data () {
        return {
            selectedDepartment: '',
            showAddModal: false
        };
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list,
            course: ({courses}) => courses.course
        },
        actions: {
            loadDepartments,
            changeSelectedDepartment,
            loadCourses,
            loadCourse
        }
    },
    computed: {
        departmentsDisplay() {
            return departmentSelectListItem(this.departments);
        }
    },
    methods: {
        filter() {
            this.loadCourses();
        },
        showAdd() {
            this.loadCourse(null);
            this.showAddModal = true;
        }
    },
    created() {
        this.selectedDepartment = '';
        this.changeSelectedDepartment(this.selectedDepartment);
        this.loadDepartments();
    }
};