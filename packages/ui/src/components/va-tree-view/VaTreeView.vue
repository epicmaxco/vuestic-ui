<template>
  <div class="va-tree-view" role="tree">
    <template v-if="$props.filter && !treeItems.length">
      <slot name="not-found">No matching nodes found</slot>
    </template>
    <template v-else>
      <va-tree-node
        v-for="nodeItem in treeItems"
        :key="getTrackBy(nodeItem)"
        :node="nodeItem"
        :expandable="$props.expandable"
        :disabled="$props.disabled || nodeItem.disabled"
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotScope">
          <slot :name="name" v-bind="slotScope" />
        </template>
      </va-tree-node>
    </template>
  </div>
</template>

<script lang="ts" setup>
import useTreeView from './hooks/useTreeView'
import { useTreeViewProps, useTreeViewEmits } from './hooks/useTreeHelpers'

import { VaTreeNode } from './components/VaTreeNode'

defineOptions({
  name: 'VaTreeView',
})

const props = defineProps({ ...useTreeViewProps })

const emit = defineEmits([...useTreeViewEmits])

const { treeItems, getTrackBy } = useTreeView(props, emit)
</script>

<style lang="scss">
@import 'variables';

.va-tree-view {
  padding: var(--va-tree-view-padding);
  font-family: var(--va-font-family);
}
</style>
