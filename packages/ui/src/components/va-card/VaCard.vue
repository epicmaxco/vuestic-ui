<template>
  <component
    :is="tagComputed"
    class="va-card"
    :class="classComputed"
    :style="cardStyles"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { getGradientBackground } from '../../services/color'
import {
  useBem,
  useComponentPresetProp,
  useColors,
  useElementTextColor,
  useRouterLink,
  useRouterLinkProps,
} from '../../composables'
import { pick } from '../../utils/pick'

defineOptions({
  name: 'VaCard',
})

const props = defineProps({
  ...useRouterLinkProps,
  ...useComponentPresetProp,
  tag: { type: String, default: 'div' },
  square: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  href: { type: String, default: '' },
  target: { type: String, default: '' },
  stripe: { type: Boolean, default: false },
  stripeColor: { type: String, default: '' },
  gradient: { type: Boolean, default: false },
  textColor: { type: String },
  color: { type: String, default: 'background-secondary' },
})

const { getColor } = useColors()
const { isLinkTag, tagComputed, hrefComputed } = useRouterLink(props)
const textColorComputed = useElementTextColor(computed(() => getColor(props.color)))

const stripeColorComputed = computed(() => getColor(props.stripeColor))

const classComputed = useBem('va-card', () => ({
  ...pick(props, ['square', 'outlined', 'disabled', 'stripe']),
  noBorder: !props.bordered,
  link: isLinkTag.value,
}))

const cardStyles = computed(() => {
  const background = props.gradient && props.color
    ? getGradientBackground(getColor(props.color))
    : getColor(props.color)

  return {
    background,
    color: textColorComputed.value,
  }
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

  & > div:first-child {
    border-top-right-radius: var(--va-card-border-radius);
    border-top-left-radius: var(--va-card-border-radius);
  }

  & > div:last-child {
    border-bottom-right-radius: var(--va-card-border-radius);
    border-bottom-left-radius: var(--va-card-border-radius);
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

  &--stripe {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: var(--va-card-stripe-border-size);
      top: 0;
      left: 0;
      background: v-bind(stripeColorComputed);
      border-top-right-radius: var(--va-card-border-radius);
      border-top-left-radius: var(--va-card-border-radius);
    }
  }
}
</style>
