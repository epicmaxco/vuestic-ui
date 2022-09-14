<template>
  <div class="va-button-dropdown" :class="computedClass">
    <va-dropdown
      v-if="!$props.split"
      v-model="valueComputed"
      :disabled="$props.disabled"
      :placement="$props.placement"
      :offset="$props.offset"
      :keep-anchor-width="$props.keepAnchorWidth"
      :close-on-content-click="$props.closeOnContentClick"
      :stateful="$props.stateful"
    >
      <template #anchor>
        <va-button
          v-bind="{ ...computedButtonIcons, ...buttonPropsComputed }"
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
      :class="splitButtonClassComputed"
      v-bind="buttonPropsComputed"
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
        v-model="valueComputed"
        :disabled="$props.disabled || $props.disableDropdown"
        :placement="$props.placement"
        :offset="$props.offset"
        :stateful="$props.stateful"
        :close-on-content-click="$props.closeOnContentClick"
        prevent-overflow
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
import { defineComponent, PropType, computed } from 'vue'
import { extractComponentProps } from '../../utils/child-props'

import {
  useBem,
  useDeprecatedProps,
  useComponentPresetProp,
  useStateful, useStatefulProps,
  useEmitProxy,
  Placement, placementsPositions,
} from '../../composables'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'

import omit from 'lodash/omit.js'

const { createEmits, createVOnListeners: createListeners } = useEmitProxy(['click'])
const { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [{ listen: 'click', emit: 'main-button-click' }],
)

const VaButtonProps = omit(extractComponentProps(VaButton), ['iconRight', 'block'])

export default defineComponent({
  name: 'VaButtonDropdown',
  components: {
    VaButton,
    VaDropdown,
    VaButtonGroup,
    VaDropdownContent,
  },
  emits: ['update:modelValue', ...createEmits(), ...createMainButtonEmits()],
  props: {
    ...useComponentPresetProp,
    ...VaButtonProps,
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },

    icon: { type: String, default: 'expand_more' },
    openedIcon: { type: String, default: 'expand_less' },
    hideIcon: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },

    disabled: { type: Boolean, default: false },
    disableButton: { type: Boolean, default: false },
    disableDropdown: { type: Boolean, default: false },

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
    // TODO(1.6.0): Remove deprecated props
    useDeprecatedProps(['flat', 'outline'])

    const { valueComputed } = useStateful(props, emit)

    const computedIcon = computed(() => valueComputed.value ? props.openedIcon : props.icon)

    const computedClass = useBem('va-button-dropdown', () => ({
      split: props.split,
    }))

    const computedButtonIcons = computed(() => {
      if (props.hideIcon) { return {} }

      const propName = (props.label || slots.label) && !props.leftIcon ? 'icon-right' : 'icon'
      return { [propName]: computedIcon.value }
    })

    const buttonPropsFiltered = computed(() => {
      let ignoredProps = ['to', 'href', 'loading', 'icon']
      const presetProps = [
        'plain',
        'textOpacity', 'backgroundOpacity',
        'hoverOpacity', 'hoverBehaviour', 'hoverOpacity',
        'pressedOpacity', 'pressedBehaviour', 'pressedOpacity',
      ]

      if (props.preset) {
        ignoredProps = [...ignoredProps, ...presetProps]
      }

      const filteredProps = omit(VaButtonProps, ignoredProps)
      return Object.keys(filteredProps)
    })
    const buttonPropsComputed = computed(
      () => Object.entries(props)
        .filter(([key, _]) => buttonPropsFiltered.value.includes(key))
        .reduce((acc, [key, value]) => {
          Object.assign(acc, { [key]: value })
          return acc
        }, {}),
    )

    const computedMainButtonProps = computed(() => ({
      to: props.splitTo,
      href: props.splitHref,
      loading: props.loading,
    }))

    const splitButtonClassComputed = computed(() => ({ 'va-button-group__left-icon': props.leftIcon }))

    const hideDropdown = () => { valueComputed.value = false }

    return {
      hideDropdown,
      valueComputed,
      computedIcon,
      computedClass,
      computedButtonIcons,
      buttonPropsComputed,
      computedMainButtonProps,
      splitButtonClassComputed,
      listeners: createListeners(emit),
      mainButtonListeners: createMainButtonListeners(emit),
    }
  },
})
</script>

<style lang="scss">
  @import 'variables';
  @import '../../styles/resources';

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

      .va-button {
        @include keyboard-focus-outline($offset: -2px);
      }
    }
  }
</style>
