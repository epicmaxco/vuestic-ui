<template>
  <router-link custom :to="to" v-slot="{ href, navigate }">
    <a
      v-bind="$attrs"
      class="va-sidebar__item va-sidebar-item"
      :style="computedStyle"
      :href="href"
      @click="navigate"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      v-on="keyboardFocusListeners"
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useColors } from '../../../../services/color-config/color-config'
import useKeyboardOnlyFocus from '../../../../composables/useKeyboardOnlyFocus'

const useHover = () => {
  const isHovered = ref(false)
  const onMouseEnter = () => { isHovered.value = true }
  const onMouseLeave = () => { isHovered.value = false }

  return { isHovered, onMouseEnter, onMouseLeave }
}

export default defineComponent({
  name: 'VaSidebarItem',
  props: {
    to: {
      type: [String, Object] as PropType<string | Record<string, any>>,
      default: {},
    },
    active: { type: Boolean, default: false },
    textColor: { type: String, default: undefined },
    activeColor: { type: String, default: 'primary' },
    hoverColor: { type: String, default: undefined },
    borderColor: { type: String, default: undefined },
  },
  setup (props) {
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { getColor, getHoverColor, getTextColor, getFocusColor } = useColors()

    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()

    const computedStyle = computed(() => {
      const style: Record<string, string> = {}

      style.color = getColor(props.textColor, 'inherit')

      if (isHovered.value) {
        style['background-color'] = getHoverColor(getColor(props.hoverColor || props.activeColor))
      }

      if (props.active) {
        const border = props.borderColor === undefined ? props.activeColor : props.borderColor

        style['border-color'] = getColor(border)
        style['background-color'] = getColor(props.activeColor)
        style.color = getTextColor(style['background-color'], getColor('dark'), '#ffffff')
      }

      if (hasKeyboardFocus.value) {
        style['background-color'] = getFocusColor(getColor(props.hoverColor || props.activeColor))
      }

      // Override default link color from VaContent
      style.color = `${style.color} !important`

      return style
    })

    return { isHovered, onMouseEnter, onMouseLeave, computedStyle, keyboardFocusListeners }
  },
})
</script>

<style lang="scss" scoped>
  @import '../variables';

  .va-sidebar__item {
    border-left: var(--va-sidebar-item-active-border-size) solid transparent;
    padding-right: var(--va-sidebar-item-active-border-size);
    display: inline-block;
    width: 100%;
    color: inherit !important;
  }
</style>
