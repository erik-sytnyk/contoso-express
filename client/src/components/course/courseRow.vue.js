export default {
    props: {
        course: {
            type: Object
        },        
        deleteCourseAction: {
            type: Function
        },
        courseDetailsAction: {
            type: Function
        },
        editCourseAction: {
            type: Function
        }
    },
    methods: {
        deleteCourse() {
            this.deleteCourseAction(this.course.id);
        },
        showDetails() {
            this.courseDetailsAction(this.course.id);
        },
        showEdit() {
            this.editCourseAction(this.course.id);
        }
    }
};