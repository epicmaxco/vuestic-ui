<template>
  <div class="va-modal">
    <modal-element
      name="va-modal__overlay--transition"
      :isTransition="!$props.withoutTransitions"
      appear
    >
      <div
        v-if="valueComputed && $props.overlay"
        class="va-modal__overlay"
        :style="computedOverlayStyles"
      />
    </modal-element>
    <modal-element
      name="va-modal__container--transition"
      :isTransition="!$props.withoutTransitions"
      appear
      @beforeEnter="onBeforeEnterTransition"
      @afterEnter="onAfterEnterTransition"
      @beforeLeave="onBeforeLeaveTransition"
      @afterLeave="onAfterLeaveTransition"
    >
      <div
        v-if="valueComputed"
        class="va-modal__container"
        :style="computedModalContainerStyle"
      >
        <div
          class="va-modal__dialog"
          :class="computedClass"
          :style="{ maxWidth: $props.maxWidth, maxHeight: $props.maxHeight }"
          ref="modal"
        >
          <va-icon
            v-if="$props.fullscreen"
            @click="cancel()"
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
              :style="{ color: theme.getColor('primary') }"
            >
              {{ $props.title }}
            </div>
            <div v-if="hasHeaderSlot" class="va-modal__header">
              <slot name="header" />
            </div>
            <div v-if="$props.message" class="va-modal__message">
              {{ $props.message }}
            </div>
            <div v-if="hasContentSlot" class="va-modal__message">
              <slot />
            </div>
            <div
              v-if="($props.cancelText || $props.okText) && !$props.hideDefaultActions"
              class="va-modal__footer"
            >
              <va-button v-if="$props.cancelText" color="gray" flat @click="cancel">
                {{ $props.cancelText }}
              </va-button>
              <va-button @click="ok">
                {{ $props.okText }}
              </va-button>
            </div>
            <div v-if="hasFooterSlot" class="va-modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </modal-element>
  </div>
</template>

<script lang="ts">
import { watch, h, Transition } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'
import { noop } from 'lodash'

import ColorMixin from '../../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import ClickOutsideMixin, { ClickOutsideOptions } from '../../vuestic-mixins/ClickOutsideMixin/ClickOutsideMixin'
import VaButton from '../va-button'
import VaIcon from '../va-icon'

class ModalProps {
  modelValue = prop<boolean>({ type: Boolean, default: false })
  title = prop<string>({ type: String, default: '' })
  message = prop<string>({ type: String, default: '' })
  okText = prop<string>({ type: String, default: 'OK' })
  cancelText = prop<string>({ type: String, default: 'Cancel' })
  hideDefaultActions = prop<boolean>({ type: Boolean, default: false })
  fullscreen = prop<boolean>({ type: Boolean, default: false })
  mobileFullscreen = prop<boolean>({ type: Boolean, default: true })
  noDismiss = prop<boolean>({ type: Boolean, default: false })
  noOutsideDismiss = prop<boolean>({ type: Boolean, default: false })
  noEscDismiss = prop<boolean>({ type: Boolean, default: false })
  maxWidth = prop<string>({ type: String, default: '' })
  maxHeight = prop<string>({ type: String, default: '' })
  size = prop<string>({
    type: String,
    default: 'medium',
    validator: (size: string) => {
      return ['medium', 'small', 'large'].includes(size)
    },
  })

  fixedLayout = prop<boolean>({ type: Boolean, default: false })
  withoutTransitions = prop<boolean>({ type: Boolean, default: false })
  overlay = prop<boolean>({ type: Boolean, default: true })
  overlayOpacity = prop<number | string>({ type: [Number, String], default: undefined })
  zIndex = prop<number | string>({ type: [Number, String], default: undefined })
}

const ModalPropsMixin = Vue.with(ModalProps)

class ModalElementProps {
  isTransition = prop<boolean>({
    type: Boolean,
    default: true,
  })
}

@Options({
  name: 'ModalElement',
})
class ModalElement extends Vue.with(ModalElementProps) {
  render (): any {
    const children = this.$slots.default ? this.$slots.default(this.$attrs) : null

    return this.$props.isTransition
      ? h(
        Transition,
        { ...this.$attrs },
        this.$slots,
      )
      : children
  }
}

@Options({
  name: 'VaModal',
  components: { VaButton, VaIcon, ModalElement },
  emits: ['update:modelValue', 'cancel', 'ok', 'before-open', 'open', 'before-close', 'close', 'click-outside'],
})
export default class VaModal extends mixins(
  ColorMixin,
  StatefulMixin,
  ClickOutsideMixin,
  ModalPropsMixin,
) {
  private clearClickOutsideEvents: () => void = noop

  created () {
    watch(() => this.valueComputed, (valueComputed: boolean) => {
      if (valueComputed) {
        window.addEventListener('keyup', this.listenKeyUp)

        const options: ClickOutsideOptions = {
          onClickOutside: () => {
            this.$emit('click-outside')
            this.cancel()
          },
          disabled: this.$props.noOutsideDismiss || this.$props.noDismiss || false,
          trigger: 'mousedown',
        }

        this.$nextTick(() => {
          const target = this.$refs.modal
          this.clearClickOutsideEvents = this.registerClickOutsideEvents(
            target as Element,
            options,
          )
        })
      } else {
        this.clearClickOutsideEvents()
        window.removeEventListener('keyup', this.listenKeyUp)
      }
    })
  }

  get computedClass () {
    return {
      'va-modal--fullscreen': this.$props.fullscreen,
      'va-modal--mobile-fullscreen': this.$props.mobileFullscreen,
      'va-modal--fixed-layout': this.$props.fixedLayout,
      [`va-modal--size-${this.$props.size}`]: this.$props.size !== 'medium',
    }
  }

  get computedOverlayStyles () {
    // NOTE Not sure exactly what that does.
    // Supposedly solves some case when background wasn't shown.
    // As a side effect removes background from nested modals.

    const moreThanOneModalIsOpen = !!document.querySelectorAll(
      '.va-modal__overlay',
    ).length

    return moreThanOneModalIsOpen
      ? {}
      : {
        'background-color': `rgba(0, 0, 0, ${this.$props.overlayOpacity || 0.6})`,
        'z-index':
          this.$props.zIndex != null ? parseInt(this.$props.zIndex as string) - 10 : undefined,
      }
  }

  get computedModalContainerStyle () {
    return {
      'z-index': this.$props.zIndex,
    }
  }

  get hasContentSlot () {
    return this.$slots.default
  }

  get hasHeaderSlot () {
    return this.$slots.header
  }

  get hasFooterSlot () {
    return this.$slots.footer
  }

  show () {
    this.valueComputed = true
  }

  hide () {
    this.valueComputed = false
  }

  toggle () {
    this.valueComputed = !this.valueComputed
  }

  cancel () {
    this.hide()
    this.$emit('cancel')
  }

  ok () {
    this.hide()
    this.$emit('ok')
  }

  listenKeyUp (e: KeyboardEvent) {
    if (e.code === 'Escape' && !this.$props.noEscDismiss && !this.$props.noDismiss) {
      this.cancel()
    }
  }

  onBeforeEnterTransition (el: HTMLElement) {
    this.$emit('before-open', el)
  }

  onAfterEnterTransition (el: HTMLElement) {
    this.$emit('open', el)
  }

  onBeforeLeaveTransition (el: HTMLElement) {
    this.$emit('before-close', el)
  }

  onAfterLeaveTransition (el: HTMLElement) {
    this.$emit('close', el)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-modal {
  &__title {
    margin-bottom: 1.5rem;

    @include va-title();
  }

  &__container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $zindex-modal;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    outline: 0;

    &--transition {
      @include va-modal-transition();
    }
  }

  &__dialog {
    background: $white;
    min-height: 3.125rem;
    height: fit-content;
    border-radius: 0.375rem;
    margin: 1rem;
    box-shadow: $widget-box-shadow;
    max-width: map_get($grid-breakpoints, md);
    max-height: calc(100vh - 2rem);
    position: relative;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $zindex-modal - 10;
    width: 100vw;
    height: 100vh;

    &--transition {
      @include va-modal-transition(true);
    }
  }

  &--fullscreen {
    min-width: 100vw !important;
    min-height: 100vh !important;
    border-radius: 0;
    margin: 0;
  }

  &--mobile-fullscreen {
    @media all and (max-width: map-get($grid-breakpoints, sm)) {
      min-width: 100vw !important;
      min-height: 100vh !important;
      border-radius: 0;
      position: fixed;
      margin: 0 !important;
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
  }

  &__message {
    margin-bottom: 1.5rem;
  }

  &__inner {
    overflow: auto;
    display: flex;
    position: relative;
    flex-flow: column;
    padding: $modal-padding-top $modal-padding-right $modal-padding-bottom $modal-padding-left;
    max-height: calc(100vh - 2rem);
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
