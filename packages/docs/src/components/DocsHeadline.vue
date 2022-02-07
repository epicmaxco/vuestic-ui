<template>
  <h5>
    <MarkdownView
      tag="span"
      inline
      :value="textComputed"
    />
    <DocsAnchor :text="linkTextComputed" />
  </h5>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'
import { tie } from '../locales/translateIfExistsPlugin'
import DocsAnchor from './DocsAnchor.vue'
import MarkdownView from './markdown-view/MarkdownView.vue'

export default defineComponent({
  name: '',
  components: { DocsAnchor, MarkdownView },
  props: {
    text: { type: String as PropType<TranslationString>, required: true },
  },
  setup: (props) => ({
    textComputed: computed(() => tie(props.text)),
    linkTextComputed: computed(() => tie(props.text, 'en')),
  }),
})
</script>
