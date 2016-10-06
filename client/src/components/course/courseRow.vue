<template>
    <tr>
        <td>{{course.number}}</td>
        <td>{{course.title}}</td>
        <td>{{course.credits}}</td>
        <td>{{course.department.name}}</td>
        <td class="tools">
            <a href="#" @click="showEdit"><i class="fa fa-pencil fa-lg"></i></a>

            <a href="#" @click="showDetails"><i class="fa fa-info fa-lg"></i></a>

            <a href="#" @click="deleteCourse"><i class="fa fa-trash-o fa-lg"></i></a>
        </td>
    </tr>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./courseRow.vue.js"></script>