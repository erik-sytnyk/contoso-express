<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Course Details</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <div class="form-horizontal">
                <display-row :label="'Department'" :value="departmentName"></display-row>
                <display-row :label="'Number'" :value="courseNumber"></display-row>
                <display-row :label="'Title'" :value="course.title"></display-row>
                <display-row :label="'Credits'" :value="courseCredits"></display-row>

            </div>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./courseDetails.vue.js"></script>