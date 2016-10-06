<template>
    <tr :class="{'success': active}">
        <td class="tools">
            <a href="#" @click="selectCourse"><i class="fa fa-hand-o-up fa-lg"></i></a>
        </td>
        <td>{{course.number}}</td>
        <td>{{course.title}}</td>
        <td>{{course.department.name}}</td>
    </tr>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./instructorCourseRow.vue.js"></script>