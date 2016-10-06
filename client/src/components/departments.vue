<template>
    <div class="container">
        <h2>Departments</h2>
        <a href="#" @click="showAdd">Create New</a>

        <departments-list></departments-list>

        <department-save :department="department" :show.sync="showAddModal"></department-save>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./departments.vue.js"></script>