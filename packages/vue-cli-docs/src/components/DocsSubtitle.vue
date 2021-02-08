<template>
<h3>
  <MarkdownView tag="span" inline :value="$t(text)" />
  <a :id="anchor" :style="{ color: primaryColor }" :href="`#${anchor}`">#</a>
</h3>
</template>
<script lang='ts'>
// @ts-nocheck
import { kebabCase } from 'lodash'
import { TranslationString } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'
import { Options, Vue, mixins, prop } from 'vue-class-component'
import ColorMixin from 'vuestic-ui-dev/src/services/ColorMixin'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'

class Props {
  text = prop<TranslationString>({ type: String })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class DocsSubtitle extends mixins(ColorMixin, PropsMixin) {
  get anchor () {
    return kebabCase(this.$t(this.text) as string)
  }

  get primaryColor () {
    return this.computeColor('primary')
  }
}
</script>
