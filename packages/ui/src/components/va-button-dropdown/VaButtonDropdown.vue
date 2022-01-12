<template>
  <div :class="computedClass">
    <va-dropdown
      v-if="!$props.split"
      :disabled="$props.disabled"
      :position="$props.position"
      :offset="$props.offset"
      :keep-anchor-width="$props.keepAnchorWidth"
      :close-on-content-click="$props.closeOnContentClick"
      :stateful="$props.stateful"
      v-model="valueComputed"
    >
      <template #anchor>
        <va-button
          :size="$props.size"
          :color="$props.color"
          :textColor="$props.textColor"
          :flat="$props.flat"
          :outline="$props.outline"
          :disabled="$props.disabled"
          :round="!$props.label && !$slots.label"
          v-bind="{ ...computedButtonIcons }"
          v-on="listeners"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </va-button>
      </template>

      <va-dropdown-content>
        <slot />
      </va-dropdown-content>
    </va-dropdown>

    <va-button-group
      v-else
      :outline="$props.outline"
      :flat="$props.flat"
    >
      <va-button
        :size="$props.size"
        :color="$props.color"
        :textColor="$props.textColor"
        :disabled="$props.disabled || $props.disableButton"
        :to="$props.splitTo"
        v-on="mainButtonListeners"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </va-button>
      <va-dropdown
        :disabled="$props.disabled || $props.disableDropdown"
        :position="$props.position"
        :offset="$props.offset"
        :stateful="$props.stateful"
        v-model="valueComputed"
      >
        <template #anchor>
          <va-button
            :size="$props.size"
            :color="$props.color"
            :textColor="$props.textColor"
            :flat="$props.flat"
            :outline="$props.outline"
            :disabled="$props.disabled || $props.disableDropdown"
            :icon="computedIcon"
            v-on="listeners"
          />
        </template>
        <va-dropdown-content>
          <slot />
        </va-dropdown-content>
      </va-dropdown>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { useStatefulProps, useStateful } from '../../composables/useStateful'
import { useEmitProxy } from '../../composables/useEmitProxy'

import VaDropdown, { VaDropdownContent } from '../va-dropdown'
import VaButton from '../va-button'
import VaButtonGroup from '../va-button-group'

const { createEmits, createVOnListeners: createListeners } = useEmitProxy(
  ['click'],
)

const { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [['click', 'main-button-click']],
)

const componentName = 'VaButtonDropdown'

export default defineComponent({
  name: componentName,

  components: {
    VaButtonGroup,
    VaButton,
    VaDropdown,
    VaDropdownContent,
  },

  emits: ['update:modelValue', ...createEmits(), ...createMainButtonEmits()],

  props: {
    ...useStatefulProps,

    modelValue: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },
    color: { type: String, default: 'primary' },
    textColor: { type: String, default: undefined },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['medium', 'small', 'large'].includes(value),
    },
    hideIcon: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    disableButton: { type: Boolean, default: false },
    disableDropdown: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    keepAnchorWidth: { type: Boolean, default: false },
    split: { type: Boolean },
    splitTo: { type: String, default: '' },
    icon: { type: String, default: 'expand_more' },
    openedIcon: { type: String, default: 'expand_less' },
    position: { type: String, default: 'bottom' },
    label: { type: String },
    offset: { type: [Number, Array] as PropType<number | number[]>, default: () => ([0, 1]) },
    closeOnContentClick: { type: Boolean, default: true },
  },

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)

    const computedIcon = computed<string>(() => {
      return valueComputed.value ? props.openedIcon : props.icon
    })

    const computedClass = computed(() => ({
      'va-button-dropdown': true,
      'va-button-dropdown--split': props.split,
      'va-button-dropdown--normal': props.size === 'normal',
      'va-button-dropdown--large': props.size === 'large',
      'va-button-dropdown--small': props.size === 'small',
    }))

    const computedButtonIcons = computed(() => {
      const icon = (props.label || slots.label) && !props.leftIcon ? 'icon-right' : 'icon'
      return props.hideIcon ? {} : { [icon]: computedIcon.value }
    })

    return {
      valueComputed,
      computedIcon,
      computedClass,
      listeners: createListeners(emit),
      mainButtonListeners: createMainButtonListeners(emit),
      computedButtonIcons,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-button-dropdown {
  display: inline-block;
  font-family: var(--va-font-family);

  .va-button {
    margin: var(--va-button-dropdown-button-margin);
  }

  &--split {
    .va-dropdown {
      .va-dropdown__anchor {
        margin: 0;
      }

      .va-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}
</style>
