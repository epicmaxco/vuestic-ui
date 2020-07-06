<template>
  <component
    :is="computedTag"
    class="va-tag"
    :class="computedClass"
    :style="computedStyle"
    v-on="$listeners"
  >
    <div class="va-tag__content">gfdgdfdfg</div>
  </component>
</template>

<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const TagPropsMixin = makeContextablePropsMixin({
})

@Component({
  name: 'VaTag',
})
export default class VaTag extends Mixins(
  ColorThemeMixin,
  SizeMixin,
  TagPropsMixin,
) {
  get computedTag () {
    if (this.c_tag === 'a' || this.c_href || this.c_target) {
      return 'a'
    }
    if (this.c_tag === 'router-link' || this.hasRouterLinkParams) {
      return 'router-link'
    }
    return 'div'
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-tag {
  display: inline-flex;
  background-color: yellowgreen;
  border-radius: 1rem;
  width: auto;
  height: auto;
  min-width: initial;
  min-height: initial;
  margin: 0;
  padding: 0 0.5rem;
}
</style>
