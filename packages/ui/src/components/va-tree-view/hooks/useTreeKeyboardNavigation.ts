import { ExtractPropTypes } from 'vue'

import type { TreeNode, TreeView, TreeViewEmitsFunc } from '../types'
import { useTreeViewProps } from './useTreeHelpers'

type TreeNodeElement = HTMLElement | null
type UseTreeKeyboardNavigationMethods = Pick<TreeView, 'toggleNode' | 'toggleCheckbox'> & {
  emit: TreeViewEmitsFunc,
}

const useTreeKeyboardNavigation = (
  props: ExtractPropTypes<typeof useTreeViewProps>,
  methods: UseTreeKeyboardNavigationMethods,
) => {
  const { emit, toggleNode, toggleCheckbox } = methods
  const isElementExpanded = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('aria-expanded') === 'true'

  const getParentElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.parentElement?.closest('.va-tree-node') || null

  const getPreviousElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.previousElementSibling as TreeNodeElement

  const findPreviousElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    if (!currentElement) {
      return null
    }

    let previousElement = getPreviousElement(currentElement)
    let lastChildElement = isElementExpanded(previousElement) && getLastChildElement(previousElement)

    if (lastChildElement) {
      do {
        if (isElementExpanded(lastChildElement)) {
          lastChildElement = getLastChildElement(lastChildElement)

          if (lastChildElement) {
            continue
          } else {
            break
          }
        } else {
          previousElement = lastChildElement
          break
        }
      } while (true)
    }

    if (!previousElement) {
      return getParentElement(currentElement)
    }

    return previousElement
  }

  const getNextElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.nextElementSibling as TreeNodeElement

  const findNextElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    if (!currentElement) {
      return null
    }

    let nextElement = getNextElement(currentElement)
    const isCurrentExpanded = isElementExpanded(currentElement)

    if (!nextElement) {
      let parentElement = getParentElement(currentElement)

      do {
        if (!getNextElement(parentElement)) {
          parentElement = getParentElement(parentElement)

          if (!parentElement) {
            break
          } else {
            continue
          }
        } else {
          nextElement = getNextElement(parentElement)
          break
        }
      } while (true)
    }

    if (isCurrentExpanded) {
      return getFirstChildElement(currentElement)
    }

    return nextElement
  }

  const getFirstChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.firstElementChild || null) as TreeNodeElement
  }

  const getLastChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.lastElementChild || null) as TreeNodeElement
  }

  const onHorizontalMove = (currentElement: TreeNodeElement, dir: 'left' | 'right', node: TreeNode) => {
    const isCurrentElementExpanded = isElementExpanded(currentElement)

    if (dir === 'left') {
      if (isCurrentElementExpanded) {
        toggleNode(node)
      } else {
        getParentElement(currentElement)?.focus()
      }
    } else {
      if (!isCurrentElementExpanded) {
        toggleNode(node)
      } else {
        getFirstChildElement(currentElement)?.focus()
      }
    }
  }

  const onVerticalMove = (currentElement: HTMLElement, dir: 'up' | 'down') => {
    if (dir === 'up') {
      findPreviousElement(currentElement)?.focus()
    } else {
      findNextElement(currentElement)?.focus()
    }
  }

  const handleKeyboardNavigation = (event: KeyboardEvent, node: TreeNode) => {
    const currentElement = event.target as HTMLElement

    switch (event.code) {
      case 'ArrowUp':
        onVerticalMove(currentElement, 'up')
        break
      case 'ArrowRight':
        onHorizontalMove(currentElement, 'right', node)
        break
      case 'ArrowDown':
        onVerticalMove(currentElement, 'down')
        break
      case 'ArrowLeft':
        onHorizontalMove(currentElement, 'left', node)
        break
      case 'Space':
        if (props.selectable) {
          const state = typeof node.checked !== 'undefined' ? !node.checked : null

          toggleCheckbox(node, state)
        } else {
          emit('update:selected', node)
        }

        break
      case 'Escape':
        if (!props.selectable) {
          emit('update:selected', null)
        }

        currentElement.blur()

        break
      default:
        currentElement.blur()
    }
  }

  return { handleKeyboardNavigation }
}

export default useTreeKeyboardNavigation
