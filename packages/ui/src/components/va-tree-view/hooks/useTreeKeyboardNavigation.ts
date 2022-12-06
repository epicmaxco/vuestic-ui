import type { TreeNode } from '../types'

type TreeNodeElement = HTMLElement | null

const useTreeKeyboardNavigation = (toggleNode: (node: TreeNode) => void) => {
  const isParentElement = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('role') === 'group' || false

  const isElementExpanded = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('aria-expanded') === 'true' || false

  const getPreviousElement = (currentElement: TreeNodeElement, omitParent = false): TreeNodeElement => {
    let previousElement = currentElement?.previousElementSibling as TreeNodeElement

    if (!omitParent && !previousElement) {
      previousElement = currentElement?.parentElement?.closest('.va-tree-node') || null
    }

    return previousElement
  }

  const getNextElement = (currentElement: TreeNodeElement, omitParent = false): TreeNodeElement => {
    let nextElement = currentElement?.nextElementSibling as TreeNodeElement

    if (!omitParent && isParentElement(currentElement) && isElementExpanded(currentElement)) {
      nextElement = currentElement?.querySelector('.va-tree-node') || null
    }

    return nextElement
  }

  const getFirstChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.firstElementChild || null) as TreeNodeElement
  }

  const getLastChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.lastElementChild || null) as TreeNodeElement
  }

  const getParentElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.parentElement?.closest('.va-tree-node') || null

  const onHorizontalMove = (currentElement: TreeNodeElement, dir: 'left' | 'right') => {
    const isCurrentElementExpanded = isElementExpanded(currentElement)

    if (dir === 'left') {
      getParentElement(currentElement)?.focus()
    } else if (dir === 'right') {
      if (isCurrentElementExpanded) {
        getFirstChildElement(currentElement)?.focus()
      }
    }
  }

  const onVerticalMove = (currentElement: HTMLElement, dir: 'up' | 'down') => {
    if (dir === 'up') {
      const previousElement = getPreviousElement(currentElement)

      if (previousElement) {
        if (isParentElement(previousElement)) {
          if (isElementExpanded(previousElement)) {
            getLastChildElement(previousElement)?.focus()
          } else {
            previousElement.focus()
          }
        } else {
          previousElement.focus()
        }
      }
    } else if (dir === 'down') {
      const nextElement = getNextElement(currentElement)

      if (nextElement) {
        nextElement?.focus()
      } else {
        const parentElement = getParentElement(currentElement)

        if (parentElement && isElementExpanded(parentElement)) {
          getNextElement(parentElement, true)?.focus()
        }
      }
    }
  }

  const handleKeyboardNavigation = (event: KeyboardEvent, node: TreeNode) => {
    const currentElement = event.target as HTMLElement

    switch (event.code) {
      case 'ArrowUp': {
        onVerticalMove(currentElement, 'up')
        break
      }
      case 'ArrowRight': {
        if (!isElementExpanded(currentElement)) {
          toggleNode(node)
        } else {
          onHorizontalMove(currentElement, 'right')
        }

        break
      }
      case 'ArrowDown': {
        onVerticalMove(currentElement, 'down')
        break
      }
      case 'ArrowLeft': {
        if (isElementExpanded(currentElement)) {
          toggleNode(node)
        } else {
          onHorizontalMove(currentElement, 'left')
        }

        break
      }
      default:
        currentElement.blur()
    }
  }

  return {
    handleKeyboardNavigation,
  }
}

export default useTreeKeyboardNavigation
