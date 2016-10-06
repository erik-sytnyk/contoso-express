<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">{{header}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <validator name="courseValidation">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label for="course-number" class="col-xs-3 control-label">Number:</label>

                        <div class="col-xs-9">
                            <input type="number" id="course-number" class="form-control"
                                   v-model="course.number" v-validate:number="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$courseValidation.number.required && formIsInvalid">Number is required.</div>

                    <div class="form-group">
                        <label for="course-title" class="col-xs-3 control-label">Title:</label>

                        <div class="col-xs-9">
                            <input id="course-title" type="text" class="form-control"
                                   v-model="course.title" v-validate:title="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$courseValidation.title.required && formIsInvalid">Title is required.</div>

                    <div class="form-group">
                        <label for="course-credits" class="col-xs-3 control-label">Credits:</label>

                        <div class="col-xs-9">
                            <input type="number" id="course-credits" class="form-control"
                                   v-model="course.credits" v-validate:credits="{required: true}" />
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$courseValidation.credits.required && formIsInvalid">Credits is required.</div>

                    <div class="form-group">
                        <label class="col-xs-3 control-label">Department:</label>

                        <div class="col-xs-9">
                            <select v-model="course.departmentId" class="form-control" v-validate:department="{required: true}">
                                <option v-for="department in departmentsDisplay" :value="department.value">{{department.text}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xs-offset-3 col-xs-9 alert alert-danger"
                         v-if="$courseValidation.department.required && formIsInvalid">Department is required.</div>
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
<script src="./courseSave.vue.js"></script>