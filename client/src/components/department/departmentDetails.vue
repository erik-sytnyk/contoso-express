<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Department Details</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
                <display-row :label="'Name'" :value="department.name"></display-row>
                <display-row :label="'Budget'" :value="budgetDisplay"></display-row>
                <display-row :label="'Start Date'" :value="startDate"></display-row>
                <display-row :label="'Administrator'" :value="instructorName"></display-row>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./departmentDetails.vue.js"></script>