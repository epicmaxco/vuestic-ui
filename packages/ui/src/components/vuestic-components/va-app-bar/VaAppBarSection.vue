<template>
  <div :class="computedClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const PropsMixin = makeContextablePropsMixin({
  hover: { type: String, default: '' },
})

@Component({
  name: 'VaAppBarSection',
})
export default class VaAppBarSection extends Mixins(
  PropsMixin,
) {
  get computedClasses () {
    return {
      'va-app-bar-section': true,
      'va-app-bar-section--light': this.c_hover === 'light',
      'va-app-bar-section--dark': this.c_hover === 'dark',
    }
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-app-bar-section {
  padding: 0.5rem;
  transition: background 0.2s linear;
  cursor: pointer;
  height: 100%;

  &--light {
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  &--dark {
    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
