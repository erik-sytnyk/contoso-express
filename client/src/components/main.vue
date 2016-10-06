<template>
    <div id="wrapper">
        <navigation></navigation>

        <!--TODO proper margin-top style-->
        <div id="main" style="margin-top: 50px">
            <router-view></router-view>
        </div>

        <div class="container">
            <hr/>

            <p>&copy; {{date}} - Contoso University</p>
        </div>
    </div>
</template>
<style>
</style>
<script src="./main.vue.js">
</script>