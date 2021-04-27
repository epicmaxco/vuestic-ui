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
            {{ closeText }}
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
@import "variables";

.va-alert {
  position: var(--va-alert-position);
  padding: var(--va-alert-padding-y) var(--va-alert-padding-x);
  margin: var(--va-alert-margin-y) auto;
  display: var(--va-alert-display);
  align-items: var(--va-alert-align-items);
  border: var(--va-alert-border-width, var(--va-control-border)) solid transparent;
  border-radius: var(--va-alert-border-radius, var(--va-block-border-radius));

  &__border {
    content: '';
    position: absolute;

    &--top {
      border-radius: var(--va-alert-top-border-radius);
      width: 100%;
      height: 0.375rem;
      top: 0;
      left: 0;
    }

    &--right {
      border-radius: var(--va-alert-right-border-radius);
      height: 100%;
      width: 0.375rem;
      bottom: 0;
      right: 0;
    }

    &--bottom {
      border-radius: var(--va-alert-bottom-border-radius);
      width: 100%;
      height: 0.375rem;
      bottom: 0;
      left: 0;
    }

    &--left {
      border-radius: var(--va-alert-left-border-radius);
      height: 100%;
      width: 0.375rem;
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

  &__close {
    padding-left: var(--va-alert-close-padding-x);
    font-size: var(--va-alert-close-font-size);

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
          padding: 0 var(--va-alert-close-padding-x) 0 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
