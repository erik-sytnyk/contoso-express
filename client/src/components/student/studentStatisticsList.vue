<template>
    <table class="table">
        <thead>
            <tr>
                <th>Enrollment Date</th>
                <th>Students</th>
            </tr>
        </thead>
        <tbody>
            <tr is="student-statistics-row" v-for="row in statistics" :statistic-row="row"></tr>
        </tbody>
    </table>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script src='./studentStatisticsList.vue.js'></script>