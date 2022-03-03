import { onBeforeUnmount, onMounted, Ref, unref } from 'vue'

const checkIfElementChild = (parent: HTMLElement, child: HTMLElement | null | undefined): boolean => {
  if (!child) { return false }
  if (child.parentElement === parent) { return true }

  return checkIfElementChild(parent, child.parentElement)
}

type MaybeRef<T> = T | Ref<T>
type MaybeArray<T> = T | T[]

const safeArray = <T>(a: MaybeArray<T>) => Array.isArray(a) ? a : [a]

export const useClickOutside = (elements: MaybeArray<MaybeRef<HTMLElement>>, cb: (el: HTMLElement) => void) => {
  const clickHandler = (event: MouseEvent) => {
    const clickTarget = event.target as HTMLElement

    const isClickInside = safeArray(elements)
      .some((element) => unref(element) && checkIfElementChild(unref(element), clickTarget))

    if (!isClickInside) { cb(clickTarget) }
  }

  onMounted(() => { window.addEventListener('click', clickHandler) })
  onBeforeUnmount(() => { window.removeEventListener('click', clickHandler) })
}
