<template>
  <component
    :is="cardTag"
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

<script>
import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin } from '../../context-test/context-provide/ContextPlugin'
import { RouterLinkMixin } from '../../vuestic-mixins/RouterLinkMixin'

export default {
  name: 'VaCard',
  mixins: [ColorThemeMixin, ContextPluginMixin, RouterLinkMixin],
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    square: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: null,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    stripeColor: {
      type: String,
      default: '',
    },
    colorGradient: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardTag () {
      if (this.tag === 'a' || this.href) {
        return 'a'
      }

      if (this.tag === 'router-link' || this.hasRouterLinkParams) {
        return 'router-link'
      }

      return this.tag
    },
    cardClasses () {
      return {
        ...this.themeClassComputed,
        'va-card--square': this.square,
        'va-card--outlined': this.outlined,
        'va-card--no-border': !this.bordered,
        'va-card--disabled': this.disabled,
        'va-card--link': this.href || this.hasRouterLinkParams,
      }
    },
    cardStyles () {
      if (this.colorGradient && this.c_color) {
        return {
          'background': getGradientBackground(this.colorComputed),
        }
      }

      return {
        'background-color': this.colorComputed,
      }
    },
    stripeStyles () {
      return {
        'background-color': this.computeColor(this.stripeColor),
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../vuestic-sass/resources/resources';

.va-card {
  &.light {
    color: $dark-default-color;
    background-color: $light-default-color;
  }

  &.dark {
    color: $light-default-color;
    background-color: $dark-default-color;
  }

  display: block;
  position: relative;
  overflow: hidden;
  box-shadow: $card-box-shadow;
  border-radius: $card-border-radius;

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

  /deep/#{&}__title,
  /deep/#{&}__content {
    padding: $card-padding;

    + .va-card__title,
    + .va-card__content {
      padding-top: 0;
    }
  }

  /deep/#{&}__title {
    display: flex;
    align-items: center;

    @include va-title();
  }
}
</style>
