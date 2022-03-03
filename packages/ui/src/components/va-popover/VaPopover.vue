<template>
  <va-dropdown
    class="va-popover"
    v-bind="VaDropdownPropValues"
    :modelValue="modelValue"
    :closeOnClickOutside="autoHide"
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
              :color="$props.color"
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
import { computed, defineComponent } from 'vue'
import VaDropdown from '../va-dropdown/VaDropdown.vue'
import { extractComponentProps, filterComponentProps } from '../../utils/child-props'
import { useColors } from '../../composables/useColor'

const VaDropdownProps = extractComponentProps(VaDropdown, ['closeOnClickOutside'])

export default defineComponent({
  name: 'VaPopover',

  components: { VaDropdown },

  props: {
    ...VaDropdownProps,
    color: { type: String, default: 'success' },
    icon: { type: String, default: '' },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    autoHide: { type: Boolean, default: true },
  },

  setup (props) {
    const VaDropdownPropValues = filterComponentProps(props, VaDropdownProps)

    const { getColor, getHoverColor, getBoxShadowColor } = useColors()

    const computedPopoverStyle = computed(() => ({
      boxShadow: `0px 2px 3px 0 ${getBoxShadowColor(getColor(props.color))}`,
      backgroundColor: getHoverColor(getColor(props.color)),
    }))

    return {
      VaDropdownPropValues,
      computedPopoverStyle,
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
