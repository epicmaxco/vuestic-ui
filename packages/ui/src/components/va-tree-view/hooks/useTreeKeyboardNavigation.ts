import type { TreeNode } from '../types'

type TreeNodeElement = HTMLElement | null

const useTreeKeyboardNavigation = (toggleNode: (node: TreeNode) => void) => {
  const isParentElement = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('role') === 'group' || false

  const isElementExpanded = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('aria-expanded') === 'true' || false

  const isSingleElement = (currentElement: TreeNodeElement): boolean =>
    !!(getParentElement(currentElement)?.children?.length)

  const getParentElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.parentElement?.closest('.va-tree-node') || null

  const getPreviousElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.previousElementSibling as TreeNodeElement

  const findPreviousElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    if (!currentElement) {
      return null
    }

    const element = getPreviousElement(currentElement)

    if (!element) {
      return getParentElement(currentElement)
    }

    return element
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

  const onHorizontalMove = (currentElement: TreeNodeElement, dir: 'left' | 'right') => {
    if (dir === 'left') {
      getParentElement(currentElement)?.focus()
    } else if (dir === 'right') {
      if (isElementExpanded(currentElement)) {
        getFirstChildElement(currentElement)?.focus()
      }
    }
  }

  const onVerticalMove = (currentElement: HTMLElement, dir: 'up' | 'down') => {
    if (dir === 'up') {
      findPreviousElement(currentElement)?.focus()
    }

    if (dir === 'down') {
      findNextElement(currentElement)?.focus()
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

  return { handleKeyboardNavigation }
}

export default useTreeKeyboardNavigation
