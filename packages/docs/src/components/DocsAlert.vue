<template>
  <div class="docs-alert my-3">
    <va-alert :color="color" outline>
      <MarkdownView tag="span" inline :value="$tie(text)" />
    </va-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MarkdownView from './markdown-view/MarkdownView.vue'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'

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
