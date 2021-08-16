<template>
  <div
    class="va-dropdown"
    :class="classComputed"
  >
    <div
      class="va-dropdown__anchor"
      @mouseover="onMouseOver()"
      @mouseout="onMouseOut()"
      @click="onAnchorClick()"
      @keyup.enter.stop.prevent="onAnchorClick()"
      ref="anchor"
    >
      <slot name="anchor" />
    </div>
    <template v-if="showContent">
      <teleport :to="attachElement" :disabled="disableAttachment">
        <div
          class="va-dropdown__content-wrapper"
          @mouseover="$props.isContentHoverable && onMouseOver()"
          @mouseout="onMouseOut()"
          @click.stop="onDropdownContentClick()"
          ref="contentWrapper"
        >
          <div :style="$props.keepAnchorWidth ? anchorWidthStyles : ''">
            <slot />
          </div>
        </div>
      </teleport>
    </template>
  </div>
</template>

<script lang="ts">
import { watch, nextTick } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { DebounceLoader } from 'asva-executors'
import { createPopper, Instance } from '@popperjs/core'
import { StatefulMixin } from '../../mixins/StatefulMixin/StatefulMixin'

type PopperInstance = Instance | null
type ClickType = 'anchor-click' | 'dropdown-content-click' | 'click-outside'

class DropdownProps {
  debugId = prop<string>({ type: String, default: '' })
  position = prop<string>({ type: String, default: '' })
  hoverOverTimeout = prop<number>({ type: Number, default: 30 })
  hoverOutTimeout = prop<number>({ type: Number, default: 200 })
  modelValue = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean })
  attachElement = prop<string>({ type: String, default: 'body' })
  disableAttachment = prop<boolean>({ type: Boolean })
  // Means dropdown width should be the same as anchor's width.
  keepAnchorWidth = prop<boolean>({ type: Boolean })
  closeOnContentClick = prop<boolean>({ type: Boolean, default: true })
  closeOnClickOutside = prop<boolean>({ type: Boolean, default: true })
  closeOnAnchorClick = prop<boolean>({ type: Boolean, default: true })
  isContentHoverable = prop<boolean>({ type: Boolean, default: true })
  offset = prop<number | number[]>({ type: [Array, Number], default: () => [] })
  trigger = prop<string>({
    type: String,
    default: 'click',
    validator: (trigger: string) => ['click', 'hover', 'none'].includes(trigger),
  })
  stateful = prop<boolean>({ type: Boolean, default: true })
}

const DropdownPropsMixin = Vue.with(DropdownProps)

@Options({
  name: 'VaDropdown',
  emits: ['update:modelValue', 'anchor-click', 'click-outside', 'dropdown-content-click'],
})
export default class VaDropdown extends mixins(
  StatefulMixin,
  DropdownPropsMixin,
) {
  popperInstance: PopperInstance = null
  anchorWidth = 0
  hoverOverDebounceLoader!: DebounceLoader
  hoverOutDebounceLoader!: DebounceLoader

  get anchorWidthStyles (): { width: string; maxWidth: string } {
    return {
      width: this.anchorWidth + 'px',
      maxWidth: this.anchorWidth + 'px',
    }
  }

  get classComputed () {
    return {
      'va-dropdown--disabled': this.$props.disabled,
    }
  }

  get showContent (): boolean {
    return this.valueComputed
  }

  handlePopperInstance (): void {
    if (this.popperInstance) {
      this.removePopper()
    }

    if (!this.showContent) {
      return
    }

    this.updateAnchorWidth()

    nextTick(() => {
      this.initPopper()
    })
  }

  handleClick (emitName: ClickType, toClose: boolean): void {
    this.$emit(emitName)
    if (toClose) {
      this.hide()
    }
  }

  onDropdownContentClick (): void {
    this.handleClick('dropdown-content-click', this.closeOnContentClick)
  }

  onClickOutside (): void {
    this.handleClick('click-outside', this.closeOnClickOutside)
  }

  onAnchorClick (): void {
    if (this.$props.disabled) {
      return
    }
    if (this.$props.trigger === 'click') {
      if (this.valueComputed) {
        this.handleClick('anchor-click', this.closeOnAnchorClick)
        return
      }
      this.valueComputed = true
    }
    this.$emit('anchor-click')
  }

  // Kinda complex logic here.
  // We want to achieve 2 things:
  // * Fast mouse-over shouldn't trigger dropdown.
  // * Dropdown shouldn't close when you move mouse from anchor to content (even with offset).
  onMouseOver (): void {
    if (this.$props.disabled || this.$props.trigger !== 'hover') {
      return
    }
    if (!this.valueComputed) {
      this.hoverOverDebounceLoader.run()
    }
    this.hoverOutDebounceLoader.reset()
  }

  onMouseOut (): void {
    if (this.$props.trigger !== 'hover') {
      return
    }
    if (this.isContentHoverable) {
      this.hoverOutDebounceLoader.run()
    } else {
      this.valueComputed = false
    }
    this.hoverOverDebounceLoader.reset()
  }

  registerClickOutsideListener (): void {
    document.addEventListener('click', event => this.handleDocumentClick(event), false)
  }

  unregisterClickOutsideListener (): void {
    document.removeEventListener('click', event => this.handleDocumentClick(event), false)
  }

  handleDocumentClick (event: any): void {
    let el = event.target
    const clickedElements = [] // Array because dropdowns can be nested.
    // TODO Make DOM walk-over global, so that each dropdown doesn't have to do it.
    while (el) {
      clickedElements.push(el)
      el = el.parentNode
    }
    const isCurrentDropdownClicked = clickedElements.includes(this.$refs.anchor) || clickedElements.includes(this.$refs.contentWrapper)
    if (isCurrentDropdownClicked) {
      return
    }
    if (this.showContent) {
      this.onClickOutside()
    }
  }

  updateAnchorWidth (): void {
    if (this.keepAnchorWidth) {
      this.anchorWidth = (this as any).$refs.anchor.offsetWidth
    }
    if (this.popperInstance) {
      this.popperInstance.forceUpdate()
    }
  }

  /** @public */
  hide (): void {
    this.valueComputed = false
  }

  initPopper (): void {
    const options: any = {
      placement: this.position || 'bottom',
      modifiers: [],
      // strategy: this.fixed ? 'fixed' : undefined,
      onFirstUpdate: () => {
        this.valueComputed = true
      },
    }

    if (this.offset) {
      options.modifiers.push({
        name: 'offset',
        options: {
          offset: Array.isArray(this.offset) ? this.offset : [this.offset],
        },
      })
      // options.modifiers.keepTogether = { enabled: false }
      // options.modifiers.arrow = { enabled: false }
    }

    this.popperInstance = createPopper(
      this.$refs.anchor as Element,
      this.$refs.contentWrapper as HTMLElement,
      options,
    )
  }

  removePopper (): void {
    this.valueComputed = false

    if (!this.popperInstance) {
      return
    }
    this.popperInstance.destroy()
    this.popperInstance = null
  }

  created (): void {
    watch(() => this.showContent, () => {
      this.handlePopperInstance()
    })
    this.hoverOverDebounceLoader = new DebounceLoader(
      async () => {
        this.valueComputed = true
      },
      this.hoverOverTimeout,
    )
    this.hoverOutDebounceLoader = new DebounceLoader(
      async () => {
        this.valueComputed = false
      },
      this.hoverOutTimeout,
    )
    // nuxt fix
    if ((this as any).$isServer) {
      return
    }
    this.registerClickOutsideListener()
  }

  mounted (): void {
    this.handlePopperInstance()
  }

  beforeUnmount (): void {
    this.unregisterClickOutsideListener()
    this.removePopper()
  }
}
</script>

<style lang="scss">
@import '../../styles/resources/resources';
@import "variables";

.va-dropdown {
  /* Solved the alignment problem (if we try to align inline and block elements) */
  line-height: var(--va-dropdown-line-height);

  &--disabled {
    @include va-disabled;
  }

  &__content-wrapper {
    /* overflow: hidden; */
    z-index: var(--va-dropdown-content-wrapper-z-index);
  }
}
</style>
