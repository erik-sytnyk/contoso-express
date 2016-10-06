<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">{{header}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <validator name="instructorValidation">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label for="last-name" class="col-xs-3 control-label">Last Name:</label>

                        <div class="col-xs-9">
                            <input type="text" id="last-name" class="form-control"
                                   v-model="instructor.lastName" v-validate:last="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$instructorValidation.last.required && formIsInvalid">Last name is required.</div>

                    <div class="form-group">
                        <label for="first-name" class="col-xs-3 control-label">First Name:</label>

                        <div class="col-xs-9">
                            <input type="text" id="first-name" class="form-control"
                                   v-model="instructor.firstName" v-validate:first="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$instructorValidation.first.required && formIsInvalid">First name is required.</div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Hire Date:</label>

                        <div class="col-xs-9">
                            <datepicker :value.sync="instructor.hireDate" :disabled-days-of-Week="disabled" :format="dd/MM/yyyy"
                                        :show-reset-button="reset">
                            </datepicker>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="office-location" class="col-xs-3 control-label">Office Location:</label>

                        <div class="col-xs-9">
                            <input type="text" id="office-location" class="form-control"
                                   v-model="instructor.officeAssignment.location" />
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-4" v-for="course in allCourses">
                            <input type="checkbox" :name="course.value" :value="course.value" v-model="selectedCourses" />

                            <label :for="course.value">{{course.text}}</label>
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
<script src="./instructorSave.vue.js"></script>