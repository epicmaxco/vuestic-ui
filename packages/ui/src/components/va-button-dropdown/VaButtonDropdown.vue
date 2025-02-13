<template>
  <va-dropdown
    v-if="!$props.split"
    v-bind="vaDropdownProps"
    v-model="valueComputed"
    :disabled="$props.disabled || $props.disableDropdown"
    :class="['va-button-dropdown']"
  >
    <template #anchor>
      <va-button
        :aria-label="tp($props.ariaLabel)"
        v-bind="{ ...computedButtonIcons, ...buttonPropsComputed }"
        v-on="listeners"
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
    v-bind="buttonPropsComputed"
    :class="['va-button-dropdown', 'va-button-dropdown--split']"
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
      v-bind="vaDropdownProps"
      v-model="valueComputed"
      :disabled="$props.disabled || $props.disableDropdown"
    >
      <template #anchor>
        <va-button
          :aria-label="$props.ariaLabel || t('toggleDropdown')"
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
</template>

<script lang="ts">
import { PropType, computed, useSlots } from 'vue'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  useBem,
  useComponentPresetProp,
  useStateful, useStatefulProps,
  useEmitProxy,
  usePlacementAliasesProps,
  useTranslation, useTranslationProp,
} from '../../composables'

import { VaButton } from '../va-button'
import { VaButtonGroup } from '../va-button-group'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { omit } from '../../utils/omit'

const { createEmits, createVOnListeners: createListeners } = useEmitProxy(['click'])
const { createEmits: createMainButtonEmits, createVOnListeners: createMainButtonListeners } = useEmitProxy(
  [{ listen: 'click', emit: 'main-button-click' }],
)

const VaButtonProps = omit(extractComponentProps(VaButton), ['iconRight', 'block'])
const VaDropdownProps = extractComponentProps(VaDropdown)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaButtonDropdown',
})

const props = defineProps({
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

  ariaLabel: useTranslationProp('$t:toggleDropdown'),
})

const emit = defineEmits(['update:modelValue', ...createEmits(), ...createMainButtonEmits()])

const valueComputed = useStateful(props, emit)

const computedIcon = computed(() => valueComputed.value ? props.openedIcon : props.icon)

const slots = useSlots()

const computedButtonIcons = computed(() => {
  if (props.hideIcon) { return {} }

  const propName = (props.label || slots.label) && !props.leftIcon ? 'icon-right' : 'icon'
  return { [propName]: computedIcon.value }
})

const buttonPropsFiltered = computed(() => {
  const ignoredProps = ['to', 'href', 'loading', 'icon'] as const
  const presetProps = [
    'plain',
    'textOpacity', 'backgroundOpacity',
    'hoverOpacity', 'hoverBehavior', 'hoverOpacity',
    'pressedOpacity', 'pressedBehavior', 'pressedOpacity',
  ] as const

  if (props.preset) {
    return Object.keys(omit(VaButtonProps, [...ignoredProps, ...presetProps]))
  }

  return Object.keys(omit(VaButtonProps, ignoredProps))
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

const hideDropdown = () => { valueComputed.value = false }

const vaDropdownProps = filterComponentProps(VaDropdownProps)
const listeners = createListeners(emit)
const mainButtonListeners = createMainButtonListeners(emit)

const { t, tp } = useTranslation()

defineExpose({
  hideDropdown,
})
</script>

<style lang="scss">
@import 'variables';
@import '../../styles/resources';

.va-button-dropdown {
  .va-button {
    margin: var(--va-button-dropdown-button-margin);
  }
}
</style>
