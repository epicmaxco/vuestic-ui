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
      class="va-alert__border"
      :class="borderClass"
      :style="borderStyle"
    />

      <div
        class="va-alert__icon"
        v-if="hasIcon"
      >
        <slot name="icon">
          <va-icon
            :color="color"
            :name="icon"
          />
        </slot>
      </div>

      <div
        class="va-alert__content"
        :style="contentStyle"
      >
        <div
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
          class="va-alert__close--closeable"
          @click="hide()"
        >
          <slot name="close">
            <va-icon v-if="!closeText"
              :color="color"
              :name="closeIcon"
            />
            {{closeText}}
          </slot>
        </div>
      </div>

    </div>
  </transition>
</template>

<script lang="ts">
import { Options, prop, mixins, Vue } from 'vue-class-component'

import {
  getHoverColor,
  getBoxShadowColor,
} from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

import VaIcon from '../va-icon'

class AlertProps {
  title = prop<string>({ type: String, default: '' })
  description = prop<string>({ type: String, default: '' })
  icon = prop<string>({ type: String, default: '' })
  closeIcon = prop<string>({ type: String, default: 'close' })
  closeText = prop<string>({ type: String, default: '' })
  closeable = prop<boolean>({ type: Boolean, default: false })
  center = prop<boolean>({ type: Boolean, default: false })
  borderColor = prop<string>({ type: String, default: '' })
  border = prop<string>({
    type: String,
    default: '',
    validator: (value: string) => {
      return ['top', 'right', 'bottom', 'left', ''].includes(value)
    },
  })

  modelValue = prop<boolean>({
    type: Boolean,
    default: true,
  })
}

const AlertPropsMixin = Vue.with(AlertProps)

@Options({
  name: 'VaAlert',
  components: { VaIcon },
})
export default class VaAlert extends mixins(
  StatefulMixin,
  ColorMixin,
  AlertPropsMixin,
) {
  get hasIcon () {
    return this.$props.icon || this.$slots.icon
  }

  get hasTitle () {
    return this.$props.title || this.$slots.title
  }

  get alertStyle () {
    return {
      background: getHoverColor(this.colorComputed),
      boxShadow: '0 0.125rem 0.125rem 0 ' + getBoxShadowColor(this.colorComputed),
    }
  }

  get contentStyle () {
    return {
      alignItems: this.$props.center && 'center',
    }
  }

  get borderClass () {
    return `va-alert__border--${this.$props.border}`
  }

  get borderStyle () {
    return {
      backgroundColor: this.$props.borderColor
        ? this.theme.getColor(this.$props.borderColor)
        : this.colorComputed,
    }
  }

  hide (): void {
    this.valueComputed = false
  }
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

// Border border-radius
$va-alert__border--top: 0.5rem 0.5rem 0 0;
$va-alert__border--right: 0 0.5rem 0.5rem 0;
$va-alert__border--bottom: 0 0 0.5rem 0.5rem;
$va-alert__border--left: 0.5rem 0 0 0.5rem;

// Alerts
$va-alert-margin-y: 0.25rem;
$va-alert-padding-x: 0.75rem;
$va-alert-padding-y: 0.75rem;
$va-alert-border: 0;
$va-alert-border-radius: 0.5rem;
$va-alert-box-shadow: 0.125rem;

// Alert paddings with border
$va-alert__border-padding-x: $va-alert-padding-x + 0.375rem;
$va-alert__border-padding-y: $va-alert-padding-y + 0.375rem;

// Badge
$va-badge-margin-right: 0.5rem;
$va-badge-padding-x: 0.5rem;
$va-badge-padding-y: 0.125rem;
$va-badge-border-radius: 0.5rem;
$va-badge-font-size: 0.625rem;
$va-badge-letter-spacing: 0.0625rem;

// Close
$va-close-padding-x: 0.5rem;
$va-close-padding-y: 0.0625rem;
$va-close-font-size: 1rem;

.va-alert {
  position: relative;
  padding: $va-alert-padding-y $va-alert-padding-x;
  margin: $va-alert-margin-y auto;
  display: flex;
  align-items: center;
  border: $va-alert-border solid transparent;
  border-radius: $va-alert-border-radius;

  &__border {
    content: '';
    position: absolute;

    &--top {
      border-radius: $va-alert__border--top;
      width: 100%;
      height: 0.375rem;
      top: 0;
      left: 0;
    }

    &--right {
      border-radius: $va-alert__border--right;
      height: 100%;
      width: 0.375rem;
      bottom: 0;
      right: 0;
    }

    &--bottom {
      border-radius: $va-alert__border--bottom;
      width: 100%;
      height: 0.375rem;
      bottom: 0;
      left: 0;
    }

    &--left {
      border-radius: $va-alert__border--left;
      height: 100%;
      width: 0.375rem;
      bottom: 0;
      left: 0;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    padding-right: $va-alert-padding-x;
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
  }

  &__close {
    padding-left: $va-close-padding-x;
    font-size: $va-close-font-size;

    &--closeable {
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
          padding: 0;
          padding-right: $va-close-padding-x;
          margin: 0;
        }
      }
    }
  }
}
</style>
