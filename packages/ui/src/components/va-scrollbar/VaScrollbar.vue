<template>
  <div
    class="va-scrollbar"
    ref="vuesticScrollbar"
  >
    <div
      class="scrollbar-wrapper"
      ref="scrollbarWrapper"
    >
      <div
        class="scrollbar-content"
        ref="scrollbarContent"
        @wheel="scroll"
        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="stopDrag"
        @transitionend="onContentResize"
      >
        <slot />
      </div>
      <div
        class="track"
        ref="track"
      >
        <div
          class="thumb"
          ref="thumb"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VaScrollbar',
  props: {
    speed: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    calcOnResize () {
      this.calcSize()
      this.calcThumb()
    },
    calcSize () {
      this.isDown = this.isUp = false
      this.maxHeight = parseFloat(this.wrapper.offsetHeight, 10)
      this.contentHeight = parseFloat(this.content.offsetHeight, 10)
      this.trackHeight = parseFloat(this.track.offsetHeight, 10)

      if (this.maxHeight / this.contentHeight * this.trackHeight < 10) {
        this.thumb.style.height = 10 + 'px'
      } else {
        this.thumb.style.height = this.maxHeight / this.contentHeight * this.trackHeight + 'px'
      }

      if (this.maxHeight / this.contentHeight < 1) {
        this.thumb.classList.add('active')
      } else {
        this.thumb.classList.remove('active')
      }
    },
    calcThumb () {
      const currentMT = this.content.style.marginTop === ''
        ? 0
        : parseInt(this.content.style.marginTop, 10)
      this.thumb.style.top = (-currentMT / this.contentHeight * this.trackHeight) + 'px'
    },
    onContentResize () {
      const prevHeight = this.contentHeight
      this.calcSize()
      this.calcThumb()

      this.content.style.transition = 'margin-top .3s linear'
      this.thumb.style.transition = 'top .3s linear'
      const handler = (e) => {
        if (e.propertyName === 'margin-top') {
          this.content.style.transition = ''
          this.calcSize()
          this.calcThumb()
          this.content.removeEventListener('transitionend', handler)
          this.thumb.style.transition = ''
        }
      }
      this.content.addEventListener('transitionend', handler)

      this.setVertical(this.contentHeight - prevHeight)
    },
    startDrag (e) {
      this.isDragging = true
      this.prevTouch = e.touches[0]
    },
    onDrag (e) {
      if (this.isDragging) {
        e.preventDefault()
        const touch = e.touches[0]
        const delta = this.prevTouch.clientY - touch.clientY
        this.setVertical(delta)
        this.prevTouch = touch
      }
    },
    stopDrag () {
      this.isDragging = false
    },
    scroll (e) {
      let delta = (e.deltaY * 0.01 * this.speed)
      if (navigator?.userAgent?.toLowerCase().includes('firefox')) {
        delta *= 10
      }
      this.setVertical(delta)
      e.preventDefault()
    },
    setVertical (delta) {
      if ((this.isDown && delta > 0) || (this.isUp && delta < 0) || (this.contentHeight <= this.maxHeight)) {
        return
      }
      const currentMT = this.content.style.marginTop === ''
        ? 0
        : parseFloat(this.content.style.marginTop, 10)
      let nextMT = 0
      if (this.maxHeight - (currentMT - delta) > this.contentHeight && delta > 0) {
        nextMT = this.maxHeight - this.contentHeight
        this.isDown = true
      } else {
        this.isDown = false
        if (currentMT - delta > 0) {
          this.isUp = true
          nextMT = 0
        } else {
          nextMT = currentMT - delta
          this.isUp = false
        }
      }

      this.content.style.marginTop = nextMT + 'px'
      this.calcThumb()
    },
  },
  mounted () {
    this.track = this.$refs.track
    this.thumb = this.$refs.thumb
    this.content = this.$refs.scrollbarContent
    this.wrapper = this.$refs.scrollbarWrapper
    this.calcOnResize()

    window.addEventListener('resize', this.calcOnResize)
  },
  beforeUnmount () {
    window.removeAllListeners('resize', this.calcOnResize)
  },
  data () {
    return {
      wrapper: undefined,
      maxHeight: undefined,
      thumb: undefined,
      track: undefined,
      trackHeight: undefined,
      content: undefined,
      contentHeight: undefined,
      isDown: false,
      isUp: true,
      prevTouch: {},
      isDragging: false,
    }
  },
}

</script>

<style lang="scss">
@import 'variables';

.va-scrollbar {
  background: var(--va-scrollbar-background);
  transition: var(--va-scrollbar-transition);
  position: var(--va-scrollbar-position);
  font-family: var(--va-font-family);

  .scrollbar-wrapper {
    border-radius: var(--va-scrollbar-wrapper-border-radius);
    box-shadow: var(--va-scrollbar-wrapper-box-shadow);
    position: var(--va-scrollbar-wrapper-position);
    overflow: var(--va-scrollbar-wrapper-overflow);
    max-height: var(--va-scrollbar-wrapper-max-height);

    .track {
      width: var(--va-scrollbar-wrapper-track-width);
      position: var(--va-scrollbar-wrapper-track-position);
      right: var(--va-scrollbar-wrapper-track-right);
      top: var(--va-scrollbar-wrapper-track-top);
      height: var(--va-scrollbar-wrapper-track-height);

      .thumb {
        transition: var(--va-scrollbar-thumb-transition);
        position: var(--va-scrollbar-thumb-position);
        width: var(--va-scrollbar-thumb-width);
        background-color: var(--va-scrollbar-thumb-background-color);
        opacity: var(--va-scrollbar-thumb-opacity);

        &.active {
          opacity: 0.3;
        }
      }
    }
  }

  &:hover {
    .thumb.active {
      opacity: 1 !important;
    }
  }
}
</style>
