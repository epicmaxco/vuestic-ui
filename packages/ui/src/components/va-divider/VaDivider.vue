<template>
  <div
    role="separator"
    class="va-divider"
    :class="classComputed"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-hidden="true"
  >
    <div
      v-if="hasSlot && !vertical"
      class="va-divider__text"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useComponentPresetProp } from '../../composables/useComponentPreset'
import { useColors } from '../../composables/useColors'

const prefixClass = 'va-divider'

export default defineComponent({
  name: 'VaDivider',
  props: {
    ...useComponentPresetProp,
    vertical: { type: Boolean, default: false },
    dashed: { type: Boolean, default: false },
    inset: { type: Boolean, default: false },
    orientation: {
      type: String as PropType<'left' | 'right' | 'center'>,
      default: 'center',
      validator: (value: string) => ['left', 'right', 'center'].includes(value),
    },
    color: { type: String, default: 'backgroundBorder' },
  },
  setup (props, { slots }) {
    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    return {
      colorComputed,
      hasSlot: computed(() => !!slots.default),
      classComputed: computed(() => ({
        [`${prefixClass}--vertical`]: props.vertical,
        [`${prefixClass}--inset`]: props.inset,
        [`${prefixClass}--${props.orientation}`]: props.orientation && !props.vertical,
        [`${prefixClass}--dashed`]: props.dashed,
      })),
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-divider {
  display: var(--va-divider-display);
  margin: var(--va-divider-margin) 0;
  font-family: var(--va-font-family);

  &--vertical {
    margin: 0 var(--va-divider-margin);
    border-top: 0;
    border-right-width: var(--va-divider-line-width);
    border-right-style: var(--va-divider-border-style);
    border-right-color: v-bind(colorComputed);
    display: var(--va-divider-vertical-display);
    vertical-align: top;

    &.va-divider--dashed {
      border-right-style: dashed;
    }
  }

  &--inset {
    margin: var(--va-divider-inset-margin);

    &.va-divider--vertical {
      margin: var(--va-divider-inset-horizontal-margin) var(--va-divider-margin);
    }
  }

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top-width: var(--va-divider-line-width);
    border-top-style: var(--va-divider-border-style);
    border-top-color: v-bind(colorComputed);
  }

  &--dashed {
    &::before,
    &::after {
      border-top-style: var(--va-divider-dashed-border-top-style);
    }
  }

  &--left {
    &::before {
      flex: 0 var(--va-divider-text-horizontal-offset);
    }
  }

  &--right {
    &::after {
      flex: 0 var(--va-divider-text-horizontal-offset);
    }
  }

  &__text {
    font-size: var(--va-divider-text-font-size);
    line-height: var(--va-divider-text-line-height);
    height: var(--va-divider-text-height);
    vertical-align: var(--va-divider-text-vertical-align);
    transform: var(--va-divider-text-transform);
  }
}
</style>
