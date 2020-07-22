<template>
  <transition name="va-toast-fade">
    <div
      :class="['va-toast', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <va-icon
        v-if="type || iconClass"
        class="va-toast__icon"
        :class="[ typeClass, iconClass ]"
        :name="type === 'success' ? 'check_circle' : type"
      />
      <div class="va-toast__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 v-if="title" class="va-toast__title" v-text="title"></h2>
        <div class="va-toast__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <va-icon
          v-if="showClose"
          size="small"
          name="close"
          class="va-toast__closeBtn"
          @click.stop="close"
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

enum typeMap {
  success,
  info,
  warning,
  error,
}

const ToastPropsMixin = makeContextablePropsMixin({

  title: { type: String, default: '' },
  message: { type: [String, Function], default: '' },
  type: { type: String as PropType<MessageType> },
  iconClass: { type: String, default: '' },
  customClass: { type: String, default: '' },
  duration: { type: Number, default: 4500 },
  showClose: { type: Boolean, default: true },
  dangerouslyUseHTMLString: { type: Boolean, default: false },
  onClose: { type: [Function as PropType<() => void>, undefined] },
  onClick: { type: [Function as PropType<() => void>, undefined] },
  position: { type: String as PropType<NotificationPosition>, default: 'top-right' },
})

@Component({
  name: 'VaToast',
  components: { VaIcon },
})
export default class Toast extends Mixins(ToastPropsMixin) {
  private closed = false;
  private timer: number | null = null;

  public visible = false;
  public verticalOffset = 0;

  get typeClass () {
    return this.type && typeMap[this.type] ? `va-icon-${typeMap[this.type]}` : ''
  }

  get horizontalClass () {
    return this.position.indexOf('right') > -1 ? 'right' : 'left'
  }

  get verticalProperty () {
    return /^top-/.test(this.position) ? 'top' : 'bottom'
  }

  get positionStyle () {
    return {
      [this.verticalProperty]: `${this.verticalOffset}px`,
    }
  }

  @Watch('closed')
  onClosed (value: boolean) {
    if (value) {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroyElement)
    }
  }

  destroyElement () {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    this.$destroy() // or this.$destroy(true)
    this.$el.remove() // or this.$el.parentNode?.removeChild(this.$el)
  }

  click () {
    if (typeof this.onClick === 'function') {
      this.onClick()
    }
  }

  close () {
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
          this.close()
        }
      }, this.duration)
    }
  }

  keydown (e: KeyboardEvent) {
    if (e.keyCode === 46 || e.keyCode === 8) {
      this.clearTimer() // detele
    } else if (e.keyCode === 27) { // esc
      if (!this.closed) {
        this.close()
      }
    } else {
      this.startTimer()
    }
  }

  mounted () {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.close()
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

  &.right {
    right: 16px;
  }

  &.left {
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
    color: $toast-content-color;

    p {
      margin: 0;
    }
  }

  &__icon {
    height: $toast-icon-size;
    width: $toast-icon-size;
    font-size: $toast-icon-size;
  }

  &__closeBtn {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: $toast-close-color;
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
