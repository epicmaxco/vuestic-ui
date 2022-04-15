<template>
  <div class="docs-alert my-3">
    <va-alert :color="color">
      <MarkdownView
        inline
        :source="tie(text)"
      />
    </va-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import MarkdownView from '../MarkdownView/MarkdownView.vue'
import { TranslationString } from '~~/types/translations'

export default defineComponent({
  name: 'DocsAlert',
  components: {
    MarkdownView,
  },
  props: {
    text: { type: String as PropType<TranslationString>, required: true },
    color: { type: String as PropType<string>, default: 'info' },
  },
  setup: () => useI18n()
})
</script>
