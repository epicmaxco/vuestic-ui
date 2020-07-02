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
    <div
      class="va-dropdown__content"
      v-if="showContent"
      @mouseover="isContentHoverable && onMouseOver()"
      @mouseout="onMouseOut()"
      ref="content"
    >
      <div
        v-if="keepAnchorWidth"
        ref="anchorWidthContainer"
        class="va-dropdown__anchor-width-container"
        :style="anchorWidthContainerStyles"
      >
        <slot />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { DebounceLoader } from 'asva-executors'

export default {
  name: 'VaDropdown',
  data () {
    return {
      popperInstance: null,
      isClicked: false,
      anchorWidth: undefined,

      isMouseHovered: false,
      hoverOverDebounceLoader: new DebounceLoader(
        async () => {
          this.isMouseHovered = true
        },
        this.hoverOverTimeout,
      ),
      hoverOutDebounceLoader: new DebounceLoader(
        async () => {
          this.isMouseHovered = false
        },
        this.hoverOutTimeout,
      ),
    }
  },
  created () {
    // nuxt fix
    if (this.$isServer) {
      return
    }
    this.registerClickOutsideListener()
  },
  beforeDestroy () {
    this.unregisterClickOutsideListener()
    this.removePopper()
  },
  mounted () {
    this.handlePopperInstance()
  },
  watch: {
    showContent: {
      handler () {
        this.handlePopperInstance()
      },
    },
  },
  props: {
    debugId: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    boundaryBody: Boolean,
    value: Boolean,
    offset: {
      type: [Array, Number],
      default: () => [],
    },
    disabled: Boolean,
    fixed: Boolean,
    keepAnchorWidth: Boolean, // Means dropdown width should be the same as anchor's width.
    preventOverflow: { // If set to false - dropdown won't dodge outside container.
      type: Boolean,
      default: false,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    closeOnAnchorClick: {
      type: Boolean,
      default: true,
    },
    isContentHoverable: {
      type: Boolean,
      default: true,
    },
    trigger: {
      default: 'click',
      validator: trigger => ['click', 'hover', 'none'].includes(trigger),
    },
    hoverOverTimeout: {
      type: Number,
      default: 30,
    },
    hoverOutTimeout: {
      type: Number,
      default: 200,
    },
  },
  methods: {
    handlePopperInstance () {
      if (this.popperInstance) {
        this.removePopper()
      }

      if (!this.showContent) {
        return
      }

      this.updateAnchorWidth()

      // I'm not entirely sure why $nextTick is needed here.
      this.$nextTick(() => {
        this.initPopper()
      })
    },
    onAnchorClick () {
      this.$emit('anchorClick')
      if (this.disabled) {
        return
      }
      if (this.isClicked && !this.closeOnAnchorClick) {
        return
      }
      this.isClicked = !this.isClicked
    },
    // Kinda complex logic here.
    // We want to achieve 2 things:
    // * Fast mouse-over shouldn't trigger dropdown.
    // * Dropdown shouldn't close when you move mouse from anchor to content (even with offset).
    onMouseOver () {
      if (this.disabled) {
        return
      }
      if (!this.isMouseHovered) {
        this.hoverOverDebounceLoader.run()
      }

      this.hoverOutDebounceLoader.reset()
    },
    onMouseOut () {
      if (!this.isContentHoverable) {
        this.isMouseHovered = false
      }
      this.hoverOutDebounceLoader.run()
      this.hoverOverDebounceLoader.reset()
    },
    registerClickOutsideListener () {
      document.addEventListener('click', event => this.handleDocumentClick(event), false)
    },
    unregisterClickOutsideListener () {
      document.removeEventListener('click', event => this.handleDocumentClick(event), false)
    },
    handleDocumentClick (event) {
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
    },
    onClickOutside () {
      this.$emit('clickOutside')
      if (!this.closeOnClickOutside) {
        return
      }
      this.hide()
    },
    updateAnchorWidth () {
      if (this.keepAnchorWidth) {
        let anchorWidth = this.$refs.anchor.offsetWidth
        if (this.$refs.anchorWidthContainer && this.$refs.anchorWidthContainer.scrollHeight > this.$refs.anchorWidthContainer.clientHeight) {
          anchorWidth = this.$refs.anchor.offsetWidth - this.scrollWidth
        }
        this.anchorWidth = anchorWidth
      }
      if (this.popperInstance) {
        this.popperInstance.forceUpdate()
      }
    },
    // @public
    hide () {
      if (this.trigger === 'click') {
        this.isClicked = false
      }
    },
    initPopper () {
      const options = {
        placement: this.position || 'bottom',
        modifiers: [],
        strategy: this.fixed ? 'fixed' : undefined,
        onFirstUpdate: () => {
          this.$emit('input', true)
        },
      }

      const preventOverflow = {
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
        this.$refs.anchor,
        this.$refs.content,
        options,
      )

      // temporary solution
      this.updatePopper()
    },
    removePopper () {
      this.$emit('input', false)

      if (!this.popperInstance) {
        return
      }
      this.popperInstance.destroy()
      this.popperInstance = null
    },
    updatePopper () {
      // used by select
      if (!this.popperInstance) {
        return
      }
      this.updateAnchorWidth()
    },
  },
  computed: {
    anchorWidthContainerStyles () {
      return {
        width: this.anchorWidth + 'px',
        maxWidth: this.anchorWidth + 'px',
      }
    },
    showContent () {
      if (this.trigger === 'hover') {
        return this.isMouseHovered
      }
      if (this.trigger === 'click') {
        return this.isClicked
      }
      if (this.trigger === 'none') {
        return this.value
      }

      return null
    },
    scrollWidth () {
      const div = document.createElement('div')

      div.style.overflowY = 'scroll'
      div.style.width = '50px'
      div.style.height = '50px'
      div.style.visibility = 'hidden'

      document.body.appendChild(div)
      const scrollWidth = div.offsetWidth - div.clientWidth
      document.body.removeChild(div)
      return scrollWidth
    },
  },
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
