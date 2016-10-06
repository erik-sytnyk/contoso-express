<template>
    <table class="table">
        <thead>
            <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Department</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="course-row" v-for="course in courses" :course="course"
                :delete-course-action="deleteCourseAction" :course-details-action="courseDetailsAction"
                :edit-course-action="editCourseAction"></tr>
        </tbody>
    </table>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
    <course-details :course="course" :show.sync="showDetailsModal"></course-details>
    <course-save :course="course" :show.sync="showEditModal"></course-save>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./coursesList.vue.js"></script>