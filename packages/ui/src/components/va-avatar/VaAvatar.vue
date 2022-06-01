<template>
  <div
    class="va-avatar"
    :style="computedStyle"
    :aria-hidden="!$props.src"
    aria-live="polite"
  >
    <slot>
      <va-progress-circle
        v-if="$props.loading"
        :size="sizeComputed"
        :color="colorComputed"
        indeterminate
      />
      <img
        v-else-if="$props.src"
        :src="$props.src"
        :alt="$props.alt"
      >
      <va-icon
        v-else-if="$props.icon"
        :name="$props.icon"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useColors } from '../../composables/useColor'
import { useSize, useSizeProps } from '../../composables/useSize'
import { useLoadingProps } from '../../composables/useLoading'
import { useTextColor } from '../../composables/useTextColor'

import VaIcon from '../va-icon'
import { VaProgressCircle } from '../va-progress-circle'

export default defineComponent({
  name: 'VaAvatar',
  components: { VaIcon, VaProgressCircle },
  props: {
    ...useLoadingProps,
    ...useSizeProps,
    color: { type: String, default: 'info' },
    textColor: { type: String, default: 'white' },
    square: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    src: { type: String, default: null },
    alt: { type: String, default: '' },
    fontSize: { type: String, default: '' },
  },
  setup (props) {
    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))
    const { sizeComputed, fontSizeComputed } = useSize(props, 'VaAvatar')
    const { textColorComputed } = useTextColor()

    const computedStyle = computed(() => ({
      color: textColorComputed.value,
      backgroundColor: props.loading ? 'transparent' : colorComputed.value,
      borderRadius: props.square ? 0 : '',
      fontSize: props.fontSize || fontSizeComputed.value,
      width: sizeComputed.value,
      minWidth: sizeComputed.value, // We only define width because common use case would be flex row, for column we expect user to set appropriate styling externally.
      height: sizeComputed.value,
    }))

    return {
      sizeComputed,
      computedStyle,
      colorComputed,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-avatar {
  align-items: var(--va-avatar-align-items);
  display: var(--va-avatar-display);
  justify-content: var(--va-avatar-justify-content);
  line-height: var(--va-avatar-line-height);
  position: var(--va-avatar-position);
  text-align: var(--va-avatar-text-align);
  vertical-align: var(--va-avatar-vertical-align);
  border-radius: var(--va-avatar-border-radius);
  font-family: var(--va-font-family);

  img,
  svg {
    border-radius: inherit;
    display: inline-flex;
    height: inherit;
    width: inherit;
    margin: auto;
  }
}
</style>
