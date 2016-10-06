<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">{{header}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <validator name="departmentValidation">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label for="department-name" class="col-xs-3 control-label">Name:</label>

                        <div class="col-xs-9">
                            <input type="text" id="department-name" class="form-control"
                                   v-model="department.name" v-validate:name="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$departmentValidation.name.required && formIsInvalid">Name is required.</div>

                    <div class="form-group">
                        <label for="department-budget" class="col-xs-3 control-label">Budget:</label>

                        <div class="col-xs-9">
                            <input id="department-budget" type="number" class="form-control"
                                   v-model="department.budget" v-validate:budget="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$departmentValidation.budget.required && formIsInvalid">Budget is required.</div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Start Date:</label>

                        <div class="col-xs-9">
                            <datepicker :value.sync="department.startDate" :disabled-days-of-Week="disabled" :format="dd/MM/yyyy"
                                        :show-reset-button="reset">
                            </datepicker>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Administrator:</label>

                        <div class="col-xs-9">
                            <select v-model="department.instructorId" class="form-control" v-validate:instructor="{required: true}">
                                <option v-for="instructor in allInstructors" :value="instructor.value">{{instructor.text}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$departmentValidation.instructor.required && formIsInvalid">Administrator is required.</div>
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
<script src="./departmentSave.vue.js"></script>