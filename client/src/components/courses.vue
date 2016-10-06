<template>
    <div class="container">
        <h2>Courses</h2>
        <a href="#" @click="showAdd">Create New</a>

        <div id="filter-div">
            Select Department:

            <select v-model="selectedDepartment" v-on:change="changeSelectedDepartment(selectedDepartment)">
                <option value="">All</option>
                <option v-for="department in departmentsDisplay" :value="department.value">{{department.text}}</option>
            </select>

            <input type="submit" value="Filter" @click="filter"/>
        </div>

        <courses-list></courses-list>

        <course-save :course="course" :show.sync="showAddModal"></course-save>
    </div >
</template>
<style lang="less" rel="stylesheet/less">
    #filter-div {
        margin-top: 10px;
        select {
            margin-left: 10px;
            margin-right: 10px;
        }
    }
</style>
<script src="./courses.vue.js"></script>