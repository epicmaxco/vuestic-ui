<template>
  <VaDropdown v-bind="dropdownProps" ref="dropdown">
    <template #anchor>
      <slot name="anchor" />
    </template>

    <VaDropdownContent @keydown="onKeydown">
      <VaMenuList @keydown.enter.space.prevent.stop v-bind="menuListProps" ref="menuList" @selected="$emit('selected', $event); close()">
        <template v-if="$slots.default" #default>
          <slot />
        </template>
      </VaMenuList>
    </VaDropdownContent>
  </VaDropdown>
</template>

<script lang="ts">
import { nextTick, ref } from 'vue'
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
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaMenu',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...VaMenuListProps,
  ...VaDropdownProps,
  stickToEdges: { type: Boolean, default: true },
})

const emit = defineEmits([
  ...VaDropdownEmits,
  ...VaMenuListEmits,
])

const menuList = ref<HTMLElement>()
const dropdown = ref<typeof VaDropdown>()

useImmediateFocus(menuList)

const close = () => {
  dropdown.value?.hide()
  nextTick(() => {
    const el = unwrapEl(dropdown.value?.anchorRef)
    if (el) { focusFirstFocusableChild(el) }
  })
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault()
  }
}

const menuListProps = filterComponentProps(VaMenuListProps)
const dropdownProps = filterComponentProps(VaDropdownProps)

defineExpose({
  close,
})
</script>
