<template>
  <div
  v-if="visible"
    class="va-backtop"
    @click="scrollToTop()"
  >
    <slot>
      <va-button
        icon="expand_less"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import VaButton from '../va-button/VaButton.vue'
const BacktopPropsMixin = makeContextablePropsMixin({
  target: { type: [String, HTMLElement], default: '' },
  visibilityHeight: { type: Number, default: 400 },
})

@Component({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends Mixins(
  BacktopPropsMixin,
) {
  scrolled = false
  visible = false

  get computedDomElement (): any {
    if (this.c_target) {
      return document.querySelector(`${this.c_target}`)
    }
    return document.body
  }

  mounted () {
    this.computedDomElement.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    this.computedDomElement.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    this.visible = this.computedDomElement.scrollTop > this.visibilityHeight
  }

  scrollToTop () {
    this.computedDomElement.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

.va-backtop {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  transition: all 1s linear;
}
</style>
