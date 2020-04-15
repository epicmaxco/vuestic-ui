<template>
    <dynamic-template v-bind="config">
    </dynamic-template>
</template>

<script lang="ts">
// @ts-nocheck
import Vue from 'vue'
import DynamicTemplate from '../../components/dynamic-template/DynamicTemplate.vue'
import getConfig from '../../dynamic-configs'
export default Vue.extend({
    components: {
        DynamicTemplate
    },
    computed: { 
        config() {
            return getConfig(this)
        },
    }
})
</script>