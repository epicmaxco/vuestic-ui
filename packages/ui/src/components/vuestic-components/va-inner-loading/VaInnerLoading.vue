<template>
  <div class="inner-loading">
    <slot />
    <div
      v-if="loading"
      class="inner-loading__overlay"
    >
      <va-icon
        spin
        :color="c_color"
        :size="c_size"
        :name="c_icon"
        class="inner-loading__spinner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'

import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Options } from 'vue-class-component'

const PropsMixin = makeContextablePropsMixin({
  color: { type: String, default: '' },
  icon: { type: String, default: 'loop' },
  size: { type: Number, default: 30 },
})

@Options({
  name: 'VaInnerLoading',
  components: { VaIcon },
})
export default class VaInnerLoading extends Mixins(
  PropsMixin,
  LoadingMixin,
) {}
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
