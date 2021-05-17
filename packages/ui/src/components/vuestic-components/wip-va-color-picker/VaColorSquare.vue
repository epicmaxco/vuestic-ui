<template>
  <div
    class="va-color-square"
    :style="{'background-color': modelValue}"
  />
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

class ColorSquareProps {
  modelValue = prop<string>({
    type: String,
    default: '',
    required: true,
  })
}

const ColorSquarePropsMixin = Vue.with(ColorSquareProps)

@Options({
  name: 'VaColorSquare',
})
export default class VaColorSquare extends mixins(ColorSquarePropsMixin) {

}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-color-square {
  height: 48px;
  width: 48px;
  border: 1px solid $gray-light;
}
</style>
