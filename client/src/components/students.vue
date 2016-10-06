<template>
    <div class="container">
        <h2>Students</h2>
        <a href="#" @click="showAdd">Create New</a>

        <div id="search-div">
            Find by name:
            <input type="text" v-model="searchString" @keyup.enter="search" />

            <input type="submit" value="Search" @click="search" />
        </div>

        <students-list></students-list>

        <br/>
        <div v-if="isAnyStudents">
            <div >Page {{pageNumber}} of {{numberOfPages}}</div>

            <vue-pagination :items="numberOfPages" :max-buttons="8" :ellipsis="true" bs-size="md"
                            :first="true" :prev="true" :next="true" :last="true" :boundary-links="true"
                            :page-select="pageSelect" :active-page="pageNumber"></vue-pagination>
        </div>

        <student-save :student="student" :show.sync="showAddModal"></student-save>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
    #search-div {
        margin-top: 10px;
        input:first-child {
            margin-left: 10px;
            margin-right: 10px;
        }
    }
</style>
<script src="./students.vue.js"></script>