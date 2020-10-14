<template>
  <div
    class="va-card__content"
    :style="contentStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'

import { makeConfigTransportMixin } from '../../../services/config-transport/makeConfigTransportMixin'
import { getColor } from '../../vuestic-mixins/ColorMixin'

const CardContentPropsMixin = makeConfigTransportMixin({
  textColor: { type: String, default: '' },
})

@Component({
  name: 'VaCardContent',
})
export default class VaCardContent extends Mixins(
  CardContentPropsMixin,
) {
  get contentStyles () {
    return {
      color: getColor(this.c_textColor),
    }
  }
}
</script>
