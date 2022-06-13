import { TreeNode, UseTreeFilterFunc } from '../types'

const useTreeFilter: UseTreeFilterFunc = ({ nodes, labelKey, filter }) => {
  const filterNodes = (filteredNodes: TreeNode[], node: TreeNode) => {
    const label: string = node[labelKey]?.toLowerCase()

    if (label.indexOf(filter.toLowerCase()) > -1) {
      filteredNodes.push(node)

      return filteredNodes
    }

    if (node.children?.length) {
      const filteredChildNodes = node.children.reduce(filterNodes, [])

      if (filteredChildNodes.length) {
        filteredNodes.push({
          ...node,
          children: filteredChildNodes,
        })
      }
    }

    return filteredNodes
  }

  return nodes.slice().reduce(filterNodes, [])
}

export default useTreeFilter
