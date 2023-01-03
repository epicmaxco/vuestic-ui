import type { TreeNode } from '../types'

type TreeNodeElement = HTMLElement | null

const useTreeKeyboardNavigation = (toggleNode: (node: TreeNode) => void) => {
  const isParentElement = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('role') === 'group' || false

  const isElementExpanded = (currentElement: TreeNodeElement): boolean =>
    currentElement?.getAttribute('aria-expanded') === 'true' || false

  const getPreviousElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.previousElementSibling as TreeNodeElement

  const getNextElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.nextElementSibling as TreeNodeElement

  const getFirstChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.firstElementChild || null) as TreeNodeElement
  }

  const getLastChildElement = (currentElement: TreeNodeElement): TreeNodeElement => {
    return (currentElement?.querySelector('.va-tree-node-children')?.lastElementChild || null) as TreeNodeElement
  }

  const getParentElement = (currentElement: TreeNodeElement): TreeNodeElement =>
    currentElement?.parentElement?.closest('.va-tree-node') || null

  const findElement = (currentElement: TreeNodeElement, backwards?: boolean): TreeNodeElement => {
    if (!currentElement) {
      return null
    }

    const element = currentElement?.[backwards ? 'previousElementSibling' : 'nextElementSibling'] as TreeNodeElement

    if (element) {
      if (isElementExpanded(element)) {
        if (backwards) {
          return getLastChildElement(element)
        } else {
          return getFirstChildElement(element)
        }
      }

      return element
    } else {
      if (backwards) {
        return getParentElement(currentElement)
      }

      return findElement(getParentElement(currentElement), backwards)
    }
  }

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
        if (isElementExpanded(previousElement)) {
          findElement(currentElement, true)?.focus()
        } else {
          previousElement.focus()
        }
      } else {
        findElement(currentElement, true)?.focus()
      }
    }

    if (dir === 'down') {
      if (isElementExpanded(currentElement)) {
        getFirstChildElement(currentElement)?.focus()
      } else {
        const nextElement = getNextElement(currentElement)

        if (nextElement) {
          nextElement.focus()
        } else {
          findElement(currentElement)?.focus()
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

  return { handleKeyboardNavigation }
}

export default useTreeKeyboardNavigation
