<template>
  <va-dropdown
    class="va-popover"
    v-bind="VaDropdownPropValues"
    :modelValue="modelValue"
    :closeOnClickOutside="autoHide"
    :offset="$props.offset"
  >
    <template #default>
      <div class="va-popover__content-wrapper">
        <div
          class="va-popover__content"
          :style="computedPopoverStyle"
        >
          <div
            v-if="$props.icon"
            class="va-popover__icon"
          >
            <va-icon
              :name="$props.icon"
              :color="textColorComputed"
            />
          </div>
          <div v-if="$props.title || $props.message">
            <div
              v-if="$props.title"
              class="va-popover__title"
            >
              {{ $props.title }}
            </div>
            <div class="va-popover__text">
              {{ $props.message }}
            </div>
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
import VaDropdown from '../va-dropdown/VaDropdown.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { useColors } from '../../composables/useColor'
import { useTextColor } from '../../composables/useTextColor'

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

  setup (props) {
    const VaDropdownPropValues = filterComponentProps(props, VaDropdownProps)

    const { getColor, getBoxShadowColor } = useColors()

    const { textColorComputed } = useTextColor(props.color)

    const computedPopoverStyle = computed(() => ({
      boxShadow: `0px 2px 3px 0 ${getBoxShadowColor(getColor(props.color))}`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value,
    }))

    return {
      VaDropdownPropValues,
      computedPopoverStyle,
      textColorComputed,
    }
  },
})
</script>

<style lang="scss">
@import '../../styles/resources';
@import 'variables';

.va-popover {
  display: var(--va-popover-display);

  &__content-wrapper {
    background-color: white;
    border-radius: 0.5rem;
  }

  &__content {
    opacity: var(--va-popover-content-opacity);
    display: var(--va-popover-content-display);
    align-items: var(--va-popover-content-align-items);
    padding: var(--va-popover-content-padding);
    border-radius: var(--va-popover-content-border-radius, var(--va-block-border-radius));
    font-size: var(--va-popover-content-font-size);
  }

  &__icon + div {
    padding-left: 0.75rem;
    width: 100%;
    overflow: hidden;
  }

  &__title {
    font-weight: var(--va-popover-title-font-weight);
    margin-bottom: var(--va-popover-title-margin-bottom);
  }

  &__text {
    line-height: 1.5;
  }
}
</style>
