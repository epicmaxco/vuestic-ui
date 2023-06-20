<template>
  <aside
    class="va-sidebar"
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div class="va-sidebar__menu" :style="`width: ${computedWidth};`">
      <va-config :components="{ VaSidebarItem: vaSidebarItemProps }">
        <slot />
      </va-config>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'

import { VaConfig } from '../va-config'
import { getGradientBackground } from '../../services/color'
import { useColors, useTextColor, useBem } from '../../composables'
import { useSidebar } from './hooks/useSidebar'
import { useComponentPresetProp } from '../../composables/useComponentPreset'

export default defineComponent({
  name: 'VaSidebar',
  props: {
    ...useComponentPresetProp,
    activeColor: { type: String, default: 'primary' },
    hoverColor: { type: String, default: undefined },
    hoverOpacity: {
      type: Number,
      default: 0.2,
      validator: (v: number) => v >= 0 && v <= 1,
    },
    borderColor: { type: String, default: undefined },
    color: { type: String, default: 'background-element' },
    textColor: { type: String },
    gradient: { type: Boolean, default: false },
    minimized: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    position: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
      validator: (v: string) => ['left', 'right'].includes(v),
    },
    width: { type: String, default: '16rem' },
    minimizedWidth: { type: String, default: '4rem' },
    modelValue: { type: Boolean, default: true },
    animated: { type: Boolean, default: true },
  },

  components: { VaConfig },

  setup (props) {
    const { getColor } = useColors()
    useSidebar(props)

    const isHovered = ref(false)

    const isMinimized = computed(() => props.minimized || (props.hoverable && !isHovered.value))

    const computedWidth = computed(() => {
      if (!props.modelValue) {
        return 0
      }

      return isMinimized.value ? props.minimizedWidth : props.width
    })

    const { textColorComputed } = useTextColor()

    const computedStyle = computed(() => {
      const backgroundColor = getColor(props.color)

      const color = textColorComputed.value

      return {
        color,
        backgroundColor,
        backgroundImage: props.gradient ? getGradientBackground(backgroundColor) : undefined,
      }
    })

    const computedClass = useBem('va-sidebar', () => ({
      minimized: isMinimized.value,
      right: props.position === 'right',
      animated: props.animated,
    }))

    const updateHoverState = (newHoverState: boolean) => {
      isHovered.value = props.hoverable && newHoverState
    }

    return {
      computedWidth,
      computedClass,
      computedStyle,
      updateHoverState,
      vaSidebarItemProps: computed(() => ({
        textColor: props.textColor,
        activeColor: props.activeColor,
        hoverColor: props.hoverColor,
        borderColor: props.borderColor,
        hoverOpacity: props.hoverOpacity,
      })),
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
  z-index: var(--va-sidebar-z-index);
  font-family: var(--va-font-family);
  display: inline-flex;

  &__menu {
    display: flex;
    flex-direction: column;
    max-height: var(--va-sidebar-menu-max-height);
    margin-bottom: var(--va-sidebar-menu-margin-bottom);
    list-style: var(--va-sidebar-menu-list-style);
    padding-left: var(--va-sidebar-menu-padding-left);
    overflow-y: var(--va-sidebar-menu-overflow-y);
    overflow-x: var(--va-sidebar-menu-overflow-x);

    @include va-scroll(var(--va-primary));
  }

  &--animated {
    transition: var(--va-sidebar-transition);

    .va-sidebar__menu {
      transition: var(--va-sidebar-transition);
    }
  }

  &--minimized {
    left: 0;

    .va-sidebar__title {
      display: none;
    }
  }

  &--right {
    left: auto;
    right: 0;
  }
}
</style>
