<template>
  <div
    class="square-with-icon"
    :style="{ backgroundColor: colorComputed }"
  >
    <va-icon :name="$props.icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useComponentPresetProp, useColors } from '../../../composables'
import { VaIcon } from '../../va-icon'

export default defineComponent({
  name: 'SquareWithIcon',
  components: { VaIcon },
  props: {
    ...useComponentPresetProp,
    icon: {
      type: String,
      default: '',
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  setup (props) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    return {
      colorComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../../styles/resources";
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
