<template>
    <tr>
        <td>{{student.lastName}}</td>
        <td>{{student.firstName}}</td>
        <td>{{enrollmentDateDisplay}}</td>
        <td class="tools">
            <a href="#" @click="showEdit"><i class="fa fa-pencil fa-lg"></i></a>

            <a href="#" @click="showDetails"><i class="fa fa-info fa-lg"></i></a>

            <a href="#" @click="deleteStudent"><i class="fa fa-trash-o fa-lg"></i></a>
        </td>
    </tr>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./studentRow.vue.js"></script>