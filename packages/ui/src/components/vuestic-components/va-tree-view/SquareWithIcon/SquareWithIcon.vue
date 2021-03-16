<template>
  <div
    class="square-with-icon"
    :style="{ backgroundColor: colorComputed }"
  >
    <va-icon :name="$props.icon" />
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop, mixins } from 'vue-class-component'

import ColorMixin from '../../../../services/color-config/ColorMixin'
import VaIcon from '../../va-icon'

class SquareWithIconProps {
  icon = prop<string>({ default: '', type: String, required: true })
}

const SquareWithIconPropsMixin = Vue.with(SquareWithIconProps)

@Options({
  name: 'SquareWithIcon',
  components: { VaIcon },
})
export default class SquareWithIcon extends mixins(
  ColorMixin,
  SquareWithIconPropsMixin,
) {

}
</script>

<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.square-with-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background-color: $vue-green;
  border-radius: 0.25rem;
  width: 1.375rem;
  height: 1.375rem;
}
</style>
