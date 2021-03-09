<template>
<h3>
  <MarkdownView tag="span" inline :value="$t(text)" />
  <a :id="anchor" :style="{ color: themes.primary }" :href="`#${anchor}`">#</a>
</h3>
</template>
<script lang='ts'>
// @ts-nocheck
import { kebabCase } from 'lodash'
import { TranslationString } from 'vuestic-ui-dev/src/services/api-docs/ManualApiOptions'
import { Options, Vue, mixins, prop, setup } from 'vue-class-component'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'
import { useTheme } from 'vuestic-ui'

class Props {
  text = prop<TranslationString>({ type: String })
}

const PropsMixin = Vue.with(Props)

@Options({
  components: { MarkdownView },
})
export default class DocsSubtitle extends mixins(PropsMixin) {
  get anchor () {
    return kebabCase(this.$t(this.text) as string)
  }

  get themes () {
    return this.getColors()
  }

  getTheme = setup(() => {
    const { getTheme } = useTheme()
    return getTheme
  })
}
</script>
