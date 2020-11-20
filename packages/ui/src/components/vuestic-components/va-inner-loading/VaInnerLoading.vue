<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="loading"
      class="inner-loading__overlay"
    >
      <va-icon
        spin
        :color="color"
        :size="size"
        :name="icon"
        class="inner-loading__spinner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import VaIcon from '../va-icon'

import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'

@Component({
  name: 'VaInnerLoading',
  components: { VaIcon },
})
export default class VaInnerLoading extends Mixins(
  LoadingMixin,
) {
  @Prop({ type: String, default: '' }) color!: string
  @Prop({ type: String, default: 'loop' }) icon!: string
  @Prop({ type: Number, default: 30 }) size!: number
}
</script>

<style lang="scss" scoped>
  .inner-loading {
    position: relative;
    min-width: fit-content;
    width: fit-content;

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
