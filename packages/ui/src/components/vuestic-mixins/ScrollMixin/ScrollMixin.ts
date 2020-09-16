import { Mixins, Component } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

@Component
export class ScrollMixin extends Mixins(makeContextablePropsMixin({
  target: { type: [Element, String], default: window },
})) {
  get targetElement (): Element {
    return typeof this.c_target === 'string'
      ? document.querySelector(this.c_target)
      : this.c_target || this.$el.parentElement
  }

  addEventListeners () {
    if (this.c_target) {
      this.targetElement.addEventListener('scroll', this.handleScroll)
    }
  }

  removeEventListeners () {
    if (this.c_target) {
      this.targetElement.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll (): void {
    throw new Error('handleScroll method should be implemented in component')
  }

  mounted () {
    this.addEventListeners()
  }

  beforeDestroy () {
    this.removeEventListeners()
  }
}
