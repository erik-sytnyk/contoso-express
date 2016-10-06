<template>
    <li :class="{'active': active, 'disabled': disabled}">
        <a role="button" href="" @click.prevent="handleClick">
            <slot></slot>
        </a>
    </li>
</template>
<style>
</style>
<script src="./paginationButton.vue.js"></script>