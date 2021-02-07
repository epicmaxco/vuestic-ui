<template>
  <div
    :class="classComputed"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  >
    <div
      v-if="hasSlot && !vertical"
      :class="slotClassComputed"
      role="separator"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

const prefixClass = 'va-divider'

class DividerProps {
  vertical = prop<boolean>({ type: Boolean, default: false })
  dashed = prop<boolean>({ type: Boolean, default: false })
  inset = prop<boolean>({ type: Boolean, default: false })
  orientation = prop<string>({
    type: String,
    default: 'center',
    validator (value: string) {
      return ['left', 'right', 'center'].includes(value)
    },
  })
}

const DividerPropsMixin = Vue.with(DividerProps)

@Options({
  name: 'VaDivider',
})
export default class VaDivider extends mixins(
  DividerPropsMixin,
) {
  get hasSlot () {
    return !!this.$slots.default
  }

  get classComputed () {
    return [
      `${prefixClass}`,
      {
        [`${prefixClass}--vertical`]: this.vertical,
        [`${prefixClass}--inset`]: this.inset,
        [`${prefixClass}--${this.orientation}`]: this.orientation && !this.vertical,
        [`${prefixClass}--dashed`]: this.dashed,
      },
    ]
  }

  get slotClassComputed () {
    return `${prefixClass}__text`
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

$va-divider-line-width: 1px;
$va-divider-inset-horizontal-margin: 1rem;
$va-divider-inset-vertical-margin: 0.5rem;

// This is a bit tricky one in case of a horizontal divider,
// but in fact, it adds gaps at the top and bottom of the divider line
// In case of a vertical divider, it adds gaps at the right and left as expected
$va-divider-margin: 0.5rem;

// This one adds offsets at the right and left for the given text orientation
// only for horizontal divider
$va-divider-text-horizontal-offset: 1.25rem;

$va-divider-text-font-size: 0.875rem;

.va-divider {
  display: flex;
  margin: $va-divider-margin 0;

  &--vertical {
    margin: 0 $va-divider-margin;
    border-top: 0;
    border-right-width: $va-divider-line-width;
    border-right-style: solid;
    border-right-color: $separator-color;
    display: inline-flex;
    width: 0;

    &.va-divider--dashed {
      border-right-style: dashed;
    }
  }

  &--inset {
    margin: $va-divider-margin $va-divider-inset-horizontal-margin;

    &.va-divider--vertical {
      margin: $va-divider-inset-vertical-margin $va-divider-margin;
    }
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top-width: $va-divider-line-width;
    border-top-style: solid;
    border-top-color: $separator-color;
  }

  &--dashed {
    &::before,
    &::after {
      border-top-style: dashed;
    }
  }

  &--left {
    &::before {
      flex: 0 $va-divider-text-horizontal-offset;
    }
  }

  &--right {
    &::after {
      flex: 0 $va-divider-text-horizontal-offset;
    }
  }

  &__text {
    font-size: $va-divider-text-font-size;
    line-height: 0;
    height: 0;
    vertical-align: middle;
    transform: translateY(-50%);
  }
}
</style>
