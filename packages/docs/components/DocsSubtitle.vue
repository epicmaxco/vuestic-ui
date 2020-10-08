<template>
<h3>
  <MarkdownView tag="span" inline :value="$t(text)" />
  <a :id="anchor" :style="{ color: primaryColor }" :href="`#${anchor}`">#</a>
</h3>
</template>
<script lang='ts'>
import { kebabCase } from 'lodash'
import { TranslationString } from '../../ui/src/services/api-docs/ManualApiOptions'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../ui/src/services/ColorThemePlugin'
import MarkdownView from '../utilities/markdown-view/MarkdownView.vue'

@Component({
  components: { MarkdownView },
})
export default class DocsSubtitle extends Mixins(ColorThemeMixin) {
  @Prop({ type: String }) text!: TranslationString
  get anchor () {
    return kebabCase(this.$t(this.text) as string)
  }

  get primaryColor () {
    return this.computeColor('primary')
  }
}
</script>
