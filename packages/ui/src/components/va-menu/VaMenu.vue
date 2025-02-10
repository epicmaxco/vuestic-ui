<template>
  <VaDropdown v-bind="dropdownProps" ref="dropdown" v-model="vModel">
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
import { nextTick, ref, watchEffect } from 'vue'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaMenuList } from '../va-menu-list'
import { extractComponentProps, extractComponentEmits, filterComponentProps } from '../../utils/component-options'
import { useComponentPresetProp, useChildComponents, defineChildProps } from '../../composables'
import { focusElement, focusFirstFocusableChild } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'
import { useStatefulControl } from '../../composables/fabrics/useStatefulControl'

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
  ...defineChildProps({
    menuList: VaMenuList,
    dropdown: VaDropdown,
  }),
  stickToEdges: { type: Boolean, default: true },
})

const emit = defineEmits([
  ...VaDropdownEmits,
  ...VaMenuListEmits,
])

const menuList = ref<HTMLElement>()
const dropdown = ref<typeof VaDropdown>()

const vModel = useStatefulControl(props, emit)

watchEffect(() => {
  if (menuList.value) {
    nextTick(() => {
      focusElement(unwrapEl(menuList.value))
    })
  }
})

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

useChildComponents(props)

defineExpose({
  close,
})
</script>
