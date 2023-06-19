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
    />
    <slot name="rest" v-bind="avatarProps">
      <va-avatar
        v-bind="avatarProps"
        :color="restColor"
        class="va-avatar-group__rest"
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
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { useBem, useComponentPresetProp, useSize, useSizeProps } from '../../composables'

const VaAvatarProps = extractComponentProps(VaAvatar)

export default defineComponent({
  name: 'VaAvatarGroup',

  components: {
    VaAvatar,
  },

  props: {
    ...useSizeProps,
    ...useComponentPresetProp,
    ...VaAvatarProps,

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
    /** If there are more avatars that can be displayed we show rest number. This prop changes color of rest indicator. */
    restColor: {
      type: String,
      default: 'secondary',
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

    const filteredAvatarProps = filterComponentProps(VaAvatarProps)
    const avatarProps = computed(() => ({
      ...filteredAvatarProps.value,
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
