<script setup lang="ts">
import { PropType } from 'vue';
import { CompiledPageConfig } from '../..';
import { PageConfigBlockType } from './types'

import PageConfigComponent from './component/index.vue'
import PageConfigExample from './example/index.vue'
import PageConfigCode from './code/index.vue'
import PageConfigMarkdown from './markdown/index.vue'
import PageConfigTitle from './title/index.vue'
import PageConfigSubtitle from './subtitle/index.vue'
import PageConfigParagraph from './paragraph/index.vue'
import PageConfigFileStructure from './file-structure/index.vue'
import PageConfigAlert from './alert/index.vue'
import PageConfigFile from './file/index.vue'

const props = defineProps({
  pageConfig: {
    type: Object as PropType<CompiledPageConfig>,
    required: true
  }
})

const blocks = props.pageConfig.blocks

const pageConfigComponent: Record<PageConfigBlockType, any> = {
  'component': PageConfigComponent,
  'example': PageConfigExample,
  'code': PageConfigCode,
  'markdown': PageConfigMarkdown,
  'title': PageConfigTitle,
  'paragraph': PageConfigParagraph,
  'subtitle': PageConfigSubtitle,
  'file-structure': PageConfigFileStructure,
  'alert': PageConfigAlert,
  'file': PageConfigFile
}
</script>

<template>
  <component
    v-for="block in blocks"
    :is="pageConfigComponent[block.type]"
    :config="block"
   />
</template>
