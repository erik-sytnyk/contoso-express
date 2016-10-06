<template>
    <modal :show.sync="show">
        <div slot="modal-header" class="modal-header">
            <h4 class="modal-title">Confirmation</h4>
        </div>
        <div slot="modal-body" class="modal-body">
            <h3>Are you sure?</h3>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" @click="doAction" class="btn btn-danger">Ok</button>
            <button type="button" @click="cancel" class="btn btn-default">Cancel</button>
        </div>
    </modal>
</template>
<style>
</style>
<script src="./simpleConfirm.vue.js"></script>