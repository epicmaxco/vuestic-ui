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
      <va-icon
        v-if="type || iconClass"
        class="va-toast__icon"
        :class="[ toastTypeIconClass, iconClass ]"
        :name="type === 'success' ? 'check_circle' : type"
      />
      <div class="va-toast__group">
        <h2 v-if="title" class="va-toast__title" v-text="title"></h2>
        <div class="va-toast__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString" v-text="message"></p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <va-icon
          v-if="closeable"
          size="small"
          name="close"
          class="va-toast__close-icon"
          :class="[ toastTypeIconClass, iconClass ]"
          @click.stop="closeToast"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { NotificationPosition, MessageType } from './types'
import { PropType } from 'vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import VaIcon from '../va-icon/VaIcon.vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

const toastTypes: Record<string, string> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'danger',
}

const ToastPropsMixin = makeContextablePropsMixin({
  title: { type: String, default: '' },
  message: { type: [String, Function], default: '' },
  type: { type: String as PropType<MessageType> },
  iconClass: { type: String, default: '' },
  customClass: { type: String, default: '' },
  duration: { type: Number, default: 4500 },
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
  public offsetY = 16
  public offsetX = 16

  get toastTypeIconClass () {
    return this.type && toastTypes[this.type] ? `va-icon-${toastTypes[this.type]}` : ''
  }

  get positionX () {
    return this.position.includes('right') ? 'right' : 'left'
  }

  get positionY () {
    return this.position.includes('top') ? 'top' : 'bottom'
  }

  get toastClasses () {
    return [
      this.customClass,
    ]
  }

  get toastStyles () {
    return {
      [this.positionY]: `${this.offsetY}px`,
      [this.positionX]: `${this.offsetX}px`,
      color: toastTypes[this.type] ? this.computeColor('white') : this.computeColor('black'),
      backgroundColor: this.type && toastTypes[this.type] ? this.computeColor(toastTypes[this.type]) : this.computeColor('white'),
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
    }
  }

  closeToast () {
    this.closed = true
    if (typeof this.onClose === 'function') {
      this.onClose()
    }
  }

  clearTimer () {
    clearTimeout(this.timer as number)
  }

  startTimer () {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.closeToast()
        }
      }, this.duration)
    }
  }

  keydown (e: KeyboardEvent) {
    if (e.keyCode === 46 || e.keyCode === 8) {
      this.clearTimer() // delete
    } else if (e.keyCode === 27) { // esc
      if (!this.closed) {
        this.closeToast()
      }
    } else {
      this.startTimer()
    }
  }

  mounted () {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.closeToast()
        }
      }, this.duration)
    }
    document.addEventListener('keydown', this.keydown)
  }

  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
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

  .va-icon-success {
    color: $toast-success-icon-color;
  }

  .va-icon-error {
    color: $toast-danger-icon-color;
  }

  .va-icon-info {
    color: $toast-info-icon-color;
  }

  .va-icon-warning {
    color: $toast-warning-icon-color;
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
