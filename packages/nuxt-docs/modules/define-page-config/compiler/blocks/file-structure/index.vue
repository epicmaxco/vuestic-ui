<script setup lang="ts">
import { type PropType, computed } from 'vue';
import { PageConfig } from '.';
import type { TreeNode } from 'vuestic-ui'

type Files = ReturnType<PageConfig>['files']

const props = defineProps({
  config: {
    type: Object as PropType<ReturnType<PageConfig>>,
    required: true
  }
})

const compileNode = (file: Files[number], id: number): Partial<TreeNode> => ({
    id: id,
    label: file.name,
    description: file.description,
    children: file.children?.map((child, index) => compileNode(child, id + index)) as TreeNode[],
  })

const nodeIcon = (node: TreeNode) => node.icon || (node.hasChildren ? 'folder' : 'description')
const nodeColor = (node: TreeNode) => node.hasChildren ? 'warning' : 'info'

const nodes = computed(() => props.config.files.map(compileNode))
</script>

<template>
  <va-tree-view :nodes="nodes" expand-all>
    <template #content="node">
      <div class="d-flex align-center">
        <va-icon class="mr-2" :name="nodeIcon(node)" :color="nodeColor(node)" />

        <span>{{ node.label }}</span>

        <va-popover v-if="node.description" :message="node.description" stick-to-edges>
          <va-icon class="ml-2" name="help" size="small" color="background-tertiary" />
        </va-popover>
      </div>
    </template>
  </va-tree-view>
</template>
