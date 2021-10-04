<template>
  <h3>
    <MarkdownView
      tag="span"
      inline
      :value="textComputed"
    />
    <DocsAnchor :text="linkTextComputed" />
  </h3>
</template>

<script lang='ts'>
import { TranslationString } from '../components/DocsApi/ManualApiOptions'
import { Options, Vue, mixins, prop } from 'vue-class-component'
import DocsAnchor from './DocsAnchor.vue'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'

class Props {
  text = prop<TranslationString>({ type: String, required: true })
}

const PropsMixin = Vue.with(Props)

@Options({
  name: 'DocsSubtitle',
  components: { DocsAnchor, MarkdownView },
})
export default class DocsSubtitle extends mixins(PropsMixin) {
  get textComputed () {
    return this.$tie(this.text)
  }

  get linkTextComputed () {
    return this.$tie(this.text, 'en')
  }
}
</script>
