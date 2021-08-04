<template>
  <div class="va-card__actions" :style="actionsStyles">
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'

class CardActionsProps {
  align = prop<string>({ type: String, default: 'left' });
}

const CardActionsPropsMixin = Vue.with(CardActionsProps)

@Options({
  name: 'VaCardActions',
})
export default class VaCardActions extends mixins(
  ColorMixin,
  AlignMixin,
  CardActionsPropsMixin,
) {
  get actionsStyles () {
    return {
      ...this.alignComputed,
    }
  }
}
</script>

<style lang="scss">
.va-card__actions {
  align-items: center;

  button {
    margin-left: 5px;
    margin-right: 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
