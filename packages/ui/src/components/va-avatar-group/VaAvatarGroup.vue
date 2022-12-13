<template>
  <div class="va-avatar-group" :class="classComputed" role="group">
    <va-avatar
      v-for="(option, idx) in maxOptions"
      :key="idx"
      v-bind="option"
      :size="sizeComputed"
      tabindex="0"
    />
    <slot name="rest" v-bind="restProps">
      <va-avatar color="secondary">
        +{{ restOptionsCount }}
      </va-avatar>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

import { VaAvatar } from '../va-avatar'

import pick from 'lodash/pick.js'
import { useBem, useComponentPresetProp, useSize, useSizeProps } from '../../composables'

const props = defineProps({
  ...useSizeProps,
  ...useComponentPresetProp,

  max: {
    type: Number,
    default: undefined,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const classComputed = useBem('va-avatar-group', () => ({
  ...pick(props, ['vertical']),
}))

const maxOptions = computed(() => props.options.slice(0, props.max))
const visibleItemsCount = computed(() => props.max ? props.max + 1 : 1)
const restOptionsCount = computed(() => props.options.length - (props.max || 0))
const { sizeComputed } = useSize(props, 'VaAvatarGroup')

const restProps = computed(() => ({ max: props.max, size: sizeComputed }))
</script>

<style lang="scss">
@import "variables";

.va-avatar-group {
  display: flex;
  flex-wrap: nowrap;

  .va-avatar + .va-avatar {
    margin-left: var(--va-avatar-group-gap);
  }

  &--vertical {
    flex-direction: column;

    .va-avatar + .va-avatar {
      margin-left: 0;
      margin-top: var(--va-avatar-group-gap);
    }
  }
}
</style>
