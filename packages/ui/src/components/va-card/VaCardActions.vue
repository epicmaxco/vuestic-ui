<template>
  <div
    :class="[vertical ? 'va-card__actions_vertical' : 'va-card__actions']"
    :style="alignComputed"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAlignProps, useAlign } from '../../composables/useAlign'
import { useComponentPresetProp } from '../../composables/useComponentPreset'

export default defineComponent({
  name: 'VaCardActions',
  props: {
    ...useAlignProps,
    ...useComponentPresetProp,
  },
  setup (props) {
    const { alignComputed } = useAlign(props)

    return {
      alignComputed,
    }
  },
})
</script>

<style lang="scss">
.va-card__actions {
  button {
    margin: 0 var(--va-card-actions-btn-margin);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &_vertical {
    button {
      margin: var(--va-card-actions-btn-margin) 0;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
