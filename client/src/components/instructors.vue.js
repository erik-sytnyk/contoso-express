const instructorsList = require('./instructor/instructorsList.vue');
import {loadInstructors, loadInstructor} from '../vuex/actions';
const instructorSave = require('./instructor/instructorSave.vue');

export default {
    components: {instructorsList, instructorSave},
    data() {
        return {
            showAddModal: false  
        };
    },
    vuex: {
        getters: {
            instructors: ({instructors}) => instructors.list,
            instructor: ({instructors}) => instructors.instructor
        },
        actions: {
            loadInstructors,
            loadInstructor
        }
    },
    created() {
        this.loadInstructors();
    },
    methods: {
        showAdd() {
            this.loadInstructor(null);
            this.showAddModal = true;
        }
    }
};