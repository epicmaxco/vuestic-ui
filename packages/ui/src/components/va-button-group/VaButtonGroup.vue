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

import { useBem } from '../../composables/useBem'

import { VaConfig } from '../va-config'
import { VaButton } from '../va-button'

const VaButtonProps = extractComponentProps(VaButton)

export default defineComponent({
  name: 'VaButtonGroup',
  components: { VaConfig },
  props: { ...VaButtonProps },

  setup: (props) => ({
    buttonConfig: computed(() => ({ VaButton: { ...props } })),
    computedClass: useBem('va-button-group', () => ({
      square: !props.round,
      small: props.size === 'small',
    })),
  }),
})
</script>

<style lang="scss">
@import "variables";

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

  .va-button {
    margin: var(--va-button-group-button-margin);
    box-shadow: none;
  }

  .va-button--focused {
    outline-offset: -2px;
  }

  & > .va-button:last-child {
    width: var(--va-button-group-button-width);
    padding-right: var(--va-button-group-button-padding);

    &.va-button--small {
      padding-right: var(--va-button-group-sm-button-padding);
    }
  }

  & > .va-button:first-child {
    width: var(--va-button-group-button-width);
    padding-left: var(--va-button-group-button-padding);

    &.va-button--small {
      padding-left: var(--va-button-group-sm-button-padding);
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
