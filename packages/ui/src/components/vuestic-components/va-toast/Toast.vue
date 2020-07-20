<template>
  <transition name="va-notification-fade">
    <div
      :class="['va-notification', customClass, horizontalClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
      role="alert"
    >
      <va-icon
        v-if="type || iconClass"
        class="va-notification__icon"
        :class="[ typeClass, iconClass ]"
        :name="type"
      />
      <div class="va-notification__group" :class="{ 'is-with-icon': typeClass || iconClass }">
        <h2 class="va-notification__title" v-text="title"></h2>
        <div class="va-notification__content" v-show="message">
          <slot>
            <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
            <p v-else v-html="message"></p>
          </slot>
        </div>
        <va-icon
          v-if="showClose"
          size="small"
          name="close"
          class="va-notification__closeBtn"
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
})
export default class VaIcon extends Mixins(ToastPropsMixin) {
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

  get cpositionStyle () {
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
/* Notification
-------------------------- */
$--notification-width: 330px !default;
/// padding||Spacing|3
$--notification-padding: 14px 26px 14px 13px !default;
$--notification-radius: 8px !default;
$--notification-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !default;
/// color||Color|0
$--notification-border-color: #ebeef5 !default;
$--notification-icon-size: 24px !default;
$--notification-close-font-size: 16px !default;
$--notification-group-margin-left: 13px !default;
$--notification-group-margin-right: 8px !default;
/// fontSize||Font|1
$--notification-content-font-size: 14px !default;
/// color||Color|0
$--notification-content-color: #606266 !default;
/// fontSize||Font|1
$--notification-title-font-size: 16px !default;
/// color||Color|0
$--notification-title-color: #303133 !default;

/// color||Color|0
$--notification-close-color: #909399 !default;
/// color||Color|0
$--notification-close-hover-color: #909399 !default;

/// color||Color|0
$--notification-success-icon-color: green !default;
/// color||Color|0
$--notification-info-icon-color: gray !default;
/// color||Color|0
$--notification-warning-icon-color: yellow !default;
/// color||Color|0
$--notification-danger-icon-color: red !default;

.va-notification {
  display: flex;
  width: $--notification-width;
  padding: $--notification-padding;
  border-radius: $--notification-radius;
  box-sizing: border-box;
  border: 1px solid $--notification-border-color;
  position: fixed;
  background-color: white;
  box-shadow: $--notification-shadow;
  transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s;
  overflow: hidden;

  &.right {
    right: 16px;
  }

  &.left {
    left: 16px;
  }

  &__group {
    margin-left: $--notification-group-margin-left;
    margin-right: $--notification-group-margin-right;
  }

  &__title {
    font-weight: bold;
    font-size: $--notification-title-font-size;
    color: $--notification-title-color;
    margin: 0;
  }

  &__content {
    font-size: $--notification-content-font-size;
    line-height: 21px;
    margin: 6px 0 0 0;
    color: $--notification-content-color;
    text-align: justify;

    p {
      margin: 0;
    }
  }

  &__icon {
    height: $--notification-icon-size;
    width: $--notification-icon-size;
    font-size: $--notification-icon-size;
  }

  &__closeBtn {
    position: absolute;
    top: 18px;
    right: 15px;
    cursor: pointer;
    color: $--notification-close-color;
    font-size: $--notification-close-font-size;

    &:hover {
      color: $--notification-close-hover-color;
    }
  }

  .va-icon-success {
    color: $--notification-success-icon-color;
  }

  .va-icon-error {
    color: $--notification-danger-icon-color;
  }

  .va-icon-info {
    color: $--notification-info-icon-color;
  }

  .va-icon-warning {
    color: $--notification-warning-icon-color;
  }
}

.va-notification-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.va-notification-fade-leave-active {
  opacity: 0;
}

</style>
