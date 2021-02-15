<template>
  <div
    class="color-dot"
    @click="$emit('click')"
    :class="{'color-dot--selected': selected}"
  >
    <div
      class="color-dot__core"
      :style="{'background-color': color}"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

class ColorDotProps {
  color = prop<string>({
    type: String,
    default: '',
  })

  selected = prop<boolean>({
    type: Boolean,
    default: false,
  })
}

const ColorDotPropsMixin = Vue.with(ColorDotProps)

@Options({
  name: 'ColorDot',
  emits: ['click'],
})
export default class ColorDot extends mixins(ColorDotPropsMixin) {

}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.color-dot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
  border: solid 0.125rem transparent;

  &--selected {
    border-color: $vue-darkest-blue;
  }

  &__core {
    display: inline-block;
    vertical-align: baseline;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
}
</style>
