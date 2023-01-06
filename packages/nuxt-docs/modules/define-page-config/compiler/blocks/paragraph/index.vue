<script setup lang="ts">
import { PropType } from 'vue';
import { PageConfigParagraph } from '.';

import { MarkdownView } from '../../shared/markdown';

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfigParagraph>>,
    required: true
  }
})

const { tie } = useI18n()
</script>

<template>
  <va-content>
    <MarkdownView :content="tie(config.text)" />
  </va-content>
</template>
