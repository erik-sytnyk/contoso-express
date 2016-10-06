<template>
    <div v-if="show">
        <h3>Courses Taught by Selected Instructor</h3>

        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Department</th>
                </tr>
            </thead>
            <tbody>
                <tr is="instructor-course-row" v-for="course in courses" :course="course"
                    :select-course-action="selectCourseAction" :selected-course-id="selectedCourseId"></tr>
            </tbody>
        </table>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./instructorCoursesList.vue.js"></script>