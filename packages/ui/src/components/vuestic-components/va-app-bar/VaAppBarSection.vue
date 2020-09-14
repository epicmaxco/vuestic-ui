<template>
  <div class="va-app-bar-section">
    <slot />
  </div>
</template>

<script lang="ts">
import { Mixins, Component } from 'vue-property-decorator'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const PropsMixin = makeContextablePropsMixin({
})

@Component({
  name: 'VaAppBarSection',
})
export default class VaAppBarSection extends Mixins(
  PropsMixin,
) {
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-app-bar-section {
  padding: 0.5rem;

  &:hover {
  }
}
</style>
