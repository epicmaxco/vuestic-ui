<template>
  <div class="va-accordion">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PropType, WritableComputedRef } from 'vue'

import { useComponentPresetProp, useStateful, useStatefulProps, useStatefulEmits } from '../../composables'
import { useAccordion } from './hooks/useAccordion'

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,
  modelValue: { type: Array as PropType<boolean[]>, default: () => [] as boolean[] },
  multiple: { type: Boolean, default: false },
  inset: { type: Boolean, default: false },
  popout: { type: Boolean, default: false },
})

const emit = defineEmits([...useStatefulEmits])

const { valueComputed }: { valueComputed: WritableComputedRef<boolean[]>} = useStateful(props, emit, 'modelValue', { defaultValue: [] as boolean[] })

const { items } = useAccordion(props, valueComputed)
</script>

<style lang="scss">
.va-accordion {
  font-family: var(--va-font-family);

  .va-collapse {
    &:not(:first-child, :last-child) {
      .va-collapse__header {
        border-radius: 0;
      }
    }

    &.va-collapse--expanded {
      &:last-child {
        .va-collapse__header {
          border-radius: 0;
        }
      }
    }

    &:first-child {
      .va-collapse__header {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &:last-child {
      .va-collapse__header {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
}
</style>
