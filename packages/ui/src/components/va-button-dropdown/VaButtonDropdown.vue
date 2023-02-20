<template>
  <div class="va-button-dropdown" :class="computedClass">
    <va-dropdown
      v-if="!$props.split"
      v-bind="vaDropdownProps"
      v-model="valueComputed"
      :disabled="$props.disabled || $props.disableDropdown"
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

      <slot name="content">
        <va-dropdown-content>
          <slot />
        </va-dropdown-content>
      </slot>
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
        v-bind="vaDropdownProps"
        :disabled="$props.disabled || $props.disableDropdown"
      >
        <template #anchor>
          <va-button
            :aria-label="t('toggleDropdown')"
            :disabled="$props.disabled || $props.disableDropdown"
            :icon="computedIcon"
            :icon-color="$props.iconColor"
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
import omit from 'lodash/omit.js'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  useBem,
  useComponentPresetProp,
  useStateful, useStatefulProps,
  useEmitProxy,
  usePlacementAliasesProps,
  useTranslation,
} from '../../composables'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'

const { createEmits, createVOnListeners: createListeners } = useEmitProxy(['click'])
const { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [{ listen: 'click', emit: 'main-button-click' }],
)

const VaButtonProps = omit(extractComponentProps(VaButton), ['iconRight', 'block'])
const VaDropdownProps = extractComponentProps(VaDropdown)

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
    ...VaDropdownProps,
    ...useStatefulProps,
    ...usePlacementAliasesProps,
    modelValue: { type: Boolean, default: false },
    stateful: { type: Boolean, default: true },

    icon: { type: String, default: 'va-arrow-down' },
    openedIcon: { type: String, default: 'va-arrow-up' },
    hideIcon: { type: Boolean, default: false },
    leftIcon: { type: Boolean, default: false },
    iconColor: { type: String, default: '' },

    disabled: { type: Boolean, default: false },
    disableButton: { type: Boolean, default: false },
    disableDropdown: { type: Boolean, default: false },

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
        'hoverOpacity', 'hoverBehavior', 'hoverOpacity',
        'pressedOpacity', 'pressedBehavior', 'pressedOpacity',
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
      ...useTranslation(),
      vaDropdownProps: filterComponentProps(VaDropdownProps),
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
