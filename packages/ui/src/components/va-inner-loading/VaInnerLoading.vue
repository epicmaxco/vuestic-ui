<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="loading"
      class="inner-loading__overlay"
    >
      <va-icon
        spin
        :color="$props.color"
        :size="$props.size"
        :name="$props.icon"
        class="inner-loading__spinner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import { LoadingMixin } from '../../mixins/LoadingMixin/LoadingMixin'
import VaIcon from '../va-icon'

class InnerLoadingProps {
  color = prop<string>({ type: String, default: '' })
  icon = prop<string>({ type: String, default: 'loop' })
  size = prop<number>({ type: Number, default: 30 })
}

const InnerLoadingPropsMixin = Vue.with(InnerLoadingProps)

@Options({
  name: 'VaInnerLoading',
  components: { VaIcon },
})
export default class VaInnerLoading extends mixins(
  LoadingMixin,
  InnerLoadingPropsMixin,
) {
}
</script>

<style lang="scss">
@import "variables";

.inner-loading {
  position: var(--inner-loading-position);
  min-width: var(--inner-loading-min-width);
  width: var(--inner-loading-width);
  font-family: var(--va-font-family);

  &__overlay {
    display: var(--inner-loading-overlay-display);
    align-items: var(--inner-loading-overlay-align-items);
    justify-content: var(--inner-loading-overlay-justify-content);
    position: var(--inner-loading-overlay-position);
    top: var(--inner-loading-overlay-top);
    bottom: var(--inner-loading-overlay-bottom);
    width: var(--inner-loading-overlay-width);
    background: var(--inner-loading-overlay-background);
  }
}
</style>
