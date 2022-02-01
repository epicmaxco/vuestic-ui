<template>
  <div class="va-button-group" :style="computedStyle" :class="computedClass">
    <va-config :components="buttonConfig">
      <slot />
    </va-config>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, reactive } from 'vue'

import VaConfig from '../va-config'
import { getGradientBackground } from '../../services/color-config/color-functions'
import { useComputedColor } from '../../composables/useColor'

export default defineComponent({
  name: 'VaButtonGroup',
  components: { VaConfig },
  props: {
    color: { type: String as PropType<string>, default: 'primary' },
    gradient: { type: Boolean as PropType<boolean>, default: undefined },
    textColor: { type: String as PropType<string>, default: undefined },
    rounded: { type: Boolean as PropType<boolean>, default: true },
    outline: { type: Boolean as PropType<boolean>, default: false },
    flat: { type: Boolean as PropType<boolean>, default: false },
    size: {
      type: String as PropType<string>,
      default: 'medium',
      validator: (v: string) => ['medium', 'small', 'large'].includes(v),
    },
  },
  setup (props) {
    const buttonConfig = reactive({
      VaButton: {
        ...props,
        color: props.gradient ? '#00000000' : props.color,
      },
    })

    const colorComputed = useComputedColor(props.color)
    const computedBackground = computed(() => {
      if (props.outline || props.flat) { return '' }

      return props.gradient ? getGradientBackground(colorComputed.value) : colorComputed.value
    })
    const computedStyle = computed(() => {
      const backgroundProperty = props.gradient ? 'background-image' : 'background'

      return { [backgroundProperty]: computedBackground.value }
    })

    const computedClass = computed(() => ({ 'va-button-group_square': !props.rounded }))

    return {
      buttonConfig,
      computedStyle,
      computedClass,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-button-group {
  display: flex;
  justify-content: stretch;
  width: max-content;
  overflow: hidden;
  border-radius: 9999999px;
  font-family: var(--va-font-family);

  &_square {
    border-radius: var(--va-button-square-border-radius);
  }

  .va-button {
    margin: var(--va-button-group-button-margin);
    box-shadow: none !important;
  }

  & > .va-button:last-child {
    width: auto;
    padding-right: 1rem !important;

    &.va-button--small {
      padding-right: 0.75rem !important;
    }

    &.va-button--large {
      padding-right: 1.5rem !important;
    }
  }

  & > .va-button:first-child {
    width: auto;
    padding-left: 1rem;

    &.va-button--small {
      padding-left: 0.75rem;
    }

    &.va-button--large {
      padding-left: 1.5rem;
    }
  }

  & > .va-button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-right: 0.5rem;
    border-right: 0;

    .va-button__content {
      /**
        We need to prevent minus margin because we had:
          border-right: 2px;
          maring-right: -2px;
      */
      margin-right: 0;
    }
  }

  & > .va-button + .va-button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: 0.5rem;
    border-left: 0;

    .va-button__content {
      /**
        We need to prevent minus margin because we had:
          border-left: 2px;
          maring-left: -2px;
      */
      margin-left: 0;
    }
  }
}
</style>
