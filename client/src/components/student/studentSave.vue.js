import { modal, datepicker } from 'vue-strap';
import {saveStudent} from '../../vuex/actions';

export default{
    components: {modal, datepicker},
    props: {
        student: {
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
            return this.student.id ? 'Edit Student' : 'Create Student';
        }
    },
    vuex: {
        actions: {
            saveStudent
        }
    },
    methods: {
        cancel() {
            this.formIsInvalid = false;
            this.$resetValidation();
            this.show = false;
        },
        doAction() {
            if (this.$studentValidation.invalid) {
                this.formIsInvalid = true;
            } else {
                this.saveStudent(this.student);
                this.cancel();
            }
        }
    }
};