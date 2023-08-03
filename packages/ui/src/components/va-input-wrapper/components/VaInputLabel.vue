<template>
  <label
    aria-hidden="true"
    class="va-input-label"
    :style="{ color: getColor($props.color, undefined, true) }"
  >
    {{ label }}
    <span v-if="requiredMark" class="va-input-label__required-mark"> * </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColors } from '../../../composables'

export default defineComponent({
  name: 'VaInputLabel',

  props: {
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
  },

  setup () {
    const { getColor } = useColors()

    return {
      getColor,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '../../../styles/resources/index.scss';

.va-input-label {
  @include va-ellipsis();
  @include va-title();

  height: 1rem;
  display: inline-block;

  &__required-mark {
    transform: translate(0, -2px);
    color: var(--va-danger);
    font-size: 18px;
    font-weight: var(--va-input-container-label-font-weight);
    vertical-align: middle;
  }
}
</style>
