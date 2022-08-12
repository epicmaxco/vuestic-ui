<script setup lang="ts">
import { PropType } from 'vue';
import { CompiledPageConfig } from '..';

import PageConfigComponent from './component/index.vue'
import PageConfigExample from './example/index.vue'

const props = defineProps({
  pageConfig: {
    type: Object as PropType<CompiledPageConfig>,
    required: true
  }
})

const blocks = props.pageConfig.blocks

const pageConfigComponent = {
  'component': PageConfigComponent,
  'example': PageConfigExample
}
</script>

<template>
  <component
    v-for="block in blocks" 
    :is="pageConfigComponent[block.type]"
    :config="block"
   />
</template>