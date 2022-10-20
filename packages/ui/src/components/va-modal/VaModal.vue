<template>
  <div
    ref="rootElement"
    class="va-modal-entry"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="title"
    :class="$props.anchorClass"
  >
    <div v-if="$slots.anchor" class="va-modal__anchor">
      <slot name="anchor" v-bind="{ show, hide, toggle }" />
    </div>

    <teleport :to="attachElement" :disabled="$props.disableAttachment">
      <modal-element
        name="va-modal"
        :isTransition="!$props.withoutTransitions"
        appear
        :duration="300"
        v-bind="$attrs"
        @beforeEnter="onBeforeEnterTransition"
        @afterEnter="onAfterEnterTransition"
        @beforeLeave="onBeforeLeaveTransition"
        @afterLeave="onAfterLeaveTransition"
      >
        <div class="va-modal" v-if="valueComputed">
          <div
            v-if="$props.overlay"
            class="va-modal__overlay"
            :style="computedOverlayStyles"
            @click="onOutsideClick"
          />
          <div
            class="va-modal__container"
            :style="computedModalContainerStyle"
          >
            <div
              ref="modalDialog"
              class="va-modal__dialog"
              :class="computedClass"
              :style="computedDialogStyle"
            >
              <va-icon
                v-if="$props.fullscreen"
                name="va-close"
                class="va-modal__close"
                role="button"
                :aria-label="t('close')"
                tabindex="0"
                @click="cancel"
                @keydown.space="cancel"
                @keydown.enter="cancel"
              />
              <div
                class="va-modal__inner"
                :style="{ maxWidth: $props.maxWidth, maxHeight: $props.maxHeight }"
              >
                <div v-if="$slots.content">
                  <slot name="content" v-bind="{ cancel, ok }" />
                </div>
                <template v-if="!$slots.content">
                  <div
                    v-if="title"
                    class="va-modal__title"
                    :style="{ color: getColor('primary') }"
                  >
                    {{ $props.title }}
                  </div>
                  <div
                    v-if="$slots.header"
                    class="va-modal__header"
                  >
                    <slot name="header" />
                  </div>
                  <div
                    v-if="$props.message"
                    class="va-modal__message"
                  >
                    {{ $props.message }}
                  </div>
                  <div
                    v-if="$slots.default"
                    class="va-modal__message"
                  >
                    <slot />
                  </div>
                  <div
                    v-if="($props.cancelText || $props.okText) && !$props.hideDefaultActions"
                    class="va-modal__footer"
                  >
                    <va-button
                      v-if="$props.cancelText"
                      preset="plain"
                      color="secondary"
                      class="mr-3"
                      @click="cancel"
                    >
                      {{ tp($props.cancelText) }}
                    </va-button>
                    <va-button @click="ok">
                      {{ tp($props.okText) }}
                    </va-button>
                  </div>
                  <div
                    v-if="$slots.footer"
                    class="va-modal__footer"
                  >
                    <slot name="footer" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </modal-element>
    </teleport>
  </div>
</template>

<script lang="ts">
import type { PropType, StyleValue } from 'vue'
import {
  Transition,
  h,
  defineComponent,
  computed,
  shallowRef,
  toRef,
  watchEffect,
  onMounted,
  nextTick, watch,
} from 'vue'

import {
  useStateful, useStatefulProps, useStatefulEmits,
  useColors, useTextColor,
  useWindow, useDocument,
  useComponentPresetProp,
  useTrapFocus,
  useModalLevel,
  useTranslation,
} from '../../composables'

import { VaButton } from '../va-button'
import { VaIcon } from '../va-icon'

const ModalElement = defineComponent({
  name: 'ModalElement',
  inheritAttrs: false,
  props: {
    ...useComponentPresetProp,
    isTransition: { type: Boolean, default: true },
  },
  setup: (props, { slots, attrs }) => () => props.isTransition
    ? h(Transition, { ...attrs }, slots)
    : slots.default?.(attrs),
})

export default defineComponent({
  name: 'VaModal',
  inheritAttrs: false,
  components: { VaButton, VaIcon, ModalElement },
  emits: [
    ...useStatefulEmits,
    'cancel', 'ok', 'before-open', 'open', 'before-close', 'close', 'click-outside',
  ],
  props: {
    ...useStatefulProps,
    modelValue: { type: Boolean, default: false },
    attachElement: { type: String, default: 'body' },
    disableAttachment: { type: Boolean, default: false },
    title: { type: String, default: '' },
    message: { type: String, default: '' },
    okText: { type: String, default: '$t:ok' },
    cancelText: { type: String, default: '$t:cancel' },
    hideDefaultActions: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    mobileFullscreen: { type: Boolean, default: true },
    noDismiss: { type: Boolean, default: false },
    noOutsideDismiss: { type: Boolean, default: false },
    noEscDismiss: { type: Boolean, default: false },
    maxWidth: { type: String, default: '' },
    maxHeight: { type: String, default: '' },
    anchorClass: { type: String },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (value: string) => ['medium', 'small', 'large'].includes(value),
    },
    fixedLayout: { type: Boolean, default: false },
    withoutTransitions: { type: Boolean, default: false },
    overlay: { type: Boolean, default: true },
    overlayOpacity: { type: [Number, String], default: 0.6 },
    blur: { type: Boolean, default: false },
    zIndex: { type: [Number, String], default: undefined },
    backgroundColor: { type: String, default: 'background-tertiary' },
    noPadding: { type: Boolean, default: false },
  },
  setup (props, { emit }) {
    const rootElement = shallowRef<HTMLElement>()
    const modalDialog = shallowRef<HTMLElement>()
    const { trapFocusIn, freeFocus } = useTrapFocus()

    const {
      registerModal,
      unregisterModal,
      isTopLevelModal,
      isLowestLevelModal,
    } = useModalLevel()

    const { getColor } = useColors()
    const { textColorComputed } = useTextColor(toRef(props, 'backgroundColor'))
    const { valueComputed } = useStateful(props, emit)

    const computedClass = computed(() => ({
      'va-modal--fullscreen': props.fullscreen,
      'va-modal--mobile-fullscreen': props.mobileFullscreen,
      'va-modal--fixed-layout': props.fixedLayout,
      'va-modal--no-padding': props.noPadding,
      [`va-modal--size-${props.size}`]: props.size !== 'medium',
    }))
    const computedModalContainerStyle = computed(() => ({ 'z-index': props.zIndex } as StyleValue))
    const computedDialogStyle = computed(() => ({
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      color: textColorComputed.value,
      background: getColor(props.backgroundColor),
    }))
    const computedOverlayStyles = computed(() => {
      // NOTE Not sure exactly what that does.
      // Supposedly solves some case when background wasn't shown.
      // As a side effect removes background from nested modals.

      if (!props.overlay || !isLowestLevelModal.value) { return }

      return {
        'background-color': `rgba(0, 0, 0, ${props.overlayOpacity})`,
        'z-index': props.zIndex && Number(props.zIndex) - 1,
      } as StyleValue
    })

    const show = () => { valueComputed.value = true }
    const hide = () => { valueComputed.value = false }
    const toggle = () => { valueComputed.value = !valueComputed.value }
    const cancel = () => { hide(); emit('cancel') }
    const ok = () => { hide(); emit('ok') }
    const trapFocusInModal = () => {
      nextTick(() => { // trapFocusIn use querySelector, so need nextTick, to be sure, that DOM has been updated after modal has been opened
        if (modalDialog.value) {
          trapFocusIn(modalDialog.value)
        }
      })
    }

    const onOutsideClick = () => {
      if (props.noOutsideDismiss || props.noDismiss) { return }

      emit('click-outside')
      cancel()
    }

    const onBeforeEnterTransition = (el: HTMLElement) => emit('before-open', el)
    const onAfterEnterTransition = (el: HTMLElement) => emit('open', el)
    const onBeforeLeaveTransition = (el: HTMLElement) => emit('before-close', el)
    const onAfterLeaveTransition = (el: HTMLElement) => emit('close', el)

    const listenKeyUp = (e: KeyboardEvent) => {
      const hideModal = () => {
        if (e.code === 'Escape' && !props.noEscDismiss && !props.noDismiss && isTopLevelModal.value) {
          cancel()
        }
      }

      setTimeout(hideModal)
    }

    const window = useWindow()
    const document = useDocument()

    watchEffect(() => {
      if (valueComputed.value) {
        window.value?.addEventListener('keyup', listenKeyUp)
      } else {
        window.value?.removeEventListener('keyup', listenKeyUp)
      }
    })

    watchEffect(() => {
      if (props.blur) {
        if (valueComputed.value) {
          document.value?.body.classList.add('va-modal-overlay-background--blurred')
        } else {
          document.value?.body.classList.remove('va-modal-overlay-background--blurred')
        }
      }
    })

    watch(valueComputed, newValueComputed => { // watch for open/close modal
      if (newValueComputed) {
        registerModal()
        return
      }

      if (isLowestLevelModal.value) {
        freeFocus()
      }
      unregisterModal()
    })

    watch(isTopLevelModal, newIsTopLevelModal => {
      if (newIsTopLevelModal) {
        trapFocusInModal()
      }
    })

    onMounted(() => {
      if (valueComputed.value) { // case when open modal with this.$vaModal.init
        registerModal()
      }
    })

    const publicMethods = {
      ...useTranslation(),
      show,
      hide,
      toggle,
      cancel,
      ok,
      onOutsideClick,
      onBeforeEnterTransition,
      onAfterEnterTransition,
      onBeforeLeaveTransition,
      onAfterLeaveTransition,
      listenKeyUp,
    }

    return {
      getColor,
      rootElement,
      modalDialog,
      valueComputed,
      computedClass,
      computedDialogStyle,
      computedModalContainerStyle,
      computedOverlayStyles,
      ...publicMethods,
    }
  },
})
</script>

<style lang="scss">
  @import "../../styles/resources";
  @import "variables";

  .va-modal-overlay-background--blurred > :not(div[class*="va-"]) {
    filter: blur(var(--va-modal-overlay-background-blur-radius));
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .va-modal {
    position: var(--va-modal-position);
    display: var(--va-modal-display);
    align-items: var(--va-modal-align-items);
    justify-content: var(--va-modal-justify-content);
    width: var(--va-modal-width);
    height: var(--va-modal-height);
    top: var(--va-modal-top);
    left: var(--va-modal-left);
    overflow: var(--va-modal-overflow);
    outline: var(--va-modal-outline);
    z-index: var(--va-modal-z-index);
    font-family: var(--va-font-family);

    &__title {
      margin-bottom: 1.5rem;

      @include va-title();
    }

    &__container {
      z-index: var(--va-modal-container-z-index);
      max-width: 100%;
    }

    &-enter-from &__container,
    &-leave-to &__container {
      opacity: 0;
      transform: translateY(-30%);
    }

    &-enter-active &__container,
    &-leave-active &__container {
      transition: var(--va-modal-opacity-transition), var(--va-modal-transform-transition);
    }

    &__dialog {
      min-height: var(--va-modal-dialog-min-height);
      height: var(--va-modal-dialog-height);
      border-radius: var(--va-modal-dialog-border-radius, var(--va-block-border-radius));
      margin: var(--va-modal-dialog-margin);
      box-shadow: var(--va-modal-dialog-box-shadow, var(--va-block-box-shadow));
      max-width: var(--va-modal-dialog-max-width);
      max-height: var(--va-modal-dialog-max-height);
      position: var(--va-modal-dialog-position);
      overflow: auto;
    }

    &__overlay {
      position: var(--va-modal-overlay-position);
      top: var(--va-modal-overlay-top);
      left: var(--va-modal-overlay-left);
      z-index: var(--va-modal-overlay-z-index);
      width: var(--va-modal-overlay-width);
      height: var(--va-modal-overlay-height);
    }

    &-enter-from &__overlay,
    &-leave-to &__overlay {
      opacity: 0;
    }

    &-enter-active &__overlay,
    &-leave-active &_overlay {
      transition: var(--va-modal-overlay-opacity-transition);
    }

    &--fullscreen {
      min-width: 100vw !important;
      min-height: 100vh !important;
      border-radius: 0;
      margin: 0;
    }

    &--mobile-fullscreen {
      @media all and (max-width: map-get($grid-breakpoints, sm)) {
        margin: 0 !important;
        min-width: 100vw !important;
        min-height: 100vh !important;
        border-radius: 0;
      }
    }

    &--size {
      &-small {
        max-width: map_get($grid-breakpoints, sm);

        @media all and (max-width: map-get($grid-breakpoints, sm)) {
          max-width: 100vw !important;
        }

        .va-modal__inner {
          max-width: map_get($grid-breakpoints, sm);

          @media all and (max-width: map-get($grid-breakpoints, sm)) {
            max-width: 100vw !important;
          }
        }
      }

      &-large {
        max-width: map-get($grid-breakpoints, lg);

        .va-modal__inner {
          max-width: map-get($grid-breakpoints, lg);
        }
      }
    }

    &--fixed-layout {
      .va-modal__inner {
        overflow: hidden;
        padding: var(--va-modal-padding-top) 0 var(--va-modal-padding-bottom);
        max-height: calc(100vh - 2rem);

        .va-modal__header,
        .va-modal__footer,
        .va-modal__title {
          padding: 0 var(--va-modal-padding-right) 0 var(--va-modal-padding-left);
        }

        .va-modal__message {
          padding: 0 var(--va-modal-padding-right) 0 var(--va-modal-padding-left);
          overflow: auto;
        }
      }

      .va-modal__dialog {
        overflow: hidden;
      }
    }

    &--no-padding {
      .va-modal__inner {
        padding: 0;
      }
    }

    &__message {
      margin-bottom: 1.5rem;
    }

    &__inner {
      overflow: visible;
      display: flex;
      position: relative;
      flex-flow: column;
      padding: var(--va-modal-padding);
      max-width: map_get($grid-breakpoints, md);
      margin: auto;

      > div:last-of-type {
        margin-bottom: 0;
      }
    }

    &__close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      font-size: 1.5rem;
      font-style: normal;
      color: var(--va-secondary);
      z-index: 1;
    }

    &__footer {
      margin-top: auto;
      min-height: fit-content;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
</style>
