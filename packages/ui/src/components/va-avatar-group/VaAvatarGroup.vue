<template>
  <div
    class="va-avatar-group"
    :class="classComputed"
    role="group"
  >
    <va-avatar
      v-for="(option, idx) in maxOptions"
      :key="idx"
      v-bind="{ ...avatarProps, ...option }"
      role="listitem"
      tabindex="0"
    />
    <slot name="rest" v-bind="avatarProps">
      <va-avatar
        color="secondary"
        v-bind="avatarProps"
        role="listitem"
      >
        +{{ restOptionsCount }}
      </va-avatar>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import { VaAvatar } from '../va-avatar'

import pick from 'lodash/pick.js'
import { useBem, useComponentPresetProp, useSize, useSizeProps } from '../../composables'
import { useAvatarProps } from '../va-avatar/hooks/useAvatarProps'

export default defineComponent({
  name: 'VaAvatarGroup',

  components: {
    VaAvatar,
  },

  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    ...useAvatarProps,

    max: {
      type: Number,
      default: undefined,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
  },

  setup (props) {
    const classComputed = useBem('va-avatar-group', () => ({
      ...pick(props, ['vertical']),
    }))

    const maxOptions = computed(() => props.options.slice(0, props.max))
    const visibleItemsCount = computed(() => props.max ? props.max + 1 : 1)
    const restOptionsCount = computed(() => props.options.length - (props.max || 0))
    const { sizeComputed, fontSizeComputed } = useSize(props, 'VaAvatarGroup')

    const avatarProps = computed(() => ({
      ...props,
      fontSize: fontSizeComputed.value,
      size: sizeComputed.value,
    }))

    return {
      classComputed,
      maxOptions,
      visibleItemsCount,
      restOptionsCount,
      avatarProps,
    }
  },
})
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
