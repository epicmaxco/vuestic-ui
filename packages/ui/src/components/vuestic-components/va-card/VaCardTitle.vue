<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { getColor } from '../../../services/ColorThemePlugin'
import { Options } from 'vue-class-component'

const CardTitlePropsMixin = makeContextablePropsMixin({
  textColor: { type: String, default: '' },
})

@Options({
  name: 'VaCardTitle',
})
export default class VaCardTitle extends Mixins(
  CardTitlePropsMixin,
) {
  get titleStyles () {
    return {
      color: getColor(this, this.c_textColor),
    }
  }
}
</script>
