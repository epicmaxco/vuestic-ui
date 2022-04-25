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
    <div v-if="stripe" class="va-card__stripe" :style="stripeStyles" />
    <div class="va-card__inner" @click="$emit('click', $event)">
      <slot />
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { getGradientBackground } from '../../services/color-config/color-functions'
import { useColors, useColorProps } from '../../composables/useColor'
import { useRouterLink, useRouterLinkProps } from '../../composables/useRouterLink'

export default defineComponent({
  name: 'VaCard',
  emits: ['click'],
  props: {
    ...useColorProps,
    ...useRouterLinkProps,
    tag: { type: String as PropType<string>, default: 'div' },
    square: { type: Boolean as PropType<boolean>, default: false },
    outlined: { type: Boolean as PropType<boolean>, default: false },
    bordered: { type: Boolean as PropType<boolean>, default: true },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    href: { type: String as PropType<string>, default: '' },
    target: { type: String as PropType<string>, default: '' },
    stripe: { type: Boolean as PropType<boolean>, default: false },
    stripeColor: { type: String as PropType<string>, default: '' },
    gradient: { type: Boolean as PropType<boolean>, default: false },
    dark: { type: Boolean as PropType<boolean>, default: false },
  },
  setup (props) {
    const { getColor } = useColors()
    const { hasRouterLinkParams, tagComputed, hrefComputed } = useRouterLink(props)

    const stripeStyles = computed(() => ({ background: getColor(props.stripeColor) }))

    const cardClasses = computed(() => ({
      'va-card--dark': props.dark,
      'va-card--square': props.square,
      'va-card--outlined': props.outlined,
      'va-card--no-border': !props.bordered,
      'va-card--disabled': props.disabled,
      'va-card--link': props.href || hasRouterLinkParams.value,
    }))

    const cardStyles = computed(() => {
      const color = props.dark ? getColor(props.color || 'dark') : getColor(props.color, 'white')

      if (props.gradient && props.color) {
        return {
          background: getGradientBackground(color),
        }
      }

      return { background: color }
    })

    return {
      cardClasses,
      cardStyles,
      stripeStyles,
      tagComputed,
      hrefComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-card {
  display: var(--va-card-display);
  position: var(--va-card-position);
  overflow: var(--va-card-overflow);
  box-shadow: var(--va-card-box-shadow, var(--va-block-box-shadow));
  border-radius: var(--va-card-border-radius, var(--va-block-border-radius));
  color: var(--va-card-color);
  background-color: var(--va-card-background-color);
  font-family: var(--va-font-family);

  &__inner {
    width: 100%;
    height: 100%;
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
    @include va-disabled;
  }

  &--link {
    cursor: pointer;
  }

  &__stripe {
    content: "";
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
