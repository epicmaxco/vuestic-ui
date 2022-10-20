<template>
  <va-tree-view :nodes="nodes" expand-all>
    <template #content="node">
      <div class="d-flex align-center">
        <span>{{ node.label }}</span>

        <va-popover v-if="node.description" :message="node.description" stick-to-edges>
          <va-icon class="ml-2" name="help" size="small" />
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
      icon: file.icon ? file.icon : file.children?.length ? 'folder' : 'description',
      isDirectory: (file.children?.length || 0) > 0,
      children: file.children?.map((child, index) => compileNode(child, id + index)) as TreeNode[],
    })

    return {
      nodes: computed(() => {
        return props.files.map(compileNode)
      }),
    }
  },
})
</script>
