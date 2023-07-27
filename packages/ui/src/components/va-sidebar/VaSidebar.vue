<template>
  <aside
    ref="rootElement"
    class="va-sidebar"
    :class="computedClass"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div v-show="doShowMenu" class="va-sidebar__menu" ref="menu" :style="`width: ${menuWidth};`">
      <va-config :components="{ VaSidebarItem: vaSidebarItemProps }">
        <slot />
      </va-config>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, shallowRef, watch, watchEffect } from 'vue'

import { VaConfig } from '../va-config'
import { getGradientBackground } from '../../services/color'
import { useColors, useTextColor, useBem, useClickOutside, useElementWidth } from '../../composables'
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
    closeOnClickOutside: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],

  components: { VaConfig },

  setup (props, { emit }) {
    const { getColor } = useColors()
    useSidebar(props)

    const isHovered = ref(false)

    const isMinimized = computed(() => props.minimized || (props.hoverable && !isHovered.value))

    const menu = ref<HTMLElement>()
    const currentMenuWidth = useElementWidth(menu)
    // Display: none for menu if it closed
    // Otherwise sidebar items will be focusable when sidebar is hidden
    const doShowMenu = computed(() => {
      // Always show menu if sidebar is visible
      if (props.modelValue === true) {
        return true
      }

      // If menu is not rendered yet, ignore and show it
      if (currentMenuWidth.value === null) {
        return true
      }

      return currentMenuWidth.value > 0
    })

    const menuWidth = ref()

    const getWidth = () => {
      if (!props.modelValue) {
        return 0
      }

      return isMinimized.value ? props.minimizedWidth : props.width
    }

    watchEffect(() => {
      const width = getWidth()
      // Set width after doShowMenu is applied, so transition is executed after menu is displayed
      setTimeout(() => {
        menuWidth.value = width
      })
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

    const rootElement = shallowRef<HTMLElement>()

    useClickOutside([rootElement], () => {
      if (props.closeOnClickOutside && props.modelValue) {
        setTimeout(() => {
          emit('update:modelValue', false)
        }, 0)
      }
    })

    return {
      menu,
      doShowMenu,
      menuWidth,
      computedClass,
      computedStyle,
      updateHoverState,
      rootElement,
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
  box-sizing: border-box;

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
