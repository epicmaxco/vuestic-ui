<script setup lang="ts">
import { PropType } from 'vue';
import { CompiledPageConfig } from '../..';

import PageConfigComponent from './component/index.vue'
import PageConfigExample from './example/index.vue'
import PageConfigCode from './code/index.vue'
import PageConfigMarkdown from './markdown/index.vue'

const props = defineProps({
  pageConfig: {
    type: Object as PropType<CompiledPageConfig>,
    required: true
  }
})

const blocks = props.pageConfig.blocks

const pageConfigComponent = {
  'component': PageConfigComponent,
  'example': PageConfigExample,
  'code': PageConfigCode,
  'markdown': PageConfigMarkdown,
}
</script>

<template>
  <component
    v-for="block in blocks"
    :is="pageConfigComponent[block.type]"
    :config="block"
   />
</template>
