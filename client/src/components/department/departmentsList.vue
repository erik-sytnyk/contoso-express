<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Start Date</th>
                <th>Administrator</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="department-row" v-for="department in departments" :department="department"
                :delete-department-action="deleteDepartmentAction" :department-details-action="departmentDetailsAction"
                :edit-department-action="editDepartmentAction"></tr>
        </tbody>
    </table>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
    <department-details :department="department" :show.sync="showDetailsModal"></department-details>
    <department-save :department="department" :show.sync="showEditModal"></department-save>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./departmentsList.vue.js"></script>