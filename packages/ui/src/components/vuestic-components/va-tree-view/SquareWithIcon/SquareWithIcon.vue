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
@import 'variables';

.square-with-icon {
  display: var(--square-with-icon-display);
  justify-content: var(--square-with-icon-justify-content);
  align-items: var(--square-with-icon-align-items);
  color: var(--square-with-icon-color);
  background-color: var(--square-with-icon-background-color);
  border-radius: var(--square-with-icon-border-radius);
  width: var(--square-with-icon-width);
  height: var(--square-with-icon-height);
}
</style>
