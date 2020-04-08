<template>
        <component :is="block.component" :style="block.style">
            {{block.text}}
            <dynamic-template :block="childBlock" v-for="(childBlock, index) in block.children" :key="index" ></dynamic-template>
        </component>
</template>

<script lang="ts">
import Vue from 'vue'
import DynamicTemplate from "./DynamicTemplate.vue"
// @ts-ignore
export default Vue.extend({
    name: 'dynamic-template',
    components: {
        DynamicTemplate
    },
    props: ['block'],
})
</script>