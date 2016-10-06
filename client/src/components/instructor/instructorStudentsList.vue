<template>
    <div v-if="show">
        <h3>Students Enrolled in Selected Course</h3>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                <tr is="instructor-students-row" v-for="enrollment in enrollments" :enrollment="enrollment"></tr>
            </tbody>
        </table>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./instructorStudentsList.vue.js"></script>