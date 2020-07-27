<template>
  <div class="va-dropdown">
    <div
      class="va-dropdown__anchor"
      @mouseover="onMouseOver()"
      @mouseout="onMouseOut()"
      @click="onAnchorClick()"
      ref="anchor"
    >
      <slot name="anchor" />
    </div>
    <template v-if="showContent">
      <div
        class="va-dropdown__content"
        @mouseover="isContentHoverable && onMouseOver()"
        @mouseout="onMouseOut()"
        :style="keepAnchorWidth ? anchorWidthStyles : ''"
        ref="content"
      >
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { createPopper } from '@popperjs/core'
import { DebounceLoader } from 'asva-executors'

@Component
export default class VaDropdown extends Vue {
  @Prop({ type: String, default: '' }) debugId!: string
  @Prop({ type: String, default: '' }) position!: string
  @Prop({ type: Number, default: 30 }) hoverOverTimeout!: number
  @Prop({ type: Number, default: 200 }) hoverOutTimeout!: number
  @Prop({ type: Boolean }) boundaryBody!: boolean
  @Prop({ type: Boolean }) value!: boolean
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) fixed!: boolean
  // Means dropdown width should be the same as anchor's width.
  @Prop({ type: Boolean }) keepAnchorWidth!: boolean
  // If set to false - dropdown won't dodge outside container.
  @Prop({ type: Boolean, default: false }) preventOverflow!: boolean
  @Prop({ type: Boolean, default: true }) closeOnClickOutside!: boolean
  @Prop({ type: Boolean, default: true }) closeOnAnchorClick!: boolean
  @Prop({ type: Boolean, default: true }) isContentHoverable!: boolean
  @Prop({ type: [Array, Number], default: () => [] }) offset!: number | number[]
  @Prop({
    type: [Array, Number, String],
    default: 'click',
    validator: (trigger: string): boolean => ['click', 'hover', 'none'].includes(trigger),
  }) trigger!: string

  @Watch('showContent')
  onShowContentChange (): void {
    this.handlePopperInstance()
  }

  popperInstance: any = null
  isClicked = false
  isMouseHovered = false
  anchorWidth: string | undefined = undefined
  hoverOverDebounceLoader!: DebounceLoader
  hoverOutDebounceLoader!: DebounceLoader

  get anchorWidthStyles (): { width: string; maxWidth: string } {
    return {
      width: this.anchorWidth + 'px',
      maxWidth: this.anchorWidth + 'px',
    }
  }

  get showContent (): boolean {
    if (this.trigger === 'hover') {
      return this.isMouseHovered
    }
    if (this.trigger === 'click') {
      return this.isClicked
    }
    if (this.trigger === 'none') {
      return this.value
    }

    return false
  }

  get scrollWidth (): number {
    const div: HTMLElement = document.createElement('div')

    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'

    document.body.appendChild(div)
    const scrollWidth: number = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)
    return scrollWidth
  }

  handlePopperInstance (): void {
    if (this.popperInstance) {
      this.removePopper()
    }

    if (!this.showContent) {
      return
    }

    this.updateAnchorWidth()

    this.$nextTick(() => {
      this.initPopper()
    })
  }

  onAnchorClick (): void {
    this.$emit('anchorClick')
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
      this.hoverOverDebounceLoader && this.hoverOverDebounceLoader.run()
    }

    this.hoverOutDebounceLoader && this.hoverOutDebounceLoader.reset()
  }

  onMouseOut (): void {
    if (!this.isContentHoverable) {
      this.isMouseHovered = false
    }
    this.hoverOutDebounceLoader && this.hoverOutDebounceLoader.run()
    this.hoverOverDebounceLoader && this.hoverOverDebounceLoader.reset()
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
    const isCurrentDropdownClicked = clickedElements.includes(this.$refs.anchor) || clickedElements.includes(this.$refs.content)
    if (isCurrentDropdownClicked) {
      return
    }
    this.onClickOutside()
  }

  onClickOutside (): void {
    this.$emit('clickOutside')
    if (!this.closeOnClickOutside) {
      return
    }
    this.hide()
  }

  updateAnchorWidth (): void {
    if (this.keepAnchorWidth) {
      let anchorWidth = (this as any).$refs.anchor.offsetWidth
      if (this.$refs.anchorWidthContainer && (this as any).$refs.anchorWidthContainer.scrollHeight > (this as any).$refs.anchorWidthContainer.clientHeight) {
        anchorWidth = (this as any).$refs.anchor.offsetWidth - this.scrollWidth
      }
      this.anchorWidth = anchorWidth
    }
    if (this.popperInstance) {
      this.popperInstance.forceUpdate()
    }
  }

  // @public
  hide (): void {
    if (this.trigger === 'click') {
      this.isClicked = false
    }
  }

  initPopper (): void {
    const options: any = {
      placement: this.position || 'bottom',
      modifiers: [],
      strategy: this.fixed ? 'fixed' : undefined,
      onFirstUpdate: () => {
        this.$emit('input', true)
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
      this.$refs.content as HTMLElement,
      options,
    )
  }

  removePopper (): void {
    this.$emit('input', false)

    if (!this.popperInstance) {
      return
    }
    this.popperInstance.destroy()
    this.popperInstance = null
  }

  created (): void {
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
    if (this.$isServer) {
      return
    }
    this.registerClickOutsideListener()
  }

  mounted (): void {
    this.handlePopperInstance()
  }

  beforeDestroy (): void {
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

  &__content {
    /* overflow: hidden; */
    z-index: 100;
  }
}
</style>
