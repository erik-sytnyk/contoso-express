import { modal } from 'vue-strap';
import {departmentSelectListItem} from '../../formatters/entityFromatter';
import {saveCourse} from '../../vuex/actions';

export default {
    components: {modal},
    props: {
        course: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formIsInvalid: false
        };
    },
    computed: {
        header() {
            return this.course.id ? 'Edit Course' : 'Create Course';
        },
        departmentsDisplay() {
            return departmentSelectListItem(this.departments);
        }
    },
    vuex: {
        getters: {
            departments: ({departments}) => departments.list,
        },
        actions: {
            saveCourse
        }
    },
    methods: {
        cancel() {
            this.formIsInvalid = false;
            this.$resetValidation();
            this.show = false;
        },
        doAction() {
            if (this.$courseValidation.invalid) {
                this.formIsInvalid = true;
            } else {
                this.saveCourse(this.course);
                this.cancel();
            }
        }
    }  
};