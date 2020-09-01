import { makeContextablePropsMixin } from '../../../context-test/context-provide/ContextPlugin'
import { Component, Mixins } from 'vue-property-decorator'

const PropsMixin = makeContextablePropsMixin({
  autoplay: { type: Boolean, default: false },
  autoplayInterval: { type: Number, default: 3000 },
  autoplayDirection: {
    type: String,
    default: 'forward',
    validator: (value: string) => {
      return ['forward', 'backward'].includes(value)
    },
  },
})

@Component
export class AutoplayMixin extends Mixins(PropsMixin) {
  autoplayTimeout = 0 as any

  startAutoplay () {
    if (this.c_autoplay) {
      this.autoplayTimeout = setInterval(() => this.advancePage(this.c_autoplayDirection), this.c_autoplayInterval)
    }
  }

  mounted () {
    this.startAutoplay()
  }

  beforeDestroy () {
    if (this.autoplayTimeout) {
      this.autoplayTimeout = clearInterval(this.autoplayTimeout)
    }
  }
}
