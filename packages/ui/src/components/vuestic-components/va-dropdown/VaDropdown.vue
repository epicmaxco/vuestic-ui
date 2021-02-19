<template>
  <div class="va-dropdown">
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
      <div
        class="va-dropdown__content-wrapper"
        @mouseover="$props.isContentHoverable && onMouseOver()"
        @mouseout="onMouseOut()"
        ref="contentWrapper"
      >
        <div
          class="va-dropdown__content"
          :style="$props.keepAnchorWidth ? anchorWidthStyles : ''"
        >
          <slot />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { watch, nextTick } from 'vue'
import { Vue, Options, prop, mixins } from 'vue-class-component'
import { DebounceLoader } from 'asva-executors'
import { createPopper, Instance } from '@popperjs/core'

type PopperInstance = Instance | null

class DropdownProps {
  debugId = prop<string>({ type: String, default: '' })
  position = prop<string>({ type: String, default: '' })
  hoverOverTimeout = prop<number>({ type: Number, default: 30 })
  hoverOutTimeout = prop<number>({ type: Number, default: 200 })
  boundaryBody = prop<boolean>({ type: Boolean })
  modelValue = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean })
  opened = prop<boolean>({ type: Boolean })
  // Makes no sense
  // fixed = prop<boolean>({ type: Boolean })
  // Means dropdown width should be the same as anchor's width.
  keepAnchorWidth = prop<boolean>({ type: Boolean })
  // If set to false - dropdown won't dodge outside container.
  preventOverflow = prop<boolean>({ type: Boolean, default: false })
  closeOnClickOutside = prop<boolean>({ type: Boolean, default: true })
  closeOnAnchorClick = prop<boolean>({ type: Boolean, default: true })
  isContentHoverable = prop<boolean>({ type: Boolean, default: true })
  offset = prop<number | number[]>({ type: [Array, Number], default: () => [] })
  trigger = prop<string | number | any[]>({
    type: [Array, Number, String],
    default: 'click',
    validator: (trigger: string): boolean => ['click', 'hover', 'none'].includes(trigger),
  })
}

const DropdownPropsMixin = Vue.with(DropdownProps)

@Options({
  name: 'VaDropdown',
  emits: ['update:modelValue', 'anchor-click', 'click-outside', 'trigger'],
})
export default class VaDropdown extends mixins(DropdownPropsMixin) {
  popperInstance: PopperInstance = null
  isClicked = false
  isMouseHovered = false
  anchorWidth!: number
  hoverOverDebounceLoader!: DebounceLoader
  hoverOutDebounceLoader!: DebounceLoader

  get anchorWidthStyles (): { width: string; maxWidth: string } {
    return {
      width: this.anchorWidth + 'px',
      maxWidth: this.anchorWidth + 'px',
    }
  }

  get triggeredValue (): boolean {
    const getTriggeredValue = () => {
      switch (this.trigger) {
      case 'hover':
        return this.isMouseHovered
      case 'click':
        return this.isClicked
      case 'none':
        return this.modelValue
      default:
        return false
      }
    }

    const triggeredValue = getTriggeredValue()

    this.$emit('trigger', triggeredValue)

    return triggeredValue
  }

  get showContent (): boolean {
    // the idea is to emit 'trigger' in any case
    const triggeredValue = this.triggeredValue

    if (this.opened) {
      return true
    }

    return triggeredValue
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

  onAnchorClick (): void {
    this.$emit('anchor-click')
    if (this.disabled) {
      return
    }
    if (this.isClicked && !this.closeOnAnchorClick) {
      return
    }
    this.isClicked = !this.isClicked
  }

  // Kinda complex logic here.
  // We want to achieve 2 things:
  // * Fast mouse-over shouldn't trigger dropdown.
  // * Dropdown shouldn't close when you move mouse from anchor to content (even with offset).
  onMouseOver (): void {
    if (this.disabled) {
      return
    }
    if (!this.isMouseHovered) {
      this.hoverOverDebounceLoader.run()
    }

    this.hoverOutDebounceLoader.reset()
  }

  onMouseOut (): void {
    if (this.isContentHoverable) {
      this.hoverOutDebounceLoader.run()
    } else {
      this.isMouseHovered = false
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
    this.onClickOutside()
  }

  onClickOutside (): void {
    this.$emit('click-outside')
    if (!this.closeOnClickOutside) {
      return
    }
    this.hide()
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
    if (this.trigger === 'click') {
      this.isClicked = false
    }
  }

  initPopper (): void {
    const options: any = {
      placement: this.position || 'bottom',
      modifiers: [],
      // strategy: this.fixed ? 'fixed' : undefined,
      onFirstUpdate: () => {
        this.$emit('update:modelValue', true)
      },
    }

    const preventOverflow: any = {
      name: 'preventOverflow',
      options: {},
    }
    if (this.preventOverflow) {
      options.modifiers.push(preventOverflow)
    }
    if (this.boundaryBody) {
      preventOverflow.options.boundary = document.body
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
    this.$emit('update:modelValue', false)

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
        this.isMouseHovered = true
      },
      this.hoverOverTimeout,
    )
    this.handlePopperInstance()
    this.hoverOutDebounceLoader = new DebounceLoader(
      async () => {
        this.isMouseHovered = false
      },
      this.hoverOutTimeout,
    )
    // nuxt fix
    if ((this as any).$isServer) {
      return
    }
    this.registerClickOutsideListener()
  }

  beforeUnmount (): void {
    this.unregisterClickOutsideListener()
    this.removePopper()
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-dropdown {
  /* Solved the alignment problem (if we try to align inline and block elements) */
  line-height: 1;

  &__content-wrapper {
    /* overflow: hidden; */
    z-index: 100;
  }

  &__content {
  }
}
</style>
