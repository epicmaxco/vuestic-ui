import type { TreeNode } from '../types'
import { computed, ComputedRef, reactive, Ref, ref } from 'vue'

export type TreeViewFilterMethod = (node:TreeNode, filter: string, textBy: string) => boolean

type CreateNodeProps = {
  node: TreeNode
  level?: number
  children?: TreeNode[]
  expandAll?: Ref<boolean>
  textBy?: Ref<string>
  filter?: Ref<string>
  computedFilterMethod: ComputedRef<TreeViewFilterMethod>
}

type CreateNodeFunc = (props: CreateNodeProps) => TreeNode

type UseTreeBuilderProps = {
  textBy: Ref<string>
  nodes: Ref<TreeNode[]>
  expandAll: Ref<boolean>
  filter: Ref<string>
  filterMethod: Ref<TreeViewFilterMethod | undefined>
  [key: string]: any
}

type UseTreeBuilderFunc = (props: UseTreeBuilderProps) => {
  treeItems: ComputedRef<TreeNode[]>
}

type TreeBuilderFunc = (nodes: TreeNode[], level?: number) => TreeNode[]

export const createNode: CreateNodeFunc = ({
  node,
  children = [],
  level = 0,
  expandAll = ref(false),
  textBy = ref(''),
  filter = ref(''),
  computedFilterMethod,
}) => (reactive({
  ...node,
  children,
  level,
  hasChildren: !!children.length,
  expanded: expandAll.value || node.expanded || false,
  checked: node.checked || false,
  disabled: node.disabled || false,
  matchesFilter: filter.value ? computedFilterMethod.value?.(node, filter.value, textBy.value) : true,
  indeterminate: false,
}))

const useTreeBuilder: UseTreeBuilderFunc = (props) => {
  const { nodes, expandAll, filter, filterMethod, textBy } = props

  const computedFilterMethod = computed<TreeViewFilterMethod>(() => {
    if (filterMethod.value) { return filterMethod.value }

    return (node, filter, textByValue) => node[textByValue].toLowerCase().includes(filter.toLowerCase())
  })

  const buildTree: TreeBuilderFunc = (nodes: TreeNode[], level = 0) => {
    return nodes.reduce((acc: TreeNode[], node: TreeNode) => {
      if (node.children?.length) {
        const children = buildTree(node.children, level + 1)
        const treeNode = createNode({
          node,
          level,
          children,
          expandAll,
          textBy,
          filter,
          computedFilterMethod,
        })

        if (!treeNode.matchesFilter) {
          treeNode.matchesFilter = treeNode.children.some(n => n.matchesFilter)
        }

        if (treeNode.matchesFilter) { acc.push(treeNode) }

        return acc
      }

      const treeNode = createNode({
        node,
        level,
        expandAll,
        textBy,
        filter,
        computedFilterMethod,
      })

      if (treeNode.matchesFilter) { acc.push(treeNode) }

      return acc
    }, [])
  }

  return { treeItems: computed(() => buildTree(nodes.value)) }
}

export default useTreeBuilder
