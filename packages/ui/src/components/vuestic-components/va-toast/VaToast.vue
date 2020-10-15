<template>
  <transition name="va-toast-fade">
    <div
      v-show="visible"
      class="va-toast"
      :class="toastClasses"
      :style="toastStyles"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="onToastClick"
      role="alert"
    >
      <template>
        <slot name="prepend" />
      </template>
      <div class="va-toast__group">
        <h2 v-if="title" class="va-toast__title" v-text="title"></h2>
        <div class="va-toast__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString" v-text="message"></p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <div
          v-if="$slots.append"
          @click.stop="onToastClose"
        >
          <slot name="append" />
        </div>
        <va-icon
          v-else-if="closeable"
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
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { NotificationPosition } from './types'
import { PropType } from 'vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaIcon from '../va-icon/VaIcon.vue'

const ToastPropsMixin = makeContextablePropsMixin({
  title: { type: String, default: '' },
  offsetY: { type: Number, default: 16 },
  offsetX: { type: Number, default: 16 },
  message: { type: [String, Function], default: '' },
  iconClass: { type: String, default: '' },
  customClass: { type: String, default: '' },
  duration: { type: Number, default: 20000 },
  color: { type: String, default: '' },
  closeable: { type: Boolean, default: true },
  dangerouslyUseHTMLString: { type: Boolean, default: false },
  onClose: { type: [Function as PropType<() => void>, undefined] },
  onClick: { type: [Function as PropType<() => void>, undefined] },
  position: {
    type: String as PropType<NotificationPosition>,
    default: 'top-right',
  },
})

@Component({
  name: 'VaToast',
  components: { VaIcon },
})
export default class VaToast extends Mixins(
  ColorThemeMixin,
  ToastPropsMixin,
) {
  @Watch('closed')
  onClosed (value: boolean) {
    if (value) {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroyElement)
    }
  }

  private closed = false
  private timer: number | null = null

  public visible = false

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
    this.$destroy() // or this.$destroy(true)
    this.$el.remove() // or this.$el.parentNode?.removeChild(this.$el)
  }

  onToastClick () {
    if (typeof this.onClick === 'function') {
      this.onClick()
      return
    }
    this.$emit('onClick')
  }

  onToastClose () {
    this.closed = true
    if (typeof this.onClose === 'function') {
      this.onClose()
      return
    }
    this.$emit('onClose')
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

  beforeDestroy () {
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
