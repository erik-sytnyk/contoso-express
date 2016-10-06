<template>
    <table class="table">
        <thead>
            <tr>
                <th>Course Title</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            <tr is="student-enrollments-row" v-for="enrollment in enrollments" :enrollment="enrollment"></tr>
        </tbody>
    </table>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./studentEnrollmentsList.vue.js"></script>