<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Student Details</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
                <display-row :label="'Last Name'" :value="student.lastName"></display-row>
                <display-row :label="'First Name'" :value="student.firstName"></display-row>
                <display-row :label="'Enrollment Date'" :value="enrollmentDate"></display-row>

                <div class="form-group" v-if="isAnyEnrollments">
                    <label class="col-xs-3 form-label">Enrollments:</label>
                    <div class="col-xs-9">
                        <student-enrollments-list :enrollments="enrollments"></student-enrollments-list>
                    </div>
                </div>
            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./studentDetails.vue.js"></script>