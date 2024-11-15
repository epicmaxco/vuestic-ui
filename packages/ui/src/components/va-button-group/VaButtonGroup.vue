<template>
  <div class="va-button-group" :class="computedClass">
    <va-config :components="buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { useBem, useComponentPresetProp, useColors, useElementTextColor } from '../../composables'

import { VaConfig } from '../va-config'
import { VaButton } from '../va-button'
import { omit } from '../../utils/omit'

const VaButtonProps = omit(extractComponentProps(VaButton), ['block', 'gradient'])
</script>

<script lang="ts" setup>
defineOptions({
  name: 'VaButtonGroup',
})

const props = defineProps({
  ...VaButtonProps,
  ...useComponentPresetProp,
  grow: { type: Boolean, default: false },
  gradient: { type: Boolean, default: false },
})

const { getColor, getGradientBackground } = useColors()
const colorComputed = computed(() => getColor(props.color))
const textColorComputed = useElementTextColor(colorComputed)

const filteredProps = filterComponentProps(VaButtonProps)
const buttonConfig = computed(() => ({
  VaButton: {
    ...filteredProps.value,
    ...(props.gradient && {
      color: '#00000000',
      textColor: textColorComputed.value,
    }),
  },
}))
const computedClass = useBem('va-button-group', () => ({
  square: !props.round,
  grow: props.grow,
  small: props.size === 'small',
  large: props.size === 'large',
}))
const backgroundColor = computed(() =>
  props.gradient ? getGradientBackground(colorComputed.value) : 'transparent',
)
</script>

<style lang="scss">
@import "variables";
@import '../../styles/resources';

.va-button-group {
  display: var(--va-button-group-display);
  justify-content: var(--va-button-group-justify-content);
  border-radius: var(--va-button-group-border-radius);
  font-family: var(--va-font-family);
  width: max-content;
  background: v-bind(backgroundColor);

  &--grow {
    width: 100%;

    --va-button-group-button-width: 100%;
  }

  &--square {
    border-radius: var(--va-button-border-radius);
  }

  &--small {
    &.va-button-group--square {
      border-radius: var(--va-button-sm-border-radius);
    }
  }

  &--large {
    &.va-button-group--square {
      border-radius: var(--va-button-lg-border-radius);
    }
  }

  .va-button {
    margin: var(--va-button-group-button-margin);
    width: var(--va-button-group-button-width);
    box-shadow: none;
    outline: none;

    &:focus-visible {
      outline: none !important;

      &::before {
        @include focus-outline($offset: -2px, $radius: 'inherit');
      }
    }
  }

  & > .va-button:last-child {
    padding-right: var(--va-button-group-button-padding);
  }

  & > .va-button:first-child {
    padding-left: var(--va-button-group-button-padding);
  }

  & > .va-button:not(:last-child) {
    padding-right: var(--va-button-group-gap);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;

    .va-button__content {
      margin-right: 0;
    }
  }

  & > .va-button + .va-button {
    padding-left: var(--va-button-group-gap);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;

    .va-button__content {
      margin-left: 0;
    }
  }
}
</style>
