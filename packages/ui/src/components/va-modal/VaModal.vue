<template>
  <div
    ref="rootElement"
    class="va-modal-entry"
    :class="$props.anchorClass"
  >
    <div v-if="$slots.anchor" class="va-modal__anchor">
      <slot name="anchor" v-bind="{ show, hide, toggle }" />
    </div>

    <teleport :to="attachElement" :disabled="$props.disableAttachment">
      <modal-element
        name="va-modal"
        ref="modal"
        :isTransition="!$props.withoutTransitions"
        appear
        :duration="300"
        v-bind="$attrs"
      >
        <div class="va-modal" v-if="valueComputed">
          <div
            class="va-modal__overlay"
            :style="$props.overlay && computedOverlayStyles"
            @click="onOutsideClick"
          />
          <div
            class="va-modal__container"
            :style="computedModalContainerStyle"
            @beforeEnter="onBeforeEnterTransition"
            @afterEnter="onAfterEnterTransition"
            @beforeLeave="onBeforeLeaveTransition"
            @afterLeave="onAfterLeaveTransition"
          >
            <div
              class="va-modal__dialog"
              :class="computedClass"
              :style="computedDialogStyle"
            >
              <va-icon
                v-if="$props.fullscreen"
                @click="cancel"
                name="close"
                class="va-modal__close"
              />

              <div
                class="va-modal__inner"
                :style="{ maxWidth: $props.maxWidth, maxHeight: $props.maxHeight }"
              >
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
                    color="gray"
                    class="mr-2"
                    flat
                    @click="cancel"
                  >
                    {{ $props.cancelText }}
                  </va-button>
                  <va-button @click="ok">
                    {{ $props.okText }}
                  </va-button>
                </div>
                <div
                  v-if="$slots.footer"
                  class="va-modal__footer"
                >
                  <slot name="footer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal-element>
    </teleport>
  </div>
</template>

<script lang="ts">
import { watch, h, Transition, defineComponent, PropType, computed, StyleValue, ref } from 'vue'

import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'
import { useColors } from '../../composables/useColor'
import VaButton from '../va-button'
import VaIcon from '../va-icon'

const ModalElement = defineComponent({
  name: 'ModalElement',
  inheritAttrs: false,
  props: {
    isTransition: { type: Boolean as PropType<boolean>, default: true },
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
    modelValue: { type: Boolean as PropType<boolean>, default: false },
    attachElement: { type: String as PropType<string>, default: 'body' },
    disableAttachment: { type: Boolean as PropType<boolean>, default: false },
    title: { type: String as PropType<string>, default: '' },
    message: { type: String as PropType<string>, default: '' },
    okText: { type: String as PropType<string>, default: 'OK' },
    cancelText: { type: String as PropType<string>, default: 'Cancel' },
    hideDefaultActions: { type: Boolean as PropType<boolean>, default: false },
    fullscreen: { type: Boolean as PropType<boolean>, default: false },
    mobileFullscreen: { type: Boolean as PropType<boolean>, default: true },
    noDismiss: { type: Boolean as PropType<boolean>, default: false },
    noOutsideDismiss: { type: Boolean as PropType<boolean>, default: false },
    noEscDismiss: { type: Boolean as PropType<boolean>, default: false },
    maxWidth: { type: String as PropType<string>, default: '' },
    maxHeight: { type: String as PropType<string>, default: '' },
    anchorClass: { type: String as PropType<string> },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (size: string) => ['medium', 'small', 'large'].includes(size),
    },
    fixedLayout: { type: Boolean as PropType<boolean>, default: false },
    withoutTransitions: { type: Boolean as PropType<boolean>, default: false },
    overlay: { type: Boolean as PropType<boolean>, default: true },
    overlayOpacity: { type: [Number, String] as PropType<number | string>, default: 0.6 },
    zIndex: { type: [Number, String] as PropType<number | string | undefined>, default: undefined },
    backgroundColor: { type: String, default: 'white' },
  },
  setup (props, { emit }) {
    const { getTextColor, getColor } = useColors()
    const rootElement = ref<HTMLElement>()
    const modal = ref<{ $el: HTMLElement }>()
    const { valueComputed } = useStateful(props, emit)

    const computedClass = computed(() => ({
      'va-modal--fullscreen': props.fullscreen,
      'va-modal--mobile-fullscreen': props.mobileFullscreen,
      'va-modal--fixed-layout': props.fixedLayout,
      [`va-modal--size-${props.size}`]: props.size !== 'medium',
    }))
    const computedModalContainerStyle = computed(() => ({ 'z-index': props.zIndex } as StyleValue))
    const computedDialogStyle = computed(() => ({
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      color: getTextColor(getColor(props.backgroundColor)),
      background: getColor(props.backgroundColor),
    }))
    const computedOverlayStyles = computed(() => {
      // NOTE Not sure exactly what that does.
      // Supposedly solves some case when background wasn't shown.
      // As a side effect removes background from nested modals.

      const moreThanOneModalIsOpen = !!document.querySelectorAll('.va-modal__overlay').length

      if (!props.overlay || moreThanOneModalIsOpen) { return }

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
      const isLastNestedModal = !modal.value?.$el.nextElementSibling

      if (e.code === 'Escape' && !props.noEscDismiss && !props.noDismiss && isLastNestedModal) {
        cancel()
      }
    }

    watch(valueComputed, (value: boolean) => {
      if (value) {
        window.addEventListener('keyup', listenKeyUp)
      } else {
        window.removeEventListener('keyup', listenKeyUp)
      }
    })

    const publicMethods = {
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
      modal,
      valueComputed,
      computedClass,
      computedDialogStyle,
      computedModalContainerStyle,
      computedOverlayStyles,
      ...publicMethods,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    show () { (this as any).rootElement?.show() },
    hide () { (this as any).rootElement?.hide() },
    toggle () { (this as any).rootElement?.toggle() },
    cancel () { (this as any).rootElement?.cancel() },
    ok () { (this as any).rootElement?.ok() },
    onOutsideClick () { (this as any).rootElement?.onOutsideClick() },
    onBeforeEnterTransition () { (this as any).rootElement?.onBeforeEnterTransition() },
    onAfterEnterTransition () { (this as any).rootElement?.onAfterEnterTransition() },
    onBeforeLeaveTransition () { (this as any).rootElement?.onBeforeLeaveTransition() },
    onAfterLeaveTransition () { (this as any).rootElement?.onAfterLeaveTransition() },
    listenKeyUp () { (this as any).rootElement?.listenKeyUp() },
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

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
      padding: $modal-padding-top 0 $modal-padding-bottom;
      max-height: calc(100vh - 2rem);

      .va-modal__header,
      .va-modal__footer,
      .va-modal__title {
        padding: 0 $modal-padding-right 0 $modal-padding-left;
      }

      .va-modal__message {
        padding: 0 $modal-padding-right 0 $modal-padding-left;
        overflow: auto;
      }
    }

    .va-modal__dialog {
      overflow: hidden;
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
    padding: $modal-padding-top $modal-padding-right $modal-padding-bottom $modal-padding-left;
    max-width: map_get($grid-breakpoints, md);
    margin: auto;

    > div:last-of-type {
      margin-bottom: 0 !important;
    }
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    font-size: 1.5rem !important;
    font-style: normal !important;
    color: $brand-secondary;
    z-index: 1;
  }

  &__footer {
    margin-top: auto;
    min-height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    &:last-of-type {
      margin-bottom: 0 !important;
    }
  }
}
</style>
