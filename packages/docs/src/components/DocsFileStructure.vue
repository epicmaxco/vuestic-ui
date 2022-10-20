<template>
  <va-tree-view :nodes="nodes" expand-all>
    <template #content="node">
      <div class="d-flex align-center">
        <va-icon class="mr-2" :name="nodeIcon(node)" :color="nodeColor(node)" />

        <span>{{ node.label }}</span>

        <va-popover v-if="node.description" :message="node.description" stick-to-edges>
          <va-icon class="ml-2" name="help" size="small" color="backgroundElement" />
        </va-popover>
      </div>
    </template>
  </va-tree-view>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { GetApiBlock, BlockType } from '../types/configTypes'
import { TreeNode } from 'vuestic-ui/src/main'

type Files = GetApiBlock<BlockType.FILE_STRUCTURE>['files']

export default defineComponent({
  name: 'DocsFileStructure',

  props: {
    files: { type: Array as PropType<Files>, required: true },
  },

  setup (props) {
    const compileNode = (file: Files[number], id: number): Partial<TreeNode> => ({
      id: id,
      label: file.name,
      description: file.description,
      children: file.children?.map((child, index) => compileNode(child, id + index)) as TreeNode[],
    })

    const nodeIcon = (node: TreeNode) => node.icon || (node.hasChildren ? 'folder' : 'description')
    const nodeColor = (node: TreeNode) => node.hasChildren ? 'warning' : 'info'

    return {
      nodeIcon,
      nodeColor,
      nodes: computed(() => props.files.map(compileNode)),
    }
  },
})
</script>
