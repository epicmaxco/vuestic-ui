<template>
  <div class="va-modal">
    <transition
      name="va-modal__overlay--with-transition"
      appear
      :duration="c_withoutTransitions ? 0 : 200"
    >
      <div
        v-if="overlayValue"
        class="va-modal__overlay"
        :class="computedOverlayClass"
        :style="computedOverlayStyles"
      />
    </transition>
    <div
      class="va-modal__container"
      :class="{ show: valueComputed }"
      :style="computedModalClass"
    >
      <transition
        name="va-modal__container--with-transition"
        appear
        :duration="c_withoutTransitions ? 0 : 500"
      >
        <div
          v-if="valueComputed"
          class="va-modal__dialog"
          :class="computedClass"
          :style="{ c_maxWidth, c_maxHeight }"
          ref="modal"
        >
          <i
            v-if="c_fullscreen"
            @click="cancel"
            class="ion ion-md-close va-modal__close"
          />

          <div class="va-modal__inner" :style="{ c_maxHeight, c_maxWidth }">
            <div
              v-if="c_title"
              class="mb-4 title"
              :style="{ color: this.$themes.primary }"
            >
              {{ c_title }}
            </div>
            <div v-if="hasHeaderSlot" class="va-modal__header">
              <slot name="header" />
            </div>
            <div v-if="c_message" class="mb-4 va-modal__message">
              {{ c_message }}
            </div>
            <div v-if="hasContentSlot" class="mb-4 va-modal__message">
              <slot />
            </div>
            <div
              v-if="(c_cancelText || c_okText) && !c_hideDefaultActions"
              class="va-modal__actions mb-3"
            >
              <va-button v-if="c_cancelText" color="gray" flat @click="cancel">
                {{ c_cancelText }}
              </va-button>
              <va-button @click="ok">
                {{ c_okText }}
              </va-button>
            </div>
            <div v-if="hasActionsSlot" class="va-modal__actions">
              <slot name="actions" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { noop } from 'lodash'
import { Component, Watch, Mixins } from 'vue-property-decorator'
import VaButton from '../va-button'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'
import ClickOutsideMixin, {
  ClickOutsideOptions,
} from '../../vuestic-mixins/ClickOutsideMixin/ClickOutsideMixin'

const props = {
  value: {
    type: Boolean as () => boolean,
    default: false,
  },
  position: {
    type: String as () => string,
    validator: (position: string) => {
      return ['center', 'top', 'right', 'bottom', 'left'].includes(position)
    },
    default: 'center',
  },
  title: {
    type: String as () => string,
    default: '',
  },
  message: {
    type: String as () => string,
    default: '',
  },
  okText: {
    type: String as () => string,
    default: 'OK',
  },
  cancelText: {
    type: String as () => string,
    default: 'Cancel',
  },
  hideDefaultActions: {
    type: Boolean as () => boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean as () => boolean,
    default: false,
  },
  mobileFullscreen: {
    type: Boolean as () => boolean,
    default: true,
  },
  noDismiss: {
    type: Boolean as () => boolean,
    default: false,
  },
  noOutsideDismiss: {
    type: Boolean as () => boolean,
    default: false,
  },
  noEscDismiss: {
    type: Boolean as () => boolean,
    default: false,
  },
  maxWidth: {
    type: String as () => string,
    default: '',
  },
  maxHeight: {
    type: String as () => string,
    default: '',
  },
  size: {
    type: String as () => 'medium' | 'small' | 'large',
    default: 'medium',
    validator: (size: string) => {
      return ['medium', 'small', 'large'].includes(size)
    },
  },
  fixedLayout: {
    type: Boolean as () => boolean,
    default: false,
  },
  withoutTransitions: {
    type: Boolean as () => boolean,
    default: false,
  },
  overlay: {
    type: Boolean as () => boolean,
    default: true,
  },
  overlayOpacity: {
    type: ([Number, String] as unknown) as () => number | string,
    default: undefined,
  },
  zIndex: {
    type: ([Number, String] as unknown) as () => number | string,
    default: undefined,
  },
}

const ContextableMixin = makeContextablePropsMixin(props)

@Component({
  name: 'VaModal',
  components: { VaButton },
})
export default class VaModal extends Mixins(
  StatefulMixin,
  ContextableMixin,
  ClickOutsideMixin,
) {
  // for leave animation
  private overlayValue = false
  private clearClickOutsideEvents: () => void = noop

  get computedClass () {
    return {
      'va-modal--fullscreen': this.c_fullscreen,
      'va-modal--mobile-fullscreen': this.c_mobileFullscreen,
      'va-modal--fixed-layout': this.c_fixedLayout,
      [`va-modal--size-${this.c_size}`]: this.c_size !== 'medium',
      'transition-off': this.c_withoutTransitions,
    }
  }

  get computedOverlayClass () {
    return {
      [`va-modal--position-${this.c_position}`]: this.c_position,
      'transition-off': this.c_withoutTransitions,
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
        'z-index': this.c_zIndex != null ? parseInt(this.c_zIndex) - 10 : undefined,
      }
  }

  get computedModalClass () {
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

  get hasActionsSlot () {
    return this.$slots.actions
  }

  @Watch('valueComputed')
  onValueComputedChanged (valueComputed: boolean) {
    if (valueComputed) {
      this.overlayValue = this.c_overlay
      window.addEventListener('keyup', this.listenKeyUp)

      const options: ClickOutsideOptions = {
        onClickOutside: () => {
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
      if (this.c_withoutTransitions) {
        this.overlayValue = false
      } else {
        setTimeout(() => {
          this.overlayValue = false
        }, 300)
      }
      this.clearClickOutsideEvents()
      window.removeEventListener('keyup', this.listenKeyUp)
    }
  }

  show () {
    this.valueComputed = true
  }

  close () {
    this.valueComputed = false
  }

  cancel () {
    this.close()
    this.$emit('cancel')
  }

  ok () {
    this.close()
    this.$emit('ok')
  }

  listenKeyUp (e: KeyboardEvent) {
    if (e.code === 'Escape' && !this.c_noEscDismiss && !this.c_noDismiss) {
      this.cancel()
    }
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

$elevation: 1050;

.va-modal {
  &__container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $elevation;
    width: 100%;
    height: 100%;
    display: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    outline: 0;

    &--with-transition {
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

    &.show {
      display: flex;
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
    transition: all 0.5s ease-out;
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $elevation - 10;
    width: 100vw;
    height: 100vh;

    &.transition-off {
      opacity: 1;
    }

    &--with-transition {
      &-enter,
      &-leave-to {
        opacity: 0;

        &:nth-of-type(n + 3) {
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
