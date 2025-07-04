<template>
  <transition
    name="fade"
  >
    <div
      v-if="valueComputed"
      class="va-alert"
      :style="alertStyle"
      role='alert'
    >
      <div
        :style="borderStyle"
        :class="borderClass"
        class="va-alert__border"
      />

      <div
        v-if="hasIcon"
        :style="contentStyle"
        class="va-alert__icon"
        aria-hidden="true"
      >
        <slot name="icon">
          <va-icon :name="icon" />
        </slot>
      </div>

      <div
        :style="contentStyle"
        class="va-alert__content"
      >
        <div
          v-if="hasTitle"
          :style="titleStyle"
          class="va-alert__title"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <span>
          <slot>
            {{ $props.description }}
          </slot>
        </span>
      </div>

      <div
        v-if="closeable"
        class="va-alert__close"
      >
        <div
          role="button"
          class="va-alert__close--closeable"
          tabindex="0"
          :aria-label="closeText || t('closeAlert')"
          :style="contentStyle"
          @click="hide"
          @keydown.space="hide"
          @keydown.enter="hide"
        >
          <slot name="close">
            <va-icon
              v-if="!closeText"
              :name="closeIcon"
            />
            {{ closeText }}
          </slot>
        </div>
      </div>

    </div>
  </transition>

</template>

<script lang="ts" setup>
import { computed, PropType, useSlots } from 'vue'

import {
  useComponentPresetProp,
  useStateful, useStatefulProps, useStatefulEmits,
  useTranslation,
  ColorName,
} from '../../composables'

import { useAlertStyles } from './useAlertStyles'

import { VaIcon, VaIconName } from '../va-icon'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { VaAlert } from '.'

defineOptions({
  name: 'VaAlert',
})

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,

  modelValue: { type: Boolean, default: true },
  stateful: { type: Boolean, default: true },
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  textColor: { type: String, default: '' },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String as PropType<StringWithAutocomplete<VaIconName>>, default: '' },
  closeText: { type: String, default: '' },
  closeIcon: { type: String, default: 'close' },
  closeable: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
  outline: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  borderColor: { type: String, default: '' },
  border: {
    type: String as PropType<'top' | 'right' | 'bottom' | 'left' | ''>,
    default: '',
    validator: (value: string) => ['top', 'right', 'bottom', 'left', ''].includes(value),
  },
})

const emit = defineEmits([...useStatefulEmits])

const {
  contentStyle,
  titleStyle,
  alertStyle,
  borderStyle,
} = useAlertStyles(props)

const valueComputed = useStateful(props, emit)

const hide = () => { valueComputed.value = false }

const show = () => { valueComputed.value = true }

const slots = useSlots()

const hasIcon = computed(() => props.icon || slots.icon)

const hasTitle = computed(() => props.title || slots.title)

const borderClass = computed(() => `va-alert__border--${props.border}`)

const { tp, t } = useTranslation()

defineExpose({
  hide,
  show,
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-alert {
  position: var(--va-alert-position);
  padding: var(--va-alert-padding-y) var(--va-alert-padding-x);
  margin: var(--va-alert-margin-y) auto;
  display: var(--va-alert-display);
  align-items: var(--va-alert-align-items);
  border: var(--va-alert-border-width, var(--va-control-border)) solid transparent;
  border-radius: var(--va-alert-border-radius, var(--va-block-border-radius));
  font-family: var(--va-font-family);

  &__border {
    content: "";
    position: absolute;

    &--top {
      border-radius: var(--va-alert-top-border-radius);
      width: 100%;
      height: var(--va-alert-stripe-border-size);
      top: 0;
      left: 0;
    }

    &--right {
      border-radius: var(--va-alert-right-border-radius);
      height: 100%;
      width: var(--va-alert-stripe-border-size);
      bottom: 0;
      right: 0;
    }

    &--bottom {
      border-radius: var(--va-alert-bottom-border-radius);
      width: 100%;
      height: var(--va-alert-stripe-border-size);
      bottom: 0;
      left: 0;
    }

    &--left {
      border-radius: var(--va-alert-left-border-radius);
      height: 100%;
      width: var(--va-alert-stripe-border-size);
      bottom: 0;
      left: 0;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    padding-right: var(--va-alert-padding-x);
  }

  &__title {
    display: flex;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    color: var(--va-alert-color);
  }

  @include keyboard-focus-outline;

  &__close {
    padding-left: var(--va-alert-close-padding-x);
    font-size: var(--va-alert-close-font-size);

    &--closeable {
      display: flex;
      align-items: center;
      cursor: pointer;

      @include keyboard-focus-outline;
    }
  }

  @include media-breakpoint-down(xs) {
    @at-root {
      .va-alert {
        &__content {
          flex-direction: column;
          align-items: flex-start;
        }

        &__close {
          align-self: flex-start;
          display: flex;
          align-items: flex-start;
          padding: 0 var(--va-alert-close-padding-x) 0 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
