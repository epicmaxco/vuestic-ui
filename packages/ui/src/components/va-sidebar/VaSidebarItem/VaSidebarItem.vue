<template>
  <router-link custom :to="to" v-slot="{ href, navigate }">
    <a
      ref="anchor"
      v-bind="$attrs"
      class="va-sidebar__item va-sidebar-item"
      :class="{ 'va-sidebar-item--active': $props.active }"
      :style="computedStyle"
      :href="href"
      @click="navigate"
      v-on="keyboardFocusListeners"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { useColors } from '../../../services/color-config/color-config'
import useKeyboardOnlyFocus from '../../../composables/useKeyboardOnlyFocus'
import { useHover } from '../../../composables/useHover'
import { useTextColor } from '../../../composables/useTextColor'
import { useSidebarItem } from '../hooks/useSidebar'

export default defineComponent({
  name: 'VaSidebarItem',

  inheritAttrs: false,

  props: {
    to: {
      type: [String, Object] as PropType<RouteLocationRaw>,
      default: () => ({}),
    },
    active: { type: Boolean, default: false },
    textColor: { type: String, default: undefined },
    activeColor: { type: String, default: 'primary' },
    hoverColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
  },

  setup (props) {
    const anchor = ref<HTMLAnchorElement>()

    const { isHovered } = useHover(anchor)
    const { getColor, getHoverColor, getFocusColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { sidebarColor } = useSidebarItem()

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

      return getColor(sidebarColor.value)
    })

    const { textColorComputed } = useTextColor(backgroundColorComputed)

    const computedStyle = computed(() => {
      const style: Record<string, string> = {}

      style.color = textColorComputed.value

      if (isHovered.value || props.active || hasKeyboardFocus.value) {
        style.backgroundColor = backgroundColorComputed.value
      }

      if (props.active) {
        style.borderColor = getColor(props.borderColor || props.activeColor)
      }

      return style
    })

    return {
      anchor,
      computedStyle,
      keyboardFocusListeners,
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
  color: inherit !important;
  font-family: var(--va-font-family);
}
</style>
