<template>
  <transition name="va-toast-fade">
    <div
      v-show="visible"
      :class="['va-toast', $props.multiLine ? 'va-toast--multiline' : '', ...toastClasses]"
      :style="toastStyles"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="onToastClick()"
      role="alert"
    >
      <div class="va-toast__group">
        <h2 v-if="title" class="va-toast__title" v-text="title"></h2>

        <div class="va-toast__content" v-show="message">
          <p v-text="message"></p>
        </div>

        <div class="va-toast__content" v-if="render">
          <VaToastRenderer :content="render" />
        </div>

        <va-icon
          v-if="closeable"
          size="small"
          :name="icon"
          class="va-toast__close-icon"
          @click.stop="onToastClose"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { h, watch } from 'vue'
import { prop, mixins, Vue, Options } from 'vue-class-component'
import VaIcon from '../va-icon/VaIcon.vue'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { NotificationPosition } from './types'

class ToastProps {
  title = prop<string>({ type: String, default: '' })
  offsetY = prop<number>({ type: Number, default: 16 })
  offsetX = prop<number>({ type: Number, default: 16 })
  message = prop<string | Function>({ type: [String, Function] as any, default: '' })
  icon = prop<string>({ type: String, default: 'close' })
  customClass = prop<string>({ type: String, default: '' })
  duration = prop<number>({ type: Number, default: 5000 })
  color = prop<string>({ type: String, default: '' })
  closeable = prop<boolean>({ type: Boolean, default: true })
  onClose = prop<() => void>({ type: [Function, undefined] as any })
  onClick = prop<() => void>({ type: [Function, undefined] as any })
  multiLine = prop<boolean>({ type: Boolean, default: false })
  position = prop<NotificationPosition>({
    type: String as any,
    default: 'top-right',
    validator: (value: string) => {
      return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
    },
  })
  render = prop<any>({ type: Function, default: undefined })
}

class VaToastRendererProps {
  content = prop<any>({ type: Function, default: undefined })
}

const VaToastRendererPropsMixin = Vue.with(VaToastRendererProps)

@Options({
  name: 'VaToastRenderer',
})
class VaToastRenderer extends mixins(VaToastRendererPropsMixin) {
  render () {
    return this.content(h)
  }
}

const ToastPropsMixin = Vue.with(ToastProps)

@Options({
  name: 'VaToast',
  components: { VaIcon, VaToastRenderer },
  emits: ['on-click', 'on-close'],
})
export default class VaToast extends mixins(
  ColorMixin,
  ToastPropsMixin,
) {
  private timer: any = null
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
    this.visible = false
    this.$el.addEventListener('transitionend', this.destroyElement)
    if (typeof this.onClose === 'function') {
      this.onClose()
      return
    }
    this.$emit('close')
  }

  clearTimer () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  startTimer () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (this.visible) {
          this.onToastClose()
        }
      }, this.duration)
    }
  }

  mounted () {
    this.visible = true
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (this.visible) {
          this.onToastClose()
        }
      }, this.duration)
    }
  }
}
</script>
<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-toast {
  display: flex;
  width: $toast-width;
  padding: $toast-padding;
  align-items: center;
  border-radius: $toast-radius;
  box-sizing: border-box;
  border: 1px solid var(--va-toast-border-color);
  position: fixed;
  background-color: white;
  color: #ffffff;
  box-shadow: $toast-shadow;
  transition: opacity 0.3s, transform 0.3s, left 0.3s, right 0.3s, top 0.4s, bottom 0.3s;
  overflow: hidden;

  &--multiline {
    min-height: 70px;
  }

  &--right {
    right: 16px;
  }

  &--left {
    left: 16px;
  }

  &__group {
    margin-left: var(--va-toast-group-margin-left);
    margin-right: var(--va-toast-group-margin-right);
  }

  &__title {
    font-weight: var(--va-toast-title-font-weight);
    font-size: var(--va-toast-title-font-size);
    color: var(--va-toast-title-color);
    margin: var(--va-toast-title-margin);
  }

  &__content {
    font-size: var(--va-toast-content-font-size);
    line-height: var(--va-toast-content-line-height);
    padding-right: var(--va-toast-content-padding-right);

    p {
      margin: 0;
    }
  }

  &__icon {
    height: var(--va-toast-icon-height);
    width: var(--va-toast-icon-width);
    font-size: var(--va-toast-icon-font-size);
  }

  &__close-icon {
    position: absolute;
    top: 50%;
    right: 15px;
    cursor: pointer;
    transform: translateY(-50%);
    font-size: $toast-close-font-size;

    &:hover {
      color: var(--va-toast-hover-color);
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
