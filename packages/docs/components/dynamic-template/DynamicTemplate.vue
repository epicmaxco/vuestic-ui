<template>
        <component :is="component" :style="configStyle" v-bind="componentProps">
            {{text}}
            <dynamic-template v-bind="childBlock" v-for="(childBlock, index) in children" :key="index" ></dynamic-template>
        </component>
</template>

<script lang="ts">
import Vue from 'vue'
import DynamicTemplate from "./DynamicTemplate.vue"
// @ts-ignore
export default Vue.extend({
    name: 'dynamic-template',
    components: {
        DynamicTemplate,
        VaCard: () => import('../../../ui/src/components/vuestic-components/va-card/VaCard.vue'),
        VaCardTitle: () => import('../../../ui/src/components/vuestic-components/va-card/VaCardTitle.vue'),
        VaCardContent: () => import('../../../ui/src/components/vuestic-components/va-card/VaCardContent.vue'),
        VaContent: () => import('../../../ui/src/components/vuestic-components/va-content/VaContent.vue'),
    },
    props: ['component', 'configStyle', 'text', 'componentProps', 'children'],
})
</script>