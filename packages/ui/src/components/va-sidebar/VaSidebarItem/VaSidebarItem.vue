<template>
  <component
    ref="rootElement"
    class="va-sidebar__item va-sidebar-item"
    tabindex="0"
    :class="{ 'va-sidebar-item--active': $props.active }"
    :style="computedStyle"
    :is="tagComputed"
    v-bind="linkAttributesComputed"
    v-on="keyboardFocusListeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import {
  applyColors,
  useElementRef,
  useColors,
  useKeyboardOnlyFocus,
  useHover,
  useRouterLink, useRouterLinkProps,
  useTextColor,
} from '../../../composables'
import { useSidebarItem } from '../hooks/useSidebar'
import { useComponentPresetProp } from '../../../composables/useComponentPreset'

export default defineComponent({
  name: 'VaSidebarItem',

  props: {
    ...useRouterLinkProps,
    ...useComponentPresetProp,
    active: { type: Boolean, default: false },
    textColor: { type: String, default: undefined },
    activeColor: { type: String, default: 'primary' },
    hoverColor: { type: String, default: undefined },
    hoverOpacity: { type: Number, default: 0.2 },
    borderColor: { type: String, default: undefined },
  },

  setup (props) {
    const rootElement = useElementRef()
    const sidebar = useSidebarItem()

    const { isHovered } = useHover(rootElement)
    const { getColor, getHoverColor, getFocusColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    const backgroundColorComputed = computed(() => {
      if (props.active && !isHovered.value && !hasKeyboardFocus.value) {
        return getColor(props.activeColor)
      }

      if (hasKeyboardFocus.value) {
        return getFocusColor(getColor(props.hoverColor || props.activeColor))
      }

      return '#ffffff00'
    })

    const textBackground = computed(() => applyColors(getColor(sidebar?.color), backgroundColorComputed.value))
    const { textColorComputed } = useTextColor(textBackground)

    const computedStyle = computed(() => {
      const style: Record<string, string> = { color: textColorComputed.value }

      if (isHovered.value || props.active || hasKeyboardFocus.value) {
        style.backgroundColor = backgroundColorComputed.value
      }

      if (props.active) {
        const mergedProps = { ...sidebar, ...props }
        style.borderColor = getColor(mergedProps.borderColor || mergedProps.activeColor)
      }

      if (hasKeyboardFocus.value) {
        style.backgroundColor = getFocusColor(getColor(props.hoverColor || props.activeColor))
      }

      if (isHovered.value) {
        style.backgroundColor = getHoverColor(
          getColor(props.hoverColor || props.activeColor), props.hoverOpacity,
        )
      }

      return style
    })

    const { tagComputed, hrefComputed, linkAttributesComputed } = useRouterLink(props)

    return {
      rootElement,
      computedStyle,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
      isHovered,
      backgroundColorComputed,
      bg: getColor(sidebar?.color),
      textBackground,
      linkAttributesComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../variables";
@import "../../../styles/resources";

.va-sidebar-item {
  border-left: var(--va-sidebar-item-active-border-size) solid transparent;
  padding-right: var(--va-sidebar-item-active-border-size);
  display: inline-block;
  width: 100%;
  font-family: var(--va-font-family);
  transition: var(--va-sidebar-item-transition);
  box-sizing: border-box;
  color: currentColor;
  cursor: pointer;
}
</style>
