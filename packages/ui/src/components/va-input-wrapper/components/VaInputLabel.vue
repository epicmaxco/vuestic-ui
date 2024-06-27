<template>
  <label
    aria-hidden="true"
    class="va-input-label"
    :style="{ color: getColor($props.color, undefined, true) }"
  >
    <slot v-bind="{ label, requiredMark, color: getColor($props.color) }">
      {{ label }}
      <span v-if="requiredMark" class="va-input-label__required-mark"> * </span>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import { useColors } from '../../../composables'

defineOptions({
  name: 'VaInputLabel',
})

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  requiredMark: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'primary',
  },
})

const { getColor } = useColors()
</script>

<style lang="scss">
@import '../../../styles/resources/index.scss';

.va-input-label {
  @include va-ellipsis();
  @include va-title();

  min-height: 1rem;
  display: inline-block;

  &__required-mark {
    transform: translate(0, -2px);
    color: var(--va-danger);
    font-size: 1.2em;
    font-weight: var(--va-input-container-label-font-weight);
    vertical-align: middle;
  }
}
</style>
