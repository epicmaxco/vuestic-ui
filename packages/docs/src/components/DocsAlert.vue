<template>
  <div class="docs-alert my-3">
    <va-alert :color="color">
      <MarkdownView tag="span" inline :value="$tie(text)" />
    </va-alert>
  </div>
</template>

<script lang="ts">
import MarkdownView from './markdown-view/MarkdownView.vue'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'DocsAlert',
  components: {
    MarkdownView,
  },
  props: {
    text: { type: String as PropType<TranslationString> },
    color: { type: String as PropType<string>, default: 'info' },
  },
})
</script>
