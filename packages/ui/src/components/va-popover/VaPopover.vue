<template>
  <va-dropdown
    v-bind="VaDropdownPropValues"
    :model-value="modelValue"
    :close-on-click-outside="autoHide"
    :offset="$props.offset"
    class="va-popover"
  >
    <template #default>
      <div
        :style="computedPopoverStyle"
        class="va-popover__content"
        role="tooltip"
      >
        <div
          v-if="showIconComputed"
          aria-hidden="true"
          class="va-popover__icon"
        >
          <slot name="icon">
            <va-icon :name="$props.icon" :color="textColorComputed" />
          </slot>
        </div>
        <div v-if="showPopoverContentComputed">
          <div v-if="showTitleComputed" class="va-popover__title">
            <slot name="title">{{ $props.title }}</slot>
          </div>
          <div v-if="showBodyComputed" class="va-popover__body">
            <slot name="body">{{ $props.message }}</slot>
          </div>
        </div>
      </div>
    </template>
    <template #anchor>
      <slot />
    </template>
  </va-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { useColors } from '../../composables/useColor'
import { useTextColor } from '../../composables/useTextColor'

import { VaDropdown, VaIcon } from '../'

const VaDropdownProps = extractComponentProps(VaDropdown, ['closeOnClickOutside'])

export default defineComponent({
  name: 'VaPopover',

  components: { VaDropdown, VaIcon },

  props: {
    ...VaDropdownProps,
    trigger: { default: 'hover' },
    color: { type: String, default: 'dark' },
    textColor: { type: String },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    autoHide: { type: Boolean, default: true },
    offset: { type: [Array, Number] as PropType<number | [number, number]>, default: 4 },
  },

  setup (props, { slots }) {
    const VaDropdownPropValues = filterComponentProps(props, VaDropdownProps)

    const { getColor, getBoxShadowColor } = useColors()

    const { textColorComputed } = useTextColor()
    const showIconComputed = computed(() => props.icon || slots.icon)
    const showTitleComputed = computed(() => props.title || slots.title)
    const showBodyComputed = computed(() => props.message || slots.body)
    const showPopoverContentComputed = computed(
      () => showTitleComputed.value || showBodyComputed.value,
    )

    const computedPopoverStyle = computed(() => ({
      boxShadow: `var(--va-popover-content-box-shadow) ${getBoxShadowColor(getColor(props.color))}`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value,
    }))

    return {
      textColorComputed,
      VaDropdownPropValues,

      showBodyComputed,
      showIconComputed,
      showTitleComputed,
      computedPopoverStyle,
      showPopoverContentComputed,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/resources';
@import 'variables';

.va-popover {
  display: var(--va-popover-display);

  &__content {
    background-color: var(--va-popover-content-background-color);
    opacity: var(--va-popover-content-opacity);
    display: var(--va-popover-content-display);
    align-items: var(--va-popover-content-align-items);
    padding: var(--va-popover-content-padding);
    border-radius: var(--va-popover-content-border-radius, var(--va-block-border-radius));
    font-size: var(--va-popover-content-font-size);
  }

  &__icon + div {
    padding-left: 0.75rem;
    overflow: hidden;
    width: 100%;
  }

  &__title {
    font-weight: var(--va-popover-title-font-weight);
    margin-bottom: var(--va-popover-title-margin-bottom);
  }

  &__body {
    line-height: var(--va-popover-body-line-height);
  }
}
</style>
