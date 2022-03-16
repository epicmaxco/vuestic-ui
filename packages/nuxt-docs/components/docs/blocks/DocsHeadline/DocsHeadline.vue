<template>
  <component :is="tag">
    <MarkdownView tag="span" inline :source="source" />
    <DocsAnchor :text="linkTextComputed" />
  </component>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue'
import { TranslationString } from '~~/types/translations'
import DocsAnchor from '../../DocsAnchor.vue'
import MarkdownView from '../MarkdownView/MarkdownView.vue'

export default defineComponent({
  name: '',
  components: { DocsAnchor, MarkdownView },
  props: {
    source: { type: String as PropType<TranslationString>, required: true },
    anchor: { type: String as PropType<TranslationString>, default: '' },
    tag: { type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>, required: true }
  },
  setup: (props) => {
    const { tie } = useI18n()

    return {
      linkTextComputed: computed(() => tie(props.anchor || props.source, 'en')),
    }
  },
})
</script>
