<template>
  <div
    class="va-card__actions"
    :class="classComputed"
    :style="alignComputed"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useBem, useComponentPresetProp, useAlignableProps, useAlignable } from '../../../../composables'
import { pick } from '../../../../utils/pick'

defineOptions({
  name: 'VaCardActions',
})

const props = defineProps({
  ...useAlignableProps,
  ...useComponentPresetProp,
})

const { alignComputed } = useAlignable(props)
const classComputed = useBem('va-card__actions', () => ({
  ...pick(props, ['vertical']),
}))
</script>

<style lang="scss">
.va-card {
  &__title,
  &__content,
  &__actions,
  &__actions--vertical {
    padding: var(--va-card-padding);

    + .va-card__title,
    + .va-card__content,
    + .va-card__actions,
    + .va-card_actions__vertical {
      padding-top: 0;
    }
  }
}

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
