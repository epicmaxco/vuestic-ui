<template>
  <table class="va-menu-list" ref="container" v-bind="makeMenuContainerAttributes()">
    <tbody>
      <template v-if="$slots.default">
        <template v-for="child in getUnSlottedVNodes($slots.default())" :key="getVNodeKey(child)">
          <component :is="child" />
        </template>
      </template>
      <slot v-else>
        <template v-for="(options, groupName) in optionGroups" :key="groupName">
          <slot v-if="groupName !== '_noGroup'"  name="group">
            <tr>
              <VaMenuGroup :group-name="groupName" />
            </tr>
          </slot>
          <VaMenuItem
            v-for="(option) in options"
            :key="getTrackBy(option)"
            :name="getText(option)" :icon="option.icon"
            :right-icon="option.rightIcon"
            :disabled="getDisabled(option)"
            @selected="$emit('selected', getValue(option), option)"
          >
            <template #left-icon="bind">
              <slot name="left-icon" v-bind="bind" />
            </template>
            <template #right-icon="bind">
              <slot name="right-icon" v-bind="bind" />
            </template>
          </VaMenuItem>
        </template>
      </slot>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import { PropType, computed, VNode, ref, Fragment, h } from 'vue'
import { VaMenuOption } from './types'
import { useSelectableList, useSelectableListProps } from '../../composables'
import { useMenuKeyboardNavigation, makeMenuContainerAttributes } from './composables/useMenuKeyboardNavigation'

defineOptions({
  name: 'VaMenuList',
})

const props = defineProps({
  ...useSelectableListProps,
  options: { type: Array as PropType<VaMenuOption[]>, default: () => [] },
})

const emit = defineEmits(['selected'])

const container = ref<HTMLElement>()
useMenuKeyboardNavigation(container)

const { getText, getValue, getDisabled, getGroupBy, getTrackBy } = useSelectableList(props)

const optionGroups = computed(() => props.options
  .reduce((groups: Record<string, VaMenuOption[]>, option) => {
    const groupBy = getGroupBy(option)

    if (!groupBy) {
      groups._noGroup.push(option)
    } else {
      if (!groups[groupBy]) { groups[groupBy] = [] }

      groups[groupBy].push(option)
    }

    return groups
  }, { _noGroup: [] }))

const getUnSlottedVNodes = (nodes: VNode[]) => {
  if (Array.isArray(nodes) && nodes[0].type === Fragment) {
    // If passed as slot, ignore Fragment VNode (template #default)
    return nodes[0].children as VNode[]
  }

  return nodes
}

const getVNodeComponentName = (node: VNode) => {
  console.log(h(node))
  if (typeof node.type === 'object' && 'name' in node.type && typeof node.type.name === 'string') {
    return node.type.name
  }

  return ''
}

const getVNodeKey = (node: VNode): string => {
  if (typeof node.type === 'string') {
    return node.type
  }

  if (typeof node.type === 'object' && 'name' in node.type && typeof node.type.name === 'string') {
    return node.type.name
  }

  return String(node.key)
}
</script>

<style lang="scss">
@import './variables';

.va-menu-list {
  overflow: auto;
  min-width: 200px;
  table-layout: fixed;
  width: max-content;
  outline: none;

  .va-menu-item {
    // Override VaDropdown style
    display: table-row;
    vertical-align: unset;
    line-height: unset;
  }

  // Without & at the start, style will be applied globally
  & td {
    padding-top: calc(var(--va-menu-padding-y) / 2);
    padding-bottom: calc(var(--va-menu-padding-y) / 2);
  }

  &__virtual-td:has(tr) {
    // Behaves like tbody, so column width are inherited for tr
    display: contents;
  }

  .va-divider {
    margin: 0;
  }
}
</style>
