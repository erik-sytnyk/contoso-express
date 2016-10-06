const instructorRow = require('./instructorRow.vue');
const instructorCoursesList = require('./instructorCoursesList.vue');
const instructorStudentsList = require('./instructorStudentsList.vue');
import {loadInstructor, loadEnrollments, deleteInstructor} from '../../vuex/actions';
const simpleConfirm = require('./../elements/simpleConfirm.vue');
const instructorDetails = require('./instructorDetails.vue');
const instructorSave = require('./instructorSave.vue');

export default {
    components: {instructorRow, instructorCoursesList, instructorStudentsList, simpleConfirm, instructorDetails, instructorSave},
    data() {
        return {
            selectedInstructorId: 0,
            selectInstructorVisible: false,
            selectedCourseId: 0,
            selectCourseVisible: false,
            showConfirm: false,
            confirmAction: null,
            showDetailsModal: false,
            showEditModal: false
        };
    },
    vuex: {
        getters: {
            instructors: ({instructors}) => instructors.list,
            instructor: ({instructors}) => instructors.instructor
        },
        actions: {
            loadInstructor,
            loadEnrollments,
            deleteInstructor
        }
    },
    methods: {
        selectInstructorAction(instructorId) {
            this.loadInstructor(instructorId);
            this.selectedInstructorId = instructorId;
            this.selectInstructorVisible = true;
            this.selectCourseVisible = false;
        },
        selectCourseAction(courseId) {
            this.loadEnrollments(courseId);
            this.selectedCourseId = courseId;
            this.selectCourseVisible = true;
        },
        deleteInstructorAction(instructorId) {
            this.showConfirm = true;

            this.confirmAction = () => {
                this.deleteInstructor(instructorId);
            };
        },
        instructorDetailsAction(instructorId) {
            this.loadInstructor(instructorId);
            this.showDetailsModal = true;
        },
        editInstructorAction(instructorId) {
            this.loadInstructor(instructorId);
            this.showEditModal = true;
        }
    }
};