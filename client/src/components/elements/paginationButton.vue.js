export default{
    props: {
        eventKey: {
            type: [Number, String]
        },
        pageSelect: {
            type: Function
        },
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) return;

            if (this.pageSelect) {
                this.pageSelect(this.eventKey);
            }
        }
    }
};