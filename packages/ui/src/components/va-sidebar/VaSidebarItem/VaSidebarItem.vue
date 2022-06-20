<template>
  <component
    ref="rootElement"
    class="va-sidebar__item va-sidebar-item"
    tabindex="0"
    :class="{ 'va-sidebar-item--active': $props.active }"
    :style="computedStyle"
    :href="hrefComputed"
    :to="$props.to"
    :is="tagComputed"
    v-bind="$attrs"
    v-on="keyboardFocusListeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useColors, appyColors } from '../../../services/color-config/color-config'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'
import { useHover } from '../../../composables/useHover'
import { useRouterLink, useRouterLinkProps } from '../../../composables/useRouterLink'
import { useElementRef } from '../../../composables/useElementRef'
import { useTextColor } from '../../../composables/useTextColor'
import { useElementBackground } from '../../../composables/useElementBackground'
import { useSidebarItem } from '../hooks/useSidebar'

export default defineComponent({
  name: 'VaSidebarItem',

  inheritAttrs: false,

  props: {
    ...useRouterLinkProps,
    active: { type: Boolean, default: false },
    textColor: { type: String, default: undefined },
    activeColor: { type: String, default: 'primary' },
    hoverColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
  },

  setup (props) {
    const rootElement = useElementRef()
    const sidebar = useSidebarItem()

    const { isHovered } = useHover(rootElement)
    const { getColor, getHoverColor, getFocusColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    const backgroundColorComputed = computed(() => {
      if (isHovered.value) {
        return getHoverColor(getColor(props.hoverColor || props.activeColor))
      }

      if (props.active) {
        return getColor(props.activeColor)
      }

      if (hasKeyboardFocus.value) {
        return getFocusColor(getColor(props.hoverColor || props.activeColor))
      }

      return '#ffffff00'
    })

    const textBackground = computed(() => appyColors(getColor(sidebar?.color), backgroundColorComputed.value))
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

      return style
    })

    const { tagComputed, hrefComputed } = useRouterLink(props)

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
    }
  },
})
</script>

<style lang="scss">
@import "../variables";

.va-sidebar__item {
  border-left: var(--va-sidebar-item-active-border-size) solid transparent;
  padding-right: var(--va-sidebar-item-active-border-size);
  display: inline-block;
  width: 100%;
  font-family: var(--va-font-family);
}
</style>
