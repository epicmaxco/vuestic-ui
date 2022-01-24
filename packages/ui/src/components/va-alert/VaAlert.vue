<template>
  <transition
    v-if="valueComputed"
    name="fade"
  >
    <div
      class="va-alert"
      :style="alertStyle"
    >
      <div
        :style="borderStyle"
        :class="borderClass"
        class="va-alert__border"
      />

      <div
        :style="contentStyle"
        class="va-alert__icon"
        v-if="hasIcon"
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
          :style="titleStyle"
          class="va-alert__title"
          v-if="hasTitle"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <slot>
          {{ description }}
        </slot>
      </div>

      <div
        class="va-alert__close"
        v-if="closeable"
      >
        <div
          :style="contentStyle"
          class="va-alert__close--closeable"
          @click="hide()"
        >
          <slot name="close">
            <va-icon
              v-if="!closeText"
              :name="closeIcon"
              size="small"
            />
            {{ closeText }}
          </slot>
        </div>
      </div>

    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, Ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

import { getTextColor } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'
import { useStateful } from '../../mixins/StatefulMixin/cStatefulMixin'

import VaIcon from '../va-icon'

export default defineComponent({
  name: 'VaAlert',
  components: { VaIcon },
  props: {
    color: ({ type: String as PropType<string>, default: 'primary' }),
    title: ({ type: String as PropType<string>, default: '' }),
    description: ({ type: String as PropType<string>, default: '' }),
    icon: ({ type: String as PropType<string>, default: '' }),
    closeText: ({ type: String as PropType<string>, default: '' }),
    closeable: ({ type: Boolean as PropType<boolean>, default: false }),
    dense: ({ type: Boolean as PropType<boolean>, default: false }),
    outline: ({ type: Boolean as PropType<boolean>, default: false }),
    center: ({ type: Boolean as PropType<boolean>, default: false }),
    borderColor: ({ type: String as PropType<string>, default: '' }),
    border: ({
      type: String as PropType<string>,
      default: '',
      validator: (value: string) => ['top', 'right', 'bottom', 'left', ''].includes(value),
    }),
    modelValue: ({
      type: Boolean as PropType<boolean>,
      default: true,
    }),
  },
  setup (props, { slots, emit }) {
    const dark = 'var(--va-dark)'

    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    const hasIcon = computed(() => props.icon || slots.icon)
    const hasTitle = computed(() => props.title || slots.title)
    const borderClass = computed(() => `va-alert__border--${props.border}`)
    const closeIcon = computed(() => props.closeText || 'close')
    const alertStyle = computed(() => {
      let background = colorComputed.value
      let boxShadow = 'none'
      if (props.outline) {
        background = 'transparent'
      }
      if (props.border) {
        background = '#ffffff'
        boxShadow = 'var(--va-alert-box-shadow)'
      }
      return {
        border: props.outline && `1px solid ${colorComputed.value}`,
        padding: props.dense && '0.25rem 0.75rem',
        background,
        boxShadow,
      }
    })
    const contentStyle = computed(() => {
      let color = getTextColor(colorComputed.value)
      if (props.outline) {
        color = colorComputed.value
      }
      if (props.border) {
        color = dark
      }
      return {
        alignItems: props.center && 'center',
        color,
      }
    })
    const titleStyle = computed(() => {
      let color = getTextColor(colorComputed.value)
      if (props.outline) {
        color = colorComputed.value
      }
      if (props.border) {
        color = colorComputed.value
      }
      return { color }
    })
    const borderStyle = computed(() => ({
      backgroundColor: props.borderColor
        ? getColor(props.borderColor)
        : colorComputed.value,
    }))

    const { valueComputed } = useStateful(props, emit)
    const hide = () => { valueComputed.value = false }

    return {
      hasIcon,
      hasTitle,
      borderClass,
      closeIcon,
      alertStyle,
      contentStyle,
      titleStyle,
      borderStyle,
      hide,
    }
  },
})
</script>

<style lang='scss'>
@import "../../styles/resources";
@import "variables";

.va-alert {
  position: var(--va-alert-position);
  padding: var(--va-alert-padding-y) var(--va-alert-padding-x);
  margin: var(--va-alert-margin-y) auto;
  display: var(--va-alert-display);
  align-items: var(--va-alert-align-items);
  border:
    var(--va-alert-border-width, var(--va-control-border)) solid
    transparent;
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
    font-weight: var(--va-alert-title-font-weight);
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    color: var(--va-alert-color);
  }

  &__close {
    padding-left: var(--va-alert-close-padding-x);
    font-size: var(--va-alert-close-font-size);

    &--closeable {
      display: flex;
      align-items: center;
      cursor: pointer;
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
