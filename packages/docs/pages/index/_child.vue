<template>
    <dynamic-template :block="config">
    </dynamic-template>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import DynamicTemplate from '../../components/dynamic-template/DynamicTemplate.vue'
import configs from '../../dynamic-configs'
export default Vue.extend({
    components: {
        DynamicTemplate
    },
    computed: { 
        config() {
            return configs[this.$route.path]
        },
    }
})
</script>