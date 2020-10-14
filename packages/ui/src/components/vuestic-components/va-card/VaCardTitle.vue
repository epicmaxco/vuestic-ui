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

import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'
import { getColor } from '../../vuestic-mixins/ColorMixin'

const CardTitlePropsMixin = makeConfigTransportMixin({
  textColor: { type: String, default: '' },
})

@Component({
  name: 'VaCardTitle',
})
export default class VaCardTitle extends Mixins(
  CardTitlePropsMixin,
) {
  get titleStyles () {
    return {
      color: getColor(this.c_textColor),
    }
  }
}
</script>
