<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'

const CardTitlePropsMixin = makeContextablePropsMixin({
  textColor: { type: String, default: '' },
})

@Component({
  name: 'VaCardTitle',
})
export default class VaCardTitle extends Mixins(
  CardTitlePropsMixin,
) {
  get contentStyles () {
    return {
      color: getColor(this, this.c_textColor),
    }
  }
}
</script>
