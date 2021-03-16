<template>
  <transition name="va-toast-fade">
    <div
      v-show="visible"
      class="va-toast"
      :class="toastClasses"
      :style="toastStyles"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="onToastClick()"
      role="alert"
    >
      <template>
        <slot name="prepend" />
      </template>
      <div class="va-toast__group">
        <h2 v-if="$props.title" class="va-toast__title" v-text="$props.title"></h2>
        <div class="va-toast__content" v-show="$props.message">
          <slot>
            <p v-if="!$props.dangerouslyUseHTMLString" v-text="$props.message"></p>
            <p v-else v-html="$props.message"></p>
          </slot>
        </div>
        <div
          v-if="$slots.append"
          @click.stop="onToastClose"
        >
          <slot name="append" />
        </div>
        <va-icon
          v-else-if="$props.closeable"
          size="small"
          name="close"
          class="va-toast__close-icon"
          @click.stop="onToastClose"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { watch, PropType } from 'vue'
import { Options, Vue, prop, mixins } from 'vue-class-component'

import ColorMixin from '../../../services/color-config/ColorMixin'
import VaIcon from '../va-icon'

import { NotificationPosition } from './types'

class ToastProps {
  title = prop<string>({ type: String, default: '' })
  offsetY = prop<number>({ type: Number, default: 16 })
  offsetX = prop<number>({ type: Number, default: 16 })
  message = prop<string | Function>({ type: [String, Function], default: '' })
  iconClass = prop<string>({ type: String, default: '' })
  customClass = prop<string>({ type: String, default: '' })
  duration = prop<number>({ type: Number, default: 20000 })
  color = prop<string>({ type: String, default: '' })
  closeable = prop<boolean>({ type: Boolean, default: true })
  dangerouslyUseHTMLString = prop<boolean>({ type: Boolean, default: false })
  onClose = prop<Function>({ type: Function as PropType<() => void> })
  onClick = prop<Function>({ type: Function as PropType<() => void> })
  position = prop<string>({
    type: String as PropType<NotificationPosition>,
    default: 'top-right',
  })
}

const ToastPropsMixin = Vue.with(ToastProps)

@Options({
  name: 'VaToast',
  components: { VaIcon },
  emits: ['click', 'close'],
})
export default class VaToast extends mixins(
  ColorMixin,
  ToastPropsMixin,
) {
  private closed = false
  private timer: number | null = null

  public visible = true

  created () {
    watch(() => this.closed, (value) => {
      if (value) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    })
  }

  get positionX (): 'right' | 'left' {
    return this.position.includes('right') ? 'right' : 'left'
  }

  get positionY (): 'top' | 'bottom' {
    return this.position.includes('top') ? 'top' : 'bottom'
  }

  get toastClasses () {
    return [this.customClass]
  }

  get toastStyles () {
    return {
      [this.positionY]: `${this.offsetY}px`,
      [this.positionX]: `${this.offsetX}px`,
      backgroundColor: this.colorComputed,
    }
  }

  destroyElement () {
    this.$el.removeEventListener('transitionend', this.destroyElement)

    // TODO: not sure if this is really needed (it doesn't work in vue3)
    // this.$destroy() // or this.$destroy(true)

    this.$el.remove() // or this.$el.parentNode?.removeChild(this.$el)
  }

  onToastClick () {
    if (typeof this.$props.onClick === 'function') {
      this.$props.onClick()
      return
    }
    this.$emit('click')
  }

  onToastClose () {
    this.closed = true
    if (typeof this.$props.onClose === 'function') {
      this.$props.onClose()
      return
    }
    this.$emit('close')
  }

  clearTimer () {
    clearTimeout(this.timer as number)
  }

  startTimer () {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.onToastClose()
        }
      }, this.duration)
    }
  }

  onKeydown (e: KeyboardEvent) {
    // Reset timer if user press Delete or Backspace. I'm not sure we need this
    if (e.keyCode === 46 || e.keyCode === 8) {
      this.clearTimer()
      // Close if user press Escape
    } else if (e.keyCode === 27) {
      if (!this.closed) {
        this.onToastClose()
      }
    } else {
      this.startTimer()
    }
  }

  mounted () {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.onToastClose()
        }
      }, this.duration)
    }
    document.addEventListener('keydown', this.onKeydown)
  }

  beforeUnmount () {
    document.removeEventListener('keydown', this.onKeydown)
  }
}
</script>
<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-toast {
  display: flex;
  width: $toast-width;
  padding: $toast-padding;
  border-radius: $toast-radius;
  box-sizing: border-box;
  border: 1px solid $toast-border-color;
  position: fixed;
  background-color: white;
  color: #ffffff;
  box-shadow: $toast-shadow;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s;
  overflow: hidden;

  &--right {
    right: 16px;
  }

  &--left {
    left: 16px;
  }

  &__group {
    margin-left: $toast-group-margin-left;
    margin-right: $toast-group-margin-right;
  }

  &__title {
    font-weight: bold;
    font-size: $toast-title-font-size;
    color: $toast-title-color;
    margin: 0 0 6px;
  }

  &__content {
    font-size: $toast-content-font-size;
    line-height: 21px;
    padding-right: 20px;

    p {
      margin: 0;
    }
  }

  &__icon {
    height: $toast-icon-size;
    width: $toast-icon-size;
    font-size: $toast-icon-size;
  }

  &__close-icon {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    font-size: $toast-close-font-size;

    &:hover {
      color: $toast-close-hover-color;
    }
  }
}

.va-toast-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.va-toast-fade-leave-active {
  opacity: 0;
}

</style>
