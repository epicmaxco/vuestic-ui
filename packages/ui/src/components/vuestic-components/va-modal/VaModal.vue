<template>
  <div class="va-modal">
    <transition
      name="va-modal__overlay--transition"
      :duration="c_withoutTransitions ? 0 : 300"
      :appear="c_withoutTransitions ? false : true"
    >
      <div
        v-if="valueComputed && c_overlay"
        class="va-modal__overlay"
        :style="computedOverlayStyles"
      />
    </transition>
    <transition
      name="va-modal__container--transition"
      :duration="c_withoutTransitions ? 0 : 300"
      :appear="c_withoutTransitions ? false : true"
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
          :style="{ maxWidth: c_maxWidth, maxHeight: c_maxHeight }"
          ref="modal"
        >
          <va-icon
            v-if="c_fullscreen"
            @click="cancel"
            name="close"
            class="va-modal__close"
          />

          <div
            class="va-modal__inner"
            :style="{ maxWidth: c_maxWidth, maxHeight: c_maxHeight }"
          >
            <div
              v-if="c_title"
              class="va-modal__title"
              :style="{ color: this.$themes.primary }"
            >
              {{ c_title }}
            </div>
            <div v-if="hasHeaderSlot" class="va-modal__header">
              <slot name="header" />
            </div>
            <div v-if="c_message" class="va-modal__message">
              {{ c_message }}
            </div>
            <div v-if="hasContentSlot" class="va-modal__message">
              <slot />
            </div>
            <div
              v-if="(c_cancelText || c_okText) && !c_hideDefaultActions"
              class="va-modal__footer"
            >
              <va-button v-if="c_cancelText" color="gray" flat @click="cancel">
                {{ c_cancelText }}
              </va-button>
              <va-button @click="ok">
                {{ c_okText }}
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
import { noop } from 'lodash'
import { CreateElement } from 'vue'
import { Component, Watch, Mixins, Vue, Prop } from 'vue-property-decorator'
import VaButton from '../va-button'
import VaIcon from '../va-icon'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import ClickOutsideMixin, {
  ClickOutsideOptions,
} from '../../vuestic-mixins/ClickOutsideMixin/ClickOutsideMixin'

const ModalPropsMixin = makeContextablePropsMixin({
  value: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  okText: { type: String, default: 'OK' },
  cancelText: { type: String, default: 'Cancel' },
  hideDefaultActions: { type: Boolean, default: false },
  fullscreen: { type: Boolean, default: false },
  mobileFullscreen: { type: Boolean, default: true },
  noDismiss: { type: Boolean, default: false },
  noOutsideDismiss: { type: Boolean, default: false },
  noEscDismiss: { type: Boolean, default: false },
  maxWidth: { type: String, default: '' },
  maxHeight: { type: String, default: '' },
  size: {
    type: String,
    default: 'medium',
    validator: (size: string) => {
      return ['medium', 'small', 'large'].includes(size)
    },
  },
  fixedLayout: { type: Boolean, default: false },
  withoutTransitions: { type: Boolean, default: false },
  overlay: { type: Boolean, default: true },
  overlayOpacity: { type: [Number, String], default: undefined },
  zIndex: { type: [Number, String], default: undefined },
})

@Component({
  name: 'VaModal',
  components: { VaButton, VaIcon },
})
export default class VaModal extends Mixins(
  StatefulMixin,
  ClickOutsideMixin,
  ModalPropsMixin,
) {
  private clearClickOutsideEvents: () => void = noop

  get computedClass () {
    return {
      'va-modal--fullscreen': this.c_fullscreen,
      'va-modal--mobile-fullscreen': this.c_mobileFullscreen,
      'va-modal--fixed-layout': this.c_fixedLayout,
      [`va-modal--size-${this.c_size}`]: this.c_size !== 'medium',
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
        'background-color': `rgba(0, 0, 0, ${this.c_overlayOpacity || 0.6})`,
        'z-index':
          this.c_zIndex != null ? parseInt(this.c_zIndex) - 10 : undefined,
      }
  }

  get computedModalContainerStyle () {
    return {
      'z-index': this.c_zIndex,
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

  @Watch('valueComputed')
  onValueComputedChanged (valueComputed: boolean) {
    if (valueComputed) {
      window.addEventListener('keyup', this.listenKeyUp)

      const options: ClickOutsideOptions = {
        onClickOutside: () => {
          this.$emit('clickOutside')
          this.cancel()
        },
        disabled: this.c_noOutsideDismiss || this.c_noDismiss,
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
    if (this.c_stateful) {
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
    if (e.code === 'Escape' && !this.c_noEscDismiss && !this.c_noDismiss) {
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
