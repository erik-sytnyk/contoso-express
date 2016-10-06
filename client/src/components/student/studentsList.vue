<template>
    <table class="table" v-if="isAnyStudents">
        <thead>
            <tr>
                <th>
                    <a href="#" value="name" @click="changeSortOrder('name')">Last Name</a>
                </th>
                <th>First Name</th>
                <th>
                    <a href="#" value="date" @click="changeSortOrder('date')">Enrollment Date</a>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="student-row" v-for="student in students" :student="student"
                :delete-student-action="deleteStudentAction" :student-details-action="studentDetailsAction"
                :edit-student-action="editStudentAction"></tr>
        </tbody>
    </table>

    <div id="message" v-if="!isAnyStudents">{{infoMessage}}</div>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
    <student-details :student="student" :show.sync="showDetailsModal"></student-details>
    <student-save :student="student" :show.sync="showEditModal"></student-save>
</template>
<style lang="less" rel="stylesheet/less">
    #message {
        font-size: 16px;
        padding-top: 30px;
    }
</style>
<script src="./studentsList.vue.js"></script>