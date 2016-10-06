<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Instructor Details</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
                <display-row :label="'Office Location'" :value="location"></display-row>
                <display-row :label="'Last Name'" :value="instructor.lastName"></display-row>
                <display-row :label="'First Name'" :value="instructor.firstName"></display-row>
                <display-row :label="'Hire Date'" :value="hireDate"></display-row>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./instructorDetails.vue.js"></script>