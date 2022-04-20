<template>
  <aside
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div class="va-sidebar__menu">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'

import { getGradientBackground } from '../../services/color-config/color-functions'
import { useColors } from '../../services/color-config/color-config'

export default defineComponent({
  name: 'VaSidebar',
  props: {
    color: { type: String, default: 'background' },
    textColor: { type: String },
    gradient: { type: Boolean, default: false },
    minimized: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    position: { type: String as PropType<'top' | 'bottom' | 'left' | 'right'>, default: 'left' },
    width: { type: String, default: '16rem' },
    minimizedWidth: { type: String, default: '2.5rem' },
    modelValue: { type: Boolean, default: true },
  },
  setup (props) {
    const { getColor, getTextColor } = useColors()

    const isHovered = ref(false)

    const isMinimized = computed(() => props.minimized || (props.hoverable && !isHovered.value))

    const computedWidth = computed(() => {
      if (!props.modelValue) {
        return 0
      }

      return isMinimized.value ? props.minimizedWidth : props.width
    })

    const computedStyle = computed(() => {
      const backgroundColor = getColor(props.color)
      const background = props.gradient ? getGradientBackground(backgroundColor) : backgroundColor

      const color = props.textColor ? getColor(props.textColor) : getTextColor(backgroundColor)

      return {
        color,
        background,
        width: computedWidth.value,
      }
    })

    const computedClass = computed(() => ({
      'va-sidebar': true,
      'va-sidebar--minimized': isMinimized.value,
      'va-sidebar--hidden': !props.modelValue,
      'va-sidebar--right': props.position === 'right',
    }))

    const updateHoverState = (newHoverState: boolean) => {
      isHovered.value = props.hoverable && newHoverState
    }

    return {
      computedClass,
      computedStyle,
      updateHoverState,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-sidebar {
  min-height: var(--va-sidebar-min-height);
  height: var(--va-sidebar-height);
  position: var(--va-sidebar-position);
  top: var(--va-sidebar-top);
  left: var(--va-sidebar-left);
  transition: var(--va-sidebar-transition);
  z-index: var(--va-sidebar-z-index);
  font-family: var(--va-font-family);

  &__menu {
    max-height: var(--va-sidebar-menu-max-height);
    margin-bottom: var(--va-sidebar-menu-margin-bottom);
    list-style: var(--va-sidebar-menu-list-style);
    padding-left: var(--va-sidebar-menu-padding-left);
    overflow-y: var(--va-sidebar-menu-overflow-y);
    overflow-x: var(--va-sidebar-menu-overflow-x);
  }

  &--minimized {
    left: 0;

    .va-sidebar-link-group {
      .va-sidebar-link__content {
        padding-right: 0;
      }
    }

    & + .content-wrap {
      margin-left: $sidebar-width--hidden !important;
    }
  }

  &--right {
    left: auto;
    right: 0;
  }
}
</style>
