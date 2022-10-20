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
      >
        <template v-for="(_, name) in $slots" :key="name" v-slot:[name]="slotScope">
          <slot :name="name" v-bind="slotScope" />
        </template>
      </va-tree-node>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useTreeView from './hooks/useTreeView'
import { useTreeViewProps, useTreeViewEmits } from './hooks/useTreeHelpers'

import { VaTreeNode } from './components/VaTreeNode'

export default defineComponent({
  name: 'VaTreeView',

  props: { ...useTreeViewProps },

  emits: [...useTreeViewEmits],

  components: { VaTreeNode },

  setup: (props, { emit }) => {
    const { treeItems, getTrackBy } = useTreeView(props, emit)

    return { treeItems, getTrackBy }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-view {
  padding: var(--va-tree-view-padding);
  font-family: var(--va-font-family);
}
</style>
