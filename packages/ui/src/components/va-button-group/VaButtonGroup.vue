<template>
  <div class="va-button-group" :class="computedClass">
    <va-config :components="buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { extractComponentProps } from '../../utils/child-props'
import omit from 'lodash/omit.js'

import { useBem, useDeprecatedProps, useComponentPresetProp, useTextColor, useColors } from '../../composables'

import { VaConfig } from '../va-config'
import { VaButton } from '../va-button'

const VaButtonProps = omit(extractComponentProps(VaButton), ['block'])

export default defineComponent({
  name: 'VaButtonGroup',
  components: { VaConfig },
  props: {
    ...VaButtonProps,
    ...useComponentPresetProp,
  },

  setup (props) {
    const { getColor, getGradientBackground } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const isTransparentBackground = computed(() => Boolean(props.outline || props.flat))
    const { textColorComputed } = useTextColor(colorComputed, isTransparentBackground)

    const computedBackground = computed(() => {
      if (props.outline || props.flat) { return '' }

      return props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value
    })

    const computedStyle = computed(() => {
      const backgroundProperty = props.gradient ? 'background-image' : 'background'

      return {
        [backgroundProperty]: computedBackground.value,
        color: textColorComputed.value,
      }
    })

    const buttonConfig = computed(() => ({
      VaButton: {
        ...props,
        color: props.gradient ? '#00000000' : props.color,
        textColor: textColorComputed.value,
      },
    }))

    const computedClass = computed(() => ({ 'va-button-group_square': !props.rounded }))

    return { buttonConfig, computedClass, computedStyle }
  },
})
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
    overflow: hidden;

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
      box-shadow: none;

      @include keyboard-focus($radius: 'inherit', $offset: -2px);
    }

    & > .va-button:last-child {
      width: var(--va-button-group-button-width);
      padding-right: var(--va-button-group-button-padding);

      &.va-button--small {
        padding-right: var(--va-button-group-sm-button-padding);
      }

      &.va-button--large {
        padding-right: var(--va-button-group-lg-button-padding);
      }
    }

    & > .va-button:first-child {
      width: var(--va-button-group-button-width);
      padding-left: var(--va-button-group-button-padding);

      &.va-button--small {
        padding-left: var(--va-button-group-sm-button-padding);
      }

      &.va-button--large {
        padding-left: var(--va-button-group-lg-button-padding);
      }
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
