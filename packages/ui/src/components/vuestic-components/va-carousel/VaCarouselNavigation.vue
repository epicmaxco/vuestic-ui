<template>
  <div class="va-carousel-navigation">

    <va-button
      :disabled="!canAdvanceBackward && !hoverBackward"
      class="va-carousel-navigation-button va-carousel-navigation-prev"
      flat
      size="medium"
      :color="c_color"
      icon="chevron_left"
      :tabindex="canAdvanceBackward ? 0 : -1"
      @click.prevent="triggerPageAdvance('backward')"
      @mouseover="hoverBackward = true"
      @mouseleave="hoverBackward = false"
    />

    <va-button
      :disabled="!canAdvanceForward && !hoverForward"
      class="va-carousel-navigation-button va-carousel-navigation-next"
      flat
      size="medium"
      :color="c_color"
      icon="chevron_right"
      :tabindex="canAdvanceForward ? 0 : -1"
      @click.prevent="triggerPageAdvance('forward')"
      @mouseover="hoverForward = true"
      @mouseleave="hoverForward = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Inject } from 'vue-property-decorator'

import VaButton from '../va-button/VaButton.vue'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

const PropsMixin = makeContextablePropsMixin({
  nextLabel: { type: String, default: '&#9654' },
  prevLabel: { type: String, default: '&#9664' },
  color: { type: String, default: '#fff' },
})

@Component({
  name: 'VaCarouselNavigation',
  components: { VaButton },
})
export default class VaCarouselNavigation extends Mixins(
  PropsMixin,
) {
  hoverBackward = false
  hoverForward = false

  @Inject() readonly carousel!: any

  get canAdvanceForward () {
    return this.carousel.canAdvanceForward || false
  }

  get canAdvanceBackward () {
    return this.carousel.canAdvanceBackward || false
  }

  triggerPageAdvance (direction: string) {
    this.$emit('click', direction)
  }
}
</script>

<style lang="scss" scoped>
.va-carousel-navigation {
  &-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-decoration: none;
    appearance: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 100;
  }

  &-next {
    right: 0;
    font-family: "system";
    margin-right: 0.5rem;
  }

  &-prev {
    left: 0;
    font-family: "system";
    margin-left: 0.5rem;
  }
}
</style>
