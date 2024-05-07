<template>
  <transition name="va-toast-fade">
    <div
      v-show="visible"
      ref="rootElement"
      :role="$props.role ?? $props.closeable ? 'alertdialog' : 'alert'"
      :aria-live="computedAriaLive"
      aria-atomic="true"
      class="va-toast"
      :class="toastClasses"
      :style="toastStyles"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onToastClick"
    >
      <div class="va-toast__group">
        <h2 v-if="$props.title" class="va-toast__title" v-text="$props.title" />

        <div class="va-toast__content" v-show="$props.message">
          <div v-if="$props.dangerouslyUseHtmlString" v-html="computedMessage" />
          <p v-else v-text="computedMessage" />
        </div>

        <div class="va-toast__content" v-if="$props.render">
          <VaToastRenderer :render="$props.render" />
        </div>

        <va-icon
          v-if="$props.closeable"
          class="va-toast__close-icon"
          role="button"
          :aria-label="tp($props.ariaCloseLabel)"
          tabindex="0"
          size="1rem"
          :name="$props.icon"
          @click.stop="onToastClose"
          @keydown.enter.stop="onToastClose"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { PropType, ref, computed, onMounted, shallowRef, defineComponent, ComputedRef } from 'vue'

import { useComponentPresetProp, useColors, useTimer, useTextColor, useTranslation, useTranslationProp, useNumericProp } from '../../composables'

import { ToastPosition } from './types'

import { StringWithAutocomplete } from '../../utils/types/prop-type'
</script>

<script lang="ts" setup>
import VaIcon from '../va-icon/VaIcon.vue'

const VaToastRenderer = defineComponent({
  name: 'VaToastRenderer',
  props: {
    render: { type: Function, required: true },
  },
  setup: (props) => () => props.render(),
})

defineOptions({
  name: 'VaToast',
})

const { tp } = useTranslation()

const props = defineProps({
  ...useComponentPresetProp,
  title: { type: String, default: '' },
  offsetY: { type: [Number, String], default: 16 },
  offsetX: { type: [Number, String], default: 16 },
  message: { type: [String, Function], default: '' },
  dangerouslyUseHtmlString: { type: Boolean, default: false },
  icon: { type: String, default: 'close' },
  customClass: { type: String, default: '' },
  duration: { type: [Number, String], default: 5000 },
  color: { type: String, default: '' },
  closeable: { type: Boolean, default: true },
  onClose: { type: Function },
  onClick: { type: Function },
  multiLine: { type: Boolean, default: false },
  position: {
    type: String as PropType<ToastPosition>,
    default: 'top-right',
    validator: (value: string) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value),
  },
  render: { type: Function },
  ariaCloseLabel: useTranslationProp('$t:close'),
  role: { type: String as PropType<StringWithAutocomplete<'alert' | 'alertdialog' | 'status'>>, default: undefined },
  inline: { type: Boolean, default: false },
})

const emit = defineEmits(['on-click', 'on-close'])

const rootElement = shallowRef<HTMLElement>()

const { getColor } = useColors()

const { textColorComputed } = useTextColor(computed(() => getColor(props.color)))
const offsetYComputed = useNumericProp('offsetY') as ComputedRef<number>
const offsetXComputed = useNumericProp('offsetX') as ComputedRef<number>
const durationComputed = useNumericProp('duration') as ComputedRef<number>

const visible = ref(false)

const positionX = computed(() => {
  return props.position.includes('right') ? 'right' : 'left'
})

const positionY = computed(() => {
  return props.position.includes('top') ? 'top' : 'bottom'
})

const toastClasses = computed(() => [
  props.customClass,
  props.multiLine ? 'va-toast--multiline' : '',
  props.inline ? 'va-toast--inline' : '',
])

const toastStyles = computed(() => ({
  [positionY.value]: `${offsetYComputed.value}px`,
  [positionX.value]: `${offsetXComputed.value}px`,
  backgroundColor: getColor(props.color),
  color: textColorComputed.value,
}))

const computedAriaLive = computed(() => {
  if (props.role === 'status') {
    return 'polite'
  } else {
    return 'assertive'
  }
})

const computedMessage = computed(() => (typeof props.message === 'function') ? props.message() : props.message)

const destroyElement = () => {
  rootElement.value?.removeEventListener('transitionend', destroyElement)

  rootElement.value?.remove()
}

const onToastClick = () => {
  if (typeof props.onClick === 'function') {
    props.onClick()
  } else {
    emit('on-click')
  }
}

const onToastClose = () => {
  visible.value = false

  rootElement.value?.addEventListener('transitionend', destroyElement)

  if (typeof props.onClose === 'function') {
    props.onClose()
  } else {
    emit('on-close')
  }
}

const timer = useTimer()
const clearTimer = timer.clear
const startTimer = () => {
  if (durationComputed.value > 0) {
    timer.start(() => visible.value && onToastClose(), durationComputed.value)
  }
}

onMounted(() => {
  visible.value = true

  startTimer()
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-toast {
  position: fixed;
  box-sizing: border-box;
  width: var(--va-toast-width);
  padding: var(--va-toast-padding);
  display: flex;
  align-items: center;
  border-radius: var(--va-toast-border-radius);
  border: var(--va-toast-border);
  background-color: var(--va-toast-background-color);
  box-shadow: var(--va-toast-box-shadow);
  transition: var(--va-toast-transition);
  overflow: hidden;
  z-index: var(--va-toast-z-index);
  font-family: var(--va-font-family);

  &--inline {
    position: static;
  }

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
    margin: var(--va-toast-title-margin);

    @include va-title();
  }

  &__content {
    font-size: var(--va-toast-content-font-size);
    line-height: var(--va-toast-content-line-height);
    padding-right: var(--va-toast-content-padding-right);

    p,
    div {
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
    right: var(--va-toast-close-icon-right);
    cursor: pointer;
    transform: translateY(-50%);
    font-size: var(--va-toast-close-icon-font-siz);
    opacity: 0.7;

    &:hover {
      opacity: 1;
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
