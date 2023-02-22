<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { type File } from '.';
import type { TreeNode } from 'vuestic-ui'

const props = defineProps({
  files: {
    type: Array as PropType<File[]>,
    required: true
  }
})

const compileNode = (file: File, id: number): Partial<TreeNode> => ({
    id: id,
    label: file.name,
    description: file.description,
    children: file.children?.map((child, index) => compileNode(child, id + index)) as TreeNode[],
  })

const nodeIcon = (node: TreeNode) => node.icon || (node.hasChildren ? 'folder' : 'description')
const nodeColor = (node: TreeNode) => node.hasChildren ? 'warning' : 'info'

const nodes = computed(() => props.files.map(compileNode))
</script>

<template>
  <va-tree-view
    :nodes="nodes"
    expand-all
  >
    <template #content="node">
      <div class="d-flex align-center">
        <va-icon
          class="mr-2"
          :name="nodeIcon(node)"
          :color="nodeColor(node)"
        />

        <span>{{ node.label }}</span>

        <va-popover
          v-if="node.description"
          :message="node.description"
          stick-to-edges
        >
          <va-icon
            class="ml-2"
            name="help"
            size="small"
            color="secondary"
          />
        </va-popover>
      </div>
    </template>
  </va-tree-view>
</template>
