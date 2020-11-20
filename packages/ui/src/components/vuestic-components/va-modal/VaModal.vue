<template>
  <div class="va-modal">
    <transition
      name="va-modal__overlay--transition"
      :duration="withoutTransitions ? 0 : 300"
      :appear="withoutTransitions"
    >
      <div
        v-if="valueComputed && overlay"
        class="va-modal__overlay"
        :style="computedOverlayStyles"
      />
    </transition>
    <transition
      name="va-modal__container--transition"
      :duration="withoutTransitions ? 0 : 300"
      :appear="withoutTransitions"
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
          :style="{ maxWidth, maxHeight }"
          ref="modal"
        >
          <va-icon
            v-if="fullscreen"
            @click="cancel"
            name="close"
            class="va-modal__close"
          />

          <div
            class="va-modal__inner"
            :style="{ maxWidth, maxHeight }"
          >
            <div
              v-if="title"
              class="va-modal__title"
              :style="{ color: this.theme.primary }"
            >
              {{ title }}
            </div>
            <div v-if="hasHeaderSlot" class="va-modal__header">
              <slot name="header" />
            </div>
            <div v-if="message" class="va-modal__message">
              {{ message }}
            </div>
            <div v-if="hasContentSlot" class="va-modal__message">
              <slot />
            </div>
            <div
              v-if="(cancelText || okText) && !hideDefaultActions"
              class="va-modal__footer"
            >
              <va-button v-if="cancelText" color="gray" flat @click="cancel">
                {{ cancelText }}
              </va-button>
              <va-button @click="ok">
                {{ okText }}
              </va-button>
            </div>
            <div v-if="hasFooterSlot" class="va-modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins, Prop } from 'vue-property-decorator'
import { noop } from 'lodash'

import VaButton from '../va-button'
import VaIcon from '../va-icon'

import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import ClickOutsideMixin, {
  ClickOutsideOptions,
} from '../../vuestic-mixins/ClickOutsideMixin/ClickOutsideMixin'
import { useTheme } from '../../../services/Theme'

@Component({
  name: 'VaModal',
  components: { VaButton, VaIcon },
})
export default class VaModal extends Mixins(
  StatefulMixin,
  ClickOutsideMixin,
) {
  private clearClickOutsideEvents: () => void = noop

  @Prop({ type: String, default: '' }) title?: string
  @Prop({ type: String, default: '' }) message?: string
  @Prop({ type: String, default: 'OK' }) okText?: string
  @Prop({ type: String, default: 'Cancel' }) cancelText?: string
  @Prop({ type: Boolean, default: false }) hideDefaultActions?: boolean
  @Prop({ type: Boolean, default: false }) fullscreen?: boolean
  @Prop({ type: Boolean, default: true }) mobileFullscreen?: boolean
  @Prop({ type: Boolean, default: false }) noDismiss?: boolean
  @Prop({ type: Boolean, default: false }) noOutsideDismiss?: boolean
  @Prop({ type: Boolean, default: false }) noEscDismiss?: boolean
  @Prop({ type: String, default: '' }) maxWidth?: string
  @Prop({ type: String, default: '' }) maxHeight?: string
  @Prop({
    type: String,
    default: 'medium',
    validator: (size: string) => {
      return ['medium', 'small', 'large'].includes(size)
    },
  }) size?: string

  @Prop({ type: Boolean, default: false }) fixedLayout?: boolean
  @Prop({ type: Boolean, default: false }) withoutTransitions?: boolean
  @Prop({ type: Boolean, default: true }) overlay?: boolean
  @Prop({ type: [Number, String], default: undefined }) overlayOpacity?: number | string
  @Prop({ type: [Number, String], default: undefined }) zIndex?: number | string

  // todo: proper definition for setup?
  setup (): any {
    return useTheme()
  }

  get computedClass () {
    return {
      'va-modal--fullscreen': this.fullscreen,
      'va-modal--mobile-fullscreen': this.mobileFullscreen,
      'va-modal--fixed-layout': this.fixedLayout,
      [`va-modal--size-${this.size}`]: this.size !== 'medium',
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
        'background-color': `rgba(0, 0, 0, ${this.overlayOpacity || 0.6})`,
        'z-index':
          this.zIndex != null ? parseInt(this.zIndex as string) - 10 : undefined,
      }
  }

  get computedModalContainerStyle () {
    return {
      'z-index': this.zIndex,
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

  get theme () {
    return (this as any).getTheme()
  }

  @Watch('valueComputed')
  onValueComputedChanged (valueComputed: boolean) {
    if (valueComputed) {
      window.addEventListener('keyup', this.listenKeyUp)

      const options: ClickOutsideOptions = {
        onClickOutside: () => {
          this.$emit('clickOutside')
          this.cancel()
        },
        disabled: this.noOutsideDismiss || this.noDismiss || false,
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
  }

  setStateOrEmit (value: boolean) {
    if (this.stateful) {
      this.valueComputed = value
    } else {
      this.$emit('input', value)
    }
  }

  show () {
    this.setStateOrEmit(true)
  }

  hide () {
    this.setStateOrEmit(false)
  }

  toggle () {
    this.setStateOrEmit(!this.valueComputed)
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
    if (e.code === 'Escape' && !this.noEscDismiss && !this.noDismiss) {
      this.cancel()
    }
  }

  onBeforeEnterTransition (el: HTMLElement) {
    this.$emit('beforeOpen', el)
  }

  onAfterEnterTransition (el: HTMLElement) {
    this.$emit('open', el)
  }

  onBeforeLeaveTransition (el: HTMLElement) {
    this.$emit('beforeClose', el)
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
