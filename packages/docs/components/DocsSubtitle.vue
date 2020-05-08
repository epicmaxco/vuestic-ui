<template>
<h3>
  {{ $t(text) }}
  <a :id="anchor" :style="{ color: primaryColor }" :href="`#${anchor}`">#</a>
</h3>
</template>
<script lang='ts'>
import { kebabCase } from 'lodash'
import { TranslationString } from '../types/configTypes'
import { Component, Prop, Mixins } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../ui/src/services/ColorThemePlugin'

@Component({})
export default class DocsSubtitle extends Mixins(ColorThemeMixin) {
  @Prop({ type: String }) text!: TranslationString
  get anchor () {
    return kebabCase(this.$t(this.text))
  }

  get primaryColor () {
    return this.computeColor('primary')
  }
}
</script>
