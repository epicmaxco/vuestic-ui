<template>
  <div class="va-button-group" :class="computedClass">
    <va-config :components="buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { extractComponentProps } from '../../utils/component-options'
import omit from 'lodash/omit.js'

import { useBem, useComponentPresetProp } from '../../composables'

import { VaConfig } from '../va-config'
import { VaButton } from '../va-button'

const VaButtonProps = omit(extractComponentProps(VaButton), ['block'])

export default defineComponent({
  name: 'VaButtonGroup',
  components: { VaConfig },
  props: {
    ...VaButtonProps,
    ...useComponentPresetProp,
    grow: {
      type: Boolean,
      default: false,
    },
  },

  setup: (props) => {
    const buttonConfig = computed(() => ({ VaButton: { ...props } }))
    const computedClass = useBem('va-button-group', () => ({
      square: !props.round,
      grow: props.grow,
      small: props.size === 'small',
      large: props.size === 'large',
    }))

    return { buttonConfig, computedClass }
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
