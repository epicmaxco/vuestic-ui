<template>
  <table class="va-menu-list" ref="container" v-bind="makeMenuContainerAttributes()">
    <template v-if="$slots.default">
      <template v-for="child in getUnSlottedVNodes($slots.default())">
        <component v-if="getVNodeComponentName(child) === 'VaMenuItem'" :is="child" :key="getVNodeKey(child) + 'menuitem'" />
        <td colspan="999" v-else :key="getVNodeKey(child)" class="va-menu-list__virtual-td">
          <component :is="child" />
        </td>
      </template>
    </template>
    <slot v-else>
      <template v-for="(options, groupName) in optionGroups" :key="groupName">
        <VaMenuGroup v-if="groupName !== '_noGroup'" :group-name="groupName" />
        <VaMenuItem
          v-for="(option) in options"
          :key="getTrackBy(option)"
          :name="getText(option)" :icon="option.icon"
          :right-icon="option.rightIcon"
          :disabled="getDisabled(option)"
          :color="color"
          @click="$emit('selected', getValue(option), option)"
          @keydown.enter.space="$emit('selected', getValue(option), option)"
        >
          <template #left-icon>
            <slot name="left-icon" />
          </template>
        </VaMenuItem>
      </template>
    </slot>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, VNode, ref, Fragment } from 'vue'
import VaMenuItem from './components/VaMenuItem.vue'
import VaMenuGroup from './components/VaMenuGroup.vue'
import { VaMenuOption } from './types'
import { useColors, useSelectableList, useSelectableListProps } from '../../composables'
import { useMenuKeyboardNavigation, makeMenuContainerAttributes } from './composables/useMenuKeyboardNavigation'

export default defineComponent({
  name: 'VaMenuList',
  components: { VaMenuItem, VaMenuGroup },
  props: {
    ...useSelectableListProps,
    options: { type: Array as PropType<VaMenuOption[]>, default: () => [] },
    color: { type: String, default: 'primary' },
  },
  emits: ['selected'],
  setup (props) {
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

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    return {
      container,
      colorComputed,
      optionGroups,
      makeMenuContainerAttributes,
      getVNodeComponentName,
      getUnSlottedVNodes,
      getVNodeKey,
      getText,
      getValue,
      getDisabled,
      getTrackBy,
    }
  },
})

</script>

<style lang="scss">
@import './variables';

.va-menu-list {
  overflow: auto;
  min-width: 200px;
  table-layout: fixed;
  width: max-content;

  td:not(&__virtual-td) {
    padding-top: calc(var(--va-menu-padding-y) / 2);
    padding-bottom: calc(var(--va-menu-padding-y) / 2);
  }

  &__virtual-td:has(tr) {
    // Behaves like tbody, so column width are inherited for tr
    display: table-row-group;
  }

  &__group-name {
    font-size: 0.8em;
    color: var(--va-secondary);
  }

  .va-divider {
    margin: 0;
  }
}
</style>
