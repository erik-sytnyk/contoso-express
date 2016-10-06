<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">{{header}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <validator name="studentValidation">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label for="last-name" class="col-xs-3 control-label">Last Name:</label>

                        <div class="col-xs-9">
                            <input type="text" id="last-name" class="form-control"
                                   v-model="student.lastName" v-validate:last="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$studentValidation.last.required && formIsInvalid">Last name is required.</div>

                    <div class="form-group">
                        <label for="first-name" class="col-xs-3 control-label">First Name:</label>

                        <div class="col-xs-9">
                            <input id="first-name" type="text" class="form-control"
                                   v-model="student.firstName" v-validate:first="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$studentValidation.first.required && formIsInvalid">First name is required.</div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Enrollment Date:</label>

                        <div class="col-xs-9">
                            <datepicker :value.sync="student.enrollmentDate" :disabled-days-of-Week="disabled" :format="dd/MM/yyyy"
                                        :show-reset-button="reset">
                            </datepicker>
                        </div>
                    </div>
                </div>
            </validator>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="doAction" class="btn btn-default">Save</button>
            <button type="button" @click="cancel" class="btn btn-default">Close</button>
        </div>
    </modal>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src="./studentSave.vue.js"></script>