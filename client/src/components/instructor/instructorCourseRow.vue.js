export default {
    props: {
        course: {
            type: Object
        },
        selectedCourseId: {
            type: Number
        },
        selectCourseAction: {
            type: Function
        }
    },
    computed: {
        active() {
            return this.selectedCourseId === this.course.id ? true : false;
        }  
    },
    methods: {
        selectCourse() {
            this.selectCourseAction(this.course.id);
        }
    }
};