<template>
  <table class="va-menu-list">
    <template v-if="$slots.default">
      <template v-for="child in $slots.default()">
        <component v-if="getVNodeComponentName(child) === 'VaMenuItem'" :is="child" :key="getVNodeKey(child) + 'menuitem'" />
        <!-- <component :is="child" v-else :key="getVNodeKey(child)" /> -->
        <!-- <tr v-else :key="getVNodeKey(child)">
          <td colspan="99999" class="va-menu-list__virtual-td">
            <component :is="child" />
          </td>
        </tr> -->
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
          @option-click="$emit('option-click', getValue(option))"
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
import { defineComponent, PropType, computed, VNode } from 'vue'
import VaMenuItem from './VaMenuItem.vue'
import VaMenuGroup from './VaMenuGroup.vue'
import { VaMenuOption } from '../types'
import { useColors, useSelectableList, useSelectableListProps } from '../../../composables'

export default defineComponent({
  name: 'VaMenuList',
  components: { VaMenuItem, VaMenuGroup },
  props: {
    ...useSelectableListProps,
    options: { type: Array as PropType<VaMenuOption[]>, default: () => [] },
    color: { type: String, default: 'primary' },
  },
  setup (props) {
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
      colorComputed,
      getVNodeComponentName,
      getVNodeKey,
      getText,
      getValue,
      getDisabled,
      getTrackBy,
      optionGroups,
    }
  },
})

</script>

<style lang="scss">
@import '../variables';

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
