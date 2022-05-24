<template>
  <DocsHeadline :source="title" tag="h5" />
  <MarkdownView v-if="text" :source="text" />
  <DocsExample :component="component" :path="path" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TranslationString } from '~~/types/translations'
import DocsExample from '../DocsExample/DocsExample.vue'
import DocsHeadline from '../DocsHeadline/DocsHeadline.vue'
import MarkdownView from '../MarkdownView/MarkdownView.vue'

export default defineComponent({
  components: {
    DocsHeadline, DocsExample, MarkdownView
  },

  props: {
    title: { type: String as PropType<TranslationString> },
    text: { type: String as PropType<TranslationString> },
    component: { type: String },
    path: { type: String }
  },

  setup() {
    return {}
  }
})
</script>
