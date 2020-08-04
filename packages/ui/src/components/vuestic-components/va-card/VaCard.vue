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
      v-if="c_stripe"
      class="va-card__stripe"
      :style="stripeStyles"
    />
    <slot />
  </component>
</template>

<script lang="ts">
import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin, getColor } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { Component, Mixins } from 'vue-property-decorator'

const CardPropsMixin = makeContextablePropsMixin({
  tag: { type: String, default: 'div' },
  square: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: null },
  target: { type: String, default: null },
  stripe: { type: Boolean, default: false },
  stripeColor: { type: String, default: '' },
  gradient: { type: Boolean, default: false },
})

@Component({
  name: 'VaCard',
})
export default class VaCard extends Mixins(
  ColorThemeMixin,
  RouterLinkMixin,
  CardPropsMixin,
) {
  get cardClasses () {
    return {
      'va-card--dark': this.dark,
      'va-card--square': this.c_square,
      'va-card--outlined': this.c_outlined,
      'va-card--no-border': !this.c_bordered,
      'va-card--disabled': this.c_disabled,
      'va-card--link': this.c_href || this.hasRouterLinkParams,
    }
  }

  get cardStyles () {
    const color = this.dark ? this.computeColor(this.c_color) : getColor(this, this.c_color, '#ffffff')

    if (this.c_gradient && this.c_color) {
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
      'background-color': this.computeColor(this.c_stripeColor),
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
