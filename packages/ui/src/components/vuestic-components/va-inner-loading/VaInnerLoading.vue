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

import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
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
) {}
</script>

<style lang="scss" scoped>
  .inner-loading {
    position: relative;
    min-width: fit-content;
    width: 100%;

    &__overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.5);
    }
  }
</style>
