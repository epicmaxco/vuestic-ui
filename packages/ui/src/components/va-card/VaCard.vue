<template>
  <component
    :is="tagComputed"
    class="va-card"
    :class="cardClasses"
    :style="cardStyles"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
  >
    <div
      v-if="stripe"
      class="va-card__stripe"
      :style="stripeStyles"
    />
    <div
      class="va-card__inner"
      @click="$emit('click', $event)"
    >
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'

import { getGradientBackground } from '../../services/color-config/color-functions'
import ColorMixin from '../../services/color-config/ColorMixin'
import { RouterLinkMixin } from '../../mixins/RouterLinkMixin/RouterLinkMixin'

class CardProps {
  tag = prop<string>({ type: String, default: 'div' })
  square = prop<boolean>({ type: Boolean, default: false })
  outlined = prop<boolean>({ type: Boolean, default: false })
  bordered = prop<boolean>({ type: Boolean, default: true })
  disabled = prop<boolean>({ type: Boolean, default: false })
  href = prop<string>({ type: String, default: null })
  target = prop<string>({ type: String, default: null })
  stripe = prop<boolean>({ type: Boolean, default: false })
  stripeColor = prop<string>({ type: String, default: '' })
  gradient = prop<boolean>({ type: Boolean, default: false })
  dark = prop<boolean>({ type: Boolean, default: false })
}

const CardPropsMixin = Vue.with(CardProps)

@Options({
  name: 'VaCard',
  emits: ['click'],
})
export default class VaCard extends mixins(
  ColorMixin,
  RouterLinkMixin,
  CardPropsMixin,
) {
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
    const color = this.dark ? this.computeColor(this.color || 'dark') : this.theme.getColor(this.color, '#ffffff')

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

<style lang="scss">
@import '../../styles/resources';
@import 'variables';

.va-card {
  display: var(--va-card-display);
  position: var(--va-card-position);
  overflow: var(--va-card-overflow);
  box-shadow: var(--va-card-box-shadow, var(--va-block-box-shadow));
  border-radius: var(--va-card-border-radius, var(--va-block-border-radius));
  color: var(--va-card-color);
  background-color: var(--va-card-background-color);

  &__inner {
    width: 100%;
  }

  &--dark {
    color: var(--va-card-dark-color);
    background-color: var(--va-card-dark-background-color);
  }

  &--square {
    border-radius: 0;
  }

  &--outlined {
    box-shadow: var(--va-card-outlined-box-shadow);
    border: var(--va-card-outlined-border, var(--va-block-border));
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
    height: var(--va-card-stripe-border-size);
    top: 0;
    left: 0;
  }

  &__title,
  &__content,
  &__actions,
  &__actions_vertical {
    padding: var(--va-card-padding);

    + .va-card__title,
    + .va-card__content,
    + .va-card__actions,
    + .va-card_actions__vertical {
      padding-top: 0;
    }
  }

  &__title {
    display: flex;
    align-items: center;

    @include va-title();
  }
}
</style>
