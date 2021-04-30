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
    >
      <slot />
    </a>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { useColors } from '../../../../services/color-config/color-config'
import { getHoverColor, getFocusColor } from '../../../../services/color-config/color-functions'

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
    hoverColor: { type: String, default: 'secondary' },
  },
  setup (props) {
    const { isHovered, onMouseEnter, onMouseLeave } = useHover()
    const { getColor } = useColors()

    const computedStyle = computed(() => {
      const style: Record<string, string> = {}

      style.color = getColor(props.textColor, '')

      if (isHovered.value) {
        style['background-color'] = getHoverColor(getColor(props.hoverColor))
      }

      if (props.active) {
        style['border-color'] = getColor(props.activeColor)
        style['background-color'] = getFocusColor(getColor(props.activeColor))
      }

      return style
    })

    return { isHovered, onMouseEnter, onMouseLeave, computedStyle }
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
    color: inherit;
  }
</style>
