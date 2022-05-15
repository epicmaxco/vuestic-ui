<template>
  <div class="va-dropdown__content" :style="computedStyle">
    <slot />
  </div>
</template>

<script lang="ts">
import { useColors } from '../../../../services/color-config/color-config'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'VaDropdownContent',
  props: {
    noPadding: { type: Boolean, default: false },
    background: { type: String, default: 'white' },
  },

  setup (props) {
    const { getTextColor, getColor } = useColors()

    const computedStyle = computed(() => ({
      background: getColor(props.background, undefined, true),
      color: getTextColor(getColor(props.background)),
      padding: props.noPadding ? 0 : undefined,
    }))

    return { computedStyle }
  },
})
</script>

<style lang="scss">
  @import "variables";

  .va-dropdown {
    &__content {
      padding: var(--va-dropdown-content-padding);
      box-shadow: var(--va-dropdown-content-box-shadow);
      border-radius: var(--va-dropdown-content-border-radius);
      font-family: var(--va-font-family);
    }
  }
</style>
