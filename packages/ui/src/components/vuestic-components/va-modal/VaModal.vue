<template>
  <transition
    name="va-modal__overlay__transition"
    appear
    :duration="withoutTransitions ? 0 : 200"
  >
    <div
      v-if="overlayValue"
      class="va-modal__overlay"
      :class="computedOverlayClass"
      @click="checkOutside"
      :style="computedOverlayStyles"
    >
      <transition
        name="va-modal__transition"
        appear
        :duration="withoutTransitions ? 0 : 500"
      >
        <div
          v-if="valueComputed"
          class="va-modal"
          :class="computedClass"
          :style="{maxWidth, maxHeight}"
        >
          <i
            v-if="fullscreen"
            @click="cancel"
            class="ion ion-md-close va-modal__close"
          />

          <div
            class="va-modal__inner"
            :style="{maxHeight, maxWidth}"
          >
            <div
              v-if="title"
              class="mb-4 title"
              :style="{color: this.$themes.primary}"
            >
              {{ title }}
            </div>
            <div
              v-if="hasHeaderSlot"
              class="va-modal__header"
            >
              <slot name="header"/>
            </div>
            <div
              v-if="message"
              class="mb-4 va-modal__message"
            >
              {{ message }}
            </div>
            <div
              v-if="hasContentSlot"
              class="mb-4 va-modal__message"
            >
              <slot/>
            </div>
            <div
              v-if="(cancelText || okText) && !hideDefaultActions"
              class="va-modal__actions mb-3"
            >
              <va-button
                v-if="cancelText"
                color="gray"
                flat
                @click="cancel"
              >
                {{ cancelText }}
              </va-button>
              <va-button @click="ok">
                {{ okText }}
              </va-button>
            </div>
            <div
              v-if="hasActionsSlot"
              class="va-modal__actions"
            >
              <slot name="actions"/>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
//  @ts-nocheck

import VaButton from '../va-button/VaButton'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'

export default {
  name: 'VaModal',
  components: { VaButton },
  mixins: [
    StatefulMixin,
    makeContextablePropsMixin({
      value: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String,
        validator: position => {
          return ['center', 'top', 'right', 'bottom', 'left'].includes(position)
        },
        default: 'center',
      },
      title: {
        type: String,
        default: '',
      },
      message: {
        type: String,
        default: '',
      },
      okText: {
        type: String,
        default: 'OK',
      },
      cancelText: {
        type: String,
        default: 'Cancel',
      },
      hideDefaultActions: {
        type: Boolean,
        default: false,
      },
      fullscreen: {
        type: Boolean,
        default: false,
      },
      mobileFullscreen: {
        type: Boolean,
        default: true,
      },
      noOutsideDismiss: {
        type: Boolean,
        default: false,
      },
      noEscDismiss: {
        type: Boolean,
        default: false,
      },
      maxWidth: {
        type: String,
        default: '',
      },
      maxHeight: {
        type: String,
        default: '',
      },
      size: {
        type: String,
        default: 'medium',
        validator: size => {
          return ['medium', 'small', 'large'].includes(size)
        },
      },
      fixedLayout: {
        type: Boolean,
        default: false,
      },
      onOk: {
        type: Function,
        default: () => undefined,
      },
      onCancel: {
        type: Function,
        default: () => undefined,
      },
      withoutTransitions: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  data () {
    return {
      // for leave animation
      overlayValue: false,
    }
  },
  computed: {
    computedClass () {
      return {
        'va-modal--fullscreen': this.fullscreen,
        'va-modal--mobile-fullscreen': this.mobileFullscreen,
        'va-modal--fixed-layout': this.fixedLayout,
        [`va-modal--size-${this.size}`]: this.size !== 'medium',
        'transition-off': this.withoutTransitions,
      }
    },
    computedOverlayClass () {
      return {
        [`va-modal--position-${this.position}`]: this.position,
        'transition-off': this.withoutTransitions,
      }
    },
    computedOverlayStyles () {
      // NOTE Not sure exactly what that does.
      // Supposedly solves some case when background wasn't shown.
      // As a side effect removes background from nested modals.

      const moreThanOneModalIsOpen = !!document.querySelectorAll('.va-modal__overlay').length
      return moreThanOneModalIsOpen ? {} : { 'background-color': 'rgba(0, 0, 0, 0.6)' }
    },
    hasContentSlot () {
      return this.$slots.default
    },
    hasHeaderSlot () {
      return this.$slots.header
    },
    hasActionsSlot () {
      return this.$slots.actions
    },
  },
  watch: {
    valueComputed (valueComputed) {
      if (valueComputed) {
        this.overlayValue = true
        window.addEventListener('keyup', this.listenKeyUp)
      } else {
        if (this.withoutTransitions) {
          this.overlayValue = false
        } else {
          setTimeout(() => {
            this.overlayValue = false
          }, 300)
        }
        window.removeEventListener('keyup', this.listenKeyUp)
      }
    },
  },
  methods: {
    show () {
      this.valueComputed = true
    },
    close () {
      this.valueComputed = false
    },
    cancel () {
      this.close()
      this.$emit('cancel')
    },
    ok () {
      this.close()
      this.$emit('ok')
    },
    checkOutside (e) {
      if (!this.noOutsideDismiss) {
        let modal
        e.target.childNodes.forEach(node => {
          if (node.classList && node.classList.contains('va-modal')) {
            modal = node
          }
        })
        if (modal) {
          this.cancel()
        }
      }
    },
    listenKeyUp (e) {
      if (e.code === 'Escape' && !this.noEscDismiss) {
        this.cancel()
      }
    },
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    document.body.removeChild(this.$el)
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-modal {
  &__overlay {
    z-index: 1000;
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.transition-off {
      opacity: 1;
    }

    &__transition {
      &-enter,
      &-leave-to {
        opacity: 0;

        &:nth-of-type(n+3) {
          opacity: 1;
        }
      }

      &-enter-active {
        transition: all 0.2s ease;
      }

      &-leave-active {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
      }
    }
  }

  background: $white;
  min-height: 3.125rem;
  height: fit-content;
  border-radius: 0.375rem;
  margin: 1rem;
  box-shadow: $widget-box-shadow;
  max-width: map_get($grid-breakpoints, md);
  max-height: calc(100vh - 2rem);
  position: relative;
  transition: all 0.5s ease-out;

  &__transition {
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(-30%);

      &.transition-off {
        opacity: 1;
        transform: none;
      }
    }

    &-enter-active {
      transition: all 0.3s ease;

      &.transition-off {
        transition: none;
      }
    }

    &-leave-active {
      transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);

      &.transition-off {
        transition: none;
      }
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

  &--position {
    &-top {
      align-items: flex-start;
    }

    &-right {
      justify-content: flex-end;
    }

    &-bottom {
      align-items: flex-end;
    }

    &-left {
      justify-content: flex-start;
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
      padding: 1.25rem 0 1.5rem 0;

      .va-modal__header,
      .va-modal__actions {
        padding: 0 1.875rem 0 1.5rem;
      }

      .va-modal__message {
        overflow: auto;
        padding: 0 1.875rem 0 1.5rem;
      }
    }
  }

  &__inner {
    overflow: auto;
    display: flex;
    position: relative;
    flex-flow: column;
    padding: 1.25rem 1.875rem 1.5rem 1.5rem;
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
    font-size: 1.5rem;
    color: $brand-secondary;
    z-index: 1;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: auto;
    min-height: fit-content;

    &:last-of-type {
      margin-bottom: 0 !important;
    }
  }
}
</style>
