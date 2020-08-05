<template>
  <div class="va-backtop">
    <slot>
      <va-button icon="expand_less" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import VaButton from '../va-button/VaButton.vue'
const BacktopPropsMixin = makeContextablePropsMixin({
  target: { type: [String, HTMLElement], default: '' },
})

@Component({
  name: 'VaBacktop',
  components: { VaButton },
})
export default class VaBacktop extends Mixins(
  BacktopPropsMixin,
) {
  scrolled = false

  get computedDomElement (): any {
    if (this.c_target) {
      return document.querySelector(`${this.c_target}`)
    }
    return window
  }

  mounted () {
    this.computedDomElement.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    this.computedDomElement.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (e: Event) {
    console.log('scrolling...')
  }
}
</script>

<style lang="scss">
@import '../../vuestic-sass/resources/resources';

body {
  height: 200vh;
}

.va-backtop {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}
</style>
