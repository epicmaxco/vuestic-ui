<template>
   <div
    class="color-indicator"
    @click="ctx.valueComputed = !ctx.valueComputed"
    :class="computedClass"
    :style="computedStyle"
  >
    <div
      class="color-indicator__core"
      :style="{'background-color': colorComputed, 'border-radius': square ? 0 : '50%'}"
    />
  </div>
</template>

<script lang="ts">
import { getColor } from '../../services/color-config/color-config'
import { Vue, Options, prop, setup } from 'vue-class-component'
import { useStateful, statefulComponentOptions } from '../../mixins/StatefulMixin/cStatefulMixin'

class ColorIndicatorProps {
  color = prop<string>({
    type: String,
    default: '',
  })

  square = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const ColorIndicatorPropsMixin = Vue.with(ColorIndicatorProps)

@Options({
  name: 'VaColorIndicator',
  ...statefulComponentOptions,
})
export default class VaColorIndicator extends ColorIndicatorPropsMixin {
  ctx = setup(() => useStateful(this.$props, this.$emit))

  get colorComputed () {
    return getColor(this.color)
  }

  get computedStyle () {
    return { 'border-radius': this.square ? 0 : '50%' }
  }

  get computedClass () {
    return {
      'color-indicator--selected': this.ctx.valueComputed,
      'color-indicator--hoverable': this.ctx.valueComputed !== undefined,
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/resources";

.color-indicator {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  background-color: #d8dadd;
  border: 0.125rem solid #d8dadd;

  &--selected {
    background-color: $vue-darkest-blue;
    border-color: $vue-darkest-blue;
  }

  &--hoverable &__core:hover {
    transform: scale(1.1);
    transition: transform 0.1s linear;
  }

  &__core {
    transition: transform 0.1s linear;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
