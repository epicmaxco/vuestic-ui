<template>
  <component
    ref="anchor"
    class="va-sidebar__item va-sidebar-item"
    tabindex="0"
    :class="{ 'va-sidebar-item--active': $props.active }"
    :style="computedStyle"
    :href="hrefComputed"
    :to="$props.to"
    :is="tagComputed"
    v-on="keyboardFocusListeners"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, shallowRef, StyleValue } from 'vue'

import {
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
    borderColor: { type: String, default: undefined },
  },

  setup (props) {
    const anchor = shallowRef<HTMLAnchorElement>()

    const { isHovered } = useHover(anchor)
    const { getColor, getHoverColor, getFocusColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { sidebarColor } = useSidebarItem()

    const backgroundColorComputed = computed(() => {
      if (props.active && !isHovered.value && !hasKeyboardFocus.value) {
        return getColor(props.activeColor)
      }

      return getColor(sidebarColor.value)
    })

    const { textColorComputed } = useTextColor(backgroundColorComputed)

    const computedStyle = computed(() => {
      const style: StyleValue = {
        color: props.textColor,
      }

      if (props.active) {
        style.backgroundColor = backgroundColorComputed.value
        style.color = textColorComputed.value
        style.borderColor = getColor(props.borderColor || props.activeColor)
      }

      if (hasKeyboardFocus.value) {
        style.backgroundColor = getFocusColor(getColor(props.hoverColor || props.activeColor))
      }

      if (isHovered.value) {
        style.backgroundColor = getHoverColor(getColor(props.hoverColor || props.activeColor))
      }

      return style
    })

    const { tagComputed, hrefComputed } = useRouterLink(props)

    return {
      anchor,
      computedStyle,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
      isHovered,
    }
  },
})
</script>

<style lang="scss">
@import "../variables";
@import "../../../styles/resources";

.va-sidebar__item {
  border-left: var(--va-sidebar-item-active-border-size) solid transparent;
  padding-right: var(--va-sidebar-item-active-border-size);
  display: inline-block;
  width: 100%;
  font-family: var(--va-font-family);
  transition: var(--va-sidebar-item-transition);
  box-sizing: border-box;
  color: currentColor;
}
</style>
