import {modal} from 'vue-strap';
import uiHelper from '../../helpers/uiHelper';

export default {
    props: {
        confirmAction: {
            type: Function
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    components: {modal},
    methods: {
        doAction() {
            this.confirmAction();
            this.closeConfirm();
        },
        cancel() {
            this.closeConfirm();
        },
        closeConfirm() {
            this.show = false;
            this.confirmAction = null;
        },
        checkKey(e) {
            if (e.code === 'Enter' && e.ctrlKey) {
                this.doAction();
            }
            if (e.code === 'Escape') {
                this.cancel();
            }
        }
    },
    watch: {
        show() {
            this.show ? uiHelper.registerKeyListener(this.checkKey) : uiHelper.unRegisterKeyListener();
        }
    }
};