<template>
  <component
    :is="tagComputed"
    class="va-card"
    :class="cardClasses"
    :style="cardStyles"
    :href="href"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    @click="$emit('click', $event)"
  >
    <div
      v-if="stripe"
      class="va-card__stripe"
      :style="stripeStyles"
    />
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { getGradientBackground } from '../../../services/color-functions'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'

@Component({
  name: 'VaCard',
})
export default class VaCard extends Mixins(
  ColorThemeMixin,
  RouterLinkMixin,
) {
  @Prop({ type: String, default: 'div' }) tag!: string
  @Prop({ type: Boolean, default: false }) square!: boolean
  @Prop({ type: Boolean, default: false }) outlined!: boolean
  @Prop({ type: Boolean, default: true }) bordered!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: String, default: null }) href!: string
  @Prop({ type: String, default: null }) target!: string
  @Prop({ type: Boolean, default: false }) stripe!: boolean
  @Prop({ type: String, default: '' }) stripeColor!: string
  @Prop({ type: Boolean, default: false }) gradient!: boolean
  @Prop({ type: Boolean, default: false }) dark!: boolean

  get cardClasses () {
    return {
      'va-card--dark': this.dark,
      'va-card--square': this.square,
      'va-card--outlined': this.outlined,
      'va-card--no-border': !this.bordered,
      'va-card--disabled': this.disabled,
      'va-card--link': this.href || this.hasRouterLinkParams,
    }
  }

  get cardStyles () {
    const color = this.dark ? this.computeColor(this.color) : (this as any).getColor(this.color, '#ffffff')

    if (this.gradient && this.color) {
      return {
        background: getGradientBackground(color),
      }
    }

    return {
      'background-color': color,
    }
  }

  get stripeStyles () {
    return {
      'background-color': this.computeColor(this.stripeColor),
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../vuestic-sass/resources/resources';

.va-card {
  display: block;
  position: relative;
  overflow: hidden;
  box-shadow: $card-box-shadow;
  border-radius: $card-border-radius;
  color: $dark-default-color;
  background-color: $light-default-color;

  &--dark {
    color: $light-default-color;
    background-color: $dark-default-color;
  }

  &--square {
    border-radius: 0;
  }

  &--outlined {
    box-shadow: none;
    border: $card-border;
  }

  &--no-border {
    border: none;
  }

  &--disabled {
    opacity: 0.6;
    pointer-events: none;
    user-select: none;
  }

  &--link {
    cursor: pointer;
  }

  &__stripe {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.375rem;
    top: 0;
    left: 0;
  }

  ::v-deep #{&}__title,
  ::v-deep #{&}__content {
    padding: $card-padding;

    + .va-card__title,
    + .va-card__content {
      padding-top: 0;
    }
  }

  ::v-deep #{&}__title {
    display: flex;
    align-items: center;

    @include va-title();
  }
}
</style>
