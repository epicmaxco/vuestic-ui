<template>
  <div :class="computedClass">
    <va-dropdown
      v-if="!$props.split"
      :disabled="$props.disabled"
      :placement="$props.placement"
      :offset="$props.offset"
      :keep-anchor-width="$props.keepAnchorWidth"
      :close-on-content-click="$props.closeOnContentClick"
      :stateful="$props.stateful"
      v-model="valueComputed"
    >
      <template #anchor>
        <va-button
          :disabled="$props.disabled"
          :round="!$props.label && !$slots.label"
          v-bind="{ ...computedButtonIcons, ...computedViewStyles }"
          v-on="listeners"
          @keydown.esc.prevent="hideDropdown"
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
      :class="{ 'va-button-group__left-icon': $props.leftIcon }"
      v-bind="computedViewStyles"
    >
      <va-button
        v-if="!$props.leftIcon"
        :disabled="$props.disabled || $props.disableButton"
        v-bind="computedMainButtonProps"
        v-on="mainButtonListeners"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </va-button>

      <va-dropdown
        :disabled="$props.disabled || $props.disableDropdown"
        :placement="$props.placement"
        :offset="$props.offset"
        :stateful="$props.stateful"
        :close-on-content-click="$props.closeOnContentClick"
        prevent-overflow
        v-model="valueComputed"
      >
        <template #anchor>
          <va-button
            aria-label="toggle dropdown"
            :disabled="$props.disabled || $props.disableDropdown"
            :icon="computedIcon"
            v-on="listeners"
            @keydown.esc.prevent="hideDropdown"
          />
        </template>
        <va-dropdown-content>
          <slot />
        </va-dropdown-content>
      </va-dropdown>

      <va-button
        v-if="$props.leftIcon"
        :disabled="$props.disabled || $props.disableButton"
        v-bind="computedMainButtonProps"
        v-on="mainButtonListeners"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </va-button>
    </va-button-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import pick from 'lodash/pick.js'

import { useStateful, useStatefulProps, useEmitProxy, Placement, placementsPositions } from '../../composables'

import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'

const { createEmits, createVOnListeners: createListeners } = useEmitProxy(
  ['click'],
)

const { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [{ listen: 'click', emit: 'main-button-click' }],
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
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (value: string) => ['medium', 'small', 'large'].includes(value),
    },
    outline: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
    rounded: { type: Boolean, default: true },
    gradient: { type: Boolean, default: undefined },

    icon: { type: String, default: 'expand_more' },
    openedIcon: { type: String, default: 'expand_less' },
    hideIcon: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },

    disableButton: { type: Boolean, default: false },
    disableDropdown: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
      validator: (placement: string) => placementsPositions.includes(placement),
    },
    offset: { type: [Number, Array] as PropType<number | [number, number]>, default: 2 },
    keepAnchorWidth: { type: Boolean, default: false },
    closeOnContentClick: { type: Boolean, default: true },

    split: { type: Boolean },
    splitTo: { type: String, default: '' },
    splitHref: { type: String, default: '' },

    loading: { type: Boolean, default: false },
    label: { type: String },
  },

  setup (props, { emit, slots }) {
    const { valueComputed } = useStateful(props, emit)

    const computedIcon = computed<string>(() => {
      return valueComputed.value ? props.openedIcon : props.icon
    })

    const computedClass = computed(() => ({
      'va-button-dropdown': true,
      'va-button-dropdown--split': props.split,
      'va-button-dropdown--normal': props.size === 'medium',
      'va-button-dropdown--large': props.size === 'large',
      'va-button-dropdown--small': props.size === 'small',
    }))

    const computedButtonIcons = computed(() => {
      const propName = (props.label || slots.label) && !props.leftIcon ? 'icon-right' : 'icon'
      return props.hideIcon ? {} : { [propName]: computedIcon.value }
    })

    const computedViewStyles = computed(
      () => pick(props, ['outline', 'gradient', 'rounded', 'flat', 'size', 'color']),
    )

    const computedMainButtonProps = computed(() => ({
      to: props.splitTo,
      href: props.splitHref,
      loading: props.loading,
    }))

    const hideDropdown = () => { valueComputed.value = false }

    return {
      hideDropdown,
      valueComputed,
      computedIcon,
      computedClass,
      listeners: createListeners(emit),
      mainButtonListeners: createMainButtonListeners(emit),
      computedButtonIcons,
      computedViewStyles,
      computedMainButtonProps,
    }
  },
})
</script>

<style lang="scss">
  @import 'variables';

  .va-button-dropdown {
    display: inline-block;
    font-family: var(--va-font-family);
    vertical-align: middle;

    .va-button {
      margin: var(--va-button-dropdown-button-margin);
    }

    &--split {
      .va-dropdown {
        .va-dropdown__anchor {
          margin: var(--va-button-dropdown-button-margin);
        }
      }

      .va-button-group__left-icon {
        .va-dropdown {
          .va-button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }

        > .va-button {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
        }
      }

      :not(.va-button-group__left-icon) {
        .va-dropdown {
          .va-button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
  }
</style>
