<template>
  <div
    class="va-card__actions"
    :class="classComputed"
    :style="alignComputed"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBem, useComponentPresetProp, useAlignProps, useAlign } from '../../../../composables'
import pick from 'lodash/pick.js'

export default defineComponent({
  name: 'VaCardActions',
  props: {
    ...useAlignProps,
    ...useComponentPresetProp,
  },
  setup (props) {
    const { alignComputed } = useAlign(props)
    const classComputed = useBem('va-card__actions', () => ({
      ...pick(props, ['vertical']),
    }))

    return {
      classComputed,
      alignComputed,
    }
  },
})
</script>

<style lang="scss">
.va-card__actions {
  button,
  .va-button {
    margin: 0 var(--va-card-actions-btn-margin);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &--vertical {
    button,
    .va-button {
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
