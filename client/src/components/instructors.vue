<template>
    <div class="container">
        <h2>Instructors</h2>
        <a href="#" @click="showAdd">Create New</a>

        <instructors-list></instructors-list>

        <instructor-save :instructor="instructor" :show.sync="showAddModal"></instructor-save>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./instructors.vue.js"></script>