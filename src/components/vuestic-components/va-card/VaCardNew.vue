<template>
  <component
    :is="tag"
    class="va-card-new"
    :class="cardClasses"
    :style="cardStyles"
  >
    <div
      v-if="stripe"
      class="va-card-new__stripe"
      :style="stripeStyles"
    />
    <slot />
  </component>
</template>

<script>
import { getGradientBackground } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaCardNew',
  mixins: [ColorThemeMixin, ContextPluginMixin],
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
    stripe: {
      type: Boolean,
      default: false,
    },
    stripeColor: {
      type: String,
      default: 'white',
    },
    colorGradient: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClasses () {
      return {
        ...this.themeClassComputed,
        'square': this.square,
        'outlined': this.outlined,
        'no-border': !this.bordered,
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
@import "../../vuestic-sass/resources/resources";

$light-default-color: #ffffff;
$dark-default-color: #1e1e1e;

.va-card-new {
  &.theme--light {
    color: $dark-default-color;
    background-color: $light-default-color;

    ::selection {
      color: $light-default-color;
      background-color: $dark-default-color;
    }
  }

  &.theme--dark {
    color: $light-default-color;
    background-color: $dark-default-color;

    ::selection {
      color: $dark-default-color;
      background-color: $light-default-color;
    }
  }

  display: block;
  position: relative;
  overflow: hidden;
  box-shadow: $card-box-shadow;
  border-radius: $card-border-radius;

  &.square {
    border-radius: 0;
  }

  &.outlined {
    box-shadow: none;
    border: $card-border;
  }

  &.no-border {
    border: none;
  }

  &__stripe {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.5rem;
    top: 0;
    left: 0;
  }

  &__title,
  &__content,
  &__actions {
    padding: $card-padding;

    + .va-card-new__title,
    + .va-card-new__content,
    + .va-card-new__actions {
      padding-top: 0;
    }
  }

  &__title,
  &__actions {
    display: flex;
    align-items: center;
  }

  &__title {
    @include va-title();
  }
}
</style>
