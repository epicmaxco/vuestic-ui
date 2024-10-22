export const isElementChild = (
  parent: HTMLElement,
  child: HTMLElement | Window | null | undefined,
): boolean => {
  if (!child) {
    return false
  }
  if (child instanceof Window) {
    return false
  }
  if (child.parentElement === parent) {
    return true
  }

  return parent.contains(child)
}
