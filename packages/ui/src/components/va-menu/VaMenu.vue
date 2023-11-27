<template>
  <VaDropdown v-bind="dropdownProps" ref="dropdown">
    <template #anchor>
      <slot name="anchor" />
    </template>

    <VaDropdownContent @keydown.esc="close">
      <VaMenuList @keydown.enter.space.prevent.stop v-bind="menuListProps" ref="menuList" @selected="$emit('selected', $event); close()">
        <template v-if="$slots.default" #default>
          <slot />
        </template>
      </VaMenuList>
    </VaDropdownContent>
  </VaDropdown>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaMenuList } from '../va-menu-list'
import { extractComponentProps, extractComponentEmits, filterComponentProps } from '../../utils/component-options'
import { useImmediateFocus, useComponentPresetProp } from '../../composables'
import { focusFirstFocusableChild } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'

const VaMenuListProps = extractComponentProps(VaMenuList)
const VaMenuListEmits = extractComponentEmits(VaMenuList)
const VaDropdownProps = extractComponentProps(VaDropdown)
const VaDropdownEmits = extractComponentEmits(VaDropdown)

export default defineComponent({
  name: 'VaMenu',

  components: { VaDropdown, VaDropdownContent, VaMenuList },

  props: {
    ...useComponentPresetProp,
    ...VaMenuListProps,
    ...VaDropdownProps,
    stickToEdges: { type: Boolean, default: true },
  },

  emits: [
    ...VaDropdownEmits,
    ...VaMenuListEmits,
  ],

  setup () {
    const menuList = ref<HTMLElement>()
    const dropdown = ref<typeof VaDropdown>()

    useImmediateFocus(menuList)

    const close = () => {
      dropdown.value?.hide()
      nextTick(() => {
        const el = unwrapEl(dropdown.value?.anchor)
        if (el) { focusFirstFocusableChild(el) }
      })
    }

    return {
      dropdown,
      menuList,
      menuListProps: filterComponentProps(VaMenuListProps),
      dropdownProps: filterComponentProps(VaDropdownProps),
      close,
    }
  },
})
</script>
