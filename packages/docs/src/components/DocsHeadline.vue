<template>
  <h5 class="docs-headline">
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

<style lang="scss" scoped>
  .docs-headline {
    margin-top: 4rem;

    .docs-subtitle + &,
    .docs-title + & {
      margin-top: 1.25rem;
    }

    a,
    a:visited {
      color: var(--va-primary);
    }

    & > :not(:last-child) {
      padding-right: 0.25rem;
    }
  }
</style>
